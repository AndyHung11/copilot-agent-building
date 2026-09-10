/* ============================================================
   sim-data.js — Agent 模擬試跑內容(方式② 模擬示意)
   ------------------------------------------------------------
   重要:此檔內容為「模擬示意」,用於說明每個 Agent 的產出型態與
   價值,並非真實執行結果。撰寫原則:
     1. 不指名真實企業、不捏造具體金額 / 市占 / 良率等數據
     2. 產出型態(矩陣 / 摘要 / 表格 / 清單)須忠實反映官方指示
     3. 未定義模擬內容的 Agent,前端自動退回「產出結構示意」
   ============================================================ */
const SIM = {

  /* ---------- Z1 策略決策部 ---------- */
  A003: {
    art: "swot",
    /* 多輪對話:每個 turn = { ask, steps?, say? }
       ask   = 使用者說的話
       steps = Agent 工作中的步驟指示(可省略)
       say   = Agent 的文字回覆(最後一輪省略 say 改吐 artifact) */
    turns: {
      zh: [
        { ask: "我們下季要推一個新的 AI 客服工具,想先評估可行性。",
          say: "沒問題。要做出有用的 SWOT,我需要先確認三件事:\n\n1. 這個工具主要服務哪一類客戶?\n2. 目前客服是全人力,還是已有部分自動化?\n3. 你最想解決的是成本、速度,還是服務品質?" },
        { ask: "服務中小企業客戶,目前全人力。最想解決的是回應速度。",
          steps: ["解析分析標的與情境", "盤點內部條件(優勢 / 劣勢)", "掃描外部環境(機會 / 威脅)", "彙整四象限並產出策略建議"] }
      ],
      cn: [
        {
          ask: "我们下个季度想上一个新的 AI 客服工具，先评估下可行性。",
          say: "没问题。要做出一份有用的 SWOT，我得先确认三件事：\n\n1. 这个工具主要服务哪类客户？\n2. 现在客服是纯人工，还是已经有一部分自动化了？\n3. 你最想解决的是成本、速度，还是服务质量？"
        },
        {
          ask: "服务中小企业客户，现在纯人工。最想解决的是响应速度。",
          steps: ["解析分析对象与场景", "盘点内部条件（优势/劣势）", "扫描外部环境（机会/威胁）", "汇总四象限并给出策略建议"]
        }
      ],
      en: [
        { ask: "We're launching an AI customer support tool next quarter and want to assess viability first.",
          say: "Happy to help. To make the SWOT genuinely useful, I need three things:\n\n1. Which customer segment does this tool serve?\n2. Is support fully human today, or partially automated?\n3. Are you optimizing primarily for cost, speed, or service quality?" },
        { ask: "SMB customers, fully human today. Response speed is the priority.",
          steps: ["Parsing subject and context", "Assessing internal factors (S/W)", "Scanning external environment (O/T)", "Assembling matrix and recommendations"] }
      ]
    },
    title: { zh: "SWOT 分析矩陣", cn: "SWOT 分析矩阵", en: "SWOT Matrix" },
    data: {
      zh: {
        S: ["24 小時即時回應,不受人力班表限制", "可同時處理多語言諮詢", "單次互動的邊際成本遠低於真人客服", "所有對話自動留存,便於後續分析"],
        W: ["複雜或高情緒案件仍須轉接真人", "初期需投入大量知識庫整理", "回答品質高度依賴文件完整度", "首次導入的流程改造成本不低"],
        O: ["把客服對話轉為產品改善的第一手洞察", "延伸為自助服務入口,降低進線量", "跨時區市場的進入門檻大幅下降", "可與既有 CRM 整合,補完客戶輪廓"],
        T: ["部分客戶對 AI 客服信任度仍偏低", "競爭者可在短期內推出同級功能", "個資與資料落地法規持續變動", "知識庫若未更新,錯誤答覆會傷害品牌"]
      },
      cn: {
        S: ["24 小时实时响应，不受排班时间限制", "可同时处理多语种咨询", "单次交互的边际成本远低于人工客服", "所有对话自动留存，方便后续分析"],
        W: ["复杂或情绪激烈的问题仍需转人工", "前期要投入大量精力整理知识库", "回答质量高度依赖文档的完整程度", "首次落地的流程改造成本不低"],
        O: ["把客服对话变成产品改进的一手洞察", "延伸成自助服务入口，降低人工进线量", "跨时区市场的进入门槛大幅降低", "可以和现有 CRM 打通，补全客户画像"],
        T: ["部分客户对 AI 客服的信任度还是偏低", "竞争对手短期内就能推出同级功能", "个人信息与数据合规的相关法规持续变化", "知识库不及时更新的话，答错会损害品牌"]
      },
      en: {
        S: ["24/7 instant response, no shift constraints", "Handles multiple languages simultaneously", "Marginal cost per interaction far below human agents", "Every conversation logged for later analysis"],
        W: ["Complex or emotional cases still need human handoff", "Heavy upfront work to curate the knowledge base", "Answer quality depends on documentation completeness", "Non-trivial process redesign cost at rollout"],
        O: ["Turn support conversations into first-hand product insight", "Extend into self-service to deflect ticket volume", "Dramatically lower barrier to new time zones", "Integrate with CRM to complete customer profiles"],
        T: ["Some customers still distrust AI support", "Competitors can match the capability quickly", "Privacy and data-residency rules keep shifting", "A stale knowledge base produces brand-damaging errors"]
      }
    },
    rec: {
      zh: "<b>策略建議:</b>先以「AI 前線 + 真人後援」的混合模式導入,把 AI 定位在高頻低複雜度問題,同時建立知識庫的每月更新機制,可同時放大優勢並壓低威脅。",
      cn: "<b>策略建议：</b>先用“AI 打头阵 + 人工兜底”的混合模式落地，把 AI 定位在高频、低复杂度的问题上，同时建立知识库每月更新机制，既能放大优势，又能压低威胁。",
      en: "<b>Recommendation:</b> Launch as a hybrid \u201cAI front line + human backup\u201d model, scoping AI to high-frequency low-complexity queries while establishing a monthly knowledge-base refresh."
    }
  },

  /* ---------- Z2 行銷創意部 ---------- */
  A001: {
    art: "brief",
    turns: {
      zh: [
        { ask: "start",
          say: "哈囉!為了幫你掌握最新動態,我需要先了解幾件事:\n\n1. 你最想關注哪個產業?\n2. 有哪些特別在意的主題?\n3. 有沒有偏好的新聞來源?" },
        { ask: "半導體產業,重點是 AI 加速器。來源以主要財經媒體為主。",
          say: "收到。要我把範圍設在最近 14 天嗎?另外,你想一併看競爭對手的併購與合作消息嗎?" },
        { ask: "對,近 14 天。競爭對手動態也要,請標出 Must-Know 等級。",
          steps: ["執行網路搜尋", "過濾:相關性 / 可信度 / 近 14 天", "依四大主題分類", "以影響力評分排序並產出摘要"] }
      ],
      cn: [
        {
          ask: "start",
          say: "你好！为了帮你掌握最新动态，我先了解几件事：\n\n1. 你最想关注哪个行业？\n2. 有哪些特别在意的主题？\n3. 有没有偏好的新闻来源？"
        },
        { ask: "半导体行业，重点是 AI 加速器。来源主要看几家主流财经媒体。", say: "收到。范围就定在最近 14 天，可以吗？另外，要不要顺带看下竞争对手的并购和合作消息？" },
        {
          ask: "对，近 14 天。竞争对手动态也要，帮我标出 Must-Know 等级。",
          steps: ["执行网络搜索", "筛选：相关性/可信度/近 14 天", "按四大主题归类", "按影响力评分排序并生成摘要"]
        }
      ],
      en: [
        { ask: "start",
          say: "Hi! To keep you informed, I need a few things first:\n\n1. Which industry matters most to you?\n2. Any specific topics you're tracking?\n3. Any preferred news sources?" },
        { ask: "Semiconductors, focused on AI accelerators. Prioritize major financial media.",
          say: "Got it. Should I scope this to the last 14 days? And do you want competitor M&A and partnership news included?" },
        { ask: "Yes, last 14 days. Include competitor moves and flag Must-Know items.",
          steps: ["Running web search", "Filtering: relevance / credibility / last 14 days", "Categorizing into four themes", "Scoring impact and drafting the brief"] }
      ]
    },
    title: { zh: "主管摘要", cn: "高管摘要", en: "Executive Brief" },
    data: {
      zh: [
        { lv: "m", cat: "競爭對手動態", tx: "一家大型 GPU 供應商宣布收購網路互連技術廠商,補強資料中心叢集的傳輸瓶頸。" },
        { lv: "m", cat: "市場趨勢", tx: "先進製程的 AI 加速器訂單能見度延長,主要代工廠的相關產能已排至明年上半年。" },
        { lv: "n", cat: "新興技術", tx: "多家業者投入以光學互連取代銅線的方案,實驗室階段已見功耗改善。" },
        { lv: "n", cat: "法規變化", tx: "主要出口管制國家正評估調整特定 AI 晶片的輸出規範,細則尚未定案。" }
      ],
      cn: [
        { lv: "m", cat: "竞争对手动态", tx: "一家大型 GPU 供应商宣布收购网络互连技术供应商，补强数据中心集群的传输瓶颈。" },
        { lv: "m", cat: "市场趋势", tx: "先进制程的 AI 加速器订单能见度拉长，主要代工厂的相关产能已经排到明年上半年。" },
        { lv: "n", cat: "新兴技术", tx: "多家企业在做用光互连替代铜线的方案，实验室阶段已经看到功耗改善。" },
        { lv: "n", cat: "法规变化", tx: "主要出口管制国家正在评估调整特定 AI 芯片的出口规定，细则还没定。" }
      ],
      en: [
        { lv: "m", cat: "Competitor moves", tx: "A major GPU supplier announced the acquisition of an interconnect vendor to address data-center cluster bandwidth bottlenecks." },
        { lv: "m", cat: "Market trends", tx: "Order visibility for advanced-node AI accelerators has lengthened; leading foundry capacity is reportedly booked into next year." },
        { lv: "n", cat: "Emerging tech", tx: "Several players are pursuing optical interconnect to replace copper, with lab-stage power savings demonstrated." },
        { lv: "n", cat: "Regulation", tx: "Key export-control jurisdictions are weighing adjustments to certain AI-chip rules; details remain unsettled." }
      ]
    },
    rec: {
      zh: "<b>決策建議:</b>互連技術正成為 AI 資料中心的新競爭焦點,建議本季重新評估供應商組合與交期風險。",
      cn: "<b>决策建议：</b>互连技术正在成为 AI 数据中心新的竞争焦点，建议本季度重新评估供应商组合和交期风险。",
      en: "<b>Recommendation:</b> Interconnect is becoming the new competitive battleground for AI data centers \u2014 revisit supplier mix and lead-time exposure this quarter."
    }
  },

  /* ---------- Z4 法務與治理 ---------- */
  A014: {
    art: "table",
    turns: {
      zh: [
        { ask: "我這裡有一份客戶寄來的 NDA,想跟我們的標準版本比對。",
          say: "好的。請提供兩份文件,我會逐條比對。開始前想確認:你希望我把重點放在「所有差異」,還是只列出<b>可能造成風險</b>的條款?" },
        { ask: "先列出有風險的,但期間類的差異也要看到。",
          say: "了解。我會標示三級風險,並把保密期間、資訊定義、管轄與競業限制列為優先檢查項目。文件已收到,開始比對。",
          steps: ["解析兩份文件的條款結構", "逐條配對並找出差異"] },
        { ask: "好,另外幫我標出哪些需要法務優先看。",
          steps: ["依偏離程度判定風險等級", "彙整為比對表與審閱建議"] }
      ],
      cn: [
        {
          ask: "我这边有一份客户发来的 NDA，想跟我们的标准版本比一下。",
          say: "好的。把两份文档发我，我会逐条比对。开始前先确认下：你是想看“所有差异”，还是只列出<b>可能带来风险</b>的条款？"
        },
        {
          ask: "先列有风险的，不过期限类的差异也要能看到。",
          say: "明白。我会标出三级风险，把保密期限、信息定义、管辖和竞业限制列为优先检查项。文档已收到，开始比对。",
          steps: ["解析两份文档的条款结构", "逐条匹配并找出差异"]
        },
        { ask: "好，另外帮我标出哪些要法务优先看。", steps: ["按偏离程度判定风险等级", "汇总成比对表和审阅建议"] }
      ],
      en: [
        { ask: "I have an NDA from a client and want to compare it against our standard template.",
          say: "Sure. Please share both documents and I'll diff them clause by clause. First — should I surface <b>every</b> difference, or only clauses that carry risk?" },
        { ask: "Risk-bearing ones first, but I still want to see term-length differences.",
          say: "Understood. I'll assign three risk levels and prioritize confidentiality term, definition of confidential information, venue, and non-compete. Documents received — starting the comparison.",
          steps: ["Parsing clause structure of both documents", "Matching clauses and diffing"] },
        { ask: "Also flag which ones legal should review first.",
          steps: ["Assigning risk by degree of deviation", "Compiling comparison table and review notes"] }
      ]
    },
    title: { zh: "NDA 差異比對表", cn: "NDA 差异比对表", en: "NDA Comparison Table" },
    data: {
      zh: {
        head: ["條款", "對方版本", "我方標準", "風險"],
        rows: [
          ["保密期間", "簽署後 5 年", "簽署後 3 年", "m"],
          ["機密資訊定義", "含口頭揭露,無需事後書面確認", "僅限標示為機密之書面資料", "h"],
          ["準據法與管轄", "對方所在地法院專屬管轄", "中華民國法,台北地院", "h"],
          ["競業限制", "含 1 年競業禁止條款", "標準版不含競業限制", "h"],
          ["資料返還", "終止後 30 日內銷毀並出具證明", "終止後返還或銷毀,不需證明", "l"]
        ]
      },
      cn: {
        head: ["条款", "对方版本", "我方标准", "风险"],
        rows: [
          ["保密期限", "签署后 5 年", "签署后 3 年", "m"],
          ["机密信息定义", "包含口头披露，无需事后书面确认", "仅限标注为机密的书面材料", "h"],
          ["准据法与管辖", "对方所在地法院专属管辖", "中国大陆法律，我方所在地法院", "h"],
          ["竞业限制", "含 1 年竞业禁止条款", "标准版不含竞业限制", "h"],
          ["数据返还", "终止后 30 日内销毁并出具证明", "终止后返还或销毁，无需证明", "l"]
        ]
      },
      en: {
        head: ["Clause", "Counterparty draft", "Our standard", "Risk"],
        rows: [
          ["Confidentiality term", "5 years from signing", "3 years from signing", "m"],
          ["Definition of Confidential Info", "Includes oral disclosure, no written follow-up", "Written materials marked confidential only", "h"],
          ["Governing law & venue", "Exclusive jurisdiction in counterparty's courts", "ROC law, Taipei District Court", "h"],
          ["Non-compete", "Includes 1-year non-compete", "Standard template has none", "h"],
          ["Return of materials", "Destroy within 30 days and certify", "Return or destroy, no certification", "l"]
        ]
      }
    },
    rec: {
      zh: "<b>審閱建議:</b>三項高風險條款(機密定義、管轄、競業限制)建議法務優先處理;競業限制通常不屬 NDA 範疇,可要求刪除。",
      cn: "<b>审阅建议：</b>三项高风险条款（机密定义、管辖、竞业限制）建议法务优先处理；竞业限制一般不属于 NDA 的范围，可以要求对方删除。",
      en: "<b>Review note:</b> Three high-risk clauses (definition, venue, non-compete) warrant legal's immediate attention. Non-compete typically falls outside NDA scope."
    }
  },

  /* ---------- Z5 會議與溝通中心 ---------- */
  A036: {
    art: "brief",
    turns: {
      zh: [
        { ask: "剛開完產品規劃會議,幫我整理成會議紀錄。",
          say: "沒問題。我可以從會議錄音或逐字稿產出摘要。你希望紀錄裡包含哪些部分?\n\n• 決議事項\n• 待辦與負責人\n• 未解議題\n• 完整討論脈絡" },
        { ask: "前三項就好,不用完整脈絡。負責人一定要標出來。",
          steps: ["讀取會議逐字稿", "辨識發言者與討論主軸", "萃取決議、待辦與負責人", "整理為結構化會議紀錄"] }
      ],
      cn: [
        {
          ask: "刚开完产品规划会，帮我整理成会议纪要。",
          say: "没问题。我可以根据会议录音或文字记录来生成摘要。你希望纪要里包含哪些部分？\n\n• 决议事项\n• 待办与负责人\n• 待解决的问题\n• 完整讨论过程"
        },
        { ask: "前三项就行，完整过程不用。负责人一定要标出来。", steps: ["读取会议文字记录", "识别发言人与讨论主线", "提取决议、待办与负责人", "整理成结构化会议纪要"] }
      ],
      en: [
        { ask: "Just wrapped a product planning meeting — turn it into minutes for me.",
          say: "Sure. I can work from the recording or transcript. Which sections do you want?\n\n• Decisions\n• Action items and owners\n• Open issues\n• Full discussion narrative" },
        { ask: "First three only, skip the narrative. Owners must be named.",
          steps: ["Reading the transcript", "Identifying speakers and threads", "Extracting decisions, actions and owners", "Formatting the structured minutes"] }
      ]
    },
    title: { zh: "會議摘要", cn: "会议摘要", en: "Meeting Summary" },
    data: {
      zh: [
        { lv: "m", cat: "決議事項", tx: "確認下一版本以行動端體驗為優先,桌面端功能延後一個週期。" },
        { lv: "m", cat: "決議事項", tx: "既有付費方案維持不變,新方案設計延至市場調查完成後再議。" },
        { lv: "n", cat: "待辦事項", tx: "產品團隊於本週內提出行動端功能範圍草案,交由設計評估工時。" },
        { lv: "n", cat: "未解議題", tx: "跨區資料同步的延遲問題尚無結論,需工程團隊補充技術評估。" }
      ],
      cn: [
        { lv: "m", cat: "决议事项", tx: "确认下一版本优先做移动端体验，桌面端功能顺延一个周期。" },
        { lv: "m", cat: "决议事项", tx: "现有付费方案保持不变，新方案的设计等市场调研做完再议。" },
        { lv: "n", cat: "待办事项", tx: "产品团队本周内出移动端功能范围草案，交给设计评估工时。" },
        { lv: "n", cat: "待解决问题", tx: "跨区域数据同步的延迟问题还没结论，需要工程团队补充技术评估。" }
      ],
      en: [
        { lv: "m", cat: "Decision", tx: "Next release prioritizes the mobile experience; desktop features slip one cycle." },
        { lv: "m", cat: "Decision", tx: "Existing pricing tiers stay unchanged; new tier design deferred pending market research." },
        { lv: "n", cat: "Action item", tx: "Product to draft mobile feature scope this week for design to size." },
        { lv: "n", cat: "Open issue", tx: "Cross-region data sync latency unresolved; engineering to provide a technical assessment." }
      ]
    },
    rec: {
      zh: "<b>後續追蹤:</b>兩項決議已有明確負責人,建議把「跨區同步」列為下次會議的第一個議題。",
      cn: "<b>后续跟进：</b>两项决议已经有明确负责人，建议把“跨区域同步”列为下次会议的第一个议题。",
      en: "<b>Follow-up:</b> Both decisions have clear owners. Recommend making cross-region sync the first agenda item next time."
    }
  },

  /* ---------- Z6 專案與營運 ---------- */
  A013: {
    art: "table",
    turns: {
      zh: [
        { ask: "主管說這季要「提升客戶滿意度」,但這太籠統了。",
          say: "確實太籠統,沒辦法追蹤。我可以幫你轉成 SMART 目標。先問兩件事:\n\n1. 目前有在量測滿意度嗎?用什麼指標?\n2. 你認為滿意度低的主因是什麼?" },
        { ask: "有量 CSAT。客訴大多集中在「等太久才收到回覆」。",
          say: "那目標就該扣在「回應速度」這個可控的驅動因子上,而不是抽象的滿意度。我用 SMART 五要素幫你逐項改寫。",
          steps: ["釐清目標意圖與範圍", "逐項套用 SMART 五要素"] },
        { ask: "好,幫我加上檢核時間點。",
          steps: ["檢查可衡量性與時限", "產出目標卡與追蹤指標"] }
      ],
      cn: [
        {
          ask: "领导说这季度要“提升客户满意度”，但这也太笼统了。",
          say: "确实太笼统，没法跟踪。我可以帮你转成 SMART 目标。先问两件事：\n\n1. 现在有在测满意度吗？用的什么指标？\n2. 你觉得满意度低主要是什么原因？"
        },
        {
          ask: "有测 CSAT。客户投诉大多集中在“等太久才收到回复”。",
          say: "那目标就该盯住“响应速度”这个可控的驱动因素，而不是抽象的满意度。我用 SMART 五要素帮你逐项改写。",
          steps: ["厘清目标意图与范围", "逐项套用 SMART 五要素"]
        },
        { ask: "好，帮我加上检查的时间点。", steps: ["检查可衡量性与时限", "产出目标卡与跟踪指标"] }
      ],
      en: [
        { ask: "My manager says we need to \u201cimprove customer satisfaction\u201d this quarter, but that's far too vague.",
          say: "Agreed — it isn't trackable as written. I can convert it into SMART goals. Two questions first:\n\n1. Are you measuring satisfaction today? With what metric?\n2. What do you believe is driving the low scores?" },
        { ask: "We track CSAT. Complaints cluster around \u201ctook too long to get a reply.\u201d",
          say: "Then the goal should anchor on response speed — a controllable driver — rather than abstract satisfaction. Let me rewrite it against all five SMART criteria.",
          steps: ["Clarifying intent and scope", "Applying the five SMART criteria"] },
        { ask: "Good, add review checkpoints.",
          steps: ["Checking measurability and deadlines", "Producing goal cards and tracking metrics"] }
      ]
    },
    title: { zh: "SMART 目標拆解", cn: "SMART 目标拆解", en: "SMART Goal Breakdown" },
    data: {
      zh: {
        head: ["要素", "原始說法", "轉換後", "狀態"],
        rows: [
          ["Specific 具體", "提升客戶滿意度", "提升「首次回應速度」帶動的滿意度分數", "l"],
          ["Measurable 可衡量", "(未定義)", "季度 CSAT 由現況提升 8 個百分點", "l"],
          ["Achievable 可達成", "(未評估)", "依上季改善幅度推估,屬可達範圍", "m"],
          ["Relevant 相關", "(未連結)", "對應年度「客戶留存」策略主軸", "l"],
          ["Time-bound 有時限", "(無期限)", "本季末前完成,每月檢視一次", "l"]
        ]
      },
      cn: {
        head: ["要素", "原始说法", "转换后", "状态"],
        rows: [
          ["Specific 具体", "提升客户满意度", "提升由“首次响应速度”带动的满意度分数", "l"],
          ["Measurable 可衡量", "（未定义）", "季度 CSAT 在现状基础上提升 8 个百分点", "l"],
          ["Achievable 可达成", "（未评估）", "按上季度的改善幅度推算，属于可达成范围", "m"],
          ["Relevant 相关", "（未关联）", "对应年度“客户留存”的策略主线", "l"],
          ["Time-bound 有时限", "（无期限）", "本季度末前完成，每月复盘一次", "l"]
        ]
      },
      en: {
        head: ["Criterion", "Original", "Rewritten", "Status"],
        rows: [
          ["Specific", "Improve customer satisfaction", "Raise satisfaction driven by first-response speed", "l"],
          ["Measurable", "(undefined)", "Lift quarterly CSAT by 8 percentage points", "l"],
          ["Achievable", "(unassessed)", "Within reach based on last quarter's improvement rate", "m"],
          ["Relevant", "(unlinked)", "Maps to the annual customer-retention pillar", "l"],
          ["Time-bound", "(no deadline)", "Complete by quarter end, reviewed monthly", "l"]
        ]
      }
    },
    rec: {
      zh: "<b>提醒:</b>「可達成」一項屬推估,建議在第一個月檢視點確認趨勢後再決定是否調整目標值。",
      cn: "<b>提醒：</b>“可达成”这一项是推算出来的，建议在第一个月的检查点确认趋势后，再决定要不要调整目标值。",
      en: "<b>Note:</b> Achievability is an estimate \u2014 confirm the trend at the first monthly checkpoint before adjusting the target."
    }
  },

  /* ---------- Z7 產品創新實驗室 ---------- */
  A053: {
    art: "brief",
    turns: {
      zh: [
        { ask: "使用者一直反映「報表載入很慢」,我們該優化查詢效能嗎?",
          say: "先別急著動工程。「載入很慢」通常是<b>症狀</b>而不是需求本身。我想先釐清:\n\n1. 他們大多在什麼時間點看報表?\n2. 「慢」是指幾秒?有具體數字嗎?\n3. 看完報表後,他們接著要做什麼?" },
        { ask: "多半是早上開會前。大概要等 20 秒。看完是要在晨會上報數字。",
          say: "這個資訊很關鍵。如果他們的真正目的是「在晨會開始前拿到數字」,那 20 秒本身可能不是問題,<b>時間點</b>才是。我再確認一下:報表一定要即時資料嗎?",
          steps: ["拆解表面陳述", "追問使用情境與頻率"] },
        { ask: "其實前一天的數字就夠用了。",
          steps: ["分辨症狀與根因", "重述為可驗證的需求假設"] }
      ],
      cn: [
        {
          ask: "用户一直反馈“报表加载很慢”，我们该优化查询性能吗？",
          say: "先别急着动工程。“加载很慢”往往是<b>症状</b>，而不是需求本身。我想先厘清几点：\n\n1. 他们大多在什么时间点看报表？\n2. “慢”是指几秒？有具体数字吗？\n3. 看完报表后，他们接下来要做什么？"
        },
        {
          ask: "一般都是早上开会之前看。差不多得等上 20 秒。看完就得在晨会上把数字报出去。",
          say: "这个信息很关键。如果他们真正的目的是“在晨会开始前拿到数字”，那 20 秒本身可能不是问题，<b>时间点</b>才是。我再确认下：报表一定要实时数据吗？",
          steps: ["拆解表面说法", "追问使用场景与频率"]
        },
        { ask: "其实拿头一天的数就够用了。", steps: ["区分症状与根因", "重述为可验证的需求假设"] }
      ],
      en: [
        { ask: "Users keep saying reports load slowly. Should we optimize query performance?",
          say: "Let's not jump to engineering yet. \u201cSlow\u201d is usually a <b>symptom</b>, not the need. I'd like to clarify:\n\n1. When do they typically open the report?\n2. How slow is slow — do we have a number?\n3. What do they do immediately after reading it?" },
        { ask: "Mostly right before the morning stand-up. About 20 seconds. They read the numbers out in the meeting.",
          say: "That's the key detail. If the real goal is \u201chave the numbers before stand-up starts,\u201d then 20 seconds may not be the problem — <b>timing</b> is. One more check: does the report actually need live data?",
          steps: ["Deconstructing the surface statement", "Probing context and frequency"] },
        { ask: "Honestly, yesterday's numbers would be fine.",
          steps: ["Separating symptom from root cause", "Reframing as testable hypotheses"] }
      ]
    },
    title: { zh: "需求探詢結果", cn: "需求探询结果", en: "Requirement Discovery" },
    data: {
      zh: [
        { lv: "m", cat: "表面陳述", tx: "「報表載入很慢」— 這是症狀,不是需求本身。" },
        { lv: "m", cat: "可能根因", tx: "使用者多在每日晨會前查看,真正在意的是「能否在會議開始前拿到數字」。" },
        { lv: "n", cat: "待驗證假設", tx: "若提供前一日的預先產製快照,即使即時查詢仍慢,體感問題也可能消失。" },
        { lv: "n", cat: "建議追問", tx: "確認尖峰使用時段、可接受的資料新鮮度、以及是否所有欄位都必要。" }
      ],
      cn: [
        { lv: "m", cat: "表面说法", tx: "“报表加载很慢”——这是症状，不是需求本身。" },
        { lv: "m", cat: "可能根因", tx: "用户大多在每天晨会前查看，真正在意的是“能不能在会议开始前拿到数字”。" },
        { lv: "n", cat: "待验证假设", tx: "如果提供前一天预先生成的快照，即使实时查询还是慢，体感上的问题也可能就没了。" },
        { lv: "n", cat: "建议追问", tx: "确认使用高峰时段、可接受的数据新鲜度，以及是不是所有字段都必要。" }
      ],
      en: [
        { lv: "m", cat: "Surface statement", tx: "\u201cReports load slowly\u201d \u2014 a symptom, not the need itself." },
        { lv: "m", cat: "Likely root cause", tx: "Users check before the daily stand-up; what they really need is the numbers before the meeting starts." },
        { lv: "n", cat: "Hypothesis to test", tx: "A pre-generated prior-day snapshot may dissolve the perceived problem even if live queries stay slow." },
        { lv: "n", cat: "Suggested probes", tx: "Confirm peak usage window, acceptable data freshness, and whether every column is needed." }
      ]
    },
    rec: {
      zh: "<b>建議:</b>先驗證「時間點」假設再投入查詢效能優化,可能以小得多的成本解決同一個痛點。",
      cn: "<b>建议：</b>先验证“时间点”这个假设，再投入查询性能优化，可能用小得多的成本就解决了同一个痛点。",
      en: "<b>Recommendation:</b> Validate the timing hypothesis before investing in query optimization \u2014 it may solve the same pain far more cheaply."
    }
  },

  /* ---------- 以下 47 個由批次產生,結構與上方一致 ---------- */

A002: {
    art: "brief",
    turns: {
      zh: [
        { ask: "我想開始今天的提示詞工程挑戰", say: "太好了！今天的挑戰主題是「用 GSEC 框架撰寫一則產品詢問提示詞」。在開始前，請問你目前對 GSEC 四個維度的熟悉程度如何？" },
        { ask: "我知道四個字母的意思，但還不太確定怎麼拆分應用", steps: ["解析輸入", "比對框架", "評估完整度", "生成回饋"] }
      ],
      cn: [
        {
          ask: "今天这道提示词工程挑战，咱们开整吧",
          say: "太好了！今天的挑战主题是“用 GSEC 框架写一条产品咨询提示词”。开始之前，想问下你现在对 GSEC 四个维度的熟悉程度怎么样？"
        },
        { ask: "四个字母的意思我懂，但还不太确定怎么拆开来用", steps: ["解析输入", "比对框架", "评估完整度", "生成反馈"] }
      ],
      en: [
        { ask: "I'd like to start today's prompt engineering challenge", say: "Great! Today's challenge is 'Write a product-inquiry prompt using the GSEC framework.' Before we begin — how familiar are you with the four GSEC dimensions?" },
        { ask: "I know what the letters stand for, but I'm not sure how to apply them in practice", steps: ["Parse input", "Match framework", "Assess completeness", "Generate feedback"] }
      ]
    },
    title: { zh: "GSEC 提示詞挑戰回饋報告", cn: "GSEC 提示词挑战反馈报告", en: "GSEC Prompt Challenge Feedback Report" },
    data: {
      zh: [
        { lv: "m", cat: "目標（G）", tx: "目標欄位已清楚點明「詢問產品規格」，語意完整，此維度達標" },
        { lv: "m", cat: "期望（E）", tx: "期望描述過於寬泛；建議改為「請以條列式輸出三項關鍵規格及交期」以提升可執行性" },
        { lv: "n", cat: "來源（S）", tx: "未指定參考來源；可加入「依照官網產品頁內容」強化回應準確性" },
        { lv: "n", cat: "情境（C）", tx: "補充「我是負責詢價的採購人員，對方是技術顧問」有助模型調整語氣與措詞" }
      ],
      cn: [
        { lv: "m", cat: "目标（G）", tx: "目标部分已经清楚点明“咨询产品规格”，语义完整，这个维度达标" },
        { lv: "m", cat: "期望（E）", tx: "期望描述太宽泛；建议改成“请以列表形式输出三项关键规格及交期”，提升可执行性" },
        { lv: "n", cat: "来源（S）", tx: "没有指定参考来源；可以加上“依据官网产品页内容”，提升回复的准确性" },
        { lv: "n", cat: "场景（C）", tx: "补充“我是负责询价的采购，对方是技术顾问”，有助于模型调整语气和措辞" }
      ],
      en: [
        { lv: "m", cat: "Goal (G)", tx: "The Goal field clearly states 'inquire about product specs' — this dimension passes" },
        { lv: "m", cat: "Expectation (E)", tx: "Expectation is too vague; suggest revising to 'List the top 3 key specs and lead time in bullet points'" },
        { lv: "n", cat: "Source (S)", tx: "No source cited; consider adding 'Based on the official product page' to improve response accuracy" },
        { lv: "n", cat: "Context (C)", tx: "Adding 'I am a procurement officer inquiring with a technical consultant' helps the model calibrate its tone" }
      ]
    },
    rec: {
      zh: "<b>建議：</b>明天挑戰「為績效面談撰寫 GSEC 提示詞」——每日練習五分鐘即可紮實建立技能。",
      cn: "<b>建议：</b>明天挑战“为绩效面谈写一条 GSEC 提示词”——每天练五分钟，就能把这项技能扎扎实实练出来。",
      en: "<b>Recommendation:</b> Tomorrow's challenge is 'Write a GSEC prompt for a performance review conversation' — five minutes of daily practice builds lasting skill."
    }
  },
  A007: {
    art: "table",
    turns: {
      zh: [
        { ask: "如果在北部地區額外部署 30 名前線員工，服務覆蓋率和整體成本會有什麼影響？", say: "這個問題很適合做敏感度分析。執行模擬前需確認幾個參數：目前北部地區的前線員工規模大約是多少？以及衡量「服務覆蓋率」的主要指標是什麼——回應時效、客戶訪問頻率、還是其他？" },
        { ask: "目前大概 100 人，主要看每月平均客戶訪問次數", say: "了解，我將以三種部署規模建立比較情境，同步標注成本與覆蓋率的相對變化。", steps: ["解析假設", "執行敏感度"] },
        { ask: "請順便加入「改以彈性排班替代增員」的對比方案", steps: ["隨機建模", "生成決策簡報"] }
      ],
      cn: [
        {
          ask: "如果在北方地区额外部署 30 名一线员工，服务覆盖率和整体成本会有什么影响？",
          say: "这个问题很适合做敏感性分析。跑模拟之前要先确认几个参数：现在北方地区的一线员工大概有多少人？以及衡量“服务覆盖率”的主要指标是什么——响应时效、客户拜访频率，还是别的？"
        },
        {
          ask: "现在大概 100 人，主要看每月平均客户拜访次数",
          say: "了解，我会按三种部署规模搭建对比场景，同时标注成本和覆盖率的相对变化。",
          steps: ["解析假设", "执行敏感性分析"]
        },
        { ask: "麻烦顺便加一个“用弹性排班替代增员”的对比方案", steps: ["随机建模", "生成决策简报"] }
      ],
      en: [
        { ask: "What would be the impact on service coverage and total cost if we deploy 30 additional frontline staff in the northern region?", say: "This is well-suited for a sensitivity analysis. Before running the simulation, I need a couple of parameters: roughly how many frontline staff are currently in the northern region? And what is the primary metric for 'service coverage' — response time, visit frequency, or something else?" },
        { ask: "Around 100 currently; the main metric is average monthly client visits per staff", say: "Understood. I'll build three deployment-scale scenarios and flag the relative changes in cost and coverage.", steps: ["Parse assumptions", "Run sensitivity"] },
        { ask: "Please also add a comparison scenario using flexible scheduling instead of new hires", steps: ["Stochastic modelling", "Generate decision brief"] }
      ]
    },
    title: { zh: "前線人力部署情境決策簡報", cn: "一线人力部署场景决策简报", en: "Frontline Staffing Deployment Decision Brief" },
    data: {
      zh: {
        head: ["部署方案", "服務覆蓋率變化", "成本影響", "風險"],
        rows: [
          ["保守方案（+20名）", "覆蓋率小幅提升", "成本溫和增加", "l"],
          ["基準方案（+30名）", "覆蓋率明顯改善", "成本中度增加", "m"],
          ["積極方案（+40名）", "覆蓋率顯著提升", "成本大幅增加", "h"],
          ["彈性排班方案", "覆蓋率有限改善", "短期成本較集中", "m"],
          ["外包補位方案", "覆蓋率穩定維持", "固定成本可控", "l"]
        ]
      },
      cn: {
        head: ["部署方案", "服务覆盖率变化", "成本影响", "风险"],
        rows: [
          ["保守方案（+20 名）", "覆盖率小幅提升", "成本温和增加", "l"],
          ["基准方案（+30 名）", "覆盖率明显改善", "成本中度增加", "m"],
          ["积极方案（+40 名）", "覆盖率显著提升", "成本大幅增加", "h"],
          ["弹性排班方案", "覆盖率改善有限", "短期成本较集中", "m"],
          ["外包补位方案", "覆盖率稳定维持", "固定成本可控", "l"]
        ]
      },
      en: {
        head: ["Deployment Option", "Service Coverage Change", "Cost Impact", "Risk"],
        rows: [
          ["Conservative (+20)", "Modest coverage improvement", "Moderate cost increase", "l"],
          ["Baseline (+30)", "Noticeable coverage gain", "Medium cost increase", "m"],
          ["Aggressive (+40)", "Significant coverage uplift", "High cost increase", "h"],
          ["Flexible Scheduling", "Limited coverage improvement", "Front-loaded cost", "m"],
          ["Outsourced Supplement", "Stable coverage maintained", "Controllable fixed cost", "l"]
        ]
      }
    },
    rec: {
      zh: "<b>建議：</b>在正式拍板前，建議評估「彈性排班」對員工滿意度的潛在影響——此面向在本模擬中尚未納入。",
      cn: "<b>建议：</b>正式拍板前，建议评估下“弹性排班”对员工满意度的潜在影响——这一点在本次模拟里还没纳入。",
      en: "<b>Recommendation:</b> Before finalising, assess the potential impact of flexible scheduling on employee satisfaction — this dimension was not captured in the current simulation."
    }
  },
  A011: {
    art: "brief",
    turns: {
      zh: [
        { ask: "我寫了一個提示詞，想請你評估：「幫我寫一份給主管的業務週報」", say: "這是個很常見的起點！在深入分析前，請問這份週報的主要讀者偏好是什麼——主管通常喜歡看重點數字、敘事進度、還是問題清單？了解受眾習慣能讓我給你更精準的建議。" },
        { ask: "主管偏好直接看數字和待解決問題，不需要背景鋪陳", steps: ["解析四維度", "評估完整度", "生成改寫建議", "提供示範"] }
      ],
      cn: [
        {
          ask: "我写了个提示词，想请你评估下：“帮我写一份给领导的销售周报”",
          say: "这是个很常见的起点！在深入分析之前，想问下这份周报的主要读者偏好是什么——领导通常爱看重点数字、进度叙述，还是问题清单？了解受众的习惯，我才能给你更精准的建议。"
        },
        { ask: "领导喜欢直接看数字和待解决的问题，不需要背景铺垫", steps: ["解析四维度", "评估完整度", "生成改写建议", "提供示例"] }
      ],
      en: [
        { ask: "I wrote a prompt and would like your feedback: 'Help me write a weekly business update for my manager'", say: "A very common starting point! Before diving in, may I ask: what does your manager prefer to see — key numbers, narrative progress, or a list of blockers? Understanding their reading style lets me give you sharper advice." },
        { ask: "My manager prefers numbers and blockers up front — no background preamble needed", steps: ["Analyse 4 dimensions", "Assess completeness", "Draft rewrite", "Provide template"] }
      ]
    },
    title: { zh: "提示詞診斷報告：業務週報", cn: "提示词诊断报告：销售周报", en: "Prompt Diagnostic Report: Weekly Business Update" },
    data: {
      zh: [
        { lv: "m", cat: "目標（G）", tx: "目標欄位過於寬泛；建議改為「產出本週業務進度摘要，重點呈現達標率與三項待解問題」" },
        { lv: "m", cat: "期望（E）", tx: "完全缺少輸出格式；加入「以三段落、每段不超過 80 字，數字用條列呈現」可大幅提升品質" },
        { lv: "n", cat: "來源（S）", tx: "補充「依附件中的週報數據」或「根據以下摘要」，避免模型自行推測數字" },
        { lv: "n", cat: "情境（C）", tx: "加入「主管偏好直接看數字，不需背景說明」可讓輸出更貼合讀者習慣" }
      ],
      cn: [
        { lv: "m", cat: "目标（G）", tx: "目标部分太宽泛；建议改成“产出本周销售进度摘要，重点呈现达标率和三项待解决问题”" },
        { lv: "m", cat: "期望（E）", tx: "完全没有说输出格式；加上“分三段、每段不超过 80 字，数字用列表呈现”，能大幅提升质量" },
        { lv: "n", cat: "来源（S）", tx: "补充“依据附件里的周报数据”或“根据以下摘要”，避免模型自己瞎猜数字" },
        { lv: "n", cat: "场景（C）", tx: "加上“领导喜欢直接看数字，不需要背景说明”，能让输出更贴合读者习惯" }
      ],
      en: [
        { lv: "m", cat: "Goal (G)", tx: "The goal is too vague; suggest: 'Summarise this week's business progress, highlighting attainment rate and three key blockers'" },
        { lv: "m", cat: "Expectation (E)", tx: "No output format specified; adding 'Use three paragraphs, each under 80 words, with bullet-pointed numbers' will dramatically improve quality" },
        { lv: "n", cat: "Source (S)", tx: "Add 'Based on the attached weekly data' or 'per the summary below' to prevent the model from guessing figures" },
        { lv: "n", cat: "Context (C)", tx: "Adding 'My manager prefers numbers directly with no background preamble' tailors the output to the reader's style" }
      ]
    },
    rec: {
      zh: "<b>建議：</b>改寫後的提示詞字數雖然增加一倍，但輸出品質通常提升數倍——這五分鐘的投資非常值得。",
      cn: "<b>建议：</b>改写后的提示词字数虽然翻了一倍，但输出质量往往能提升好几倍——这五分钟花得非常值。",
      en: "<b>Recommendation:</b> The revised prompt may be twice as long, but output quality typically improves several times over — the extra five minutes is well worth it."
    }
  },
  A017: {
    art: "swot",
    turns: {
      zh: [
        { ask: "我們跨部門的專案審批流程太慢，常常卡在中階主管那一層，嚴重影響交期", say: "這是個典型的組織瓶頸問題。在深入分析前，請問：平均一個審批案件需要多少工作天？以及卡在中階主管層的主要原因——是資訊不足、工作量過載、還是授權範圍不清？" },
        { ask: "大約 7 到 10 個工作天，主要是主管工作量過載，有時請假就整個停擺", steps: ["彙整問題", "多角度分析", "識別槓桿點", "擬定路徑"] }
      ],
      cn: [
        {
          ask: "我们跨部门的项目审批流程太慢，经常卡在中层领导那一环，严重影响交期",
          say: "这是个典型的组织瓶颈问题。深入分析之前想问下：平均一个审批事项要多少个工作日？以及卡在中层领导这一环的主要原因——是信息不足、工作量过载，还是授权范围不清晰？"
        },
        { ask: "大概 7 到 10 个工作日，主要是领导工作量过载，有时候一请假整个就停摆了", steps: ["汇总问题", "多角度分析", "识别杠杆点", "拟定路径"] }
      ],
      en: [
        { ask: "Our cross-department project approval process is too slow — it keeps getting stuck at the middle-management layer and seriously affects delivery timelines", say: "This is a classic organisational bottleneck. Before diving in, could you tell me: how many business days does an average approval take? And what is the main reason it stalls at the mid-manager layer — insufficient information, workload overload, or unclear delegation authority?" },
        { ask: "About 7 to 10 business days — mainly because managers are overloaded, and when one goes on leave the whole thing grinds to a halt", steps: ["Map problem structure", "Multi-angle analysis", "Identify leverage points", "Draft action path"] }
      ]
    },
    title: { zh: "跨部門審批瓶頸解題分析", cn: "跨部门审批瓶颈问题分析", en: "Cross-Department Approval Bottleneck Analysis" },
    data: {
      zh: {
        S: ["審批層級架構已明確，流程有跡可循", "中階主管掌握業務脈絡，審批品質有保障", "現有系統已能追蹤案件狀態", "團隊主動識別問題，具備改善意願"],
        W: ["審批無時限約束，缺乏 SLA 機制", "代理審批制度不健全，單點依賴風險高", "資訊不對稱，送件方無從得知卡關原因", "多數案件走序列流程，未善用並行審批"],
        O: ["建立自動提醒與逾期升級機制", "制定委辦授權清單，精簡不必要的審核層", "透過現有協作工具建立可視化進度看板", "定期用數據回顧 SLA，持續優化流程設定"],
        T: ["流程改動可能遭遇組織文化阻力", "過度自動化可能降低審批的嚴謹程度", "若未配套培訓，改善效果難以持久", "短期陣痛期可能衝擊時效敏感的案件交期"]
      },
      cn: {
        S: ["审批层级结构已经明确，流程有迹可循", "中层领导熟悉业务来龙去脉，审批质量有保障", "现有系统已经能跟踪事项状态", "团队主动发现问题，有改进的意愿"],
        W: ["审批没有时限约束，缺少 SLA 机制", "审批的代理机制不健全，过度押在单点上、风险偏高", "信息不对称，提交方没法知道卡在哪儿", "多数事项走串行流程，没有用好并行审批"],
        O: ["建立自动提醒和超期升级机制", "制定委托授权清单，精简不必要的审核层级", "用现有协作工具搭建可视化进度看板", "定期用数据复盘 SLA，持续优化流程设置"],
        T: ["流程调整可能会遇到组织文化上的阻力", "过度自动化可能会降低审批的严谨性", "如果不配套培训，改进效果很难持久", "短期阵痛期可能会冲击时效敏感事项的交期"]
      },
      en: {
        S: ["Approval hierarchy is clearly defined and traceable", "Mid-managers hold business context, ensuring approval quality", "Existing systems can already track case status", "Team has proactively identified the bottleneck, showing readiness to improve"],
        W: ["No SLA constraint — approvals can stall indefinitely", "Delegation-of-authority policy is weak, creating single-point dependency risk", "Information asymmetry — submitters don't know why approvals are stuck", "Most cases are sequentially routed; parallel approval is underutilised"],
        O: ["Implement auto-reminders and escalation triggers for overdue approvals", "Create a delegation authority matrix to reduce unnecessary manager sign-offs", "Build a visual workflow board using existing collaboration tools", "Use periodic SLA data reviews to drive continuous process optimisation"],
        T: ["Process changes may face cultural resistance within the organisation", "Excessive automation could reduce the rigour and accountability of approvals", "Without accompanying training, improvements may not be sustained", "Short-term transition pain may impact time-sensitive delivery cases"]
      }
    },
    rec: {
      zh: "<b>建議：</b>優先從「建立代理審批名單」切入——這是阻力最小、且能立刻解除假期停擺問題的槓桿點。",
      cn: "<b>建议：</b>优先从“建立代理审批名单”入手——这是阻力最小、又能立刻解决请假停摆问题的杠杆点。",
      en: "<b>Recommendation:</b> Start with 'establishing a delegation-of-authority list' — this is the lowest-resistance lever and immediately eliminates the leave-triggered standstill."
    }
  },
  A021: {
    art: "brief",
    turns: {
      zh: [
        { ask: "幫我為新導入的費用申報系統設計一套員工培訓模組", say: "很樂意協助！為了確保模組符合實際需求，請問：目標學員的數位工具使用習慣如何——多數是電腦熟練者還是基礎用戶居多？以及這套培訓最想解決的痛點——是「不知道怎麼用」還是「知道但常常填錯」？" },
        { ask: "學員背景混合，基礎用戶居多；最想解決的是填錯申請導致退件的問題", steps: ["定義目標", "規劃模組", "撰寫腳本", "設計評量"] }
      ],
      cn: [
        {
          ask: "帮我给新上线的费用报销系统设计一套员工培训模块吧",
          say: "很乐意帮忙！为了让模块更贴合实际需求，想先问两点：目标学员平时用数字化工具的熟练度怎么样——大多是电脑玩得比较溜的，还是基础用户偏多？另外这次培训最想解决的痛点是什么——是“不知道怎么操作”，还是“会用但经常填错”？"
        },
        { ask: "学员背景比较杂，基础用户偏多；最想解决的是填错申请被打回的问题", steps: ["明确目标", "规划模块", "撰写脚本", "设计测评"] }
      ],
      en: [
        { ask: "Help me design an employee training module for our newly introduced expense reimbursement system", say: "Happy to help! To ensure the module fits real needs, could you tell me: how digitally savvy are your target learners — mostly proficient users or primarily basic users? And what is the core pain point — 'don't know how to use it' or 'know how but keep making errors'?" },
        { ask: "Mixed background, mostly basic users; the main pain point is incorrect submissions causing rejections", steps: ["Define objectives", "Plan modules", "Write scripts", "Design assessments"] }
      ]
    },
    title: { zh: "費用申報系統培訓模組設計", cn: "费用报销系统培训模块设计", en: "Expense Reimbursement System Training Module Design" },
    data: {
      zh: [
        { lv: "m", cat: "學習目標", tx: "完訓後學員能獨立完成申報並正確選擇費用類別，降低因填寫錯誤導致的退件率" },
        { lv: "m", cat: "模組架構", tx: "建議三段式設計：①系統導覽（10分鐘）②常見情境演練（15分鐘）③知識確認小測驗（5分鐘）" },
        { lv: "n", cat: "互動設計", tx: "演練段落加入「常見錯誤糾錯題」，學員選錯後才觸發解說，有效加深記憶" },
        { lv: "n", cat: "語調建議", tx: "採支持性語調，將「不得提交重複單據」改為「建議送出前對照上月紀錄確認」，減少防衛感" }
      ],
      cn: [
        { lv: "m", cat: "学习目标", tx: "培训结束后，学员能独立提交报销并正确选择费用类别，降低因填写错误被打回的比例" },
        { lv: "m", cat: "模块结构", tx: "建议采用三段式设计：①系统速览（10 分钟）②常见场景演练（15 分钟）③知识点小测验（5 分钟）" },
        { lv: "n", cat: "互动设计", tx: "演练环节加入“常见错误纠错题”，学员选错后再触发讲解，能有效加深记忆" },
        { lv: "n", cat: "语气建议", tx: "采用鼓励式语气，把“不得重复提交单据”改成“建议提交前对照上月记录核对一下”，减少抵触感" }
      ],
      en: [
        { lv: "m", cat: "Learning Objective", tx: "After completion, learners can independently submit expense reports and select the correct category, reducing rejection rates from submission errors" },
        { lv: "m", cat: "Module Structure", tx: "Three-stage design: ① System orientation (10 min) ② Common-scenario practice (15 min) ③ Knowledge-check quiz (5 min)" },
        { lv: "n", cat: "Interaction Design", tx: "Add 'spot-the-mistake' exercises in the practice stage — learners only see the explanation after selecting a wrong answer, deepening retention" },
        { lv: "n", cat: "Tone Guidance", tx: "Use a supportive tone; replace 'Do not submit duplicate claims' with 'We recommend cross-checking last month's records before submitting' to reduce defensiveness" }
      ]
    },
    rec: {
      zh: "<b>建議：</b>上線前以五位典型基礎用戶進行易用性測試，確認模組流程符合實際操作直覺，再全面推廣。",
      cn: "<b>建议：</b>正式上线前，先找 5 位典型的基础用户做一轮易用性测试，确认模块流程符合大家的实际操作习惯，再全面推广。",
      en: "<b>Recommendation:</b> Before launch, run a usability test with five typical basic-level users to confirm the module flow matches real-world intuition before rolling out company-wide."
    }
  },
  A025: {
    art: "table",
    turns: {
      zh: [
        { ask: "我們要在員工自助服務 App 新增請假申請功能，請幫我拆解使用者故事", say: "收到！在拆解前，請問這個功能涉及哪幾種角色——除了提出申請的員工，主管審核和 HR 查閱也在範疇內嗎？另外，目前最讓使用者痛苦的流程環節是什麼？" },
        { ask: "主要有員工、主管、HR 三個角色；最大痛點是現在全靠 email 往來，狀態追蹤非常困難", steps: ["定義角色", "拆解故事", "撰寫條件", "標注優先"] }
      ],
      cn: [
        {
          ask: "我们要在员工自助服务 App 里加一个请假申请功能，帮我拆解一下用户故事",
          say: "收到！拆解之前先问一下，这个功能涉及哪几类角色——除了发起申请的员工，领导审批和 HR 查看也算在范围内吗？另外，目前最让用户头疼的是哪个流程环节？"
        },
        { ask: "主要是员工、领导、HR 三类角色；最大的痛点是现在全靠 email 来回沟通，状态特别难跟踪", steps: ["定义角色", "拆解故事", "撰写条件", "标注优先级"] }
      ],
      en: [
        { ask: "We're adding a leave application feature to our employee self-service app — please help me break down the user stories", say: "Got it! Before breaking it down, could you confirm which roles are in scope — beyond employees submitting requests, are manager approvals and HR inquiries also included? And what is the most painful part of the current process?" },
        { ask: "Three roles: employees, managers, and HR. The biggest pain is relying entirely on email — tracking status is a nightmare", steps: ["Define personas", "Break down stories", "Write acceptance criteria", "Prioritise"] }
      ]
    },
    title: { zh: "請假功能使用者故事清單", cn: "请假功能用户故事清单", en: "Leave Application Feature — User Story Backlog" },
    data: {
      zh: {
        head: ["使用者角色", "我想要…", "以便…", "優先"],
        rows: [
          ["員工", "透過 App 提交請假申請", "不需往返 email 即可完成申請", "h"],
          ["員工", "即時查看申請審核狀態", "知道進度而無需追問主管", "h"],
          ["主管", "在 App 內一鍵核准或退回", "隨時隨地處理不積壓待辦", "h"],
          ["主管", "查看下屬當週出勤概況", "安排工作分配避免人力空窗", "m"],
          ["HR", "匯出月度請假彙整報表", "快速整理數據供薪資計算使用", "m"]
        ]
      },
      cn: {
        head: ["用户角色", "我想要……", "以便……", "优先级"],
        rows: [
          ["员工", "通过 App 提交请假申请", "不用来回发 email 就能完成申请", "h"],
          ["员工", "随时查看申请的审批状态", "不用追着领导问就知道进度", "h"],
          ["领导", "在 App 里一键审批或退回", "随时随地处理，不积压待办", "h"],
          ["领导", "查看下属本周的出勤概况", "合理安排分工，避免人手空档", "m"],
          ["HR", "导出月度请假汇总报表", "快速整理数据，供算薪使用", "m"]
        ]
      },
      en: {
        head: ["User Role", "I want to…", "So that…", "Priority"],
        rows: [
          ["Employee", "Submit a leave request via the app", "Complete the request without back-and-forth email", "h"],
          ["Employee", "View the real-time approval status", "Know progress without having to chase my manager", "h"],
          ["Manager", "Approve or reject requests in the app with one tap", "Handle approvals anywhere without backlogs building up", "h"],
          ["Manager", "See my team's attendance overview for the week", "Plan workload allocation and avoid coverage gaps", "m"],
          ["HR", "Export a monthly leave summary report", "Quickly compile data for payroll processing", "m"]
        ]
      }
    },
    rec: {
      zh: "<b>建議：</b>首版衝刺建議僅交付員工申請與主管審核的核心流程，HR 報表功能可排入第二版以加快上線時程。",
      cn: "<b>建议：</b>首个版本冲刺建议只做员工申请和领导审批这条核心流程，HR 报表功能可以放到第二版，这样能加快上线进度。",
      en: "<b>Recommendation:</b> For the first sprint, deliver only the core employee-submission and manager-approval flow; HR reporting can be deferred to v2 to accelerate the initial release."
    }
  },
  A029: {
    art: "swot",
    turns: {
      zh: [
        { ask: "我們下個月要在 LinkedIn 和 Instagram 推廣一款新的 B2B 企業協作工具，請幫我規劃內容策略", say: "很棒的計畫！為了讓策略更精準，請問：目前品牌在這兩個平台各有多少追蹤者？以及這款工具最主要的目標受眾——是 IT 主管、數位轉型負責人、還是一般業務主管？" },
        { ask: "LinkedIn 約三千、Instagram 約八百，主要鎖定 IT 主管和數位轉型負責人", steps: ["分析現況", "評估格局", "規劃組合", "制定策略"] }
      ],
      cn: [
        {
          ask: "下个月我们打算在 LinkedIn 和 Instagram 上推一款新的 B2B 企业协作工具，内容策略这块帮我理一理",
          say: "计划很不错！为了让策略更精准，想先了解两点：目前品牌在这两个平台各有多少粉丝？还有这款工具最主要的目标受众是谁——是 IT 负责人、数字化转型负责人，还是一般的业务主管？"
        },
        {
          ask: "LinkedIn 大概三千、Instagram 大概八百，主要锁定 IT 负责人和数字化转型负责人",
          steps: ["分析现状", "评估格局", "规划组合", "制定策略"]
        }
      ],
      en: [
        { ask: "We're launching a new B2B enterprise collaboration tool next month on LinkedIn and Instagram — please help me plan a content strategy", say: "Excellent plan! To sharpen the strategy, could you share the current follower count on each platform? And who are the primary target personas — IT managers, digital transformation leads, or general business managers?" },
        { ask: "About 3,000 on LinkedIn and 800 on Instagram; we're primarily targeting IT managers and digital transformation leads", steps: ["Analyse current state", "Assess competitive landscape", "Plan content mix", "Define posting strategy"] }
      ]
    },
    title: { zh: "B2B 協作工具社群行銷策略分析", cn: "B2B 协作工具社交媒体营销策略分析", en: "B2B Collaboration Tool Social Media Strategy Analysis" },
    data: {
      zh: {
        S: ["LinkedIn 已具備一定的專業受眾基礎，適合 B2B 決策者觸及", "產品定位明確，訴求 IT 主管與轉型負責人，利於精準訊息設計", "企業協作工具天然契合 LinkedIn 職場敘事場景", "可搭配真實使用情境示範（流程前後對比）增強說服力"],
        W: ["Instagram 受眾基礎偏小，初期有機觸及效益有限", "B2B 視覺內容產製資源通常不如 B2C 充裕，創作節奏難以持續", "兩平台目前可能缺乏一致的品牌視覺系統", "尚未建立跨平台內容複用機制，創作效率偏低"],
        O: ["LinkedIn Carousel 與文章格式對 B2B 決策者吸引力高，可重點投放", "工具操作短影音可吸引技術型受眾，有效展示功能價值", "邀請業界意見領袖共同創作，加速觸及目標決策圈", "試用邀請型貼文可直接將互動轉化為潛在商機"],
        T: ["同類企業工具品牌的社群運營已相當成熟，競爭激烈", "平台演算法變化可能壓縮有機觸及率", "若發布節奏不穩定，受眾黏著度可能快速下降", "職場社群的負評或誤解若處理不及時，影響力大於一般消費市場"]
      },
      cn: {
        S: [
          "LinkedIn 已经有一定的专业受众基础，适合触达 B2B 决策者",
          "产品定位清晰，主打 IT 负责人和转型负责人，便于做精准的信息设计",
          "这类企业协作工具本身就跟 LinkedIn 的职场叙事路子对得上",
          "可以配合真实使用场景做演示（流程前后对比），增强说服力"
        ],
        W: [
          "Instagram 受众基础偏小，初期自然流量的触达效果有限",
          "B2B 视觉内容的制作资源通常不如 B2C 充足，创作节奏不容易持续",
          "两个平台目前可能缺乏统一的品牌视觉体系",
          "还没有搭建跨平台的内容复用机制，创作效率偏低"
        ],
        O: [
          "LinkedIn 的 Carousel 和文章形式对 B2B 决策者吸引力强，可以重点投放",
          "工具操作类短视频能吸引技术型受众，直观展示功能价值",
          "邀请行业意见领袖共创内容，加速触达目标决策圈",
          "试用邀请类帖子能直接把互动转化为潜在商机"
        ],
        T: [
          "同类企业工具品牌的社交媒体运营已经相当成熟，竞争激烈",
          "平台算法调整可能压缩自然触达率",
          "如果发布节奏不稳定，受众黏性可能很快下降",
          "职场社区里的负面评价或误解如果处理不及时，影响会比一般消费市场更大"
        ]
      },
      en: {
        S: ["LinkedIn has an established professional audience base suited to B2B decision-maker reach", "Clear product positioning targeting IT and transformation leaders enables precise messaging", "Enterprise collaboration tools fit naturally into LinkedIn's workplace narrative context", "Real-world use-case demos (before/after workflow comparisons) are highly persuasive for technical buyers"],
        W: ["Instagram audience is small; organic reach impact is limited in the short term", "B2B visual content production resources are typically leaner than B2C, making consistent pacing difficult", "Both platforms may currently lack a unified brand visual system", "No cross-platform content repurposing workflow yet, reducing creation efficiency"],
        O: ["LinkedIn Carousel and article formats have high appeal for B2B decision-makers — strong channel for focused investment", "Short product-demo videos attract technical audiences and effectively showcase feature value", "Co-creating with industry thought leaders can accelerate reach into target decision-making circles", "Trial-invitation posts can directly convert social engagement into sales pipeline opportunities"],
        T: ["Competing enterprise tool brands already have well-established, mature social communities", "Platform algorithm changes may compress organic reach rates unpredictably", "Inconsistent posting cadence can cause audience drop-off quickly in competitive professional feeds", "Negative comments or misunderstandings in professional communities have outsized reputational impact"]
      }
    },
    rec: {
      zh: "<b>建議：</b>首月聚焦 LinkedIn，以每週兩篇真實場景的 Carousel 建立內容信任基礎，再逐步在 Instagram 啟動短影音引流策略。",
      cn: "<b>建议：</b>第一个月先聚焦 LinkedIn，每周发两篇真实场景的 Carousel，把内容信任基础打起来，再逐步在 Instagram 上启动短视频引流。",
      en: "<b>Recommendation:</b> In month one, focus on LinkedIn with two scenario-based Carousel posts per week to build content credibility, then gradually activate a short-video traffic strategy on Instagram."
    }
  },
  A033: {
    art: "brief",
    turns: {
      zh: [
        { ask: "主管臨時要我接手一個已在進行中的專案，但我手邊兩個專案都在衝刺期，該怎麼開口婉拒？", say: "這需要謹慎拿捏的對話。在起草回應前，請問：你和主管的溝通風格是比較直接坦率，還是較為正式？以及你目前兩個衝刺期專案各自的截止日大約是什麼時候？" },
        { ask: "溝通風格偏直接，兩個專案都在這個月底截止", steps: ["套用框架", "辨識籌碼", "起草回應", "加入方案"] }
      ],
      cn: [
        {
          ask: "领导临时让我接手一个正在进行的项目，但我手头两个项目都在冲刺期，这该怎么开口拒绝？",
          say: "这场沟通得好好拿捏分寸。帮你起草回复之前，想先问一下：你和领导平时的沟通风格是比较直接坦率，还是偏正式一些？另外你手头这两个冲刺期项目的截止日期大概各是什么时候？"
        },
        { ask: "说话比较直来直去，手头两个项目都卡在这个月底交", steps: ["套用框架", "识别筹码", "起草回复", "补充方案"] }
      ],
      en: [
        { ask: "My manager just asked me to take over an ongoing project, but both of my current projects are in sprint — how do I decline professionally?", say: "This requires a carefully calibrated conversation. Before drafting a response, could you tell me: is your communication style with your manager direct and frank, or more formal? And when are the deadlines for your two current sprints?" },
        { ask: "Fairly direct communication; both sprints end at the end of this month", steps: ["Apply PLANT framework", "Identify negotiation chips", "Draft response", "Add alternatives"] }
      ]
    },
    title: { zh: "PLANT 框架婉拒回應建議稿", cn: "PLANT 框架婉拒回复建议稿", en: "PLANT Framework — Professional Decline Response Draft" },
    data: {
      zh: [
        { lv: "m", cat: "核心回應", tx: "「主管，我很想支援這個案子，但 A 和 B 兩個專案都在月底衝刺，若同時接手恐怕三個案子都會受影響——我們能先討論一下優先序嗎？」" },
        { lv: "m", cat: "替代方案", tx: "主動提議「月底交付後立刻接棒」或「協助找有餘力的同事先行接手」，展現的是支持而非拒絕" },
        { lv: "n", cat: "語氣提醒", tx: "使用「目前」而非「我沒辦法」，保留協商空間，避免讓主管感覺碰壁或被拒於門外" },
        { lv: "n", cat: "後續確認", tx: "對話結束後以 Teams 或 email 確認共識，保護雙方並留下可追溯的紀錄" }
      ],
      cn: [
        {
          lv: "m",
          cat: "核心回复",
          tx: "“领导，我挺想帮这个项目的，但 A 和 B 两个项目都在月底冲刺，如果再同时接手，恐怕三个项目都会受影响——咱们能先一起排一下优先级吗？”"
        },
        { lv: "m", cat: "替代方案", tx: "主动提出“月底交付后马上接手”或者“帮忙找个手头有余力的同事先顶上”，传递的是支持而不是拒绝" },
        { lv: "n", cat: "语气提醒", tx: "多用“目前”，少说“我没办法”，给协商留出空间，别让领导觉得碰了壁、被一口回绝" },
        { lv: "n", cat: "后续确认", tx: "聊完之后用 Teams 或 email 再确认一下达成的共识，既保护双方，也留个可追溯的记录" }
      ],
      en: [
        { lv: "m", cat: "Core Response", tx: "'I really want to support this project, but both Project A and B are in end-of-month sprints — taking this on risks all three slipping. Could we first talk through priorities?'" },
        { lv: "m", cat: "Alternative Offer", tx: "Proactively suggest: 'I can take over right after my month-end deliveries' or 'I can help you find a colleague with capacity right now' — this signals support, not rejection" },
        { lv: "n", cat: "Tone Tip", tx: "Use 'right now' rather than 'I can't' — it preserves negotiation room and prevents the manager from feeling shut out" },
        { lv: "n", cat: "Follow-up", tx: "After the conversation, confirm the agreed outcome via Teams or email to protect both parties and create a traceable record" }
      ]
    },
    rec: {
      zh: "<b>建議：</b>婉拒成功的關鍵在於「替代方案比婉拒本身更具體」——選項越清晰，主管越容易接受。",
      cn: "<b>建议：</b>婉拒能不能成，关键在于“替代方案要比拒绝本身更具体”——选项越清晰，领导越容易接受。",
      en: "<b>Recommendation:</b> The key to a successful professional decline is making the alternative offer more concrete than the decline itself — the clearer the option, the easier it is for the manager to say yes."
    }
  },
  A038: {
    art: "table",
    turns: {
      zh: [
        { ask: "幫我比較本月（六月）與上月（五月）的業務 KPI，並寫一份主管摘要", say: "收到！為了讓報告對主管最有用，請問：主管最在意哪幾個指標——訂單量、客戶滿意度、回款率，還是都要涵蓋？另外，這份報告是否需要我主動標出月間顯著的亮點與風險？" },
        { ask: "三個都要，請主動標出亮點和風險，這份報告會直接用在月度業務會議上", steps: ["計算變化", "標注亮點", "生成摘要", "撰寫建議"] }
      ],
      cn: [
        {
          ask: "帮我对比一下本月（六月）和上月（五月）的销售 KPI，再写一份给领导看的摘要",
          say: "收到！为了让这份报告对领导最有用，想先问一下：领导最看重哪几个指标——订单量、客户满意度、回款率，还是都要包含？另外，需不需要我主动把月度之间明显的亮点和风险标出来？"
        },
        { ask: "三个都要，麻烦主动标出亮点和风险，这份报告会直接用在月度销售会议上", steps: ["计算变化", "标注亮点", "生成摘要", "撰写建议"] }
      ],
      en: [
        { ask: "Please compare this month's (June) business KPIs against last month (May) and write an executive summary", say: "Got it! To make the report most useful, which metrics matter most to your executive audience — order volume, customer satisfaction, payment collection rate, or all of them? Should I also proactively flag significant month-over-month swings?" },
        { ask: "All three, and yes please flag highlights and risks — this report goes straight into the monthly business review", steps: ["Calculate MoM changes", "Flag highlights & risks", "Generate exec summary", "Draft recommendations"] }
      ]
    },
    title: { zh: "六月業務 KPI 月度比較報告", cn: "六月销售 KPI 月度对比报告", en: "June Monthly Business KPI Comparison Report" },
    data: {
      zh: {
        head: ["KPI 指標", "五月狀態", "六月狀態", "狀態"],
        rows: [
          ["新訂單量", "達標，趨勢持平", "超標，月增顯著 ↑", "l"],
          ["客戶滿意度", "略低於基準線", "改善，回到基準以上 ↑", "l"],
          ["業務回款率", "未達標，有缺口", "持平，缺口略收窄", "m"],
          ["報價轉化率", "達標", "下滑，需持續關注 ↓", "m"],
          ["新客戶開發數", "達標", "低於目標，亟待推進 ↓", "h"]
        ]
      },
      cn: {
        head: ["KPI 指标", "五月情况", "六月情况", "状态"],
        rows: [
          ["新订单量", "达标，趋势持平", "超额，环比明显增长 ↑", "l"],
          ["客户满意度", "略低于基准线", "改善，回到基准线以上 ↑", "l"],
          ["销售回款率", "未达标，有缺口", "持平，缺口略有收窄", "m"],
          ["报价转化率", "达标", "下滑，需要持续关注 ↓", "m"],
          ["新客户开发数", "达标", "低于目标，亟需推进 ↓", "h"]
        ]
      },
      en: {
        head: ["KPI Metric", "May Status", "June Status", "Status"],
        rows: [
          ["New Order Volume", "On target, flat trend", "Exceeded target, significant MoM increase ↑", "l"],
          ["Customer Satisfaction Score", "Slightly below baseline", "Improved, back above baseline ↑", "l"],
          ["Payment Collection Rate", "Below target, gap present", "Flat, gap slightly narrowed", "m"],
          ["Quote Conversion Rate", "On target", "Declined, requires close monitoring ↓", "m"],
          ["New Client Acquisition", "On target", "Below target, needs immediate push ↓", "h"]
        ]
      }
    },
    rec: {
      zh: "<b>建議：</b>本月報價轉化率與新客戶開發同步走弱，建議在月度業務會議中優先討論業務管道健康度，並確認是否需要調整開發策略。",
      cn: "<b>建议：</b>本月报价转化率和新客户开发同步走弱，建议在月度销售会议上优先讨论销售管道的健康度，并确认是否需要调整开发策略。",
      en: "<b>Recommendation:</b> Quote conversion and new client acquisition both weakened this month — prioritise a pipeline health discussion in the monthly business review and assess whether the prospecting strategy needs adjustment."
    }
  },
  A042: {
    art: "brief",
    turns: {
      zh: [
        { ask: "幫我設計一份下個月部門 off-site 的 Outlook 邀請函", say: "馬上來！一份有溫度的邀請函能讓出席意願大幅提升。請問：活動的日期、時間和地點確定了嗎？以及這次 off-site 的主基調——是輕鬆充電型、還是策略討論型？" },
        { ask: "8月15至16日，花蓮某度假中心，兩天一夜，以輕鬆充電為主，大約20位夥伴參加", steps: ["蒐集細節", "選定語氣", "撰寫正文", "建議主旨"] }
      ],
      cn: [
        {
          ask: "下个月部门要搞 off-site，帮我在 Outlook 上弄一份邀请函",
          say: "这就来！一份有温度的邀请函能大大提升大家的参与意愿。想先问一下：活动的日期、时间和地点定下来了吗？还有这次 off-site 的主基调是什么——是轻松充电型的，还是策略讨论型的？"
        },
        { ask: "8 月 15 到 16 日，花莲的一个度假中心，两天一夜，主打轻松充电，大概 20 位同事参加", steps: ["收集细节", "确定语气", "撰写正文", "建议主题"] }
      ],
      en: [
        { ask: "Please help me design an Outlook invitation for next month's department off-site", say: "On it! A warm, well-crafted invitation can noticeably improve attendance. Could you confirm the date, time, and venue? And what's the overall tone — relaxed recharge trip, or strategy-focused workshop?" },
        { ask: "August 15–16, at a resort in Hualien, one overnight stay, mostly relaxed recharge; about 20 colleagues attending", steps: ["Gather event details", "Set tone & theme", "Write invitation body", "Suggest subject line"] }
      ]
    },
    title: { zh: "部門 Off-site 邀請函草稿", cn: "部门 Off-site 邀请函草稿", en: "Department Off-site Invitation Draft" },
    data: {
      zh: [
        { lv: "m", cat: "邀請正文", tx: "「夥伴們，讓我們暫時拋下螢幕，一起充電再出發！📍 8月15–16日｜花蓮度假中心。期待與大家一起探索、放鬆、重新連結——請於 8月8日前回覆確認出席，以利安排住宿。」" },
        { lv: "m", cat: "主旨建議", tx: "建議主旨：「🌊 部門年度充電之旅｜8/15–16 花蓮 Off-site 邀請確認」——長度符合 Outlook 行事曆標題顯示限制" },
        { lv: "n", cat: "行動呼籲", tx: "在正文末段加入明確的回覆截止日（建議活動前一週），可顯著提升住宿安排的及時性" },
        { lv: "n", cat: "表情符號", tx: "輕鬆型邀請可在適當位置加入 🌊🏔️✨ 增添視覺溫度，但總數建議不超過三個以維持專業感" }
      ],
      cn: [
        {
          lv: "m",
          cat: "邀请正文",
          tx: "“各位同事，让我们暂时放下屏幕，一起充电再出发！📍 8 月 15–16 日｜花莲度假中心。期待和大家一起探索、放松、重新连接——请在 8 月 8 日前回复确认是否参加，方便我们安排住宿。”"
        },
        {
          lv: "m",
          cat: "主题建议",
          tx: "建议主题：“🌊 部门年度充电之旅｜8/15–16 花莲 Off-site 邀请确认”——长度符合 Outlook 日历标题的显示限制"
        },
        { lv: "n", cat: "行动号召", tx: "在正文结尾加上明确的回复截止日期（建议放在活动前一周），能明显提升住宿安排的及时性" },
        { lv: "n", cat: "表情符号", tx: "轻松型的邀请可以在合适的位置加上 🌊🏔️✨ 增加一点视觉温度，但总数建议不超过 3 个，以保持专业感" }
      ],
      en: [
        { lv: "m", cat: "Invitation Body", tx: "'Team, let's step away from our screens and recharge together! 📍 15–16 Aug | Hualien Resort. Looking forward to exploring, relaxing, and reconnecting — please RSVP by 8 Aug so we can arrange accommodation.'" },
        { lv: "m", cat: "Subject Line", tx: "Suggested subject: '🌊 Team Annual Recharge Trip | 15–16 Aug Hualien Off-site — Please RSVP' — length fits Outlook calendar title display limits" },
        { lv: "n", cat: "Call to Action", tx: "Adding a clear RSVP deadline (one week before the event is recommended) in the closing line noticeably improves timely accommodation planning" },
        { lv: "n", cat: "Emoji Usage", tx: "For a relaxed tone, 🌊🏔️✨ add warmth in the right places — but keep the total to three or fewer to maintain professional polish" }
      ]
    },
    rec: {
      zh: "<b>建議：</b>邀請函寄出後，在回覆截止日前三天以 Teams 私訊提醒尚未回覆的夥伴，回覆率通常可顯著提升。",
      cn: "<b>建议：</b>邀请函发出后，在回复截止日期前三天用 Teams 私信提醒一下还没回复的同事，回复率通常能明显提升。",
      en: "<b>Recommendation:</b> After sending, follow up via a personal Teams message to non-responders three days before the RSVP deadline — response rates typically improve significantly with this simple nudge."
    }
  },
  A046: {
    art: "table",
    turns: {
      zh: [
        { ask: "幫我為「導入全公司統一的專案管理工具」建立一份商業提案", say: "好的！一份有說服力的商業提案需要清楚的痛點依據。請問：目前各部門用不同工具的主要問題是什麼——是資訊遺漏、重工、還是無法追蹤進度？另外，預計導入的人數規模和有沒有概算的預算範圍？" },
        { ask: "主要問題是跨部門協作資訊不同步和追蹤困難，全公司約 500 人，預算尚未確定", say: "了解——缺少的財務數字我會標注為「待確認」，不會憑空填入。", steps: ["建立敘述", "分析效益"] },
        { ask: "請補上替代方案分析和主要風險章節", steps: ["評估風險", "撰寫提案"] }
      ],
      cn: [
        {
          ask: "帮我给“全公司引入统一的项目管理工具”写一份商业方案",
          say: "好的！一份有说服力的商业方案需要有清晰的痛点依据。想先问几点：现在各部门用不同工具，主要问题出在哪——是信息遗漏、重复劳动，还是没法跟踪进度？另外，预计引入的人数规模有多大，有没有大致的预算范围？"
        },
        {
          ask: "主要问题是跨部门协作时信息不同步、难以跟踪，全公司大概 500 人，预算还没定",
          say: "明白——缺失的财务数字我会标成“待确认”，不会凭空填。",
          steps: ["构建陈述", "分析效益"]
        },
        { ask: "帮我补上替代方案分析和主要风险这两个章节", steps: ["评估风险", "撰写方案"] }
      ],
      en: [
        { ask: "Please build a business case for 'deploying a unified project management tool across the company'", say: "Sure! A compelling business case needs clear pain-point evidence. Could you describe the main problems caused by each department using different tools — information loss, rework, or inability to track progress? Also, what is the headcount in scope and is there a budget estimate?" },
        { ask: "The main issues are information misalignment and tracking difficulty in cross-team collaboration; about 500 people company-wide; budget is TBD", say: "Understood — I'll flag missing financial figures as 'TBD' rather than invent numbers.", steps: ["Build problem statement", "Analyse cost-benefit"] },
        { ask: "Please also add the alternatives analysis and key risks section", steps: ["Assess risks", "Draft proposal"] }
      ]
    },
    title: { zh: "統一專案管理工具導入商業提案", cn: "统一项目管理工具引入商业方案", en: "Business Case: Unified Project Management Tool Deployment" },
    data: {
      zh: {
        head: ["提案章節", "關鍵論點", "目前缺口", "風險"],
        rows: [
          ["問題敘述", "工具分散造成資訊不同步與協作重工", "效率損失規模難以量化，建議補充基準數據", "h"],
          ["解決方案", "導入統一平台，整合跨部門任務與進度追蹤", "平台選型需進一步評估比較", "m"],
          ["成本效益", "長期人力節省預期可回收導入成本（具體數字待確認）", "財務估算目前為待確認狀態", "m"],
          ["時程規劃", "三階段：試點（2部門）→ 推廣 → 優化，總計六個月", "試點部門尚未指定", "l"],
          ["替代方案", "維持現況或採輕量工具；風險為協作瓶頸持續存在", "替代方案總擁有成本仍需補充", "h"]
        ]
      },
      cn: {
        head: ["方案章节", "关键论点", "当前缺口", "风险"],
        rows: [
          ["问题陈述", "工具分散导致信息不同步、协作重复劳动", "效率损失的规模难以量化，建议补充基准数据", "h"],
          ["解决方案", "引入统一平台，打通跨部门任务和进度跟踪", "平台选型还需要进一步评估对比", "m"],
          ["成本效益", "长期节省的人力预计可以收回引入成本（具体数字待确认）", "财务测算目前还是待确认状态", "m"],
          ["时间规划", "分三个阶段：试点（2 个部门）→ 推广 → 优化，总共六个月", "试点部门还没确定", "l"],
          ["替代方案", "维持现状或用轻量工具；风险是协作瓶颈会一直存在", "替代方案的总拥有成本还需要补充", "h"]
        ]
      },
      en: {
        head: ["Proposal Section", "Key Argument", "Current Gap", "Risk"],
        rows: [
          ["Problem Statement", "Fragmented tools cause information misalignment and cross-team rework", "Efficiency loss is hard to quantify without baseline data — recommend adding", "h"],
          ["Proposed Solution", "Deploy a unified platform to integrate cross-team task and progress tracking", "Platform selection requires further comparative evaluation", "m"],
          ["Cost-Benefit", "Long-term labour savings expected to recover deployment cost (specific figures TBD)", "Financial estimates are currently marked TBD", "m"],
          ["Timeline", "Three phases: pilot (2 depts) → rollout → optimise, spanning six months", "Pilot departments not yet designated", "l"],
          ["Alternatives", "Status quo or lightweight tool adoption; risk is continued collaboration bottleneck", "Total cost of ownership for alternatives still needed", "h"]
        ]
      }
    },
    rec: {
      zh: "<b>建議：</b>提案送審前，補上一組真實的基準數字（例如目前每月跨部門溝通的估算工時），商業提案的核准率通常因此顯著提升。",
      cn: "<b>建议：</b>方案送审前，补上一组真实的基准数字（比如目前每月跨部门沟通的估算工时），商业方案的审批通过率通常会因此明显提升。",
      en: "<b>Recommendation:</b> Before submitting, add at least one real baseline figure (e.g., estimated monthly hours lost to cross-team coordination) — business cases with quantified baselines have meaningfully higher approval rates."
    }
  },
  A050: {
    art: "brief",
    turns: {
      zh: [
        { ask: "我有一堆 Q3 核心產品線的相關資料要整理，包括幾封 email 往來、上次會議記錄和一份風險清單，請幫我生成主管簡報", say: "收到！在開始彙整前，請問：這份簡報是為哪個層級的主管準備的——部門主管還是 C-level？以及這次會議最關鍵的待決策事項是什麼？" },
        { ask: "是給事業群 VP，會議的核心是 Q3 進度檢視與資源調配的決策", steps: ["閱讀彙整", "識別主題", "提取決策", "生成簡報"] }
      ],
      cn: [
        {
          ask: "我有一堆 Q3 核心产品线的资料要整理，包括几封 email 往来、上次的会议记录和一份风险清单，帮我生成一份给领导的汇报吧",
          say: "收到！开始汇总之前想先问一下：这份汇报是给哪一层级的领导看的——是部门领导还是 C-level？还有这次会议最关键的待决策事项是什么？"
        },
        { ask: "是给事业群 VP 看的，会议核心是 Q3 进度盘点和资源调配的决策", steps: ["阅读汇总", "识别主题", "提炼决策", "生成汇报"] }
      ],
      en: [
        { ask: "I have a pile of Q3 core product-line materials to consolidate — emails, meeting notes, and a risk register — please generate an executive briefing for me", say: "Got it! Before consolidating, could you confirm: who is this briefing for — a department head or a C-level executive? And what is the single most critical decision that needs to come out of this meeting?" },
        { ask: "It's for a business-unit VP; the meeting's core purpose is a Q3 progress review and resource allocation decision", steps: ["Read & consolidate sources", "Identify key themes", "Extract decisions & risks", "Generate structured briefing"] }
      ]
    },
    title: { zh: "Q3 核心產品線主管簡報", cn: "Q3 核心产品线高管汇报", en: "Q3 Core Product Line Executive Briefing" },
    data: {
      zh: [
        { lv: "m", cat: "執行摘要", tx: "Q3 整體進度落後預定時程，主因為一家關鍵供應商交期延誤；資源調配議題需 VP 於本次會議中拍板決策" },
        { lv: "m", cat: "待決策事項", tx: "①是否啟動備用供應商方案（需評估品質與交期風險）②是否將 A 產品線人力臨時移撥支援 B 產品線" },
        { lv: "n", cat: "資料矛盾", tx: "兩份文件對交期估算有出入（約差一週），建議會前向負責人確認最新數字，避免決策依據不一致" },
        { lv: "n", cat: "建議下一步", tx: "會後三個工作日內，由專案辦公室發出決策記錄並指定各行動項目的負責人與完成期限" }
      ],
      cn: [
        { lv: "m", cat: "执行摘要", tx: "Q3 整体进度落后于原定计划，主要原因是一家关键供应商交期延误；资源调配的问题需要 VP 在本次会议上拍板决定" },
        { lv: "m", cat: "待决策事项", tx: "①是否启用备用供应商方案（需要评估质量和交期风险）②是否把 A 产品线的人手临时调去支援 B 产品线" },
        { lv: "n", cat: "数据冲突", tx: "两份文档对交期的估算有出入（差不多差一周），建议会前找负责人确认一下最新数字，避免决策依据对不上" },
        { lv: "n", cat: "建议的下一步", tx: "会后三个工作日内，由项目办公室（PMO）发出决策记录，并明确每个行动项的负责人和完成时间" }
      ],
      en: [
        { lv: "m", cat: "Executive Summary", tx: "Q3 overall progress is behind schedule, primarily due to a key supplier delivery delay; resource reallocation requires VP sign-off at this meeting" },
        { lv: "m", cat: "Decisions Required", tx: "① Whether to activate the backup supplier plan (quality and lead-time risks to be assessed) ② Whether to temporarily redeploy Product Line A headcount to support Product Line B" },
        { lv: "n", cat: "Data Conflict", tx: "Two documents contain conflicting lead-time estimates (approximately one week apart) — recommend confirming the latest figure with the owner before the meeting to ensure aligned decisions" },
        { lv: "n", cat: "Next Steps", tx: "Within three business days post-meeting, the PMO should issue a decision record with named owners and deadlines for all action items" }
      ]
    },
    rec: {
      zh: "<b>建議：</b>主管簡報的價值在於「讓決策者在 30 秒內掌握決策依據」——若本份簡報超過一頁 A4，建議回頭刪減背景說明，保留關鍵事實與決策選項。",
      cn: "<b>建议：</b>高管汇报的价值在于“让决策者在 30 秒内抓住决策依据”——如果这份汇报超过一页 A4，建议回头删掉一些背景介绍，只保留关键事实和决策选项。",
      en: "<b>Recommendation:</b> The value of an executive briefing lies in letting decision-makers grasp the essentials in 30 seconds — if this briefing exceeds one A4 page, trim background context and keep only critical facts and decision options."
    }
  },

A004: {
    art: "table",
    turns: {
      zh: [
        { ask: "我需要為一個雲端資料庫遷移專案撰寫 SoW，請問你可以協助嗎？", say: "當然可以！在開始起草之前，讓我先了解幾個關鍵細節：這個專案的主要交付物是什麼？預計時程與驗收標準為何？是否有需要遵循的現有範本或格式？" },
        { ask: "交付物包括遷移計畫書、測試報告和上線驗收文件。時程 12 週，Q3 前上線，沒有特定範本。", say: "了解，最後確認一點：這份 SoW 是簽給內部團隊還是外部廠商？這會影響責任歸屬與變更管理條款的撰寫方式。", steps: ["解析專案範疇與交付物清單", "確認時程與關鍵里程碑節點"] },
        { ask: "是外部廠商，需要正式的責任條款。", steps: ["套用外部合約語氣與責任歸屬格式", "產出 SoW 條款結構表"] }
      ],
      cn: [
        {
          ask: "我要给一个云数据库迁移项目写一份 SoW，你能帮忙吗？",
          say: "当然可以！开始起草之前，我先了解几个关键点：这个项目的主要交付物是什么？预计的时间安排和验收标准是怎样的？有没有需要沿用的现成模板或格式？"
        },
        {
          ask: "交付物包括迁移方案书、测试报告和上线验收文档。周期 12 周，Q3 前上线，没有特定模板。",
          say: "明白，最后确认一点：这份 SoW 是签给内部团队还是外部供应商？这会影响责任归属和变更管理条款的写法。",
          steps: ["梳理项目范围与交付物清单", "确认周期与关键里程碑节点"]
        },
        { ask: "是外部供应商，需要正式的责任条款。", steps: ["采用外部合同语气与责任归属格式", "输出 SoW 条款结构表"] }
      ],
      en: [
        { ask: "I need to write an SoW for a cloud database migration project. Can you help?", say: "Absolutely! Before I start drafting, let me clarify a few key details: What are the main deliverables? What is the timeline and acceptance criteria? Do you have an existing template to follow?" },
        { ask: "Deliverables include a migration plan, test report, and go-live acceptance document. 12-week timeline, live before Q3, no specific template.", say: "Got it. One last check: Is this SoW for an internal team or an external vendor? That affects how we frame liability and change-management clauses.", steps: ["Parse project scope and deliverable list", "Confirm timeline and key milestone checkpoints"] },
        { ask: "External vendor — formal liability clauses are required.", steps: ["Apply external contract tone and accountability format", "Generate SoW clause structure table"] }
      ]
    },
    title: { zh: "雲端資料庫遷移 — 工作說明書條款結構", cn: "云数据库迁移 — 工作说明书条款结构", en: "Cloud Database Migration — SoW Clause Structure" },
    data: {
      zh: {
        head: ["SoW 項目", "說明", "負責單位", "優先"],
        rows: [
          ["專案目的", "將本地資料庫完整遷移至雲端平台，確保零資料遺失與服務連續性", "專案發起人 / IT 架構師", "h"],
          ["交付物", "遷移計畫書、UAT 測試報告、上線後 72 小時監控報告及驗收文件", "專案經理 / 廠商", "h"],
          ["時程與里程碑", "12 週執行，含試行驗收（W4）、正式切換（W10）、結案（W12）三個關鍵節點", "PMO", "m"],
          ["變更管理", "任何 scope 變更須書面申請，48 小時內雙方書面確認始生效", "客戶代表 / 廠商 PM", "m"],
          ["驗收標準", "系統連續穩定運行 72 小時且效能指標符合合約規格", "QA 團隊 / 驗收委員會", "l"]
        ]
      },
      cn: {
        head: ["SoW 条目", "说明", "责任方", "优先级"],
        rows: [
          ["项目目的", "将本地数据库完整迁移到云平台，确保零数据丢失和服务连续性", "项目发起人 / IT 架构师", "h"],
          ["交付物", "迁移方案书、UAT 测试报告、上线后 72 小时监控报告及验收文档", "项目经理 / 供应商", "h"],
          ["时间与里程碑", "12 周执行，含试点验收（W4）、正式切换（W10）、结项（W12）三个关键节点", "PMO", "m"],
          ["变更管理", "任何 scope 变更都需书面申请，48 小时内双方书面确认后才生效", "客户代表 / 供应商 PM", "m"],
          ["验收标准", "系统连续稳定运行 72 小时，且性能指标符合合同规格", "QA 团队 / 验收委员会", "l"]
        ]
      },
      en: {
        head: ["SoW Item", "Description", "Responsible Party", "Priority"],
        rows: [
          ["Project Purpose", "Fully migrate on-premise database to cloud with zero data loss and continuous service", "Project Sponsor / IT Architect", "h"],
          ["Deliverables", "Migration plan, UAT report, 72-hour post-go-live monitoring report, and acceptance document", "PM / Vendor", "h"],
          ["Timeline & Milestones", "12-week execution; key milestones: pilot acceptance (W4), cutover (W10), close-out (W12)", "PMO", "m"],
          ["Change Management", "Any scope change requires written request and bilateral written confirmation within 48 hours", "Client Rep / Vendor PM", "m"],
          ["Acceptance Criteria", "System runs stably for 72 continuous hours and performance meets contract specifications", "QA Team / Acceptance Board", "l"]
        ]
      }
    },
    rec: {
      zh: "<b>建議：</b>在簽署前，請法務確認「驗收標準」與「變更管理」條款已明確定義爭議解決機制，以避免後期糾紛。",
      cn: "<b>建议：</b>签署前，请法务确认“验收标准”和“变更管理”条款里已经明确了争议解决机制，避免后期纠纷。",
      en: "<b>Recommendation:</b> Before signing, have legal confirm that the Acceptance Criteria and Change Management clauses include a clear dispute-resolution mechanism to prevent downstream conflicts."
    }
  },
  A008: {
    art: "table",
    turns: {
      zh: [
        { ask: "我們打算把 Exchange 2016 遷移到 Exchange Online，約 3,000 個信箱，Q4 前完成，可以給我一個高層次計畫嗎？", say: "沒問題！先幫我確認幾件事：目前環境是純 on-premise 還是已有混合架構？是否有合規或資料落地的限制？主要利害關係人有沒有已知的排程衝突需要迴避？" },
        { ask: "純 on-premise，沒有特殊合規限制，但 Q3 是業務旺季，那段時間不能大規模遷移。", steps: ["盤點信箱清單與授權需求", "設計試行群組與批次遷移策略", "規劃 Q3 旺季凍結保護窗口", "建立里程碑矩陣與風險對應表"] }
      ],
      cn: [
        {
          ask: "我们打算把 Exchange 2016 迁移到 Exchange Online，大概 3,000 个邮箱，Q4 前完成，能给我一份高层级的计划吗？",
          say: "没问题！先帮我确认几件事：目前环境是纯 on-premise，还是已经有混合架构了？有没有合规或数据本地化方面的限制？主要利益相关方有没有已知的时间冲突需要避开？"
        },
        {
          ask: "全是 on-premise，合规上没啥特殊要求，不过 Q3 是业务旺季，那阵子没法大规模搬。",
          steps: ["盘点邮箱清单与许可需求", "设计试点组与分批迁移策略", "规划 Q3 旺季冻结保护窗口", "搭建里程碑矩阵与风险对应表"]
        }
      ],
      en: [
        { ask: "We are planning to migrate from Exchange 2016 to Exchange Online — about 3,000 mailboxes — and need to finish before Q4. Can you give me a high-level plan?", say: "Sure! Let me confirm a few things first: Is the current environment pure on-premise or already hybrid? Any compliance or data-residency constraints? Are there scheduling conflicts for key stakeholders we need to work around?" },
        { ask: "Pure on-premise, no special compliance needs, but Q3 is peak business season so no large-scale migration during that window.", steps: ["Inventory mailboxes and confirm license requirements", "Design pilot group and batch migration strategy", "Plan Q3 peak-season freeze window", "Build milestone matrix and risk response table"] }
      ]
    },
    title: { zh: "Exchange Online 遷移 — 高層次專案計畫", cn: "Exchange Online 迁移 — 高层级项目计划", en: "Exchange Online Migration — High-Level Project Plan" },
    data: {
      zh: {
        head: ["階段", "主要任務", "關鍵依賴", "風險"],
        rows: [
          ["準備期（W1–W2）", "清點信箱、確認 M365 授權、組建 50 人試行群組", "IT 清單確認完成", "l"],
          ["試行（W3–W4）", "試行組遷移、驗證信件同步與用戶體驗、收集回饋", "DNS 與混合架構設定完成", "m"],
          ["批次遷移（W5–W9，避開 Q3）", "每週遷移約 600 信箱，持續監控同步狀態與可用性", "試行驗收通過", "m"],
          ["最終切換（W10）", "MX 記錄切換至 Exchange Online，舊伺服器轉為唯讀", "Q3 業務高峰期結束", "h"],
          ["收尾（W11–W12）", "舊伺服器下線、文件歸檔、用戶訓練、支援熱線關閉", "所有帳號確認可用", "l"]
        ]
      },
      cn: {
        head: ["阶段", "主要任务", "关键依赖", "风险"],
        rows: [
          ["准备期（W1–W2）", "盘点邮箱、确认 M365 许可、组建 50 人试点组", "IT 清单确认完成", "l"],
          ["试点（W3–W4）", "试点组迁移、验证邮件同步和用户体验、收集反馈", "DNS 与混合架构配置完成", "m"],
          ["分批迁移（W5–W9，避开 Q3）", "每周迁移约 600 个邮箱，持续监控同步状态和可用性", "试点验收通过", "m"],
          ["最终切换（W10）", "MX 记录切到 Exchange Online，旧服务器转为只读", "Q3 业务高峰期结束", "h"],
          ["收尾（W11–W12）", "旧服务器下线、文档归档、用户培训、支持热线关闭", "所有账号确认可用", "l"]
        ]
      },
      en: {
        head: ["Phase", "Key Tasks", "Critical Dependency", "Risk"],
        rows: [
          ["Preparation (W1–W2)", "Inventory mailboxes, confirm M365 licenses, build 50-account pilot group", "IT inventory confirmed", "l"],
          ["Pilot (W3–W4)", "Migrate pilot group, verify mail sync and UX, collect user feedback", "DNS and hybrid config done", "m"],
          ["Batch Migration (W5–W9, skip Q3)", "Migrate ~600 mailboxes per week; monitor sync and availability", "Pilot accepted", "m"],
          ["Final Cutover (W10)", "Switch MX record to Exchange Online; old server set to read-only", "Q3 peak season ended", "h"],
          ["Close-Out (W11–W12)", "Decommission old server, archive docs, user training, close support line", "All accounts verified active", "l"]
        ]
      }
    },
    rec: {
      zh: "<b>建議：</b>將最終切換排在 Q3 旺季結束後的第一個週末，並提前 2 週向全員發出通知，以降低業務衝擊並留出應急緩衝時間。",
      cn: "<b>建议：</b>把最终切换安排在 Q3 旺季结束后的第一个周末，并提前 2 周向全员发通知，既能降低对业务的冲击，也能留出应急缓冲时间。",
      en: "<b>Recommendation:</b> Schedule the final MX cutover for the first weekend after Q3 peak season and send a company-wide notice 2 weeks in advance to minimize business disruption and leave room for contingencies."
    }
  },
  A012: {
    art: "brief",
    turns: {
      zh: [
        { ask: "我上傳了一份策略合作提案，請幫我建議適當的資料分類標籤。", say: "好的，我正在審閱文件。請問你們公司目前使用的是哪一套分類準則？例如公開 ／ 一般 ／ 機密 ／ 高度機密的四層架構，或有其他內部規範？知道框架後，我可以確保建議與你們的政策一致。" },
        { ask: "我們用標準四層分類：公開、一般、機密、高度機密。", steps: ["掃描文件內容，識別敏感資訊類型與分佈", "對照四層分類準則，評估適當層級", "產出分類建議與正式說明理由", "標示需人工複查的模糊段落"] }
      ],
      cn: [
        {
          ask: "我传了一份战略合作提案，帮我看看该打什么数据分类标签比较合适。",
          say: "好的，我先看下这份文件。你们公司现在用的是哪套分类标准？比如公开／一般／机密／高度机密这样的四级体系，还是另有内部规定？知道了框架，我给的建议才能跟你们的制度对上。"
        },
        {
          ask: "我们用标准的四级分类：公开、一般、机密、高度机密。",
          steps: ["扫描文件内容，识别敏感信息类型和分布", "对照四级分类标准，判断合适级别", "输出分类建议和定级理由", "标出需人工复核的模糊段落"]
        }
      ],
      en: [
        { ask: "I have uploaded a strategic partnership proposal. Please recommend an appropriate data classification label.", say: "Sure, I am reviewing the document now. Which classification framework does your organization use — for example, a four-tier system (Public / General / Confidential / Highly Confidential) or something else? Knowing the framework ensures my recommendation aligns with your policy." },
        { ask: "We use the standard four tiers: Public, General, Confidential, and Highly Confidential.", steps: ["Scan document content to identify sensitive information types and distribution", "Map findings against the four-tier classification criteria", "Generate classification recommendation with formal written rationale", "Flag ambiguous sections that require manual review"] }
      ]
    },
    title: { zh: "策略合作提案 — 文件分類建議報告", cn: "战略合作提案 — 文档分类建议报告", en: "Strategic Partnership Proposal — Classification Recommendation" },
    data: {
      zh: [
        { lv: "m", cat: "分類建議", tx: "建議標籤：機密 — 僅限內部存取（Confidential – Internal Use Only），禁止對外分享或公開刊載" },
        { lv: "m", cat: "敏感內容", tx: "文件含未公開合作條款、財務架構草案及商業策略方向，一旦外洩可能影響談判立場" },
        { lv: "n", cat: "分類依據", tx: "文件中多處出現「僅供內部討論」標註，內容類型符合機密層級的核心定義" },
        { lv: "n", cat: "後續行動", tx: "建議在 SharePoint 套用 MIP 機密標籤，並限制文件下載與外部分享權限" }
      ],
      cn: [
        { lv: "m", cat: "分类建议", tx: "建议标签：机密 — 仅限内部访问（Confidential – Internal Use Only），禁止对外分享或公开发布" },
        { lv: "m", cat: "敏感内容", tx: "文件包含未公开的合作条款、财务架构草案和商业战略方向，一旦泄露可能影响谈判地位" },
        { lv: "n", cat: "分类依据", tx: "文件里多处标注“仅供内部讨论”，内容类型符合机密级别的核心定义" },
        { lv: "n", cat: "后续行动", tx: "建议在 SharePoint 上套用 MIP 机密标签，并限制文件的下载和对外分享权限" }
      ],
      en: [
        { lv: "m", cat: "Classification", tx: "Recommended label: Confidential – Internal Use Only. External sharing and public posting are prohibited." },
        { lv: "m", cat: "Sensitive Content", tx: "Document contains undisclosed partnership terms, draft financial structures, and strategic direction that could affect negotiations if leaked." },
        { lv: "n", cat: "Rationale", tx: "Multiple sections are marked 'For Internal Discussion Only,' matching the core definition of the Confidential tier." },
        { lv: "n", cat: "Next Action", tx: "Apply a Confidential MIP label in SharePoint and restrict download and external sharing permissions accordingly." }
      ]
    },
    rec: {
      zh: "<b>建議：</b>套用 MIP 標籤後，通知所有文件共同作者更新各自副本，確保整個文件生命週期的標籤一致性。",
      cn: "<b>建议：</b>套用 MIP 标签后，通知所有协同编辑的同事更新各自的副本，保证整个文件生命周期里标签保持一致。",
      en: "<b>Recommendation:</b> After applying the MIP label, notify all co-authors to update their copies to ensure label consistency throughout the document lifecycle."
    }
  },
  A018: {
    art: "brief",
    turns: {
      zh: [
        { ask: "幫我整理本週 AI 加速器相關半導體產業的最新動向，重點放在 Must-Know 等級的消息。", say: "收到！請讓我先確認幾個偏好：時間範圍要設定幾天？優先讀取英文來源再以繁中摘要，還是直接使用中文來源？另外，是否要排除特定類型的消息，例如純財經股市分析？" },
        { ask: "過去 7 天，英文來源、繁中摘要，排除純財經股市分析。", steps: ["擷取過去 7 天 AI 加速器相關標題與摘要", "依重要性與相關性排序並貼上優先標籤", "過濾純財經內容，保留產業與政策動態", "以繁中重新摘要並標記 Must-Know 等級"] }
      ],
      cn: [
        {
          ask: "帮我梳理下这周 AI 加速器相关半导体行业的最新动向，重点放在 Must-Know 级别的消息。",
          say: "收到！我先跟你确认几个偏好：时间范围设几天？是优先看英文来源再用中文做摘要，还是直接用中文来源？另外，要不要排除某些类型的消息，比如纯财经股市分析？"
        },
        {
          ask: "就近 7 天的，英文来源、出中文摘要，纯财经股市那种分析别放进来。",
          steps: ["抓取过去 7 天 AI 加速器相关的标题和摘要", "按重要性和相关性排序，打上优先级标签", "过滤纯财经内容，保留行业和政策动态", "用中文重新摘要，标注 Must-Know 级别"]
        }
      ],
      en: [
        { ask: "Summarize this week's major industry news on AI accelerators in the semiconductor space, focusing on Must-Know items.", say: "Got it! Let me confirm a few preferences: How many days back should I cover? Do you want English sources summarized in Traditional Chinese, or Chinese sources directly? Should I filter out any content types, such as pure stock and financial analysis?" },
        { ask: "Past 7 days, English sources with Traditional Chinese summaries, and exclude pure financial and stock analysis.", steps: ["Fetch headlines and summaries for AI accelerator topics from past 7 days", "Rank and tag by importance and relevance", "Filter out pure financial content; retain industry and policy dynamics", "Re-summarize in Traditional Chinese and flag Must-Know items"] }
      ]
    },
    title: { zh: "AI 加速器產業週報 — 主管摘要", cn: "AI 加速器行业周报 — 领导摘要", en: "AI Accelerator Industry Weekly — Executive Digest" },
    data: {
      zh: [
        { lv: "m", cat: "供應鏈", tx: "一家大型 GPU 供應商宣布下一代加速器晶片提前量產，下季出貨能見度明顯改善" },
        { lv: "m", cat: "競爭動態", tx: "兩家主要雲端服務商同週各自發布自研 AI 訓練晶片，加速市場去通用 GPU 化趨勢" },
        { lv: "n", cat: "政策法規", tx: "美國出口管制新規草案公告，高階 AI 晶片出口至特定地區將須事前申請許可" },
        { lv: "n", cat: "技術趨勢", tx: "多個研究機構報告指出 3D 封裝技術正成為提升 AI 推論效率的主要路徑之一" }
      ],
      cn: [
        { lv: "m", cat: "供应链", tx: "一家大型 GPU 供应商宣布下一代加速器芯片提前量产，下季度出货可见度明显提升" },
        { lv: "m", cat: "竞争动态", tx: "两家主要云服务商同一周各自发布自研 AI 训练芯片，加速市场去通用 GPU 化的趋势" },
        { lv: "n", cat: "政策法规", tx: "美国出口管制新规草案公布，高端 AI 芯片出口到特定地区需要提前申请许可" },
        { lv: "n", cat: "技术趋势", tx: "多家研究机构报告指出，3D 封装技术正成为提升 AI 推理效率的主要路径之一" }
      ],
      en: [
        { lv: "m", cat: "Supply Chain", tx: "A major GPU supplier announced early mass production of its next-gen accelerator chip, with notably improved next-quarter shipment visibility." },
        { lv: "m", cat: "Competition", tx: "Two leading cloud providers each launched proprietary AI training chips in the same week, accelerating the shift away from general-purpose GPUs." },
        { lv: "n", cat: "Regulation", tx: "A new US export control draft rule was published, requiring prior authorization for high-end AI chips shipped to certain regions." },
        { lv: "n", cat: "Tech Trends", tx: "Multiple research institutes identified 3D packaging as a primary path to improving AI inference efficiency at scale." }
      ]
    },
    rec: {
      zh: "<b>建議：</b>針對出口管制草案設定每週追蹤提醒，並請法務團隊評估對現有採購合約的潛在影響，在草案正式生效前完成因應評估。",
      cn: "<b>建议：</b>针对出口管制草案设置每周跟踪提醒，让法务团队评估一下对现有采购合同的潜在影响，赶在草案正式生效前把应对方案做出来。",
      en: "<b>Recommendation:</b> Set a weekly tracking alert for the export control draft rule and ask the legal team to assess its potential impact on existing procurement contracts before the rule takes effect."
    }
  },
  A022: {
    art: "table",
    turns: {
      zh: [
        { ask: "我需要在三個雲端遷移方案之間做選擇，評估標準是總持有成本、技術支援品質和導入速度，可以幫我用 MCDA 分析嗎？", say: "可以，我們來做一個有結構的多標準決策分析。先問你一個關鍵問題：這三個標準的相對重要性如何排序？成本、技術支援、速度，哪個對你的決定影響最大？知道權重之後，分析結果會更貼近你的實際需求。" },
        { ask: "成本最重要（40%），技術支援其次（35%），速度最不重要（25%）。另外我想加入第四個選項：維持現況。", say: "好，維持現況是很有價值的對照基準，能讓變革的理由更加清晰。我會依你設定的權重為四個選項逐一評分，以表格呈現加權結果。", steps: ["為四個選項設定評分量表並逐一評分", "依三項標準加權計算並排名"] },
        { ask: "好，請開始分析。", steps: ["計算加權總分，確認各選項排名", "產出 MCDA 比較表與決策建議"] }
      ],
      cn: [
        {
          ask: "我要在三个上云迁移方案里做选择，评估标准是总持有成本、技术支持质量和落地速度，能帮我用 MCDA 做个分析吗？",
          say: "可以，我们来做一个结构化的多标准决策分析。先问你一个关键问题：这三个标准的重要性怎么排？成本、技术支持、速度，哪个对你的决策影响最大？知道了权重，分析结果才能更贴合你的实际需求。"
        },
        {
          ask: "成本最重要（40%），技术支持其次（35%），速度最次（25%）。另外我想再加一个选项：维持现状。",
          say: "好，维持现状是个很有价值的对照基准，能让变革的理由更清楚。我会按你定的权重给四个选项逐一打分，用表格把加权结果呈现出来。",
          steps: ["为四个选项设定评分量表并逐一打分", "按三项标准加权计算并排名"]
        },
        { ask: "好，那开始吧。", steps: ["计算加权总分，确认各选项排名", "输出 MCDA 对比表和决策建议"] }
      ],
      en: [
        { ask: "I need to choose between three cloud migration options based on total cost of ownership, technical support quality, and deployment speed. Can you run an MCDA analysis for me?", say: "Sure, let us run a structured multi-criteria decision analysis. One key question first: how would you rank the relative importance of the three criteria — cost, support, and speed? Knowing the weights will make the results much more aligned with your actual priorities." },
        { ask: "Cost is most important (40%), technical support second (35%), speed least important (25%). I also want to add a fourth option: do nothing.", say: "Great — 'do nothing' is a valuable benchmark that sharpens the justification for any change. I will score all four options against your weighted criteria and present the results in a table.", steps: ["Define scoring scale for all four options and score each criterion", "Apply weighted calculation and rank all options"] },
        { ask: "Good, please go ahead.", steps: ["Confirm weighted totals and rankings", "Generate MCDA comparison table with decision recommendation"] }
      ]
    },
    title: { zh: "雲端遷移方案 — MCDA 多標準決策分析", cn: "云迁移方案 — MCDA 多标准决策分析", en: "Cloud Migration Options — MCDA Decision Analysis" },
    data: {
      zh: {
        head: ["選項", "成本（40%）", "技術支援（35%）", "建議"],
        rows: [
          ["方案 A：本地整合商", "月費最低，初期成本可控，自行維護", "全天候中文服務，熟悉企業環境，回應快", "h"],
          ["方案 B：大型公有雲", "彈性計費，長期規模成本明顯偏高", "全球 SLA 完善，中文技術窗口有限", "m"],
          ["方案 C：混合架構", "前期建置投入最高，長期保留彈性空間", "支援模式客製彈性大，服務窗口需協商", "m"],
          ["方案 D：維持現況", "無遷移費用，但技術債持續累積且合約即將到期", "現有支援品質參差，無升級路徑", "l"]
        ]
      },
      cn: {
        head: ["选项", "成本（40%）", "技术支持（35%）", "建议"],
        rows: [
          ["方案 A：本地集成商", "月费最低，初期成本可控，自己运维", "7×24 中文服务，熟悉企业环境，响应快", "h"],
          ["方案 B：大型公有云", "弹性计费，长期规模上成本明显偏高", "全球 SLA 完善，中文技术对接窗口有限", "m"],
          ["方案 C：混合架构", "前期建设投入最高，长期保留弹性空间", "支持模式定制灵活，服务窗口需要谈", "m"],
          ["方案 D：维持现状", "没有迁移费用，但技术债持续累积，而且合同快到期了", "现有支持质量参差不齐，没有升级路径", "l"]
        ]
      },
      en: {
        head: ["Option", "Cost (40%)", "Tech Support (35%)", "Rec."],
        rows: [
          ["Option A: Local Integrator", "Lowest monthly fee, manageable upfront cost, self-maintained", "24/7 Chinese support, familiar enterprise environment, fast response", "h"],
          ["Option B: Major Public Cloud", "Flexible billing, but significantly higher cost at scale over time", "Strong global SLA, but Chinese technical support window is limited", "m"],
          ["Option C: Hybrid Architecture", "Highest upfront build cost, but long-term flexibility potential", "Highly customizable support model; service window requires negotiation", "m"],
          ["Option D: Do Nothing", "No migration cost, but technical debt keeps growing and contract renewal is imminent", "Current support quality is uneven with no upgrade path", "l"]
        ]
      }
    },
    rec: {
      zh: "<b>建議：</b>依加權分析，方案 A 在最重要的兩個標準上得分最高；建議優先進行方案 A 的試點評估，並要求廠商提供 SLA 草稿供法務審核後再簽約。",
      cn: "<b>建议：</b>从加权结果看，方案 A 在最重要的两个标准上得分最高；建议优先对方案 A 做试点评估，并要求供应商先提供 SLA 草稿，法务审核过再签约。",
      en: "<b>Recommendation:</b> Based on weighted analysis, Option A scores highest on the two most critical criteria. Prioritize a pilot evaluation of Option A and request a draft SLA from the vendor for legal review before committing."
    }
  },
  A026: {
    art: "brief",
    turns: {
      zh: [
        { ask: "幫我檢查這份年度策略目標和各部門執行計畫之間的一致性，我擔心有些地方有落差或矛盾。", say: "好的，這正是我擅長的！請把你想分析的內容貼進來——目標陳述、計畫摘要、任何格式都可以。貼上後，我會掃描矛盾、落差與隱性依賴，並以結構化方式呈現發現。" },
        { ask: "（貼上年度 OKR 與三個部門執行計畫摘要）", steps: ["解析頂層目標與各部門計畫的關鍵詞與邏輯結構", "比對目標陳述與執行步驟的因果連結", "識別矛盾點、落差與未被承認的跨部門依賴", "產出對齊落差分析摘要與優化建議"] }
      ],
      cn: [
        {
          ask: "帮我看看这份年度战略目标和各部门执行计划之间对不对得上，我担心有些地方有落差或者矛盾。",
          say: "好的，这正好是我擅长的！把你要分析的内容粘进来就行——目标陈述、计划摘要，什么格式都可以。粘贴之后，我会扫描其中的矛盾、落差和隐性依赖，再用结构化的方式把发现呈现出来。"
        },
        {
          ask: "（粘贴年度 OKR 和三个部门的执行计划摘要）",
          steps: ["解析顶层目标和各部门计划的关键词与逻辑结构", "比对目标陈述和执行步骤之间的因果关系", "识别矛盾点、落差和没被点明的跨部门依赖", "输出对齐落差分析摘要和优化建议"]
        }
      ],
      en: [
        { ask: "Help me check the alignment between our annual strategic goals and the departmental execution plans — I am worried there are gaps or contradictions.", say: "Perfect, this is exactly what I am designed for. Paste the content you want me to analyze — strategy statements, plan summaries, any format works. I will scan for contradictions, gaps, and hidden dependencies, then present findings in a structured way." },
        { ask: "(Pastes annual OKRs and three departmental execution plan summaries)", steps: ["Parse key terms and logic from top-level goals and each departmental plan", "Map causal links between objectives and execution steps", "Identify contradictions, gaps, and unacknowledged cross-team dependencies", "Generate coherence gap analysis summary with improvement recommendations"] }
      ]
    },
    title: { zh: "策略目標與執行計畫 — 對齊落差分析", cn: "战略目标与执行计划 — 对齐落差分析", en: "Strategy vs. Execution — Coherence Gap Analysis" },
    data: {
      zh: [
        { lv: "m", cat: "矛盾點", tx: "策略目標強調「降低運營成本」，但兩個部門執行計畫同步要求擴編人力，缺乏資源取捨說明與優先序" },
        { lv: "m", cat: "落差", tx: "OKR 設有「客戶滿意度達 90%」目標，但所有執行計畫中均無對應的 CSAT 量測機制或明確負責單位" },
        { lv: "n", cat: "隱性依賴", tx: "Q3 產品上線里程碑依賴跨部門 API 整合，但計畫中未列出技術窗口、確認時程或升級路徑" },
        { lv: "n", cat: "優化建議", tx: "建議在各執行計畫中增加「策略連結欄」，明確標示每項行動對應的頂層 OKR，以利跨部門審查" }
      ],
      cn: [
        { lv: "m", cat: "矛盾点", tx: "战略目标强调“降低运营成本”，但有两个部门的执行计划同时要求扩编人力，缺少资源取舍的说明和优先级" },
        { lv: "m", cat: "落差", tx: "OKR 里定了“客户满意度达 90%”的目标，但所有执行计划都没有对应的 CSAT 衡量机制，也没有明确的负责部门" },
        { lv: "n", cat: "隐性依赖", tx: "Q3 产品上线里程碑依赖跨部门的 API 集成，但计划里没列出技术对接窗口、确认排期和升级路径" },
        { lv: "n", cat: "优化建议", tx: "建议在每份执行计划里加一列“战略关联”，明确标出每项行动对应的顶层 OKR，方便跨部门审查" }
      ],
      en: [
        { lv: "m", cat: "Contradiction", tx: "The strategy emphasizes 'reduce operating costs,' but two departmental plans simultaneously request headcount increases, with no trade-off rationale or resource priority order." },
        { lv: "m", cat: "Gap", tx: "OKRs include a '90% customer satisfaction' target, but none of the execution plans define a CSAT measurement mechanism or assign ownership." },
        { lv: "n", cat: "Dependency", tx: "The Q3 product launch milestone depends on cross-team API integration, but no technical contacts, confirmation timeline, or escalation path are listed in any plan." },
        { lv: "n", cat: "Improvement", tx: "Recommend adding a 'Strategy Link' column to each execution plan to explicitly map every action to a top-level OKR, enabling cleaner cross-team reviews." }
      ]
    },
    rec: {
      zh: "<b>建議：</b>優先解決成本目標與人力擴編的矛盾——在下次季度檢視前，請各部門主管書面說明資源來源，避免策略承諾無法兌現。",
      cn: "<b>建议：</b>优先解决降本目标和扩编人力之间的矛盾——在下次季度复盘前，让各部门领导书面说明资源从哪来，别让战略承诺最后兑现不了。",
      en: "<b>Recommendation:</b> Address the cost-vs-headcount contradiction first — before the next quarterly review, ask each department head to provide a written statement on resource sourcing to prevent strategy commitments from going unfulfilled."
    }
  },
  A030: {
    art: "brief",
    turns: {
      zh: [
        { ask: "我想為同事 Wei-Chen 撰寫一段績效回饋，他在這次產品上市中負責跨部門協調，請你幫我。", say: "很樂意幫你！讓我先多了解一些：你想給予的是正面肯定、建設性建議，還是兩者兼具？另外，有沒有 1–2 個具體行為或成果讓你印象最深刻，可以分享給我？" },
        { ask: "兩者兼具。他的跨部門整合能力讓產品準時上市，但溝通步調有點快，其他人常常跟不上。", say: "感謝，這些細節非常有幫助。關於步調偏快這點，我建議以「行為影響」而非「性格評判」的方式表達，這樣更容易被接受，同時也保留你對他的正面肯定。我來起草一份平衡的回饋訊息。", steps: ["整合正向行為描述與具體成果說明", "以行為影響框架改寫成長建議"] },
        { ask: "好，請產出完整的回饋稿。", steps: ["加入鼓勵性收尾，強化訊息溫度", "輸出完整四段結構化回饋文字"] }
      ],
      cn: [
        {
          ask: "我想给同事 Wei-Chen 写一段绩效反馈，这次产品上市是他负责跨部门协调的，帮我一下。",
          say: "很乐意帮你！我先多了解一下：你想给的是正面肯定、建设性建议，还是两者都要？另外，有没有 1–2 个让你印象最深的具体行为或成果，能说给我听？"
        },
        {
          ask: "两者都要。他的跨部门整合能力让产品按时上市，但沟通节奏有点快，别人经常跟不上。",
          say: "谢谢，这些细节很有用。关于节奏偏快这点，我建议按“行为影响”而不是“性格评判”来表达，这样对方更容易接受，同时也保留你对他的正面肯定。我来起草一份平衡一些的反馈。",
          steps: ["整合正向行为描述和具体成果说明", "用行为影响框架改写成长建议"]
        },
        { ask: "好，出一份完整的反馈稿吧。", steps: ["加上鼓励性的结尾，让语气更有温度", "输出完整的四段结构化反馈"] }
      ],
      en: [
        { ask: "I want to write a performance review for my colleague Wei-Chen, who led cross-team coordination during our product launch. Can you help?", say: "Happy to help! A few quick questions: Is this positive recognition, constructive feedback, or both? And can you share 1–2 specific behaviors or outcomes that stood out most to you?" },
        { ask: "Both. His cross-team integration made the product launch happen on time, but his communication pace was too fast and others often struggled to keep up.", say: "Very useful context. For the fast-pace issue, I would suggest framing it as 'behavioral impact' rather than a character judgment — it is better received while still being honest. Let me draft a balanced feedback message.", steps: ["Combine positive behavioral description with concrete outcome evidence", "Reframe growth suggestion using a behavioral-impact lens"] },
        { ask: "Great, please generate the full feedback draft.", steps: ["Add an encouraging close to strengthen message warmth", "Output a complete four-section structured feedback text"] }
      ]
    },
    title: { zh: "同儕績效回饋 — Wei-Chen，產品上市跨部門協調", cn: "同事绩效反馈 — Wei-Chen，产品上市跨部门协调", en: "Peer Performance Feedback — Wei-Chen, Product Launch Coordination" },
    data: {
      zh: [
        { lv: "m", cat: "正面肯定", tx: "Wei-Chen 在產品上市期間展現出卓越的跨部門協調能力，有效整合工程、行銷與客服三個團隊的資源，確保專案如期完成" },
        { lv: "m", cat: "成長建議", tx: "建議在重要進度節點後安排 5 分鐘快速確認，讓不同步調的夥伴也能保持對齊，避免資訊落差擴大" },
        { lv: "n", cat: "影響說明", tx: "此次準時上市是難得的里程碑，Wei-Chen 的主動推進與問題預判是團隊能達成目標的關鍵因素之一" },
        { lv: "n", cat: "語氣建議", tx: "建議在書面回饋最後加入一句期待未來合作的話，例如「期待與你在下個專案中再度攜手」，讓訊息更有溫度" }
      ],
      cn: [
        { lv: "m", cat: "正面肯定", tx: "Wei-Chen 在产品上市期间展现出出色的跨部门协调能力，有效整合了工程、市场和客服三个团队的资源，保证项目如期完成" },
        { lv: "m", cat: "成长建议", tx: "建议在关键进度节点后安排 5 分钟快速对齐，让节奏不同的同事也能跟上，避免信息差越拉越大" },
        { lv: "n", cat: "影响说明", tx: "这次按时上市是难得的里程碑，Wei-Chen 的主动推进和对问题的提前预判，是团队能达成目标的关键因素之一" },
        { lv: "n", cat: "语气建议", tx: "建议在书面反馈的最后加一句期待以后合作的话，比如“期待下个项目里再跟你搭档”，让整段话更有温度" }
      ],
      en: [
        { lv: "m", cat: "Strengths", tx: "Wei-Chen demonstrated exceptional cross-functional coordination during the product launch, effectively aligning Engineering, Marketing, and Customer Success to deliver on time." },
        { lv: "m", cat: "Growth Area", tx: "Consider scheduling brief 5-minute check-ins after key milestones to help teammates with different working paces stay aligned and reduce information gaps." },
        { lv: "n", cat: "Impact", tx: "Delivering on time was a rare milestone, and Wei-Chen's proactive follow-through and early problem detection were key reasons the team reached its goal." },
        { lv: "n", cat: "Tone Tip", tx: "End the written feedback with a forward-looking note, such as 'Looking forward to collaborating again on the next project,' to add warmth and strengthen the relationship." }
      ]
    },
    rec: {
      zh: "<b>建議：</b>將這段回饋同步分享至 Viva Engage 的讚美貼文，讓 Wei-Chen 的主管也能看見，增加正向肯定的組織能見度。",
      cn: "<b>建议：</b>把这段反馈同步发到 Viva Engage 的表扬帖里，让 Wei-Chen 的领导也能看到，提高这份正向肯定在组织内的曝光度。",
      en: "<b>Recommendation:</b> Share this feedback as a Viva Engage praise post so Wei-Chen's manager can also see it, increasing the organizational visibility of the recognition."
    }
  },
  A034: {
    art: "table",
    turns: {
      zh: [
        { ask: "協助我為「提升全員 AI 生產力」這個主題草擬 Q1 OKR，目標對象是全公司。", say: "好的，我們來把這個主題轉化成結構嚴謹的 OKR！先問幾個問題：目前有沒有 AI 工具使用率或生產力的基準數據？你希望 Q1 結束時，最明顯的改變是什麼——工具滲透率、節省工時，還是員工自述的能力提升？" },
        { ask: "目前 Copilot 使用率約 40%，希望 Q1 末提升到 70%；也希望收集至少 50 個員工自述的節省工時案例。", steps: ["定義質化 Objective 陳述，確保激勵性與方向性", "草擬 3 個可量化 KR，含基準值與目標值", "設計對應行動方案與跨部門相依關係", "產出 OKR 完整結構表與一致性檢查"] }
      ],
      cn: [
        {
          ask: "帮我给“提升全员 AI 生产力”这个主题草拟一份 Q1 OKR，面向的是全公司。",
          say: "好的，我们把这个主题拆成一份结构严谨的 OKR！先问几个问题：现在有没有 AI 工具使用率或者生产力方面的基线数据？你希望 Q1 结束时最明显的变化是什么——工具渗透率、节省的工时，还是员工自己反馈的能力提升？"
        },
        {
          ask: "现在 Copilot 使用率大概 40%，希望 Q1 末提到 70%；还想收集至少 50 个员工自己反馈的节省工时案例。",
          steps: [
            "定义定性的 Objective 陈述，保证有激励性也有方向感",
            "草拟 3 个可量化的 KR，包含基线值和目标值",
            "设计对应的行动方案和跨部门依赖关系",
            "输出完整的 OKR 结构表并做一致性检查"
          ]
        }
      ],
      en: [
        { ask: "Help me draft Q1 OKRs for the theme 'improving company-wide AI productivity' — targeting all employees.", say: "Great, let us turn that theme into a rigorously structured OKR. A few baseline questions: Do you have any current data on AI tool adoption or productivity? When Q1 ends, what is the most important visible change — tool penetration rate, hours saved, or self-reported capability improvement?" },
        { ask: "Current Copilot adoption is around 40%; the goal is to reach 70% by end of Q1. We also want to collect at least 50 employee-reported time-saving examples.", steps: ["Define a qualitative Objective statement that is inspiring and directional", "Draft 3 measurable KRs with baseline and target values", "Design corresponding action plans and cross-team dependencies", "Generate complete OKR structure table with coherence check"] }
      ]
    },
    title: { zh: "Q1 OKR — 全員 AI 生產力提升計畫", cn: "Q1 OKR — 全员 AI 生产力提升计划", en: "Q1 OKR — Company-Wide AI Productivity Initiative" },
    data: {
      zh: {
        head: ["OKR 項目", "內容", "衡量方式", "優先"],
        rows: [
          ["Objective", "在 Q1 末讓全員 AI 工具的深度運用成為日常工作習慣，成為數位優先工作文化的起點", "定性目標陳述", "h"],
          ["KR1", "全員每月主動使用 Copilot 功能的比例從 40% 提升至 70%", "M365 管理員儀表板月活躍用戶數", "h"],
          ["KR2", "完成 4 場部門 AI 應用工作坊，平均出席率達 85% 以上", "出席記錄 / Teams 會議報告", "m"],
          ["KR3", "收集 50 份員工自述「AI 節省工時」或「品質提升」的具體案例", "Viva Engage 貼文或表單提交數", "m"],
          ["行動方案", "安排部門工作坊（→KR2）；建立 Viva Engage 社群蒐集案例（→KR3）；設計主管帶頭示範計畫（→KR1）", "執行進度追蹤", "l"]
        ]
      },
      cn: {
        head: ["OKR 项目", "内容", "衡量方式", "优先级"],
        rows: [
          ["Objective", "让全员在 Q1 末把 AI 工具的深度使用变成日常工作习惯，作为数字优先工作文化的起点", "定性目标陈述", "h"],
          ["KR1", "全员每月主动使用 Copilot 功能的比例从 40% 提升到 70%", "M365 管理员仪表盘月活跃用户数", "h"],
          ["KR2", "完成 4 场部门 AI 应用工作坊，平均出席率达 85% 以上", "签到记录 / Teams 会议报告", "m"],
          ["KR3", "收集 50 份员工自己反馈“AI 节省工时”或“质量提升”的具体案例", "Viva Engage 帖子或表单提交数", "m"],
          ["行动方案", "安排部门工作坊（→KR2）；搭建 Viva Engage 社区收集案例（→KR3）；设计领导带头示范计划（→KR1）", "执行进度跟踪", "l"]
        ]
      },
      en: {
        head: ["OKR Item", "Content", "Measurement", "Priority"],
        rows: [
          ["Objective", "By end of Q1, make deep daily use of AI tools a default habit for all employees, establishing the foundation of a digital-first work culture", "Qualitative objective statement", "h"],
          ["KR1", "Increase the share of employees actively using Copilot monthly from 40% to 70%", "M365 Admin Dashboard monthly active users", "h"],
          ["KR2", "Complete 4 departmental AI workshops with average attendance above 85%", "Attendance records / Teams meeting reports", "m"],
          ["KR3", "Collect 50 employee-reported 'time saved' or 'quality improved' use cases", "Viva Engage posts or form submissions", "m"],
          ["Action Plans", "Organize departmental workshops (→KR2); Build Viva Engage community for case sharing (→KR3); Design manager-led adoption showcase (→KR1)", "Execution progress tracking", "l"]
        ]
      }
    },
    rec: {
      zh: "<b>建議：</b>在 Copilot Dashboard 設定每週使用率提醒，若第 4 週仍低於 55%，立即啟動主管帶頭示範計畫，以避免 KR1 在季末才發現追不上。",
      cn: "<b>建议：</b>在 Copilot Dashboard 里设置每周使用率提醒，如果到第 4 周还低于 55%，就马上启动领导带头示范计划，免得 KR1 拖到季末才发现赶不上。",
      en: "<b>Recommendation:</b> Set a weekly adoption alert in Copilot Dashboard; if usage is still below 55% by Week 4, activate the manager-led showcase plan immediately to avoid discovering the KR1 shortfall only at quarter-end."
    }
  },
  A039: {
    art: "table",
    turns: {
      zh: [
        { ask: "我需要為跨 12 個國家的 ERP 系統導入規劃一份變革計畫，可以用 Why/What/Who/How/When 框架幫我嗎？", say: "可以，這個框架非常適合跨國大型變革！在開始之前，請告訴我：目前對這次導入抵制最大的利害關係人群體是哪些？以及，有沒有不可動的凍結期或截止日期？這兩個因素會大幅影響我的推進策略建議。" },
        { ask: "財務和倉管部門抵制最大，因為工作流程改變幅度最大。Q4 是業務高峰，那段時間不能大幅異動。", say: "了解。財務和倉管的抵制通常源於「我會失去什麼？」的恐懼，建議在 Who 階段優先安排與這兩個群體的一對一溝通。Q4 凍結是合理的設計，我會將它納入時程。", steps: ["建立 Why 敘事，梳理變革必要性與緊迫感", "識別高阻力群體與對應的溝通破冰策略"] },
        { ask: "好，請產出完整的五維變革計畫表。", steps: ["設計試行國家選擇邏輯與分批推行策略", "產出 Why/What/Who/How/When 五維計畫表"] }
      ],
      cn: [
        {
          ask: "我要为横跨 12 个国家的 ERP 系统上线规划一份变革计划，能用 Why/What/Who/How/When 框架帮我吗？",
          say: "可以，这个框架特别适合跨国的大型变革！开始之前先告诉我：目前对这次上线抵触最大的利益相关方是哪些群体？还有，有没有不能动的冻结期或者截止日期？这两个因素会很大程度上影响我给的推进策略。"
        },
        {
          ask: "财务和仓储部门抵触最大，因为工作流程变动最大。Q4 是业务高峰，那段时间不能大动。",
          say: "了解。财务和仓储的抵触通常来自“我会失去什么？”的担忧，建议在 Who 阶段优先安排跟这两个群体的一对一沟通。Q4 冻结这个安排很合理，我会把它排进时间表。",
          steps: ["搭建 Why 叙事，梳理变革的必要性和紧迫感", "识别高阻力群体和对应的沟通破冰策略"]
        },
        { ask: "好，出一份完整的五维变革计划表吧。", steps: ["设计试点国家的选择逻辑和分批推行策略", "输出 Why/What/Who/How/When 五维计划表"] }
      ],
      en: [
        { ask: "I need to plan a change initiative for an ERP rollout across 12 countries. Can you help me use the Why/What/Who/How/When framework?", say: "Absolutely — this framework is well-suited for large cross-border change! Before we start: which stakeholder group is showing the most resistance? And are there any hard freeze periods or immovable deadlines? Both factors significantly shape the rollout strategy." },
        { ask: "Finance and warehouse teams are most resistant because their workflows change the most. Q4 is peak season, so no major changes during that window.", say: "Understood. Finance and warehouse resistance usually comes from 'what will I lose?' fears — I recommend prioritizing 1:1 conversations with these groups in the Who stage. The Q4 freeze is a sound design choice and I will build it into the timeline.", steps: ["Frame the Why narrative to establish change urgency and rationale", "Identify high-resistance groups and tailored communication strategies"] },
        { ask: "Great, please generate the full five-dimension change plan table.", steps: ["Design pilot country selection logic and phased rollout strategy", "Output the Why/What/Who/How/When five-dimension change plan table"] }
      ]
    },
    title: { zh: "跨國 ERP 導入 — 五維變革推進計畫", cn: "跨国 ERP 上线 — 五维变革推进计划", en: "Cross-Border ERP Rollout — Five-Dimension Change Plan" },
    data: {
      zh: {
        head: ["框架維度", "核心問題", "計畫內容", "優先"],
        rows: [
          ["Why（變革理由）", "為何現在？為何是這個方向？", "舊系統維護成本持續攀升，已無法支撐跨國業務整合需求，新 ERP 是當務之急", "h"],
          ["What（變革內容）", "哪些流程和工具將改變？", "財務、採購、倉儲三大模組全面切換；舊報表格式與手動審批流程同步停用", "h"],
          ["Who（影響對象）", "誰受影響？誰是盟友？誰是阻力？", "財務與倉管受衝擊最大，需優先溝通；IT 與 PMO 為關鍵盟友，高層背書不可或缺", "m"],
          ["How（推進方式）", "溝通、培訓、試點策略為何？", "選擇 2 個國家先行試點，收集回饋後分批推行；每月舉辦跨國 Q&A 視訊會議", "m"],
          ["When（時程）", "里程碑與保護期如何設定？", "Q1 試點、Q2–Q3 分批推行、Q4 凍結（業務高峰）、Q4 末舊系統下線", "l"]
        ]
      },
      cn: {
        head: ["框架维度", "核心问题", "计划内容", "优先级"],
        rows: [
          ["Why（变革理由）", "为什么是现在？为什么是这个方向？", "旧系统的维护成本一直在涨，已经撑不起跨国业务的整合需求，上新 ERP 是当务之急", "h"],
          ["What（变革内容）", "哪些流程和工具会变？", "财务、采购、仓储三大模块全面切换；旧的报表格式和手工审批流程同步停用", "h"],
          ["Who（影响对象）", "谁受影响？谁是盟友？谁是阻力？", "财务和仓储受冲击最大，要优先沟通；IT 和 PMO 是关键盟友，高层背书必不可少", "m"],
          ["How（推进方式）", "沟通、培训、试点策略是什么？", "先选 2 个国家做试点，收集反馈后再分批推行；每月开一次跨国 Q&A 视频会议", "m"],
          ["When（时间安排）", "里程碑和保护期怎么定？", "Q1 试点、Q2–Q3 分批推行、Q4 冻结（业务高峰）、Q4 末旧系统下线", "l"]
        ]
      },
      en: {
        head: ["Dimension", "Core Question", "Plan Content", "Priority"],
        rows: [
          ["Why (Rationale)", "Why now? Why this direction?", "Legacy system maintenance costs keep rising and can no longer support cross-border integration — the new ERP is a strategic necessity", "h"],
          ["What (Scope)", "What processes and tools will change?", "Full cutover for Finance, Procurement, and Warehouse modules; legacy report formats and manual approval flows will be retired", "h"],
          ["Who (Stakeholders)", "Who is affected, who is an ally, who is resistant?", "Finance and warehouse face the biggest impact — prioritize them for 1:1 communication; IT and PMO are key allies; executive sponsorship is essential", "m"],
          ["How (Approach)", "What is the communication, training, and pilot strategy?", "Select 2 countries for a pilot, collect feedback, then roll out in batches; monthly cross-country Q&A video sessions", "m"],
          ["When (Timeline)", "What are the milestones and freeze periods?", "Q1 pilot, Q2–Q3 phased rollout, Q4 freeze (peak season), legacy system retirement at end of Q4", "l"]
        ]
      }
    },
    rec: {
      zh: "<b>建議：</b>試點國家優先選擇語言相近且 IT 資源較充足的市場，確保第一批能累積成功案例與可複製的操作手冊，以降低後續批次的推行阻力。",
      cn: "<b>建议：</b>试点国家优先选语言相近、IT 资源比较充足的市场，保证第一批能攒下成功案例和可复制的操作手册，从而降低后面几批的推行阻力。",
      en: "<b>Recommendation:</b> For pilot country selection, prioritize markets with similar language profiles and stronger IT resources to build early success cases and replicable runbooks, reducing resistance in later rollout batches."
    }
  },
  A043: {
    art: "swot",
    turns: {
      zh: [
        { ask: "我想壓力測試這個想法：每週五寄給全體員工一份由高層策展的內部電子報，目的是提升員工互動感。", say: "好，我不會只是讚美你的計畫。讓我先問你：這個計畫的核心假設是什麼？你認為員工為什麼會讀它？有沒有先問過「我們現在的公司溝通到底哪裡出了問題」這個根本問題？" },
        { ask: "我們假設員工想知道公司動態，但資訊太分散，電子報可以整合這些訊息。", steps: ["解構核心假設，識別隱性前提與未驗證的推論", "預測最挑剔主管會丟出的最難問題清單", "進行 pre-mortem：若計畫失敗，最可能的原因為何？", "以 SWOT 框架產出全面壓力測試報告"] }
      ],
      cn: [
        {
          ask: "我想给这个想法做个压力测试：每周五给全体员工发一份由高层挑选内容的内部邮件周报，目的是提升员工的参与感。",
          say: "好，我不会光夸你的方案。先问你几个问题：这个方案的核心假设是什么？你觉得员工为什么会去读它？有没有先想清楚“我们现在的公司沟通到底哪儿出了问题”这个根本问题？"
        },
        {
          ask: "我们假设员工想了解公司动态，但信息太分散，一份邮件周报可以把这些信息整合起来。",
          steps: [
            "拆解核心假设，识别隐性前提和没验证过的推论",
            "预判最挑剔的领导会抛出的最难问题清单",
            "做一次 pre-mortem：如果方案失败，最可能的原因是什么？",
            "用 SWOT 框架输出一份全面的压力测试报告"
          ]
        }
      ],
      en: [
        { ask: "I want to stress-test this idea: a weekly internal newsletter curated by leadership and sent to all employees every Friday, aimed at boosting employee engagement.", say: "I am not here to tell you it is a great idea. Let me ask first: what is the core assumption behind this plan? Why do you believe employees will read it? Have you asked what is actually broken in your current internal communication?" },
        { ask: "We assume employees want to know what is happening company-wide but the information is too scattered — a newsletter consolidates it.", steps: ["Deconstruct core assumptions and surface hidden premises and unverified inferences", "Generate the toughest objections the most critical executive in the room would raise", "Run a pre-mortem: if this plan fails, what are the most likely causes?", "Present a full stress-test using a SWOT framework"] }
      ]
    },
    title: { zh: "內部電子報計畫 — 全面壓力測試報告", cn: "内部邮件周报方案 — 全面压力测试报告", en: "Internal Newsletter Plan — Full Stress-Test Report" },
    data: {
      zh: {
        S: [
          "高層親自策展，資訊可信度與權威性高",
          "固定週期發送，建立可預期的公司溝通節律",
          "整合分散資訊，有效降低員工的資訊焦慮",
          "無需新工具，直接透過 Outlook 發送，推行阻力最低"
        ],
        W: [
          "每週產製需持續人力投入，易因人員異動或假期中斷",
          "高層偏好不等於員工所需，策展偏差可能導致內容脫節",
          "週五早上收件箱競爭激烈，開信率難以保證",
          "缺乏雙向互動機制，員工無法即時回應或提供反饋"
        ],
        O: [
          "加入互動元素後，可轉型為員工聲音的正式收集管道",
          "與 Viva Engage 整合，可打造社群討論延伸以提升溝通深度",
          "累積訂閱與閱讀數據，可回饋 HR 更精準地了解員工關注議題",
          "可作為新員工融入公司文化的初期資訊資源"
        ],
        T: [
          "內容品質若下滑，反而加劇員工對公司溝通誠意的不信任",
          "若涉及績效、人事等敏感資訊，合規風險需事先評估",
          "員工取消訂閱或直接略過，造成「溝通有效」的假象",
          "與其他內部管道並行運作，電子報可能被邊緣化或資訊稀釋"
        ]
      },
      cn: {
        S: [
          "高层亲自把关内容，信息的可信度和权威性都高",
          "固定周期发送，形成可预期的公司沟通节奏",
          "整合分散的信息，有效缓解员工的信息焦虑",
          "不用上新工具，直接通过 Outlook 发送，推行阻力最小"
        ],
        W: [
          "每周做内容都要持续投入人力，容易因为人员变动或者放假而中断",
          "高层的偏好不等于员工的需求，选题有偏差可能让内容跟实际脱节",
          "周五早上收件箱里各种邮件都在抢注意力，打开率不好保证",
          "缺少双向互动机制，员工没法即时回应或者给出反馈"
        ],
        O: [
          "加入互动元素之后，可以转型成正式收集员工心声的渠道",
          "跟 Viva Engage 打通后，可以延伸出社区讨论，提升沟通的深度",
          "积累订阅和阅读数据，可以反哺 HR，更精准地了解员工关注的话题",
          "可以作为新员工融入公司文化的早期信息来源"
        ],
        T: [
          "内容质量一旦下滑，反而会加剧员工对公司沟通诚意的不信任",
          "如果涉及绩效、人事这类敏感信息，合规风险要提前评估",
          "员工取消订阅或者直接略过，造成“沟通有效”的假象",
          "跟其他内部渠道并行，邮件周报可能被边缘化，信息也被稀释"
        ]
      },
      en: {
        S: [
          "Leadership-curated content carries high credibility and authority",
          "Fixed send cadence builds a predictable communication rhythm",
          "Consolidates scattered information, reducing employee information anxiety",
          "No new tools required — Outlook delivery has the lowest adoption friction"
        ],
        W: [
          "Weekly production requires sustained editorial effort, vulnerable to staff turnover or holidays",
          "Leadership preferences do not equal employee needs — curation bias risks content irrelevance",
          "Friday morning inbox is highly competitive and open rates are hard to guarantee",
          "No two-way interaction mechanism — employees cannot respond or provide real-time feedback"
        ],
        O: [
          "Adding interactive elements could transform it into a formal employee voice channel",
          "Integration with Viva Engage could extend to community discussions, deepening communication",
          "Accumulated readership data can give HR more accurate insight into employee interests",
          "Can serve as an onboarding resource helping new employees absorb company culture"
        ],
        T: [
          "If content quality drops, it may intensify employee distrust of leadership communication sincerity",
          "Compliance risks arise if the newsletter touches sensitive topics like performance or personnel changes",
          "Employees unsubscribing or ignoring it creates a false impression that communication is working",
          "Running parallel to other internal channels may cause the newsletter to be marginalized or diluted"
        ]
      }
    },
    rec: {
      zh: "<b>建議：</b>正式推出前，先用 30 人試讀小組跑三週，測試開信率與內容偏好；若開信率低於 50%，重新評估發送頻率與策展主導權，避免大規模推行後才發現根本假設有誤。",
      cn: "<b>建议：</b>正式上线前，先拉一个 30 人的试读小组跑三周，测一测打开率和内容偏好；如果打开率低于 50%，就重新评估发送频率和选题的主导权，别等大规模推开之后才发现根本假设有问题。",
      en: "<b>Recommendation:</b> Before full launch, run a 30-person reader pilot for three weeks to test open rates and content preferences. If open rates fall below 50%, revisit the send frequency and curation ownership — do not discover the core assumption is flawed only after a company-wide rollout."
    }
  },
  A047: {
    art: "table",
    turns: {
      zh: [
        { ask: "我們新人 IT onboarding 從簽約到拿到全套帳號和設備需要 7 個工作天，我想壓到 2 天，請幫我優化這個流程。", say: "這是個非常清楚的優化目標！在開始規劃前，先問幾個問題：目前 7 天的瓶頸主要在哪個環節——是 HR 到 IT 的交接、設備採購週期，還是帳號審核？另外，你們使用哪些系統管理流程，例如 HR 平台、IT 工單系統？" },
        { ask: "最大瓶頸是 HR 到 IT 的交接，IT 有時根本不知道有新人要報到。設備也常常來不及，新人第一天沒有筆電。我們用 SuccessFactors、ServiceNow 和 Entra ID。", steps: ["盤點現有流程各步驟耗時與責任歸屬", "設計 SuccessFactors → ServiceNow 自動觸發鏈路，消除 HR-IT 交接黑洞", "規劃 Entra ID 帳號預建與設備提前觸發機制", "產出優化後流程結構表（含 Before → After 對比）"] }
      ],
      cn: [
        {
          ask: "我们新人的 IT onboarding 从签合同到拿到全套账号和设备要 7 个工作日，我想压到 2 天，帮我优化下这个流程。",
          say: "这个优化目标很明确！开始规划前先问几个问题：现在 7 天的瓶颈主要卡在哪个环节——是 HR 到 IT 的交接、设备采购周期，还是账号审批？另外，你们用哪些系统来管流程，比如 HR 平台、IT 工单系统？"
        },
        {
          ask: "最大的瓶颈是 HR 到 IT 的交接，IT 有时候根本不知道有新人要入职。设备也经常来不及，新人第一天没有笔记本。我们用 SuccessFactors、ServiceNow 和 Entra ID。",
          steps: [
            "盘点现有流程各步骤的耗时和责任归属",
            "设计 SuccessFactors → ServiceNow 自动触发链路，消除 HR-IT 交接黑洞",
            "规划 Entra ID 账号预建和设备提前触发机制",
            "输出优化后的流程结构表（含 Before → After 对比）"
          ]
        }
      ],
      en: [
        { ask: "Our new employee IT onboarding takes 7 working days from signing to receiving all accounts and equipment. I want to cut it down to 2 days. Can you help optimize this process?", say: "That is a well-defined optimization target! Before I start planning, let me ask: where is the biggest bottleneck in the current 7 days — the HR-to-IT handoff, equipment procurement lead time, or account provisioning approval? Also, which systems are you using to manage the process, such as an HR platform or IT ticketing system?" },
        { ask: "The biggest bottleneck is the HR-to-IT handoff — IT sometimes does not even know a new hire is starting. Equipment is also often late; people sometimes have no laptop on Day 1. We use SuccessFactors, ServiceNow, and Entra ID.", steps: ["Map current process steps with time estimates and ownership", "Design SuccessFactors → ServiceNow auto-trigger chain to eliminate the HR-IT handoff black hole", "Plan Entra ID account pre-provisioning and early equipment trigger mechanism", "Output optimized process structure table with Before → After comparison"] }
      ]
    },
    title: { zh: "新人 IT Onboarding — 優化流程結構表（7 天 → 2 天）", cn: "新人 IT Onboarding — 优化流程结构表（7 天 → 2 天）", en: "New Hire IT Onboarding — Optimized Process Table (7 Days → 2 Days)" },
    data: {
      zh: {
        head: ["流程步驟", "負責單位", "改善重點（Before → After）", "風險"],
        rows: [
          ["錄取後自動觸發入職工作流（D-5）", "SuccessFactors + ServiceNow", "手動通知 → 系統自動建立 ServiceNow 工單並分派至 IT 與總務", "l"],
          ["帳號預建（Entra ID + M365）（D-3）", "IT 自動化腳本", "手動申請審核 → 依職位範本自動建立帳號、信箱與群組權限", "m"],
          ["設備準備（D-3）", "總務 / IT 資產管理", "報到前 1 天備妥 → 提前 5 天觸發，確保設備報到日當天就緒", "h"],
          ["主管確認存取清單（D-1）", "用人主管", "口頭確認 → 主管線上簽核清單，閉環記錄於 ServiceNow", "m"],
          ["新人報到驗收（D0）", "HR + IT + 新人", "紙本交接 → 數位簽核，當日完成閉環確認", "l"]
        ]
      },
      cn: {
        head: ["流程步骤", "负责部门", "改善重点（Before → After）", "风险"],
        rows: [
          ["录用后自动触发入职工作流（D-5）", "SuccessFactors + ServiceNow", "手工通知 → 系统自动创建 ServiceNow 工单并派给 IT 和行政", "l"],
          ["账号预建（Entra ID + M365）（D-3）", "IT 自动化脚本", "手工申请审批 → 按岗位模板自动创建账号、邮箱和群组权限", "m"],
          ["设备准备（D-3）", "行政 / IT 资产管理", "入职前 1 天才备好 → 提前 5 天触发，保证设备在入职当天就位", "h"],
          ["领导确认访问权限清单（D-1）", "用人经理", "口头确认 → 领导线上审批清单，闭环记录在 ServiceNow 里", "m"],
          ["新人入职验收（D0）", "HR + IT + 新人", "纸质交接 → 电子签批，当天完成闭环确认", "l"]
        ]
      },
      en: {
        head: ["Process Step", "Owner", "Improvement (Before → After)", "Risk"],
        rows: [
          ["Auto-trigger onboarding workflow after offer signed (D-5)", "SuccessFactors + ServiceNow", "Manual notification → System auto-creates ServiceNow ticket and assigns to IT and Facilities", "l"],
          ["Pre-provision accounts (Entra ID + M365) (D-3)", "IT automation script", "Manual request and approval → Auto-create accounts, mailbox, and group permissions from role template", "m"],
          ["Equipment preparation (D-3)", "Facilities / IT Asset Mgmt", "Ready 1 day before start → Triggered 5 days early to ensure hardware is ready on Day 1", "h"],
          ["Manager confirms access checklist (D-1)", "Hiring Manager", "Verbal confirmation → Online sign-off checklist with closed-loop record in ServiceNow", "m"],
          ["New hire Day 1 acceptance (D0)", "HR + IT + New Hire", "Paper handoff → Digital sign-off with same-day closed-loop confirmation", "l"]
        ]
      }
    },
    rec: {
      zh: "<b>建議：</b>優先實作 SuccessFactors → ServiceNow 的自動觸發鏈路，這是消除最大瓶頸的關鍵第一步，預計在不更換任何系統的前提下，將 HR-IT 交接延遲從平均 3 天縮短至當天自動完成。",
      cn: "<b>建议：</b>先把 SuccessFactors → ServiceNow 这条自动触发链路搭起来，这一步是打通最大瓶颈的关键；不用动任何现有系统，就能让 HR-IT 的交接从平均拖 3 天变成当天自动搞定。",
      en: "<b>Recommendation:</b> Prioritize implementing the SuccessFactors → ServiceNow auto-trigger integration — this is the critical first step to eliminating the biggest bottleneck and can reduce the HR-IT handoff delay from an average of 3 days to same-day, without replacing any existing systems."
    }
  },
  A051: {
    art: "table",
    turns: {
      zh: [
        { ask: "我需要設計一場 HR 部門的 AI 應用情境探索工作坊，約 20 人，半天 3 小時，幫我建立議程和練習設計。", say: "很好！在開始之前，讓我確認幾件事：參加者對 AI 工具的熟悉程度如何——初學者、有一定基礎還是混合？工作坊結束時，你最希望每個人帶走的具體產出是什麼？" },
        { ask: "大多數人是初學者。最終希望每個人都能產出「我的 HR AI 應用情境」清單和一份初步行動計畫。", steps: ["定義 2–3 個 SMART 學習目標，對齊初學者需求", "規劃半天議程，每段環節對齊對應的學習目標", "設計情境探索互動練習（設計思維分組＋應用情境卡）", "設計行動計畫承諾卡，確保帶得走的具體產出"] }
      ],
      cn: [
        {
          ask: "我要设计一场 HR 部门的 AI 应用场景探索工作坊，大概 20 人，半天 3 小时，帮我搭一份议程和练习设计。",
          say: "很好！开始之前，我先确认几件事：参加的人对 AI 工具的熟悉程度怎么样——新手、有一定基础，还是混合？工作坊结束时，你最希望每个人带走的具体产出是什么？"
        },
        {
          ask: "大多数人是新手。最终希望每个人都能产出一份“我的 HR AI 应用场景”清单和一份初步的行动计划。",
          steps: [
            "定义 2–3 个 SMART 学习目标，对齐新手的需求",
            "规划半天议程，每个环节都对齐对应的学习目标",
            "设计场景探索的互动练习（设计思维分组＋应用场景卡）",
            "设计行动计划承诺卡，保证有能带走的具体产出"
          ]
        }
      ],
      en: [
        { ask: "I need to design a half-day AI use-case exploration workshop for 20 HR team members, 3 hours total. Can you help me build the agenda and activity design?", say: "Great! Before I start, let me confirm a few things: What is the participants' AI familiarity level — beginners, some experience, or mixed? What is the most important tangible output you want each person to leave with?" },
        { ask: "Most participants are beginners. The end goal is for each person to produce a personal 'HR AI Use Case' list and a draft action plan.", steps: ["Define 2–3 SMART learning objectives aligned to beginner needs", "Design a 3-hour agenda with each segment mapped to a learning objective", "Design use-case exploration activity (design-thinking groups + use-case cards)", "Design action commitment card to ensure a tangible take-home output"] }
      ]
    },
    title: { zh: "HR AI 應用探索工作坊 — 議程與練習設計", cn: "HR AI 应用探索工作坊 — 议程与练习设计", en: "HR AI Use-Case Workshop — Agenda & Activity Design" },
    data: {
      zh: {
        head: ["時段", "議程主題", "互動方式", "重要性"],
        rows: [
          ["09:00–09:20（20 分鐘）", "破冰：我的一天 vs AI 的一天", "小組討論，便利貼牆，全員快速輪流分享", "m"],
          ["09:20–10:00（40 分鐘）", "Copilot 實際操作示範與引導式跟做練習", "Live Demo + 跟做，現場即時提問與解答", "h"],
          ["10:00–10:45（45 分鐘）", "情境探索工作坊：HR 流程中的 AI 機會", "設計思維分組，每組產出 3 張 AI 應用情境卡", "h"],
          ["10:45–11:15（30 分鐘）", "個人行動計畫草擬：我要從哪一步開始？", "個人承諾卡填寫，2 人互相分享與給予回饋", "m"],
          ["11:15–11:30（15 分鐘）", "回顧與收尾：SMART 目標確認與承諾牆", "全員依序貼出承諾卡，引導師彙整關鍵學習", "l"]
        ]
      },
      cn: {
        head: ["时段", "议程主题", "互动方式", "重要性"],
        rows: [
          ["09:00–09:20（20 分钟）", "破冰：我的一天 vs AI 的一天", "小组讨论，便利贴墙，全员快速轮流分享", "m"],
          ["09:20–10:00（40 分钟）", "Copilot 实操演示和引导式跟做练习", "Live Demo + 跟做，现场实时提问和解答", "h"],
          ["10:00–10:45（45 分钟）", "场景探索工作坊：HR 流程中的 AI 机会", "设计思维分组，每组产出 3 张 AI 应用场景卡", "h"],
          ["10:45–11:15（30 分钟）", "个人行动计划草拟：我要从哪一步开始？", "填写个人承诺卡，两人相互分享并给出反馈", "m"],
          ["11:15–11:30（15 分钟）", "回顾与收尾：SMART 目标确认与承诺墙", "全员依次贴出承诺卡，引导师汇总关键收获", "l"]
        ]
      },
      en: {
        head: ["Time Slot", "Agenda Topic", "Activity Format", "Priority"],
        rows: [
          ["09:00–09:20 (20 min)", "Icebreaker: My Day vs. AI's Day", "Group discussion, sticky-note wall, quick full-group share-out", "m"],
          ["09:20–10:00 (40 min)", "Copilot Live Demo and Guided Hands-On Practice", "Live Demo plus guided follow-along with real-time Q&A", "h"],
          ["10:00–10:45 (45 min)", "Use-Case Exploration: AI Opportunities in HR Processes", "Design-thinking groups; each team produces 3 AI use-case cards", "h"],
          ["10:45–11:15 (30 min)", "Personal Action Plan: Where Do I Start?", "Individual commitment card, paired share and peer feedback", "m"],
          ["11:15–11:30 (15 min)", "Wrap-Up: SMART Goal Check and Commitment Wall", "All participants post their commitment cards; facilitator synthesizes key learnings", "l"]
        ]
      }
    },
    rec: {
      zh: "<b>建議：</b>工作坊結束後 48 小時內，透過 Teams 群組傳送應用情境卡照片與承諾摘要，趁熱鞏固學習成果；並安排 2 週後 15 分鐘線上 check-in，追蹤行動計畫執行進度。",
      cn: "<b>建议：</b>工作坊结束后 48 小时内，通过 Teams 群发一下应用场景卡的照片和承诺摘要，趁热巩固学习成果；再安排两周后一次 15 分钟的线上 check-in，跟进行动计划的执行进度。",
      en: "<b>Recommendation:</b> Within 48 hours after the workshop, share photos of use-case cards and commitment summaries via the Teams group to consolidate learning while momentum is high. Schedule a 15-minute online check-in 2 weeks later to track action plan progress."
    }
  },

A005: {
    art: "brief",
    turns: {
      zh: [
        { ask: "這次活動有哪些亮點？我應該重點關注哪些場次？", say: "沒問題！請問你最感興趣的方向是哪方面——技術議程、講者分享，還是展區互動？" },
        { ask: "主要想了解今天下午的主題演講和 AI 相關場次", steps: ["📅 比對議程時間表", "🎤 整理講者背景資料", "📍 確認場地與換場動線", "⭐ 標記不可錯過的場次"] }
      ],
      cn: [
        { ask: "这回活动都有啥亮点？哪几场是我得重点听的？", say: "没问题！你最感兴趣的方向是哪块——技术议程、嘉宾分享，还是展区互动？" },
        {
          ask: "主要想看看今天下午的主题演讲，还有跟 AI 有关的那几场",
          steps: ["📅 比对议程时间表", "🎤 梳理嘉宾背景", "📍 确认场地与转场路线", "⭐ 标记不容错过的场次"]
        }
      ],
      en: [
        { ask: "What are the highlights of this event? Which sessions should I prioritize?", say: "Happy to help! What's your main focus — technical sessions, keynote speakers, or the exhibition floor?" },
        { ask: "Mainly the afternoon keynotes and AI-related sessions", steps: ["📅 Scanning session schedule", "🎤 Pulling speaker profiles", "📍 Mapping venue and transit routes", "⭐ Flagging must-attend sessions"] }
      ]
    },
    title: { zh: "今日活動精選導覽", cn: "今日活动精选速览", en: "Today's Event Highlights Guide" },
    data: {
      zh: [
        { lv: "m", cat: "主題演講", tx: "下午 2:00 大會堂主舞台的開幕主題演講聚焦 AI 企業落地最新實踐，建議提早 10 分鐘入場佔位。" },
        { lv: "m", cat: "精選場次", tx: "AI 工作流自動化工作坊限額 50 人，須現場至 A3 報到台換票；目前仍有名額，請盡快前往。" },
        { lv: "n", cat: "講者互動", tx: "三位主題講者將於演講後在 Lounge B 進行 30 分鐘開放交流，適合深度提問與名片交換。" },
        { lv: "n", cat: "場地提醒", tx: "主展區與工作坊區步行約 8 分鐘，換場時請預留足夠緩衝時間，以免錯過開場。" }
      ],
      cn: [
        { lv: "m", cat: "主题演讲", tx: "下午 2:00 大会堂主舞台的开幕主题演讲，聚焦 AI 在企业落地的最新实践，建议提前 10 分钟入场占座。" },
        { lv: "m", cat: "精选场次", tx: "AI 工作流自动化工作坊限额 50 人，需到现场 A3 签到台换票；目前还有名额，请尽快过去。" },
        { lv: "n", cat: "嘉宾互动", tx: "三位主题演讲嘉宾将在演讲结束后于 Lounge B 进行 30 分钟开放交流，适合深入提问和交换名片。" },
        { lv: "n", cat: "场地提醒", tx: "主展区到工作坊区步行约 8 分钟，转场时请留足缓冲时间，以免错过开场。" }
      ],
      en: [
        { lv: "m", cat: "Keynote", tx: "The opening keynote at 2:00 PM on the Main Stage focuses on AI enterprise adoption — arrive 10 minutes early for a good seat." },
        { lv: "m", cat: "Top Session", tx: "The AI Workflow Automation workshop is capped at 50 attendees; swap your ticket at Registration Desk A3 now — spots still available." },
        { lv: "n", cat: "Speaker Q&A", tx: "Three keynote speakers will hold a 30-minute open exchange in Lounge B after their talks — great for in-depth questions and networking." },
        { lv: "n", cat: "Venue Tip", tx: "The main exhibition hall and workshop area are about an 8-minute walk apart — plan buffer time between back-to-back sessions." }
      ]
    },
    rec: {
      zh: "<b>建議：</b>立即前往 A3 報到台領取 AI 工作坊換票券，名額有限，先到先得。",
      cn: "<b>建议：</b>马上去 A3 签到台领取 AI 工作坊的换票券，名额有限，先到先得。",
      en: "<b>Recommendation:</b> Head to Registration Desk A3 now to claim your AI workshop ticket — seats are limited and filling fast."
    }
  },
  A009: {
    art: "table",
    turns: {
      zh: [
        { ask: "幫我為新的內部數據分析平台想 10 個有創意的名稱，每個都要附一句 Slogan", say: "沒問題！請問這個平台的核心功能是什麼？目標使用者是哪個部門？語氣偏向專業正式，還是創新活潑？" },
        { ask: "核心是數據視覺化與預測分析，供財務和營運部門使用，語氣偏專業穩重", steps: ["🧠 分析平台定位與核心價值主張", "💡 腦力激盪 30+ 候選名稱", "🔍 篩選原創性與品牌適切性", "✍️ 配對 Slogan 確保朗朗上口"] }
      ],
      cn: [
        {
          ask: "帮我给新的内部数据分析平台起 10 个有创意的名字，每个都配一句 Slogan",
          say: "没问题！这个平台的核心功能是什么？目标用户是哪个部门？风格想偏专业正式，还是创新活泼？"
        },
        {
          ask: "核心是数据可视化和预测分析，给财务和运营部门用，风格偏专业稳重",
          steps: ["🧠 分析平台定位与核心价值", "💡 头脑风暴 30+ 候选名", "🔍 筛查原创性与品牌契合度", "✍️ 搭配 Slogan 确保朗朗上口"]
        }
      ],
      en: [
        { ask: "Generate 10 creative names with slogans for our new internal data analytics platform", say: "Great! What is the platform's core function? Which teams will use it? Should the tone be formal and professional, or innovative and energetic?" },
        { ask: "Core features are data visualization and predictive analytics, used by finance and operations, professional tone preferred", steps: ["🧠 Analyzing platform positioning and core value", "💡 Brainstorming 30+ candidate names", "🔍 Filtering for originality and brand fit", "✍️ Pairing slogans for memorability"] }
      ]
    },
    title: { zh: "數據分析平台命名建議（精選 5 名）", cn: "数据分析平台命名建议（精选 5 个）", en: "Analytics Platform Name Recommendations (Top 5)" },
    data: {
      zh: {
        head: ["名稱", "Slogan", "語氣風格", "推薦度"],
        rows: [
          ["InsightFlow", "「讓數據流轉成決策動能」", "專業 × 動態", "h"],
          ["DataPulse", "「感受每一筆數據的心跳」", "科技感 × 直觀", "h"],
          ["ClarityCore", "「把複雜，變成你的優勢」", "穩重 × 精準", "m"],
          ["VisionaryIQ", "「用數據看見別人看不到的」", "前瞻 × 進取", "m"],
          ["SignalNest", "「你的關鍵訊號，一站掌握」", "整合 × 效率", "l"]
        ]
      },
      cn: {
        head: ["名称", "Slogan", "风格调性", "推荐度"],
        rows: [
          ["InsightFlow", "“让数据流转为决策动力”", "专业 × 动感", "h"],
          ["DataPulse", "“感受每一条数据的脉搏”", "科技感 × 直观", "h"],
          ["ClarityCore", "“化繁为简，变成你的优势”", "稳重 × 精准", "m"],
          ["VisionaryIQ", "“用数据看见别人看不到的”", "前瞻 × 进取", "m"],
          ["SignalNest", "“关键信号，一站掌握”", "整合 × 效率", "l"]
        ]
      },
      en: {
        head: ["Name", "Slogan", "Tone Style", "Score"],
        rows: [
          ["InsightFlow", "\"Turn data flow into decision power\"", "Professional × Dynamic", "h"],
          ["DataPulse", "\"Feel the heartbeat of every data point\"", "Tech-forward × Intuitive", "h"],
          ["ClarityCore", "\"Turning complexity into your edge\"", "Steady × Precise", "m"],
          ["VisionaryIQ", "\"See what others miss in your data\"", "Forward-looking × Ambitious", "m"],
          ["SignalNest", "\"All the signals that matter, in one place\"", "Integrated × Efficient", "l"]
        ]
      }
    },
    rec: {
      zh: "<b>建議：</b>以「InsightFlow」為首選候選，其動態感與平台核心功能高度吻合，建議通過 IT 命名審核後進行小範圍使用者偏好測試再正式定案。",
      cn: "<b>建议：</b>把“InsightFlow”作为首选，它的动感和平台核心功能高度契合；建议先通过 IT 命名审核，再做小范围用户偏好测试，最后正式定名。",
      en: "<b>Recommendation:</b> Lead with 'InsightFlow' as the primary candidate — its dynamic feel strongly aligns with the platform's core function. Submit for IT naming review and run a quick user preference test before finalizing."
    }
  },
  A015: {
    art: "brief",
    turns: {
      zh: [
        { ask: "幫我為客服 Agent 建立高品質的指示詞，它主要處理訂單查詢與退換貨申請", say: "很好！讓我先了解幾個細節：目標使用者是一般消費者還是企業客戶？你希望 Agent 的語氣是親切友善還是正式專業？有沒有特定的禁止行為需要明確限制？" },
        { ask: "使用者是一般消費者，語氣要親切但有效率，不能承諾任何未確認的退款時間表", steps: ["📋 定義 Agent 身份與職責邊界", "🎯 設計核心指令與行為規則", "🔄 建立升級轉接與例外處理邏輯", "✅ 以 Markdown 格式輸出最佳實務指示詞"] }
      ],
      cn: [
        {
          ask: "帮我给客服 Agent 写一套高质量的指令，它主要处理订单查询和退换货申请",
          say: "好的！我先了解几个细节：目标用户是普通消费者还是企业客户？你希望 Agent 的语气是亲切友好还是正式专业？有没有哪些明确不能做的事需要限制？"
        },
        {
          ask: "用户是普通消费者，语气要亲切又高效，不能承诺任何还没确认的退款时间",
          steps: ["📋 界定 Agent 身份与职责边界", "🎯 设计核心指令与行为规则", "🔄 搭建升级转接与异常处理逻辑", "✅ 用 Markdown 输出最佳实践指令"]
        }
      ],
      en: [
        { ask: "Help me write high-quality instructions for a customer service Agent handling order inquiries and return/exchange requests", say: "Great! A few questions first: Is the target user a general consumer or a business client? Should the Agent's tone be warm and friendly, or formal and efficient? Are there specific prohibited actions I should build in?" },
        { ask: "General consumers, friendly but efficient tone, must not promise any unconfirmed refund timelines", steps: ["📋 Defining Agent identity and scope boundaries", "🎯 Designing core instructions and behavior rules", "🔄 Building escalation and exception-handling logic", "✅ Outputting best-practice instructions in Markdown"] }
      ]
    },
    title: { zh: "客服 Agent 指示詞品質分析報告", cn: "客服 Agent 指令质量分析报告", en: "Customer Service Agent Instruction Quality Report" },
    data: {
      zh: [
        { lv: "m", cat: "身份定義", tx: "明確宣告 Agent 為「訂單客服助理」並列出可處理的三類請求，避免範圍蔓延至無法處理的問題。" },
        { lv: "m", cat: "行為規則", tx: "設定「先確認訂單編號再執行任何動作」的核心守則，並加入禁止推測性回答的限制，確保資訊準確性。" },
        { lv: "n", cat: "升級邏輯", tx: "建議加入「連續三次無法解決時，主動提供人工客服選項」的升級觸發條件，提升使用者信任感。" },
        { lv: "n", cat: "語氣設定", tx: "在系統提示中插入語氣範例句（如「我來幫你確認一下！」），引導 Agent 避免生硬的錯誤訊息回應。" }
      ],
      cn: [
        { lv: "m", cat: "身份界定", tx: "明确把 Agent 定位为“订单客服助手”，并列出可处理的三类请求，避免范围扩散到它搞不定的问题上。" },
        { lv: "m", cat: "行为规则", tx: "设定“先确认订单编号再做任何操作”的核心准则，并加上禁止凭猜测作答的限制，保证信息准确。" },
        { lv: "n", cat: "升级逻辑", tx: "建议加入“连续三次没能解决就主动提供人工客服”的升级触发条件，提升用户信任感。" },
        { lv: "n", cat: "语气设定", tx: "在系统提示里放几句语气示例（比如“我来帮你确认一下！”），引导 Agent 别用生硬的报错话术回复。" }
      ],
      en: [
        { lv: "m", cat: "Identity", tx: "Clearly declare the Agent as an 'Order Support Assistant' and list the three request types it handles — prevents scope creep into unhandled topics." },
        { lv: "m", cat: "Rules", tx: "Set a core rule: 'Always confirm the order number before taking any action.' Add a prohibition on speculative answers to ensure information accuracy." },
        { lv: "n", cat: "Escalation", tx: "Add an escalation trigger: 'After three failed resolution attempts, proactively offer a human agent option' — builds user trust and reduces frustration." },
        { lv: "n", cat: "Tone Guide", tx: "Embed example phrases in the system prompt (e.g., 'Let me check that for you!') to steer the Agent away from stiff error messages." }
      ]
    },
    rec: {
      zh: "<b>建議：</b>完成初稿後，模擬五種邊界情境（如訂單查無資料、重複退貨申請）逐一測試指示詞行為，確認無意外回應後再正式部署。",
      cn: "<b>建议：</b>初稿完成后，模拟五种边界场景（比如订单查不到、重复提交退货）逐一测试指令表现，确认没有意外回复后再正式上线。",
      en: "<b>Recommendation:</b> After drafting, simulate five edge-case scenarios (e.g., order not found, duplicate return request) to validate Agent behavior before going live."
    }
  },
  A019: {
    art: "table",
    turns: {
      zh: [
        { ask: "幫我建立一份軟體正式環境部署前的完整操作清單", say: "沒問題！請問這次部署涉及幾個服務或系統？有沒有特定的合規要求？部署窗口有多長，以及是否需要回滾方案？" },
        { ask: "三個微服務，需符合 ISO 27001 規範，部署窗口兩小時，必須能快速回滾", steps: ["🔍 拆解部署流程各關鍵環節", "⚠️ 標記高風險步驟與負責角色", "🔄 加入回滾觸發條件與合規確認點", "📝 輸出可執行的逐步操作清單"] }
      ],
      cn: [
        { ask: "帮我做一份软件上线前（正式环境部署前）的完整操作清单", say: "没问题！这次部署涉及几个服务或系统？有没有特定的合规要求？部署窗口有多长，需不需要回滚方案？" },
        {
          ask: "一共三个微服务，得过 ISO 27001，部署窗口就两小时，还必须能麻利地回滚",
          steps: ["🔍 拆解部署流程各关键环节", "⚠️ 标记高风险步骤与负责人", "🔄 加入回滚触发条件与合规检查点", "📝 输出可执行的分步清单"]
        }
      ],
      en: [
        { ask: "Help me create a complete pre-deployment checklist for a production software release", say: "Sure! How many services or systems are involved? Any compliance requirements? What is the deployment window, and do you need a rollback plan?" },
        { ask: "Three microservices, ISO 27001 required, two-hour deployment window, must support fast rollback", steps: ["🔍 Breaking down each critical deployment phase", "⚠️ Flagging high-risk steps and owner roles", "🔄 Adding rollback triggers and compliance checkpoints", "📝 Outputting an executable step-by-step checklist"] }
      ]
    },
    title: { zh: "正式環境部署前置作業清單", cn: "正式环境部署前置工作清单", en: "Production Deployment Pre-Flight Checklist" },
    data: {
      zh: {
        head: ["清單項目", "負責角色", "執行要點", "風險"],
        rows: [
          ["備份現有版本", "DevOps 工程師", "確認三個微服務最新備份均成功，備份路徑已記錄至部署日誌", "h"],
          ["完成 ISO 27001 合規檢查", "資安負責人", "逐項驗證存取控制、稽核日誌與加密設定均符合規範要求", "h"],
          ["執行預部署冒煙測試", "QA 工程師", "在測試環境複製正式資料，完整執行核心功能驗證腳本", "m"],
          ["確認回滾計畫就緒", "技術主管", "回滾腳本通過測試，觸發條件與授權人員清單已確認", "m"],
          ["發送維護通知", "專案管理師", "部署前 1 小時通知相關利害關係人，含預計恢復服務時間", "l"]
        ]
      },
      cn: {
        head: ["清单项", "负责人", "执行要点", "风险"],
        rows: [
          ["备份现有版本", "DevOps 工程师", "确认三个微服务的最新备份都成功，备份路径已记录到部署日志", "h"],
          ["完成 ISO 27001 合规检查", "安全负责人", "逐项核对访问控制、审计日志和加密配置都符合规范要求", "h"],
          ["执行预部署冒烟测试", "QA 工程师", "在测试环境复制线上数据，完整跑一遍核心功能验证脚本", "m"],
          ["确认回滚方案就绪", "技术负责人", "回滚脚本已通过测试，触发条件和授权人名单都已确认", "m"],
          ["发送维护通知", "项目经理", "部署前 1 小时通知相关方，注明预计恢复服务的时间", "l"]
        ]
      },
      en: {
        head: ["Checklist Item", "Owner", "Key Action", "Risk"],
        rows: [
          ["Back up current version", "DevOps Engineer", "Confirm all 3 microservice backups succeeded and paths are logged in the deployment record", "h"],
          ["Complete ISO 27001 compliance check", "Security Lead", "Verify access controls, audit logs, and encryption settings all meet standard requirements", "h"],
          ["Run pre-deploy smoke test", "QA Engineer", "Replicate production data in test environment and execute core function validation scripts", "m"],
          ["Confirm rollback plan is ready", "Tech Lead", "Rollback scripts tested, trigger conditions and authorized approvers list confirmed", "m"],
          ["Send maintenance notice", "Project Manager", "Notify all stakeholders 1 hour before deploy with expected service recovery time", "l"]
        ]
      }
    },
    rec: {
      zh: "<b>建議：</b>建立清單執行紀錄（每項打勾加時間戳記），作為事後稽核及下次部署持續改善的依據。",
      cn: "<b>建议：</b>做一份清单执行记录（每项打勾并加时间戳），作为事后审计和下次部署持续改进的依据。",
      en: "<b>Recommendation:</b> Log each checklist item with a timestamp and sign-off to support post-deploy auditing and drive continuous improvement for future releases."
    }
  },
  A023: {
    art: "brief",
    turns: {
      zh: [
        { ask: "我每天工作超過八小時，到了下午三點左右就完全失去專注力，希望改善這個狀況", say: "我很了解這種感受！讓我多問一點：你的工作主要是持續創作思考，還是處理結構化數據？下午失焦是突然當機，還是逐漸渙散的感覺？" },
        { ask: "主要是寫作與思考性工作，下午是漸漸渙散，不是突然失神", steps: ["🧘 評估目前能量管理模式", "⏱️ 規劃最適工作節律方案", "🧍 設計桌邊伸展與微休息", "🌿 整合正念技巧提升恢復力"] }
      ],
      cn: [
        {
          ask: "我每天工作超过八小时，一到下午三点左右就完全没法集中注意力了，想改善一下",
          say: "我特别理解这种感受！我再多问几句：你的工作主要是持续的创作和思考，还是处理结构化数据？下午走神是突然“卡壳”，还是慢慢就涣散了？"
        },
        {
          ask: "主要是写作和偏思考的工作，下午是慢慢涣散，不是突然走神",
          steps: ["🧘 评估当前精力管理方式", "⏱️ 规划最合适的工作节奏", "🧍 设计桌边拉伸与微休息", "🌿 融入正念技巧提升恢复力"]
        }
      ],
      en: [
        { ask: "I work over eight hours a day and completely lose focus around 3 PM — I want to fix this", say: "I totally get that! Let me ask a couple of things: Is your work mostly continuous creative thinking or structured data tasks? Does the afternoon slump hit suddenly, or does it fade gradually?" },
        { ask: "Mostly writing and thinking work, it fades gradually rather than a sudden crash", steps: ["🧘 Assessing current energy management patterns", "⏱️ Designing an optimal work rhythm plan", "🧍 Creating desk stretches and micro-break routines", "🌿 Integrating mindfulness techniques for recovery"] }
      ]
    },
    title: { zh: "個人化健康生產力改善計畫", cn: "个性化健康生产力改善计划", en: "Personalized Wellness Productivity Plan" },
    data: {
      zh: [
        { lv: "m", cat: "專注節律", tx: "採用「50-10 工作法」：專心寫作 50 分鐘後離開螢幕 10 分鐘，可有效延緩認知疲勞累積，比番茄鐘更適合長篇思考工作。" },
        { lv: "m", cat: "下午儀式", tx: "每天下午 2:45 設定「能量補給提示」：起身喝水並做 3 分鐘站立伸展，有助於提升後續 90 分鐘的工作品質。" },
        { lv: "n", cat: "桌邊伸展", tx: "試試「坐姿脊椎扭轉」：坐直後右手扶椅背，上半身往右轉停留 10 秒再換邊，快速舒緩因久坐造成的頸肩緊繃。" },
        { lv: "n", cat: "正念練習", tx: "每天早上花 5 分鐘做「4-7-8 呼吸法」啟動一天，能有效降低皮質醇分泌，讓整個上午的認知狀態更加穩定清晰。" }
      ],
      cn: [
        {
          lv: "m",
          cat: "专注节奏",
          tx: "试试“50-10 工作法”：专注写作 50 分钟后离开屏幕休息 10 分钟，能有效延缓认知疲劳的累积，比番茄工作法更适合长时段的思考型工作。"
        },
        { lv: "m", cat: "下午仪式", tx: "每天下午 2:45 设一个“精力补给提醒”：起身喝水，再做 3 分钟站立拉伸，有助于提升接下来 90 分钟的工作质量。" },
        { lv: "n", cat: "桌边拉伸", tx: "试试“坐姿脊柱扭转”：坐直后右手扶住椅背，上半身向右转，保持 10 秒再换另一边，能快速缓解久坐带来的颈肩僵硬。" },
        { lv: "n", cat: "正念练习", tx: "每天早上花 5 分钟做“4-7-8 呼吸法”开启一天，能有效降低皮质醇分泌，让整个上午的思路更稳定、更清晰。" }
      ],
      en: [
        { lv: "m", cat: "Focus Rhythm", tx: "Use the '50-10 work cycle': 50 minutes of focused writing followed by 10 minutes away from the screen — better suited for deep thinking work than the Pomodoro technique." },
        { lv: "m", cat: "PM Ritual", tx: "Set a '2:45 PM energy refuel alert' each day: stand up, drink water, and do a 3-minute stretch — shown to improve work quality over the following 90 minutes." },
        { lv: "n", cat: "Desk Stretch", tx: "Try the seated spinal twist: sit tall, place your right hand on the chair back, rotate your upper body right for 10 seconds, then switch — rapidly eases neck and shoulder tension from prolonged sitting." },
        { lv: "n", cat: "Mindfulness", tx: "Spend 5 minutes on '4-7-8 breathing' first thing each morning to reduce cortisol levels and stabilize your cognitive state throughout the entire morning." }
      ]
    },
    rec: {
      zh: "<b>建議：</b>本週先實踐「50-10 工作法」三天，每天結束時記錄下午專注品質（1–5 分），快速驗證成效後再逐步加入其他習慣。",
      cn: "<b>建议：</b>这周先坚持三天“50-10 工作法”，每天结束时给下午的专注质量打个分（1–5 分），快速验证效果后再逐步加入其他习惯。",
      en: "<b>Recommendation:</b> Try the 50-10 work cycle for three days this week — rate your afternoon focus quality (1–5) each evening to quickly validate the impact before layering in additional habits."
    }
  },
  A027: {
    art: "table",
    turns: {
      zh: [
        { ask: "我想今年養成每週運動三次的習慣，但每次嘗試都在三週內放棄，幫我找出真正的卡關點", say: "我們來用 COM-B 行為科學框架幫你深度診斷！請問上次嘗試時，最常讓你跳過運動的原因是什麼？是「不知道做什麼」、「環境不方便」，還是「當下沒有動力」？" },
        { ask: "主要是下班後太累沒動力，不確定哪種運動適合自己，健身房離公司也比較遠", steps: ["🔬 對應 COM-B 三大面向逐一診斷", "🎯 識別最高槓桿介入點", "🗓️ 設計可落地的行為改變策略", "📊 建立追蹤指標與第一個里程碑"] }
      ],
      cn: [
        {
          ask: "我想今年养成每周运动三次的习惯，但每次坚持不到三周就放弃了，帮我找出真正卡在哪",
          say: "我们用 COM-B 行为科学框架来给你做个深度诊断！上次坚持的时候，最常让你跳过运动的原因是什么？是“不知道练什么”“环境不方便”，还是“当下没动力”？"
        },
        {
          ask: "主要是下了班人太累、提不起劲，也拿不准自己适合哪种运动，再加上健身房离公司还挺远",
          steps: ["🔬 对照 COM-B 三大维度逐一诊断", "🎯 找出最高杠杆的干预点", "🗓️ 设计可落地的行为改变策略", "📊 建立跟踪指标与第一个里程碑"]
        }
      ],
      en: [
        { ask: "I want to build a habit of exercising three times a week this year, but I keep quitting within three weeks — help me find the real blockers", say: "Let's use the COM-B behavioral science framework for a deep diagnosis! During your last attempt, what was the most common reason you skipped exercise — 'I didn't know what to do,' 'the environment wasn't convenient,' or 'I just had no motivation in the moment'?" },
        { ask: "Mainly too tired after work, unsure which exercise suits me, and the gym is a bit far from my office", steps: ["🔬 Diagnosing against all three COM-B dimensions", "🎯 Identifying the highest-leverage intervention points", "🗓️ Designing actionable behavior change strategies", "📊 Setting tracking metrics and the first milestone"] }
      ]
    },
    title: { zh: "運動習慣 COM-B 行為障礙分析", cn: "运动习惯 COM-B 行为障碍分析", en: "Exercise Habit COM-B Behavior Barrier Analysis" },
    data: {
      zh: {
        head: ["COM-B 面向", "現況診斷", "介入策略", "優先度"],
        rows: [
          ["身體能力", "下班後體力不足，難以啟動高強度運動", "改為晨間 20 分鐘低強度訓練，門檻低且精力較充沛", "h"],
          ["心理能力", "不確定哪種運動適合自己，缺乏計畫感", "使用結構化訓練 App 提供逐步引導，消除每次的決策疲勞", "h"],
          ["實體機會", "健身房距離遠，增加出行成本與心理障礙", "優先採用居家訓練，僅需瑜伽墊，完全移除地點障礙", "m"],
          ["社會機會", "缺少運動夥伴或外部問責機制", "邀請一位同事每週互傳打卡訊息，建立低門檻社群支持", "m"],
          ["自動動機", "運動與即時獎勵感脫鉤，難以持續維繫", "每次運動後立即給予小獎勵（如喜愛的播客），強化正向迴路", "l"]
        ]
      },
      cn: {
        head: ["COM-B 维度", "现状诊断", "干预策略", "优先级"],
        rows: [
          ["身体能力", "下班后体力不够，很难开始高强度运动", "改成早上 20 分钟低强度训练，门槛低，精力也更充沛", "h"],
          ["心理能力", "不确定哪种运动适合自己，缺少计划感", "用结构化训练 App 提供分步引导，消除每次的决策疲劳", "h"],
          ["物理机会", "健身房太远，增加了出行成本和心理负担", "优先在家训练，只需要一张瑜伽垫，彻底消除地点障碍", "m"],
          ["社会机会", "缺少运动伙伴或外部监督机制", "约一位同事每周互相发打卡消息，建立低门槛的社群支持", "m"],
          ["自动动机", "运动和即时的奖励感脱节，很难长期坚持", "每次运动后马上给自己一个小奖励（比如听喜欢的播客），强化正向循环", "l"]
        ]
      },
      en: {
        head: ["COM-B Dimension", "Current Diagnosis", "Intervention Strategy", "Priority"],
        rows: [
          ["Physical Capability", "Low energy after work makes starting high-intensity exercise difficult", "Switch to a 20-minute low-intensity morning workout — lower barrier, higher energy levels", "h"],
          ["Psychological Capability", "Unsure which exercise is right, lacks a structured plan", "Use a guided workout app to eliminate daily decision fatigue with a step-by-step routine", "h"],
          ["Physical Opportunity", "Gym distance adds travel cost and psychological friction", "Prioritize home training with just a yoga mat — removes the location barrier entirely", "m"],
          ["Social Opportunity", "No workout partner or external accountability mechanism", "Invite one colleague to exchange weekly check-in messages — low-friction social support", "m"],
          ["Automatic Motivation", "Exercise is disconnected from immediate rewards, making it hard to sustain", "Add an immediate small reward after each workout (e.g., a favorite podcast) to reinforce the positive loop", "l"]
        ]
      }
    },
    rec: {
      zh: "<b>建議：</b>從最高優先度的「晨間居家訓練」開始，第一週只做一次，讓大腦先建立「我是會運動的人」的自我認同，再逐步增加頻率。",
      cn: "<b>建议：</b>从优先级最高的“早间居家训练”开始，第一周只做一次，先让大脑建立“我是一个会运动的人”的自我认同，再逐步增加频率。",
      en: "<b>Recommendation:</b> Start with the highest-priority action — morning home training — at just once per week. Build identity before frequency: let your brain establish 'I'm someone who exercises' before scaling up."
    }
  },
  A031: {
    art: "table",
    turns: {
      zh: [
        { ask: "我有一份 90 張投影片的簡報，下週要向公司 C-level 主管報告，時間只有 60 分鐘，幫我優化", say: "好的，我來協助你精簡！請問需要保留多少時間給問答？聽眾是否已有主題背景，還是需要從頭建立脈絡？此次報告的核心目標是資訊傳遞、獲得批准，還是推動決策？" },
        { ask: "保留 15 分鐘問答，聽眾有基本了解，主要目標是獲得 Q2 預算批准", steps: ["📊 掃描 90 張投影片識別重複與冗餘", "✂️ 標記可合併或直接刪除的投影片", "⏱️ 依 C-level 注意力曲線重新配時", "📋 輸出精簡版段落建議與時間分配表"] }
      ],
      cn: [
        {
          ask: "我有一份 90 页幻灯片的演示文稿，下周要向公司 C-level 高管汇报，只有 60 分钟，帮我优化一下",
          say: "好的，我来帮你精简！需要留多少时间给问答？听众对主题是否已有了解，还是要从头讲清背景？这次汇报的核心目标是传递信息、获得批准，还是推动决策？"
        },
        {
          ask: "留 15 分钟问答，听众有基本了解，主要目标是拿到 Q2 预算批准",
          steps: ["📊 扫描 90 页幻灯片识别重复与冗余", "✂️ 标记可合并或直接删掉的幻灯片", "⏱️ 按 C-level 注意力曲线重新分配时间", "📋 输出精简版结构建议与时间分配表"]
        }
      ],
      en: [
        { ask: "I have a 90-slide presentation for a 60-minute C-level meeting next week — help me optimize it", say: "Happy to help streamline it! How much time should be reserved for Q&A? Do the executives have background on the topic, or does context need to be built from scratch? Is the core goal to inform, get approval, or drive a decision?" },
        { ask: "15 minutes for Q&A, audience has basic context, main goal is getting Q2 budget approved", steps: ["📊 Scanning all 90 slides for duplication and redundancy", "✂️ Flagging slides to merge or remove", "⏱️ Re-timing against a C-level attention curve", "📋 Outputting a streamlined section plan with time allocation"] }
      ]
    },
    title: { zh: "C-Level 簡報精簡優化方案", cn: "C-Level 演示文稿精简优化方案", en: "C-Level Presentation Streamlining Plan" },
    data: {
      zh: {
        head: ["投影片區段", "原始 → 建議張數", "建議時間", "優先度"],
        rows: [
          ["開場與議程概覽", "8 → 2 張", "3 分鐘", "h"],
          ["問題背景與市場機會", "25 → 8 張", "10 分鐘", "h"],
          ["解決方案與執行計畫", "35 → 12 張", "20 分鐘", "h"],
          ["財務預估與資源需求", "15 → 5 張", "7 分鐘", "m"],
          ["結論、行動呼籲與 Q&A", "7 → 3 張", "5 + 15 分鐘", "m"]
        ]
      },
      cn: {
        head: ["幻灯片区段", "原始 → 建议页数", "建议时间", "优先级"],
        rows: [
          ["开场与议程概览", "8 → 2 页", "3 分钟", "h"],
          ["问题背景与市场机会", "25 → 8 页", "10 分钟", "h"],
          ["解决方案与执行计划", "35 → 12 页", "20 分钟", "h"],
          ["财务预估与资源需求", "15 → 5 页", "7 分钟", "m"],
          ["结论、行动号召与 Q&A", "7 → 3 页", "5 + 15 分钟", "m"]
        ]
      },
      en: {
        head: ["Slide Section", "Original → Recommended", "Time Allocation", "Priority"],
        rows: [
          ["Opening & Agenda Overview", "8 → 2 slides", "3 min", "h"],
          ["Problem Background & Market Opportunity", "25 → 8 slides", "10 min", "h"],
          ["Solution & Execution Plan", "35 → 12 slides", "20 min", "h"],
          ["Financial Projections & Resource Needs", "15 → 5 slides", "7 min", "m"],
          ["Conclusion, Call to Action & Q&A", "7 → 3 slides", "5 + 15 min", "m"]
        ]
      }
    },
    rec: {
      zh: "<b>建議：</b>刪除所有「過程記錄型」投影片（會議照片、研究方法細節），C-level 只需看到「問題 → 方案 → 你需要什麼」的清晰鏈條。",
      cn: "<b>建议：</b>删掉所有“过程记录型”幻灯片（会议照片、研究方法细节），C-level 只需要看到“问题 → 方案 → 你要什么”这条清晰的主线。",
      en: "<b>Recommendation:</b> Remove all 'process documentation' slides (meeting photos, methodology details). C-level audiences only need a clear chain: Problem → Solution → What you need from them."
    }
  },
  A035: {
    art: "table",
    turns: {
      zh: [
        { ask: "幫我為 SaaS 產品登陸頁面設計幾組提升試用版訂閱轉換率的 A/B 測試假設", say: "好的！請問目前頁面的主要流量來源是什麼？有特定想優先測試的元素嗎——例如主標題文案、CTA 按鈕，還是社會認同模組？" },
        { ask: "主要是搜尋廣告流量，想優先測試主標題和 CTA 按鈕，其次是社會認同", steps: ["🎯 分析轉換漏斗最大落點", "💡 產出測試假設與變數設計", "📐 確認樣本量與統計顯著性要求", "📋 輸出可執行的 A/B 測試計畫矩陣"] }
      ],
      cn: [
        {
          ask: "帮我给 SaaS 产品的落地页设计几组 A/B 测试假设，用来提升试用版的订阅转化率",
          say: "好的！目前页面的主要流量来源是什么？有没有特别想优先测试的元素——比如主标题文案、CTA 按钮，还是社会认同模块？"
        },
        {
          ask: "流量主要来自搜索广告，想先拿主标题和 CTA 按钮做测试，社会认同放在后头",
          steps: ["🎯 分析转化漏斗最大流失点", "💡 产出测试假设与变量设计", "📐 确认样本量与统计显著性要求", "📋 输出可执行的 A/B 测试计划矩阵"]
        }
      ],
      en: [
        { ask: "Design A/B test hypotheses to improve trial sign-up conversion on our SaaS product landing page", say: "Got it! What is the main traffic source for the page? Any specific elements you want to prioritize — headline copy, CTA button, or social proof module?" },
        { ask: "Mainly search ad traffic, priority is headline and CTA button, then social proof", steps: ["🎯 Analyzing the biggest drop-off points in the conversion funnel", "💡 Generating test hypotheses and variable designs", "📐 Confirming sample size and statistical significance requirements", "📋 Outputting an executable A/B test plan matrix"] }
      ]
    },
    title: { zh: "登陸頁面 A/B 測試計畫（試用版轉換優化）", cn: "落地页 A/B 测试计划（试用版转化优化）", en: "Landing Page A/B Test Plan (Trial Conversion Optimization)" },
    data: {
      zh: {
        head: ["測試項目", "版本 A → 版本 B", "目標 KPI", "優先度"],
        rows: [
          ["主標題文案", "「提升你的工作效率」→「免費試用 14 天，今天就上手」", "試用啟動點擊率", "h"],
          ["CTA 按鈕文字", "「立即開始」→「免費試用，不需信用卡」", "CTA 點擊轉換率", "h"],
          ["社會認同模組", "無用戶評分 → 顯示星級評分與代表性用戶見證引言", "停留時間 + 頁面捲動深度", "m"],
          ["定價資訊位置", "頁面底部 → 首屏折疊展示", "表單送出率", "m"],
          ["限時優惠橫幅", "無橫幅 → 頂部顯示「本月試用贈一個月延伸期」", "整體轉換率", "l"]
        ]
      },
      cn: {
        head: ["测试项", "版本 A → 版本 B", "目标 KPI", "优先级"],
        rows: [
          ["主标题文案", "“提升你的工作效率”→“免费试用 14 天，今天就上手”", "试用启动点击率", "h"],
          ["CTA 按钮文字", "“立即开始”→“免费试用，无需信用卡”", "CTA 点击转化率", "h"],
          ["社会认同模块", "无用户评分 → 展示星级评分和有代表性的用户证言", "停留时长 + 页面滚动深度", "m"],
          ["定价信息位置", "页面底部 → 首屏展示", "表单提交率", "m"],
          ["限时优惠横幅", "无横幅 → 顶部显示“本月试用赠送一个月延长期”", "整体转化率", "l"]
        ]
      },
      en: {
        head: ["Test Item", "Version A → Version B", "Target KPI", "Priority"],
        rows: [
          ["Headline Copy", "\"Boost your productivity\" → \"14-day free trial — get started today\"", "Trial sign-up click rate", "h"],
          ["CTA Button Text", "\"Get Started\" → \"Try Free — No Credit Card Required\"", "CTA click-through rate", "h"],
          ["Social Proof Module", "No user ratings → Display star rating with representative user testimonial", "Time-on-page + scroll depth", "m"],
          ["Pricing Info Position", "Bottom of page → Above-the-fold collapsed view", "Form submission rate", "m"],
          ["Limited-Time Banner", "No banner → Top bar: 'Trial this month, get one free month extension'", "Overall conversion rate", "l"]
        ]
      }
    },
    rec: {
      zh: "<b>建議：</b>優先跑主標題與 CTA 按鈕這兩組高優先度測試，取得統計顯著性後依序推進後續測試，避免多組同時上線互相干擾結果。",
      cn: "<b>建议：</b>先跑主标题和 CTA 按钮这两组高优先级测试，拿到统计显著性后再依次推进后面的测试，避免多组同时上线相互干扰结果。",
      en: "<b>Recommendation:</b> Run the headline and CTA button tests first (highest priority). Once statistical significance is reached, proceed sequentially — avoid running too many variants simultaneously to prevent result contamination."
    }
  },
  A040: {
    art: "brief",
    turns: {
      zh: [
        { ask: "幫我準備明天和 VP 討論 Q1 行銷預算的 30 分鐘會議，目標是爭取比去年增加兩成的預算", say: "好的，我來幫你規劃！請問 VP 對增加預算是否有既有立場？上一季的預算執行有沒有特別亮眼或需要解釋的地方？" },
        { ask: "VP 可能會質疑 ROI，上季執行率 95%，有一個活動效果很好但成效較難量化", steps: ["📋 規劃 30 分鐘議程節奏", "💡 整理 ROI 論述框架與支撐論點", "🛡️ 預想三個潛在質疑並擬定反駁", "✅ 準備清晰的決策請求（Ask）"] }
      ],
      cn: [
        {
          ask: "明天要跟 VP 开个 30 分钟的会聊 Q1 营销预算，帮我准备一下，目标是把预算争取到比去年多两成",
          say: "好的，我来帮你规划！VP 对增加预算有没有已有的立场？上个季度的预算执行有没有特别亮眼、或者需要解释的地方？"
        },
        {
          ask: "VP 大概率会在 ROI 上挑刺，上季度执行率有 95%，其中一个活动效果挺好，就是成效不太好量化",
          steps: ["📋 规划 30 分钟议程节奏", "💡 梳理 ROI 论述框架与支撑论点", "🛡️ 预判三个可能的质疑并备好回应", "✅ 准备清晰的决策请求（Ask）"]
        }
      ],
      en: [
        { ask: "Help me prepare for a 30-minute meeting tomorrow with the VP to discuss Q1 marketing budget — I want to secure a 20% increase over last year", say: "Happy to help you plan! Does the VP have an existing lean on budget increases? Were there any standout results or items needing explanation in last quarter's budget execution?" },
        { ask: "VP may challenge ROI; last quarter execution rate was 95% and one campaign performed well but results are hard to quantify", steps: ["📋 Planning the 30-minute meeting rhythm", "💡 Structuring the ROI narrative and supporting arguments", "🛡️ Anticipating three likely objections with counters", "✅ Preparing a clear decision ask"] }
      ]
    },
    title: { zh: "Q1 行銷預算會議準備摘要", cn: "Q1 营销预算会议准备摘要", en: "Q1 Marketing Budget Meeting Prep Summary" },
    data: {
      zh: [
        { lv: "m", cat: "開場框架", tx: "先用「上季執行率 95% + 高成效活動」建立可信度，再提出增幅訴求，讓 VP 在聽到數字前先認可「錢花得值」的前提。" },
        { lv: "m", cat: "效益論述", tx: "將難以量化的活動成效轉化為「品牌資產累積與潛在客戶管道擴大」，並對比同行業投入水位以支撐增幅合理性。" },
        { lv: "n", cat: "質疑預案", tx: "預備三個反駁要點：① 增幅低於通膨率；② 投資新渠道比加碼既有花費更高效；③ 不投資的機會成本估算。" },
        { lv: "n", cat: "收尾行動", tx: "結尾提出清晰 Ask：「請在本週五前給予原則性批准，細部計畫下週一提交」，避免 VP 離場後決策懸而未決。" }
      ],
      cn: [
        { lv: "m", cat: "开场框架", tx: "先用“上季度执行率 95% + 高成效活动”立住可信度，再提加预算的诉求，让 VP 在听到数字之前先认可“钱花得值”这个前提。" },
        { lv: "m", cat: "效益论述", tx: "把难以量化的活动成效转化为“品牌资产积累和潜在客户渠道扩大”，再对标同行业的投入水平，支撑加预算的合理性。" },
        { lv: "n", cat: "质疑预案", tx: "准备三个回应要点：① 增幅低于通胀率；② 投新渠道比在原有开支上加码更高效；③ 不投入的机会成本估算。" },
        { lv: "n", cat: "收尾行动", tx: "结尾抛出清晰的 Ask：“请在本周五前给个原则性批准，详细方案下周一提交”，避免 VP 散会后决策悬而未决。" }
      ],
      en: [
        { lv: "m", cat: "Opening Frame", tx: "Lead with '95% execution rate + one high-performing campaign' to establish credibility before presenting the budget ask — let the VP affirm 'money was well spent' first." },
        { lv: "m", cat: "ROI Narrative", tx: "Reframe hard-to-quantify campaign results as 'brand equity accumulation and pipeline expansion,' then benchmark against industry investment levels to justify the increase." },
        { lv: "n", cat: "Objection Prep", tx: "Prepare three counter-points: ① the increase is below inflation; ② investing in new channels is more efficient than increasing spend on existing ones; ③ the opportunity cost of not investing." },
        { lv: "n", cat: "Closing Ask", tx: "End with a clear ask: 'Please provide in-principle approval by Friday; the detailed plan will be submitted Monday' — prevent the decision from stalling after the meeting ends." }
      ]
    },
    rec: {
      zh: "<b>建議：</b>整理一頁「情境速覽」濃縮關鍵數據與類比，若 VP 需要向更高層報批，這份單頁摘要可直接轉交使用。",
      cn: "<b>建议：</b>整理一页“情况速览”，把关键数据和类比浓缩进去；如果 VP 需要向更高层报批，这份单页摘要可以直接转交使用。",
      en: "<b>Recommendation:</b> Prepare a one-page 'context brief' condensing key data and analogies — if the VP needs to escalate approval, this single page can be handed up the chain immediately."
    }
  },
  A044: {
    art: "brief",
    turns: {
      zh: [
        { ask: "幫我為分散在三個時區的 10 人遠距開發團隊規劃提振士氣的活動", say: "了解！在提建議前，能告訴我目前士氣低落的主要原因嗎？是工作壓力、缺乏歸屬感，還是最近有成員異動？" },
        { ask: "主要是跨時區讓大家感覺很孤立，連結感不足，另外最近有兩位新成員加入", steps: ["🌍 分析跨時區連結痛點與節奏差異", "🎯 篩選適合非同步與同步混合的活動", "👋 設計新成員融入加速方案", "📋 輸出低成本高頻率的循環士氣計畫"] }
      ],
      cn: [
        {
          ask: "帮我给分散在三个时区的 10 人远程开发团队策划一些提振士气的活动",
          say: "了解！在给建议之前，能先告诉我目前士气低落的主要原因吗？是工作压力、缺少归属感，还是最近有成员变动？"
        },
        {
          ask: "主要是跨时区让大家觉得很孤立，彼此的连接感不够，另外最近新来了两位成员",
          steps: ["🌍 分析跨时区连接痛点与节奏差异", "🎯 筛选适合异步与同步结合的活动", "👋 设计新成员融入的提速方案", "📋 输出低成本高频次的常态化士气计划"]
        }
      ],
      en: [
        { ask: "Help me plan morale-boosting activities for a 10-person remote dev team spread across three time zones", say: "Got it! Before I suggest ideas, can you share the main reason morale is low — work pressure, lack of belonging, or recent team changes?" },
        { ask: "Mainly the time zone spread makes everyone feel isolated, lacking connection, and two new members just joined", steps: ["🌍 Analyzing time zone connection pain points", "🎯 Filtering activities suitable for async + sync hybrid", "👋 Designing an accelerated new-member onboarding experience", "📋 Outputting a low-cost, high-frequency recurring morale plan"] }
      ]
    },
    title: { zh: "遠距開發團隊士氣提振活動計畫", cn: "远程开发团队士气提振活动计划", en: "Remote Dev Team Morale Boost Activity Plan" },
    data: {
      zh: [
        { lv: "m", cat: "連結感", tx: "導入「咖啡輪盤」：每兩週由系統隨機配對兩人進行 15 分鐘非工作話題視訊閒聊，有效打破跨時區的孤立感。" },
        { lv: "m", cat: "新人融入", tx: "為每位新成員安排一位「文化大使」，前三週每週進行 30 分鐘非正式一對一，協助快速建立人際脈絡與文化認同。" },
        { lv: "n", cat: "非同步肯定", tx: "在 Teams 建立「本週亮點牆」頻道：每週五每人具名分享一位隊友做得很棒的具體事蹟，增強非同步正向互動。" },
        { lv: "n", cat: "里程碑慶祝", tx: "每個 Sprint 結束後舉辦 10 分鐘「勝利回顧」線上聚會，公開表揚一個團隊共同成就，建立集體榮譽感。" }
      ],
      cn: [
        { lv: "m", cat: "连接感", tx: "引入“咖啡轮盘”：每两周由系统随机配对两个人，进行 15 分钟不聊工作的视频闲聊，有效打破跨时区带来的孤立感。" },
        { lv: "m", cat: "新人融入", tx: "给每位新成员安排一位“文化大使”，前三周每周做一次 30 分钟的非正式一对一，帮他们快速建立人脉和对团队文化的认同。" },
        { lv: "n", cat: "异步认可", tx: "在 Teams 建一个“本周亮点墙”频道：每周五每人实名分享一件队友做得很棒的具体事，增强异步的正向互动。" },
        { lv: "n", cat: "里程碑庆祝", tx: "每个 Sprint 结束后开一个 10 分钟的“胜利回顾”线上小聚，公开表扬一项团队共同取得的成果，营造集体荣誉感。" }
      ],
      en: [
        { lv: "m", cat: "Connection", tx: "Introduce 'Coffee Roulette': bi-weekly system-matched 15-minute casual video chats between two random team members on non-work topics — effectively breaks time zone isolation." },
        { lv: "m", cat: "New Member Fit", tx: "Assign each new member a 'Culture Ambassador' for weekly 30-minute informal one-on-ones during their first three weeks to rapidly build their network and cultural identity." },
        { lv: "n", cat: "Async Kudos", tx: "Create a 'Weekly Highlights Wall' channel in Teams: every Friday each member names one specific thing a teammate did well — strengthens positive async interaction." },
        { lv: "n", cat: "Milestone Cheer", tx: "Host a 10-minute 'Victory Recap' virtual gather at the end of each Sprint to publicly celebrate one shared team achievement and build collective pride." }
      ]
    },
    rec: {
      zh: "<b>建議：</b>先從「咖啡輪盤」和「本週亮點牆」開始，兩者均為低成本高頻率活動；四週後收集匿名反饋，再決定是否引入更多結構性活動。",
      cn: "<b>建议：</b>先从“咖啡轮盘”和“本周亮点墙”入手，这两个都是低成本、高频次的活动；四周后收集匿名反馈，再决定要不要引入更多结构化的活动。",
      en: "<b>Recommendation:</b> Start with Coffee Roulette and the Weekly Highlights Wall — both are low-cost and high-frequency. Collect anonymous feedback after four weeks before adding more structured programs."
    }
  },
  A048: {
    art: "table",
    turns: {
      zh: [
        { ask: "我想設計一場工作坊，幫行銷團隊學習用 Microsoft 365 Copilot 提升日常工作效率，大約半天時間", say: "很棒的主題！讓我先收集幾個關鍵資訊：① 預計人數與學員的 Copilot 使用經驗？② 線上、實體還是混合形式？③ 工作坊結束後你最希望學員能立刻做到哪一件事？" },
        { ask: "約 12 人，大多剛開始接觸 Copilot，實體進行，希望他們能立刻在 Teams 和 Outlook 中實際操作", steps: ["🎯 訂定 2–3 個 SMART 學習目標", "📐 規劃計時議程與教材清單", "🎮 設計每段至少一個互動活動", "📝 撰寫主持講稿與準備清單"] }
      ],
      cn: [
        {
          ask: "我想给营销团队办一场工作坊，教他们用 Microsoft 365 Copilot 提升日常工作效率，大概半天时间",
          say: "选题很不错！我先了解几个关键信息：① 预计多少人参加，学员的 Copilot 使用经验如何？② 线上、线下还是混合形式？③ 工作坊结束后，你最希望学员马上能上手的是哪件事？"
        },
        {
          ask: "大概 12 人，大多刚开始接触 Copilot，线下进行，希望他们能马上在 Teams 和 Outlook 里实际动手操作",
          steps: ["🎯 定 2–3 个 SMART 学习目标", "📐 规划计时议程与教材清单", "🎮 每段设计至少一个互动", "📝 编写主持讲稿与准备清单"]
        }
      ],
      en: [
        { ask: "I want to design a half-day workshop helping the marketing team boost daily productivity with Microsoft 365 Copilot", say: "Great topic! Let me gather a few key details: ① Expected headcount and participants' Copilot experience level? ② In-person, online, or hybrid? ③ What is the one thing you most want participants to be able to do immediately after the workshop?" },
        { ask: "About 12 people, most are just starting with Copilot, in-person format, want them to immediately use Copilot in Teams and Outlook", steps: ["🎯 Setting 2–3 SMART learning objectives", "📐 Designing the timed agenda and materials list", "🎮 Building at least one interactive activity per segment", "📝 Writing the facilitator script and prep checklist"] }
      ]
    },
    title: { zh: "Copilot 行銷團隊工作坊設計方案（半天）", cn: "Copilot 营销团队工作坊设计方案（半天）", en: "Copilot Marketing Team Workshop Design (Half-Day)" },
    data: {
      zh: {
        head: ["時段", "主題", "核心互動活動", "重要度"],
        rows: [
          ["09:00–09:20", "破冰 × Copilot 初體驗", "用 Copilot 在 30 秒內產一封自我介紹信，現場分享結果", "h"],
          ["09:20–10:10", "Teams 實戰：會議摘要與追蹤", "小組演練：AI 整理模擬會議記錄並修改成可發布版本", "h"],
          ["10:10–10:20", "休息 + 即興 Q&A", "便利貼蒐集「我還想學…」問題，供下半段即時調整", "l"],
          ["10:20–11:10", "Outlook 實戰：撰稿與摘要", "配對練習：用 Copilot 起草客戶跟進信並互評提示詞", "h"],
          ["11:10–11:30", "整合收尾 × 承諾行動", "每人寫下「這週要用 Copilot 做的一件事」貼於共用白板", "m"]
        ]
      },
      cn: {
        head: ["时段", "主题", "核心互动", "重要度"],
        rows: [
          ["09:00–09:20", "破冰 × Copilot 初体验", "用 Copilot 在 30 秒内生成一封自我介绍邮件，当场分享结果", "h"],
          ["09:20–10:10", "Teams 实战：会议纪要与跟进", "小组演练：让 AI 整理模拟会议记录，再改成可发布的版本", "h"],
          ["10:10–10:20", "休息 + 即兴 Q&A", "用便利贴收集“我还想学……”的问题，方便下半场随时调整", "l"],
          ["10:20–11:10", "Outlook 实战：写邮件与摘要", "两人一组：用 Copilot 起草客户跟进邮件，再互相点评提示词", "h"],
          ["11:10–11:30", "收尾整合 × 行动承诺", "每人写下“这周要用 Copilot 做的一件事”，贴到共享白板上", "m"]
        ]
      },
      en: {
        head: ["Time Slot", "Topic", "Core Interactive Activity", "Priority"],
        rows: [
          ["09:00–09:20", "Icebreaker × First Copilot Experience", "Use Copilot to draft a self-intro email in 30 seconds — share results live with the group", "h"],
          ["09:20–10:10", "Teams in Action: Meeting Summaries", "Group drill: AI organizes a mock meeting record; teams edit it into a publishable version", "h"],
          ["10:10–10:20", "Break + Spontaneous Q&A", "Sticky notes collect 'I want to learn...' questions to adjust the second half in real time", "l"],
          ["10:20–11:10", "Outlook in Action: Drafting & Summarizing", "Pair exercise: draft a client follow-up email with Copilot and peer-review each other's prompts", "h"],
          ["11:10–11:30", "Integration Wrap-up × Commitment Action", "Each participant writes 'One thing I will use Copilot for this week' on the shared whiteboard", "m"]
        ]
      }
    },
    rec: {
      zh: "<b>建議：</b>工作坊結束兩週後發送三題問卷，詢問學員是否真的在工作中使用了 Copilot 並收集最常遭遇的障礙，作為下一場工作坊的改善依據。",
      cn: "<b>建议：</b>工作坊结束两周后发一份三道题的问卷，问问学员有没有真的在工作里用起 Copilot，并收集他们最常遇到的卡点，作为下一场工作坊的改进依据。",
      en: "<b>Recommendation:</b> Send a three-question survey two weeks after the workshop asking whether participants have actually used Copilot at work and what barriers they encountered — use this to improve the next session."
    }
  },
  A052: {
    art: "brief",
    turns: {
      zh: [
        { ask: "我要把上季五封專案信件和兩份試算表，整合成一份董事會等級的摘要簡報，該用 Copilot Chat 還是 Copilot Cowork？", say: "好問題！讓我問你兩個關鍵問題：① 你期望的產出是一份完整的 PowerPoint 簡報，還是文字摘要就夠了？② 這是一次性任務，還是以後每季都要重複執行？" },
        { ask: "需要完整的 PowerPoint 簡報，這次是一次性任務，但若效果好可能變成每季固定流程", steps: ["🔍 依六個面向評估任務特性", "⚖️ 對照工具選用決策框架評分", "🧭 得出三選一的明確結論", "📋 產出現成可用的執行 Prompt"] }
      ],
      cn: [
        {
          ask: "我想把上季度的五封项目邮件和两份电子表格，整合成一份给董事会看的摘要演示文稿，该用 Copilot Chat 还是 Copilot Cowork？",
          say: "问得好！我先问你两个关键问题：① 你要的成果是一份完整的 PowerPoint 演示文稿，还是文字摘要就够了？② 这是一次性的活儿，还是以后每个季度都要重复做？"
        },
        {
          ask: "要完整的 PowerPoint 演示文稿，这次是一次性的，但如果效果好，以后可能每个季度固定这么做",
          steps: ["🔍 从六个维度评估任务特点", "⚖️ 对照工具选用决策框架打分", "🧭 给出三选一的明确结论", "📋 输出可直接用的执行 Prompt"]
        }
      ],
      en: [
        { ask: "I need to turn five project emails and two spreadsheets from last quarter into a board-level summary presentation — Copilot Chat or Copilot Cowork?", say: "Great question! Let me ask two key things: ① Is the expected output a full PowerPoint presentation, or is a text summary sufficient? ② Is this a one-time task, or will you repeat it every quarter?" },
        { ask: "Need a complete PowerPoint presentation, it is a one-time task but may become a regular quarterly process if it works well", steps: ["🔍 Evaluating task characteristics across six dimensions", "⚖️ Scoring against the tool selection decision framework", "🧭 Arriving at one of three clear conclusions", "📋 Generating a ready-to-use execution Prompt"] }
      ]
    },
    title: { zh: "Copilot 工具選用分析：董事會摘要簡報任務", cn: "Copilot 工具选用分析：董事会摘要演示文稿任务", en: "Copilot Tool Selection Analysis: Board Summary Presentation Task" },
    data: {
      zh: [
        { lv: "m", cat: "工具結論", tx: "✅ 建議使用 Copilot Cowork：此任務需跨 Outlook、Excel、PowerPoint 三個 App 端到端整合，已超出單一 Chat 對話的合理處理範疇。" },
        { lv: "m", cat: "執行提示", tx: "委派給 Cowork：「請讀取 Outlook 中標題含『Q3 專案』的五封信件，以及 OneDrive 的 Q3_data.xlsx，整合成一份 8 頁的 PowerPoint 董事會摘要，每頁一個核心洞察。」" },
        { lv: "n", cat: "翻轉因素", tx: "若無 Cowork 授權或期限緊迫，可退而使用 Copilot Chat（2–3 個 Prompt 序列）：先在 Word 整理摘要，再手動匯入 PowerPoint 補充視覺化。" },
        { lv: "n", cat: "未來規劃", tx: "若此工作流程固定化，建議在 Cowork 儲存為循環委派範本，未來每季只需更換檔案連結，大幅縮短重複執行時間。" }
      ],
      cn: [
        {
          lv: "m",
          cat: "工具结论",
          tx: "✅ 建议用 Copilot Cowork：这个任务要跨 Outlook、Excel、PowerPoint 三个 App 做端到端整合，已经超出单次 Chat 对话能处理的合理范围。"
        },
        {
          lv: "m",
          cat: "执行提示",
          tx: "交给 Cowork：“请读取 Outlook 里标题含‘Q3 项目’的五封邮件，以及 OneDrive 上的 Q3_data.xlsx，整合成一份 8 页的 PowerPoint 董事会摘要，每页讲一个核心洞察。”"
        },
        {
          lv: "n",
          cat: "变数",
          tx: "如果没有 Cowork 许可，或者时间太紧，可以退一步用 Copilot Chat（连着写 2–3 个 Prompt）：先在 Word 里整理摘要，再手动导入 PowerPoint 补上可视化。"
        },
        { lv: "n", cat: "后续规划", tx: "如果这套流程要固定下来，建议在 Cowork 里存成循环委派模板，以后每个季度只需换一下文件链接，能大幅缩短重复操作的时间。" }
      ],
      en: [
        { lv: "m", cat: "Tool Choice", tx: "✅ Use Copilot Cowork: this task requires end-to-end integration across Outlook, Excel, and PowerPoint — it exceeds what a single Chat conversation can reasonably handle." },
        { lv: "m", cat: "Exec Prompt", tx: "Delegate to Cowork: 'Read the five Outlook emails with subject containing Q3 Project and OneDrive Q3_data.xlsx. Combine into an 8-page PowerPoint board summary with one core insight per slide.'" },
        { lv: "n", cat: "Flip Factor", tx: "If you lack Cowork access or the deadline is tight, fall back to Copilot Chat (2–3 Prompt sequence): summarize in Word first, then manually import and add visuals in PowerPoint." },
        { lv: "n", cat: "Future Plan", tx: "If this workflow becomes recurring, save it as a Cowork recurring delegate template — future quarters only require swapping the file links, dramatically reducing repeat execution time." }
      ]
    },
    rec: {
      zh: "<b>建議：</b>首次執行後記錄所用 Prompt 與產出品質；若滿意則建立循環委派範本，若品質不穩定則記下需人工調整的步驟，逐步優化指令。",
      cn: "<b>建议：</b>第一次做完后，把用到的 Prompt 和产出质量记录下来；满意就存成循环委派模板，质量不稳定就记下需要人工调整的环节，慢慢把指令打磨好。",
      en: "<b>Recommendation:</b> After your first run, log the Prompt used and rate the output quality. If satisfied, save as a recurring Cowork template; if quality is inconsistent, note the manual touchpoints and refine the instruction iteratively."
    }
  },

A006: {
    art: "brief",
    turns: {
      zh: [
        { ask: "我有一份上週 Copilot Studio 工作坊的會議記錄，想把它轉成可以分享給全團隊的知識文章。", say: "好的！請問您希望產出哪種格式——（1）重點摘要、（2）測驗題、（3）應用提示，還是三者的組合？" },
        { ask: "請給我重點摘要加應用提示的組合。", steps: ["解析會議記錄結構", "辨識核心學習重點"] },
        { ask: "看起來很棒，請輸出完整知識文章。", steps: ["整理應用提示段落", "生成 Markdown 知識文章"] }
      ],
      cn: [
        {
          ask: "我这有一份上周 Copilot Studio 工作坊的会议记录，想把它整理成能分享给全团队的知识文章。",
          say: "好的！请问你想要哪种格式——（1）要点摘要、（2）测验题、（3）应用建议，还是三者组合？"
        },
        { ask: "给我要点摘要加应用建议的组合吧。", steps: ["解析会议记录结构", "识别核心学习要点"] },
        { ask: "看着不错，把完整的知识文章输出给我吧。", steps: ["整理应用建议段落", "生成 Markdown 知识文章"] }
      ],
      en: [
        { ask: "I have meeting notes from last week's Copilot Studio workshop and want to turn them into a shareable knowledge article.", say: "Great! What output format would you prefer — (1) Key summary, (2) Quiz questions, (3) Application tips, or a combination?" },
        { ask: "Please give me a key summary combined with application tips.", steps: ["Parse meeting notes structure", "Identify core learning points"] },
        { ask: "This looks great — please output the full knowledge article.", steps: ["Compile application tips section", "Generate Markdown knowledge article"] }
      ]
    },
    title: { zh: "Copilot Studio 工作坊知識萃取報告", cn: "Copilot Studio 工作坊知识萃取报告", en: "Copilot Studio Workshop Knowledge Extraction Report" },
    data: {
      zh: [
        { lv: "m", cat: "核心概念", tx: "Copilot Studio 可在無程式碼介面中建立自訂 AI 代理人，快速對應各業務場景的落地需求。" },
        { lv: "m", cat: "最佳實務", tx: "設計對話流程前，應先明確定義使用者意圖，可大幅降低後期維護成本。" },
        { lv: "n", cat: "應用提示", tx: "從單一部門的小規模試行出發，收集回饋後再逐步擴展至全公司部署。" },
        { lv: "n", cat: "延伸學習", tx: "整合 Power Automate 可讓代理人跨系統執行端對端自動化，顯著擴充套用場景。" }
      ],
      cn: [
        { lv: "m", cat: "核心概念", tx: "Copilot Studio 能在零代码界面里搭建自定义 AI Agent，快速匹配各类业务场景的落地需求。" },
        { lv: "m", cat: "最佳实践", tx: "设计对话流程前，先把用户意图定义清楚，能大幅降低后期的维护成本。" },
        { lv: "n", cat: "应用建议", tx: "先从单个部门小范围试点做起，收集反馈后再逐步推广到全公司。" },
        { lv: "n", cat: "延伸学习", tx: "接入 Power Automate，可以让 Agent 跨系统跑端到端自动化，明显拓宽应用场景。" }
      ],
      en: [
        { lv: "m", cat: "Core Concept", tx: "Copilot Studio enables building custom AI agents in a no-code interface for rapid deployment across business scenarios." },
        { lv: "m", cat: "Best Practice", tx: "Define user intents clearly before designing conversation flows to significantly reduce long-term maintenance effort." },
        { lv: "n", cat: "Application Tip", tx: "Start with a small departmental pilot, collect feedback, then gradually scale to company-wide deployment." },
        { lv: "n", cat: "Further Learning", tx: "Integrating Power Automate extends agent automation capabilities for end-to-end cross-system workflows." }
      ]
    },
    rec: {
      zh: "<b>建議：</b>將萃取完成的知識文章上傳至 SharePoint 知識庫，並標記工作坊日期，方便日後追蹤知識演進。",
      cn: "<b>建议：</b>把整理好的知识文章上传到 SharePoint 知识库，并标上工作坊日期，方便以后追踪知识的更新迭代。",
      en: "<b>Recommendation:</b> Upload the extracted knowledge article to SharePoint, tag it with the workshop date, and enable version tracking so knowledge evolution can be traced over time."
    }
  },
  A010: {
    art: "table",
    turns: {
      zh: [
        { ask: "我在 HR 部門，每月要花兩天手動審查員工回饋問卷，想了解 AI 可以怎麼幫我。", say: "了解！請問問卷主要是什麼形式——開放式文字、量表選項，還是混合制？目前每月大概要處理多少份？" },
        { ask: "以混合制為主，每月約 200 份，最頭痛的是把結果整理成月報這個步驟。", steps: ["診斷流程痛點與瓶頸", "評估適用 AI 解決方案"] },
        { ask: "請給我一份優先建議清單。", steps: ["比對 Microsoft 365 Copilot 功能", "產出行動優先建議表"] }
      ],
      cn: [
        {
          ask: "我在 HR 部门，每个月要花两天手动看员工反馈问卷，想了解 AI 能怎么帮我。",
          say: "明白！想先确认下问卷是啥形式——纯文字开放题、量表打分，还是两者混着来？另外现在每个月大概要处理几份？"
        },
        { ask: "主要是混合的，每个月大概 200 份，最头疼的是把结果整理成月报这一步。", steps: ["诊断流程痛点与瓶颈", "评估适用的 AI 方案"] },
        { ask: "给我一份按优先级排的建议清单吧。", steps: ["对照 Microsoft 365 Copilot 功能", "输出行动优先级建议表"] }
      ],
      en: [
        { ask: "I work in HR and spend two full days each month manually reviewing employee feedback surveys. I want to know how AI can help.", say: "Understood! What format are the surveys mostly in — open-ended text, rating scales, or a mix? And roughly how many do you process per month?" },
        { ask: "Mostly a mix, around 200 per month. The biggest bottleneck is compiling them into a monthly report.", steps: ["Diagnose workflow pain points", "Evaluate applicable AI solutions"] },
        { ask: "Please give me a prioritized list of recommendations.", steps: ["Map to Microsoft 365 Copilot capabilities", "Output prioritized action recommendations"] }
      ]
    },
    title: { zh: "HR 員工回饋流程 AI 優化建議", cn: "HR 员工反馈流程 AI 优化建议", en: "HR Feedback Workflow AI Optimization Recommendations" },
    data: {
      zh: {
        head: ["解決方案", "解決的痛點", "建議工具", "優先度"],
        rows: [
          ["自動主題分群", "手動分類問卷耗時費力", "Copilot in Excel", "h"],
          ["情感傾向摘要", "難以快速量化主觀文字回饋", "Copilot Studio 自訂代理人", "h"],
          ["月報草稿自動產出", "彙整報告需反覆重工", "Copilot in Word", "m"],
          ["即時問卷結果摘要", "需等待完整收集才能分析", "Forms + Copilot", "m"],
          ["跨月趨勢比較", "難以橫向對比歷史回饋資料", "Copilot in Excel", "l"]
        ]
      },
      cn: {
        head: ["解决方案", "解决的痛点", "建议工具", "优先级"],
        rows: [
          ["自动主题聚类", "手动给问卷分类费时费力", "Copilot in Excel", "h"],
          ["情感倾向摘要", "主观文字反馈难以快速量化", "Copilot Studio 自定义 Agent", "h"],
          ["月报草稿自动生成", "汇总报告要反复返工", "Copilot in Word", "m"],
          ["实时问卷结果摘要", "要等全部收齐才能分析", "Forms + Copilot", "m"],
          ["跨月趋势对比", "历史反馈数据不好横向对比", "Copilot in Excel", "l"]
        ]
      },
      en: {
        head: ["Solution", "Pain Point Addressed", "Recommended Tool", "Priority"],
        rows: [
          ["Auto topic clustering", "Manual survey categorization is time-consuming", "Copilot in Excel", "h"],
          ["Sentiment summary", "Hard to quickly quantify subjective text feedback", "Custom Copilot Studio agent", "h"],
          ["Monthly report draft", "Report compilation requires repetitive rework", "Copilot in Word", "m"],
          ["Real-time survey summary", "Must wait for full collection before analysis", "Forms + Copilot", "m"],
          ["Cross-month trend charts", "Hard to compare feedback across months", "Copilot in Excel", "l"]
        ]
      }
    },
    rec: {
      zh: "<b>建議：</b>優先導入 Copilot in Excel 處理主題分群，預計可將報告整理時間從兩天縮短至半天以內。",
      cn: "<b>建议：</b>先上 Copilot in Excel 来做主题聚类，预计能把报告整理时间从两天压缩到半天以内。",
      en: "<b>Recommendation:</b> Prioritize deploying Copilot in Excel for topic clustering — this alone is expected to cut report preparation time from two days to half a day."
    }
  },
  A016: {
    art: "brief",
    turns: {
      zh: [
        { ask: "我有一封要寄給大客戶採購副總的提案邀請信草稿，語氣不確定是否恰當，想請你審閱。", say: "沒問題！請問這封信的主要目標是什麼——邀約會議、介紹提案，還是後續跟進？方便貼上草稿嗎？" },
        { ask: "目標是邀請對方參加下週的解決方案簡報，草稿如下：[提案邀請信草稿]", steps: ["分析語氣與清晰度", "檢查結構與邏輯流暢性"] },
        { ask: "請給我具體的逐點修改建議。", steps: ["標注需改進之處", "提供逐句改寫範例"] }
      ],
      cn: [
        {
          ask: "我有一封要发给大客户采购副总的方案邀请邮件草稿，不太确定语气合不合适，想请你帮忙看看。",
          say: "没问题！请问这封邮件主要想达到什么目的——约见面、介绍方案，还是后续跟进？方便把草稿粘贴过来吗？"
        },
        { ask: "目的是邀请对方参加下周的解决方案汇报，草稿如下：[方案邀请邮件草稿]", steps: ["分析语气与清晰度", "检查结构与逻辑连贯性"] },
        { ask: "给我具体的逐条修改建议吧。", steps: ["标注需要改进的地方", "提供逐句改写示例"] }
      ],
      en: [
        { ask: "I have a draft invitation email for a key client's VP of Procurement and I'm not sure the tone is right. Can you review it?", say: "Of course! What is the main goal of the email — scheduling a meeting, presenting a proposal, or following up? Could you paste the draft?" },
        { ask: "The goal is to invite them to a solution presentation next week. Here's the draft: [invitation email draft]", steps: ["Analyze tone and clarity", "Check structure and logical flow"] },
        { ask: "Please give me specific line-by-line revision suggestions.", steps: ["Highlight areas needing improvement", "Provide rewrite examples for each issue"] }
      ]
    },
    title: { zh: "提案邀請信校稿報告", cn: "方案邀请邮件校对报告", en: "Proposal Invitation Email Proofreading Report" },
    data: {
      zh: [
        { lv: "m", cat: "語氣調整", tx: "開頭過於謙遜，建議改為自信且尊重的語調，例如將「冒昧打擾」替換為直接陳述拜訪目的。" },
        { lv: "m", cat: "段落結構", tx: "核心價值主張應移至第一段，讓讀者在三秒內了解這封信的價值，避免在後段流失注意力。" },
        { lv: "n", cat: "行動呼籲", tx: "CTA 不夠明確，建議加入具體簡報日期、時間與確認方式，降低對方的決策摩擦。" },
        { lv: "n", cat: "用詞精簡", tx: "兩處冗長複合句建議拆為短句，提升閱讀速度，符合 C-level 對象的閱讀習慣。" }
      ],
      cn: [
        { lv: "m", cat: "语气调整", tx: "开头太谦卑了，建议改成自信又不失尊重的语气，比如把“冒昧打扰”换成直接说明来意。" },
        { lv: "m", cat: "段落结构", tx: "核心价值点应该提到第一段，让对方三秒内就明白这封邮件的价值，别等到后面才说、注意力早跑了。" },
        { lv: "n", cat: "行动号召", tx: "CTA 不够明确，建议加上具体的汇报日期、时间和确认方式，降低对方决策的门槛。" },
        { lv: "n", cat: "用词精简", tx: "有两处又长又绕的复合句，建议拆成短句，读起来更快，也更符合 C-level 读者的阅读习惯。" }
      ],
      en: [
        { lv: "m", cat: "Tone", tx: "The opening is too deferential — replace 'Sorry to bother you' phrasing with a confident, respectful statement of purpose." },
        { lv: "m", cat: "Structure", tx: "The core value proposition should move to the first paragraph so the reader grasps the email's value within three seconds." },
        { lv: "n", cat: "Call to Action", tx: "The CTA is vague — add a specific date, time, and confirmation method to reduce the reader's decision friction." },
        { lv: "n", cat: "Conciseness", tx: "Two long compound sentences should be split into shorter ones to improve readability for C-level recipients on mobile." }
      ]
    },
    rec: {
      zh: "<b>建議：</b>依上述修改完成第二稿後，再送校一次確認語氣一致性，並確保主旨行能在行動裝置上完整顯示（建議 40 字元以內）。",
      cn: "<b>建议：</b>按上面的意见改完第二稿后，再校一遍确认语气统一，并确保邮件主题行在手机上能完整显示（建议控制在 40 个字符以内）。",
      en: "<b>Recommendation:</b> After applying the revisions, run a final tone-consistency check on the second draft, and ensure the subject line is within 40 characters for full mobile display."
    }
  },
  A020: {
    art: "table",
    turns: {
      zh: [
        { ask: "我下週要跟一家軟體供應商談年度授權續約，對方暗示今年會漲價，我需要準備談判策略。", say: "好的！為了制定最佳策略，請問：雙方是長期合作關係嗎？您的首要目標是控制漲幅、增加席位，還是爭取附加服務？" },
        { ask: "合作三年，主要目標是把漲幅壓在 5% 以內，同時爭取多兩個授權席位，不希望鎖定超過一年合約。", steps: ["分析己方籌碼與替代方案", "模擬對方可能的談判立場"] },
        { ask: "請給我完整的談判策略框架。", steps: ["設計開價與讓步序列", "產出策略行動對照表"] }
      ],
      cn: [
        {
          ask: "我下周要跟一家软件供应商谈年度授权续约，对方暗示今年要涨价，我得准备一套谈判策略。",
          say: "好的！为了定出最合适的策略，请问：双方是长期合作吗？你最优先的目标是控制涨幅、增加席位，还是争取附加服务？"
        },
        { ask: "合作三年了，主要目标是把涨幅压在 5% 以内，同时多争取两个授权席位，也不想签超过一年的合约。", steps: ["分析己方筹码与备选方案", "模拟对方可能的谈判立场"] },
        { ask: "给我一套完整的谈判策略框架吧。", steps: ["设计报价与让步节奏", "输出策略行动对照表"] }
      ],
      en: [
        { ask: "I need to renegotiate our annual software license renewal next week — the supplier is hinting at a price increase. I need a strategy.", say: "Understood! To build the best strategy: is this a long-term partnership? And what is your primary goal — capping the price increase, adding seats, or gaining extra services?" },
        { ask: "Three-year partnership. Main goal is to keep the increase under 5% and add two license seats without locking in more than one year.", steps: ["Analyze leverage points and alternatives", "Simulate likely supplier negotiation positions"] },
        { ask: "Please give me the full negotiation strategy framework.", steps: ["Design opening offer and concession sequence", "Output strategy action comparison table"] }
      ]
    },
    title: { zh: "軟體授權續約談判策略框架", cn: "软件授权续约谈判策略框架", en: "Software License Renewal Negotiation Strategy Framework" },
    data: {
      zh: {
        head: ["談判議題", "己方立場", "預期對方回應", "優先度"],
        rows: [
          ["年度漲幅上限", "目標 ≤5%，底線 8%", "以通膨為由要求 12%+", "h"],
          ["授權席位增加", "要求增加 2 席，費用含於現有合約金額內", "提議以折扣換長期鎖定", "h"],
          ["合約鎖定年限", "維持一年彈性，保留後續談判空間", "傾向要求鎖定三年", "m"],
          ["技術支援等級", "要求升級至優先回應 SLA", "視新增席位數量而定", "m"],
          ["付款條件", "爭取季付降低現金流壓力", "偏好年付以確保收入穩定", "l"]
        ]
      },
      cn: {
        head: ["谈判议题", "己方立场", "预计对方回应", "优先级"],
        rows: [
          ["年度涨幅上限", "目标 ≤5%，底线 8%", "以通胀为由要求 12%+", "h"],
          ["增加授权席位", "要求加 2 个席位，费用包含在现有合约金额里", "提出用折扣换长期绑定", "h"],
          ["合约绑定年限", "保持一年的灵活性，给后续谈判留空间", "倾向要求绑定三年", "m"],
          ["技术支持等级", "要求升级到优先响应 SLA", "看新增席位数量而定", "m"],
          ["付款方式", "争取按季付款，缓解现金流压力", "更倾向年付以稳定收入", "l"]
        ]
      },
      en: {
        head: ["Negotiation Issue", "Our Position", "Expected Supplier Response", "Priority"],
        rows: [
          ["Annual price increase", "Target ≤5%, walkaway at 8%", "Will cite inflation to demand 12%+", "h"],
          ["License seat addition", "Add 2 seats included in current contract value", "Will offer discount in exchange for long-term lock-in", "h"],
          ["Contract lock-in period", "Maintain one-year flexibility, preserve future leverage", "Will push for three-year commitment", "m"],
          ["Technical support tier", "Request upgrade to priority-response SLA", "Contingent on total seat count", "m"],
          ["Payment terms", "Seek quarterly payments to ease cash flow", "Prefers annual prepayment for revenue certainty", "l"]
        ]
      }
    },
    rec: {
      zh: "<b>建議：</b>談判開始前，先取得一至兩家替代供應商的報價作為具體籌碼——即使不打算更換，也能有效強化您的議價地位。",
      cn: "<b>建议：</b>谈判前先拿到一两家备选供应商的报价当筹码——就算你根本不打算换，也能实实在在地抬高你的议价底气。",
      en: "<b>Recommendation:</b> Before negotiations, obtain quotes from one or two alternative suppliers as concrete leverage — even without intent to switch, this materially strengthens your bargaining position."
    }
  },
  A024: {
    art: "brief",
    turns: {
      zh: [
        { ask: "我們客服部門想了解 AI 在客服領域有哪些新興趨勢，以及怎麼應用到我們的團隊。", say: "很好的問題！請問您的客服主要透過哪些渠道（電話、即時聊天、Email）？目前最想改善的痛點是什麼？" },
        { ask: "主要是即時聊天和 Email，最大痛點是重複性問題占比過高，拖慢了複雜案件的處理速度。", steps: ["掃描客服 AI 趨勢資料庫", "比對現況與趨勢缺口"] },
        { ask: "請整理出可以立刻行動的創新建議。", steps: ["合成趨勢洞察", "轉化為具體行動方案"] }
      ],
      cn: [
        {
          ask: "我们客服部门想了解 AI 在客服这块有哪些新趋势，以及怎么用到我们团队上。",
          say: "问得好！请问你们客服主要走哪些渠道（电话、在线聊天、Email）？目前最想解决的痛点是什么？"
        },
        { ask: "主要是在线聊天和 Email，最大的痛点是重复性问题占比太高，把复杂工单的处理速度都拖慢了。", steps: ["扫描客服 AI 趋势库", "对比现状与趋势差距"] },
        { ask: "帮我梳理出能马上落地的创新建议。", steps: ["汇总趋势洞察", "转化为具体行动方案"] }
      ],
      en: [
        { ask: "Our customer service team wants to know about emerging AI trends in customer service and how to apply them.", say: "Great question! What are your team's primary channels — phone, live chat, email? And what is the biggest pain point you most want to address?" },
        { ask: "Mainly live chat and email. The biggest issue is that repetitive questions take up too much capacity, slowing complex case resolution.", steps: ["Scan customer service AI trend database", "Map current state against trend gaps"] },
        { ask: "Please compile actionable innovation recommendations we can act on right away.", steps: ["Synthesize trend insights", "Translate into concrete action plans"] }
      ]
    },
    title: { zh: "客服 AI 創新趨勢雷達報告", cn: "客服 AI 创新趋势雷达报告", en: "Customer Service AI Innovation Trend Radar Report" },
    data: {
      zh: [
        { lv: "m", cat: "即時趨勢", tx: "生成式 AI 自動回覆已可有效處理大量標準查詢，顯著釋放客服人員處理複雜案件的產能。" },
        { lv: "m", cat: "優先行動", tx: "部署 Copilot Studio 建立知識庫驅動的 FAQ 代理人，優先覆蓋最頻繁的重複問題類別。" },
        { lv: "n", cat: "深層趨勢", tx: "即時情感偵測技術已能識別高挫折感對話，並自動升級至資深客服，有效提升化解率。" },
        { lv: "n", cat: "協作策略", tx: "設計人機協作分流機制——AI 處理初層篩選與標準回覆，人工聚焦於高價值複雜案件。" }
      ],
      cn: [
        { lv: "m", cat: "当下趋势", tx: "生成式 AI 自动回复已经能高效处理大量标准咨询，明显把客服的精力释放出来去处理复杂工单。" },
        { lv: "m", cat: "优先行动", tx: "用 Copilot Studio 搭建一个知识库驱动的 FAQ Agent，优先覆盖最高频的重复问题类别。" },
        { lv: "n", cat: "深层趋势", tx: "实时情绪识别技术已经能识别出高不满情绪的对话，并自动转给资深客服，有效提升问题化解率。" },
        { lv: "n", cat: "协作策略", tx: "设计一套人机协作的分流机制——AI 负责初步筛选和标准回复，人工集中精力处理高价值的复杂工单。" }
      ],
      en: [
        { lv: "m", cat: "Immediate Trend", tx: "Generative AI auto-reply can effectively handle a high share of standard queries, significantly freeing up agent capacity for complex cases." },
        { lv: "m", cat: "Priority Action", tx: "Deploy a Copilot Studio knowledge-base-driven FAQ agent, prioritizing the most frequent repetitive query categories." },
        { lv: "n", cat: "Deeper Trend", tx: "Real-time sentiment detection can identify high-frustration conversations and auto-escalate to senior agents, improving resolution rates." },
        { lv: "n", cat: "Collab Strategy", tx: "Design a human-AI routing mechanism: AI handles tier-1 screening and standard replies; agents focus on high-value complex cases." }
      ]
    },
    rec: {
      zh: "<b>建議：</b>先以三個月試行期部署 FAQ 代理人，追蹤重複問題處理率的變化，用數據說服內部利害關係人擴大後續投資。",
      cn: "<b>建议：</b>先按三个月的试点期上线 FAQ Agent，盯住重复问题处理率的变化，用数据说服公司内部相关方追加后续投入。",
      en: "<b>Recommendation:</b> Run a 90-day FAQ agent pilot, track the change in repetitive query handling rate, and use the data to build the internal business case for broader investment."
    }
  },
  A028: {
    art: "brief",
    turns: {
      zh: [
        { ask: "下個月我要在全員大會上報告新產品線發表，想讓簡報更有說服力，目前結構偏向功能列表，比較像說明書。", say: "很好的出發點！請問聽眾構成是什麼（高層、業務、工程、全員混合）？這場簡報最終希望讓聽眾做什麼或感受到什麼？" },
        { ask: "聽眾是全員，包含非技術背景同仁，目標是讓他們對新產品感到興奮並願意主動介紹給客戶。", steps: ["診斷現有結構弱點", "套用英雄之旅故事骨架"] },
        { ask: "請給我具體的改善建議清單。", steps: ["設計情境開場鉤子", "產出故事弧優化建議"] }
      ],
      cn: [
        {
          ask: "下个月我要在全员大会上介绍新产品线发布，想让演示更有说服力，现在的结构偏功能罗列，看着更像说明书。",
          say: "出发点很好！请问听众都有哪些人（高管、销售、研发，还是全员混合）？这场演示最终想让大家做什么、或者感受到什么？"
        },
        { ask: "听众是全员，包括不少非技术背景的同事，目标是让他们对新产品感到兴奋，愿意主动推荐给客户。", steps: ["诊断现有结构的短板", "套用英雄之旅故事框架"] },
        { ask: "给我一份具体的改进建议清单吧。", steps: ["设计场景化开场钩子", "输出故事弧优化建议"] }
      ],
      en: [
        { ask: "Next month I'm presenting a new product line launch at an all-hands meeting. The current deck reads like a spec sheet — I want it to be more persuasive.", say: "Great starting point! Who is your audience — executives, sales, engineering, or a full mix? And what is the single outcome you want them to leave with?" },
        { ask: "It's all employees including non-technical staff. I want them excited about the product and eager to recommend it to customers.", steps: ["Diagnose current structure weaknesses", "Apply Hero's Journey story framework"] },
        { ask: "Please give me specific improvement recommendations.", steps: ["Design a situational opening hook", "Output story arc optimization suggestions"] }
      ]
    },
    title: { zh: "產品發表全員大會故事力優化報告", cn: "产品发布全员大会故事力优化报告", en: "Product Launch All-Hands Storytelling Improvement Report" },
    data: {
      zh: [
        { lv: "m", cat: "故事結構", tx: "將「功能列表」架構改為「英雄之旅」——先描繪使用者的現實痛點，再呈現產品帶來的轉化時刻。" },
        { lv: "m", cat: "開場設計", tx: "用一個真實客戶情境（匿名化處理）作為開場鉤子，比數據圖表更能觸發情感共鳴。" },
        { lv: "n", cat: "語言策略", tx: "對非技術聽眾，每個功能後接一句「這代表你可以...」，將技術特性轉化為個人具體利益。" },
        { lv: "n", cat: "收尾設計", tx: "簡報結尾應以明確行動號召收場而非技術規格摘要，讓聽眾帶著「下一步」離開會場。" }
      ],
      cn: [
        { lv: "m", cat: "故事结构", tx: "把“功能罗列”式的结构改成“英雄之旅”——先描绘用户真实的痛点，再呈现产品带来的转变时刻。" },
        { lv: "m", cat: "开场设计", tx: "用一个真实的客户场景（做匿名化处理）当开场钩子，比数据图表更能引发情感共鸣。" },
        { lv: "n", cat: "语言策略", tx: "面对非技术听众，每讲一个功能就接一句“这意味着你可以……”，把技术特性翻译成对个人的实际好处。" },
        { lv: "n", cat: "收尾设计", tx: "演示结尾要用明确的行动号召来收场，而不是技术规格总结，让听众带着“下一步该做什么”离开会场。" }
      ],
      en: [
        { lv: "m", cat: "Story Structure", tx: "Reframe from 'feature list' to 'Hero's Journey': open with the user's real-world pain, then reveal the product as the transformative turning point." },
        { lv: "m", cat: "Opening Design", tx: "Use a real customer scenario (anonymized) as your opening hook — it triggers emotional resonance far more effectively than data charts." },
        { lv: "n", cat: "Language Strategy", tx: "For non-technical audiences, follow each feature with a 'This means you can...' sentence — convert specs into personal benefits." },
        { lv: "n", cat: "Closing Design", tx: "End with a clear call to action, not a spec summary — give attendees a specific next step to leave the room with." }
      ]
    },
    rec: {
      zh: "<b>建議：</b>先對兩至三位不同背景的同事進行非正式排練，收集「最令你印象深刻的一句話」，以此驗證故事鉤子是否有效。",
      cn: "<b>建议：</b>先找两三位不同背景的同事做一次非正式的试讲，收集“最让你印象深刻的一句话”，用它来验证故事钩子到底管不管用。",
      en: "<b>Recommendation:</b> Run an informal rehearsal with two or three colleagues from different roles and ask each for 'the one sentence that stuck.' Use their answers to validate whether the story hook lands."
    }
  },
  A032: {
    art: "table",
    turns: {
      zh: [
        { ask: "請幫我用波特五力分析雲端運算服務產業，以現有大型服務商的視角，聚焦在企業級市場。", say: "了解！在開始分析之前，請確認範疇：地理範圍是全球市場還是特定區域？分析結果主要用於策略報告還是投資評估？" },
        { ask: "全球市場為主，用途是內部策略報告。", steps: ["研究各力道強度指標", "評估各力道間的相互影響"] },
        { ask: "請產出完整的五力分析結果。", steps: ["量化各力道威脅程度", "產出策略洞察與行動建議"] }
      ],
      cn: [
        {
          ask: "帮我用波特五力分析一下云计算服务行业，站在现有大型服务商的视角，重点看企业级市场。",
          say: "了解！开始分析前先确认一下范围：地理上是看全球市场还是某个特定区域？分析结果主要用来做战略报告还是投资评估？"
        },
        { ask: "以全球市场为主，用于内部战略报告。", steps: ["研究各作用力的强度指标", "评估各作用力之间的相互影响"] },
        { ask: "把完整的五力分析结果输出给我吧。", steps: ["量化各作用力的威胁程度", "输出战略洞察与行动建议"] }
      ],
      en: [
        { ask: "Please analyze the cloud computing services industry using Porter's Five Forces, from the perspective of major incumbent providers in the enterprise market.", say: "Understood! Before I begin, please confirm scope: global market or a specific region? And will this be used for a strategy report or investment evaluation?" },
        { ask: "Global market, for an internal strategy report.", steps: ["Research force intensity indicators", "Assess inter-force dynamics"] },
        { ask: "Please output the full Five Forces analysis.", steps: ["Quantify threat level per force", "Generate strategic insights and action recommendations"] }
      ]
    },
    title: { zh: "雲端運算產業波特五力分析（企業級市場）", cn: "云计算行业波特五力分析（企业级市场）", en: "Cloud Computing Industry Porter's Five Forces Analysis (Enterprise Market)" },
    data: {
      zh: {
        head: ["競爭力道", "主要驅動因素", "策略意涵", "威脅強度"],
        rows: [
          ["現有競爭者對抗", "少數大型服務商主導，差異化策略向 AI 整合服務轉移", "價格競爭激烈，平台差異化是存活關鍵", "h"],
          ["新進者威脅", "資本與技術門檻極高，大幅限制新業者進入", "短期內顛覆性新進者出現機率有限", "l"],
          ["替代品威脅", "混合雲與私有雲方案持續吸引部分企業客戶", "須強化平台遷移黏著度與轉換成本", "m"],
          ["買家議價能力", "大型企業客戶具強議價力，要求客製化 SLA", "長期合約鎖定為主要因應策略", "h"],
          ["供應商議價能力", "半導體與資料中心基礎設施供應高度集中", "供應鏈多元化為優先戰略議題", "m"]
        ]
      },
      cn: {
        head: ["竞争作用力", "主要驱动因素", "战略含义", "威胁强度"],
        rows: [
          ["现有竞争者的对抗", "少数大型服务商主导，差异化打法正往 AI 整合服务转移", "价格战激烈，平台差异化是活下去的关键", "h"],
          ["新进入者的威胁", "资金和技术门槛极高，把新玩家挡在门外", "短期内出现颠覆性新玩家的概率有限", "l"],
          ["替代品的威胁", "混合云和私有云方案还在持续吸引一部分企业客户", "要加强平台迁移的粘性和替换成本", "m"],
          ["买方的议价能力", "大型企业客户议价能力强，会要求定制化 SLA", "主要靠长期合约绑定来应对", "h"],
          ["供应商的议价能力", "半导体和数据中心基础设施的供应高度集中", "供应链多元化是优先级最高的战略议题", "m"]
        ]
      },
      en: {
        head: ["Competitive Force", "Key Drivers", "Strategic Implication", "Threat Level"],
        rows: [
          ["Rivalry among incumbents", "A few major providers dominate; differentiation shifting to AI integration", "Price competition intense; platform differentiation is critical", "h"],
          ["Threat of new entrants", "Extremely high capital and technical barriers restrict new entry", "Disruptive new entrants are limited in the near term", "l"],
          ["Threat of substitutes", "Hybrid and private cloud solutions continue to attract some enterprise clients", "Platform stickiness and switching costs must be strengthened", "m"],
          ["Bargaining power of buyers", "Large enterprises command strong pricing leverage and demand custom SLAs", "Long-term contracts are the primary mitigation strategy", "h"],
          ["Bargaining power of suppliers", "Semiconductor and data center infrastructure supply is highly concentrated", "Supply chain diversification is a top strategic priority", "m"]
        ]
      }
    },
    rec: {
      zh: "<b>建議：</b>在競爭者對抗與買家議價能力均高的環境下，應優先投資垂直產業 AI 解決方案，建立競爭者難以快速複製的護城河。",
      cn: "<b>建议：</b>在竞争对抗和买方议价能力都很强的环境下，应该优先投入垂直行业的 AI 解决方案，筑起竞争对手难以快速复制的护城河。",
      en: "<b>Recommendation:</b> With both rivalry and buyer power running high, prioritize investment in vertical-industry AI solutions to build moats that are difficult for competitors to replicate quickly."
    }
  },
  A037: {
    art: "table",
    turns: {
      zh: [
        { ask: "請幫我草擬一份員工使用生成式 AI 工具的公司規範政策，我們約有 3,000 名員工。", say: "好的！在開始起草之前，請問：政策的基調偏向「允許但需揭露」還是「需事先審核」？是否需要對齊特定合規框架（如 GDPR、ISO 27001）？" },
        { ask: "採取「允許但需揭露」原則，需對齊公司現有的資料保護規範，暫不對齊外部標準。", steps: ["構建政策章節架構", "套用企業標準語氣範本"] },
        { ask: "請輸出完整的政策文件結構。", steps: ["填充各章節核心內容", "加入合規條款與審查機制"] }
      ],
      cn: [
        {
          ask: "帮我起草一份员工使用生成式 AI 工具的公司管理制度，我们大概有 3,000 名员工。",
          say: "好的！起草之前先问一下：制度的基调是偏“允许但需披露”，还是“需事先审批”？要不要对齐特定的合规框架（比如 GDPR、ISO 27001）？"
        },
        { ask: "采用“允许但需披露”的原则，要对齐公司现有的数据保护规范，外部标准暂时先不对齐。", steps: ["搭建制度章节框架", "套用企业标准语气模板"] },
        { ask: "把完整的制度文件结构输出给我吧。", steps: ["填充各章节的核心内容", "加入合规条款与审查机制"] }
      ],
      en: [
        { ask: "Please help me draft a company policy on employee use of generative AI tools. We have around 3,000 employees.", say: "Happy to help! Before I start: should the policy lean toward 'permitted with disclosure' or 'requires prior approval'? And are there specific compliance frameworks to align with?" },
        { ask: "We'll go with 'permitted with disclosure', aligned with our existing data protection policy, but no external standards for now.", steps: ["Build policy section framework", "Apply enterprise-standard tone template"] },
        { ask: "Please output the full policy document structure.", steps: ["Populate core content for each section", "Add compliance clauses and review mechanism"] }
      ]
    },
    title: { zh: "生成式 AI 工具使用規範政策（草稿）", cn: "生成式 AI 工具使用管理制度（草稿）", en: "Generative AI Tool Usage Policy (Draft)" },
    data: {
      zh: {
        head: ["章節", "核心內容摘要", "適用對象", "重要性"],
        rows: [
          ["目的與適用範圍", "明定本政策規範全體員工使用任何生成式 AI 工具的行為準則", "全體員工", "h"],
          ["允許使用情境", "列舉核准工具清單與可接受的典型使用場景", "一般員工", "h"],
          ["禁止事項", "禁止將機密資料、客戶個資或未公開商業資訊輸入公開 AI 系統", "全體員工", "h"],
          ["揭露義務", "AI 輔助產出須在文件中標注，不得以純人工名義發布", "內容產出者", "m"],
          ["違規處理與審查", "說明違規通報流程及本政策年度審查與更新機制", "主管與 IT 部門", "m"]
        ]
      },
      cn: {
        head: ["章节", "核心内容摘要", "适用对象", "重要性"],
        rows: [
          ["目的与适用范围", "明确本制度对全体员工使用任何生成式 AI 工具的行为准则", "全体员工", "h"],
          ["允许使用的场景", "列出经审批的工具清单和可接受的典型使用场景", "普通员工", "h"],
          ["禁止事项", "禁止把机密数据、客户个人信息或未公开的商业信息录入公开 AI 系统", "全体员工", "h"],
          ["披露义务", "AI 辅助生成的内容须在文档中标注，不得以纯人工名义发布", "内容生产者", "m"],
          ["违规处理与审查", "说明违规上报流程，以及本制度的年度审查和更新机制", "管理者与 IT 部门", "m"]
        ]
      },
      en: {
        head: ["Section", "Core Content Summary", "Applicable To", "Importance"],
        rows: [
          ["Purpose & Scope", "Defines conduct standards for all employees using any generative AI tool", "All employees", "h"],
          ["Permitted Use Cases", "Lists approved tools and acceptable typical usage scenarios", "General employees", "h"],
          ["Prohibited Actions", "Prohibits entering confidential data, customer PII, or undisclosed business info into public AI systems", "All employees", "h"],
          ["Disclosure Obligations", "AI-assisted content must be labeled; must not be published as purely human-authored", "Content creators", "m"],
          ["Violations & Review", "Outlines violation reporting process and the policy's annual review and update cycle", "Managers & IT", "m"]
        ]
      }
    },
    rec: {
      zh: "<b>建議：</b>政策草稿完成後，建議由法務與資訊安全部門聯合審查，並安排全員說明會，確保正式執行前的理解度與接受度。",
      cn: "<b>建议：</b>制度草稿完成后，建议由法务和信息安全部门联合审查，再安排一场全员宣讲会，确保正式实施前大家都理解、也认可。",
      en: "<b>Recommendation:</b> Once the draft is complete, arrange a joint review with Legal and Information Security, then schedule an all-hands briefing to ensure understanding and acceptance before enforcement begins."
    }
  },
  A041: {
    art: "brief",
    turns: {
      zh: [
        { ask: "我們剛更新了遠距工作政策，共 25 頁，想為新進員工製作一份白話版的一頁式摘要。", say: "好的！這份摘要主要針對哪個角色——一般員工、主管，還是 IT 人員？有沒有特別想凸顯的重點或員工最常搞錯的地方？" },
        { ask: "針對一般新進員工，最常見的問題是不清楚設備補助申請流程和居家辦公的資安規定。", steps: ["解析政策結構與關鍵條款", "篩選對新進員工最關鍵的段落"] },
        { ask: "請輸出一頁式的白話摘要。", steps: ["轉換為平實易讀語言", "產出角色專屬一頁指南"] }
      ],
      cn: [
        {
          ask: "我们刚更新了远程办公政策，一共 25 页，想给新员工做一份大白话的一页版摘要。",
          say: "好的！这份摘要主要是给哪类人看——普通员工、领导，还是 IT？有没有特别想突出的重点，或者员工最容易搞错的地方？"
        },
        { ask: "面向普通新员工，最常见的问题是搞不清设备补贴怎么申请，还有居家办公的安全规定。", steps: ["拆解政策结构和关键条款", "筛选对新员工最关键的段落"] },
        { ask: "那就输出一页版的大白话摘要吧。", steps: ["转成通俗易懂的表述", "生成角色专属一页指南"] }
      ],
      en: [
        { ask: "We just updated our remote work policy — it's 25 pages. I want a plain-language one-pager for new employees.", say: "Got it! Which role should this be tailored for — general employees, managers, or IT staff? Are there specific topics or common misconceptions you want to highlight?" },
        { ask: "For general new employees. The most common issues are not knowing how to apply for the equipment allowance and not understanding the home-office security requirements.", steps: ["Parse policy structure and key clauses", "Filter most critical sections for new employees"] },
        { ask: "Please output the plain-language one-page guide.", steps: ["Convert to plain, easy-to-read language", "Generate role-tailored one-page guide"] }
      ]
    },
    title: { zh: "遠距工作政策新進員工一頁指南", cn: "远程办公政策新员工一页指南", en: "Remote Work Policy New Employee One-Page Guide" },
    data: {
      zh: [
        { lv: "m", cat: "必做事項", tx: "設備補助申請須於到職後 30 天內透過 IT 入口網站提交，逾期需重新申請且不溯及既往。" },
        { lv: "m", cat: "資安規定", tx: "使用公司設備時必須連線公司 VPN，禁止在公共 Wi-Fi 環境下開啟或傳送任何機密文件。" },
        { lv: "n", cat: "出勤彈性", tx: "遠距員工不強制特定上班時段，但須在核心時間（10:00–16:00）保持可聯繫狀態。" },
        { lv: "n", cat: "設備事故", tx: "設備遺失或損壞須於 24 小時內通報 IT Help Desk，以啟動帳號停用與資料保護流程。" }
      ],
      cn: [
        { lv: "m", cat: "必做事项", tx: "设备补贴要在入职后 30 天内通过 IT 门户提交申请，逾期得重新申请，且不追溯补发。" },
        { lv: "m", cat: "安全规定", tx: "使用公司设备时必须连公司 VPN，禁止在公共 Wi-Fi 下打开或发送任何机密文件。" },
        { lv: "n", cat: "考勤弹性", tx: "远程员工不硬性规定上班时段，但核心时间（10:00–16:00）内要保持能联系上。" },
        { lv: "n", cat: "设备事故", tx: "设备丢失或损坏要在 24 小时内报 IT Help Desk，以便启动账号停用和数据保护流程。" }
      ],
      en: [
        { lv: "m", cat: "Must-Do", tx: "Equipment allowance requests must be submitted through the IT portal within 30 days of your start date — late submissions require a new application cycle." },
        { lv: "m", cat: "Security Rule", tx: "Company devices must always connect via VPN; opening or transmitting confidential documents on public Wi-Fi is strictly prohibited." },
        { lv: "n", cat: "Flex Hours", tx: "Remote employees are not required to keep fixed hours, but must remain reachable during core hours (10:00–16:00)." },
        { lv: "n", cat: "Device Incidents", tx: "Report any lost or damaged device to IT Help Desk within 24 hours to trigger account suspension and data protection procedures." }
      ]
    },
    rec: {
      zh: "<b>建議：</b>將此一頁指南整合至新人報到流程的第一週清單，並附上 IT 入口網站連結，讓員工一站式完成設備申請與安全設定。",
      cn: "<b>建议：</b>把这份一页指南放进新人入职第一周的清单里，并附上 IT 门户链接，让员工一站式搞定设备申请和安全设置。",
      en: "<b>Recommendation:</b> Embed this one-pager into the first-week onboarding checklist alongside a direct link to the IT portal, so new employees can complete their equipment request and security setup in one visit."
    }
  },
  A045: {
    art: "table",
    turns: {
      zh: [
        { ask: "我需要產出業務團隊的七月 KPI 月報，有本月和上月的數據，想要適合直接呈報主管的格式。", say: "好的！請貼上本月與上月的 KPI 數值，以及任何背景備註（如促銷活動、人員異動）。我會依您提供的資訊產出報告，不會自行推測原因。" },
        { ask: "本月：新客戶開發 45 件（上月 40 件）、成交率 23%（上月 26%）、平均成交週期 18 天（上月 20 天）、客戶滿意度 4.2/5（持平）。備註：上月因促銷活動拉高了成交率基數。", steps: ["比對各項 KPI 本月與上月數值", "依備註詮釋異常變動原因"] },
        { ask: "請產出完整的執行摘要與 Email 版本。", steps: ["標注進步與需關注指標", "產出主管呈報格式報告"] }
      ],
      cn: [
        {
          ask: "我要出销售团队七月的 KPI 月报，有这个月和上月的数据，想要能直接给领导汇报的格式。",
          say: "好的！把本月和上月的 KPI 数值发我，再加上相关背景备注（比如促销活动、人员变动）。我会按你给的信息出报告，不会自己瞎猜原因。"
        },
        {
          ask: "本月：新客户开发 45 单（上月 40 单）、成交率 23%（上月 26%）、平均成交周期 18 天（上月 20 天）、客户满意度 4.2/5（持平）。备注：上月搞了促销，把成交率的基数拉高了。",
          steps: ["对比各项 KPI 本月和上月数值", "结合备注解读异常波动"]
        },
        { ask: "把完整的执行摘要和邮件版本都出一下。", steps: ["标出进步项和需关注指标", "生成领导汇报格式的报告"] }
      ],
      en: [
        { ask: "I need to generate the July KPI report for my sales team. I have this month's and last month's numbers and need a format suitable for presenting to management.", say: "Understood! Please paste this month's and last month's KPI values along with any context notes, such as promotions or staffing changes. I'll base the report solely on what you provide." },
        { ask: "This month: new client acquisition 45 (last: 40), close rate 23% (last: 26%), avg. sales cycle 18 days (last: 20), CSAT 4.2/5 (unchanged). Note: last month's close rate was elevated by a promotional campaign.", steps: ["Compare each KPI month-over-month", "Interpret changes using provided context notes"] },
        { ask: "Please output the full executive summary and an email version.", steps: ["Flag improving and watch-list indicators", "Output manager-ready report format"] }
      ]
    },
    title: { zh: "業務團隊七月 KPI 執行摘要", cn: "销售团队七月 KPI 执行摘要", en: "Sales Team July KPI Executive Summary" },
    data: {
      zh: {
        head: ["KPI 指標", "上月", "本月", "風險"],
        rows: [
          ["新客戶開發", "40 件", "45 件 (+12%)", "l"],
          ["成交率", "26%", "23% (-3%)", "h"],
          ["平均成交週期", "20 天", "18 天 (-2 天)", "l"],
          ["客戶滿意度", "4.2 / 5", "4.2 / 5 (±0)", "m"],
          ["月度業績達成率", "112%", "98% (-14%)", "h"]
        ]
      },
      cn: {
        head: ["KPI 指标", "上月", "本月", "风险"],
        rows: [
          ["新客户开发", "40 单", "45 单 (+12%)", "l"],
          ["成交率", "26%", "23% (-3%)", "h"],
          ["平均成交周期", "20 天", "18 天 (-2 天)", "l"],
          ["客户满意度", "4.2 / 5", "4.2 / 5 (±0)", "m"],
          ["月度业绩达成率", "112%", "98% (-14%)", "h"]
        ]
      },
      en: {
        head: ["KPI Metric", "Last Month", "This Month", "Risk"],
        rows: [
          ["New client acquisition", "40 deals", "45 deals (+12%)", "l"],
          ["Close rate", "26%", "23% (-3%)", "h"],
          ["Avg. sales cycle", "20 days", "18 days (-2 days)", "l"],
          ["Customer satisfaction", "4.2 / 5", "4.2 / 5 (±0)", "m"],
          ["Monthly target attainment", "112%", "98% (-14%)", "h"]
        ]
      }
    },
    rec: {
      zh: "<b>建議：</b>成交率下滑受上月促銷基數影響，建議改以三個月滾動平均值為主要追蹤基準，避免單月波動造成誤判。",
      cn: "<b>建议：</b>成交率下滑主要是受上月促销基数影响，建议改用三个月滚动平均值作为主要跟踪基准，避免单月波动造成误判。",
      en: "<b>Recommendation:</b> The close rate dip is partly attributable to last month's promotional baseline; adopt a 3-month rolling average as the primary benchmark to avoid single-month distortion."
    }
  },
  A049: {
    art: "brief",
    turns: {
      zh: [
        { ask: "請挑戰這個論點：『所有知識工作者都應強制遠距工作，因為這能提升生產力並降低成本。』情境：下週的內部領導層辯論，我代表反對方，深度：深入分析。", say: "收到！在開始之前，請問這場辯論中您最需要防守的攻擊點是哪個——質疑生產力數據、反駁成本論述，還是凸顯組織文化風險？" },
        { ask: "三個方向都需要，但最重要的是有邏輯支撐的論據，而不只是直覺性反對。", steps: ["解析原論點的核心假設", "找出邏輯漏洞與前提缺陷"] },
        { ask: "請輸出完整的結構化反方論證。", steps: ["建構有據可查的反方論據", "產出結構化反論清單"] }
      ],
      cn: [
        {
          ask: "帮我挑战这个论点：“所有知识工作者都应该强制远程办公，因为这能提升生产力、降低成本。”背景：下周内部领导层辩论，我是反方，深度：深入分析。",
          say: "收到！开始之前先问一句：这场辩论里你最需要守住的攻击点是哪个——质疑生产力数据、反驳成本论述，还是突出组织文化风险？"
        },
        { ask: "三个方向都要，但最重要的是有逻辑支撑的论据，不能只是凭直觉反对。", steps: ["拆解原论点的核心假设", "找出逻辑漏洞和前提缺陷"] },
        { ask: "把完整的结构化反方论证输出来。", steps: ["搭建有据可查的反方论据", "生成结构化反驳清单"] }
      ],
      en: [
        { ask: "Please challenge this argument: 'All knowledge workers should be required to work remotely, as it improves productivity and reduces costs.' Context: internal leadership debate next week, I'm on the opposition side. Depth: deep analysis.", say: "Got it! Before I begin, what angle is most critical for your position — challenging the productivity data, countering the cost argument, or highlighting organizational culture risks?" },
        { ask: "All three, but most importantly I need logic-backed arguments, not just gut-feel objections.", steps: ["Deconstruct core assumptions of the argument", "Identify logical gaps and faulty premises"] },
        { ask: "Please output the full structured counter-arguments.", steps: ["Construct evidence-based counter-arguments", "Output structured counter-argument list"] }
      ]
    },
    title: { zh: "反方論證：「強制遠距工作提升生產力」", cn: "反方论证：“强制远程办公提升生产力”", en: "Counter-Arguments: 'Mandatory Remote Work Boosts Productivity'" },
    data: {
      zh: [
        { lv: "m", cat: "反論一", tx: "生產力提升在自律型個人工作者中成立，但協作密集型角色（如新產品設計、跨部門整合）在遠距環境中普遍出現溝通延遲與創意損耗。" },
        { lv: "m", cat: "反論二", tx: "「降低成本」通常僅計算辦公室租金，忽略居家設備補助、網路費、心理健康支持等成本實際上的轉嫁效應。" },
        { lv: "n", cat: "反論三", tx: "強制遠距對新進員工傷害最大——學習曲線延長、師徒文化削弱，長期將侵蝕組織的知識傳承能力。" },
        { lv: "n", cat: "反論四", tx: "早期生產力提升數據多來自疫情初期短期效應，缺乏長期追蹤的系統性研究，現有學術結論仍存在分歧。" }
      ],
      cn: [
        { lv: "m", cat: "反驳一", tx: "生产力提升在自律型个人工作者身上成立，但协作密集的岗位（比如新产品设计、跨部门整合）在远程环境下普遍会出现沟通滞后和创意损耗。" },
        { lv: "m", cat: "反驳二", tx: "“降低成本”通常只算了办公室租金，忽略了居家设备补贴、网费、心理健康支持等成本其实被转嫁了出去。" },
        { lv: "n", cat: "反驳三", tx: "强制远程对新员工伤害最大——上手周期拉长、传帮带文化被削弱，长期会侵蚀组织的知识传承能力。" },
        { lv: "n", cat: "反驳四", tx: "早期那些生产力提升的数据大多来自疫情初期的短期效应，缺乏长期跟踪的系统性研究，现有学术结论也还有分歧。" }
      ],
      en: [
        { lv: "m", cat: "Counter #1", tx: "Productivity gains hold for self-directed individual work but consistently weaken for collaboration-intensive roles — new product design and cross-functional integration show higher communication lag in remote settings." },
        { lv: "m", cat: "Counter #2", tx: "The 'cost reduction' claim typically counts only office rent savings while ignoring the real cost transfer to employees via equipment allowances, internet subsidies, and mental health support." },
        { lv: "n", cat: "Counter #3", tx: "Mandatory remote work disproportionately harms new employees — extended learning curves and weakened mentorship culture will erode organizational knowledge transfer over time." },
        { lv: "n", cat: "Counter #4", tx: "Early productivity-boost data largely reflects a short-term novelty effect from the pandemic period; long-term systematic research remains inconclusive and contested in academic literature." }
      ]
    },
    rec: {
      zh: "<b>建議：</b>辯論中可主動提出「彈性混合模式」作為建設性替代方案，既能承認遠距的部分優勢，又能消解反對方指責您全盤否定遠距工作的論點。",
      cn: "<b>建议：</b>辩论中可以主动抛出“弹性混合办公模式”作为建设性的替代方案，既承认远程的部分优势，又能化解对方说你全盘否定远程办公的指责。",
      en: "<b>Recommendation:</b> Proactively propose a 'flexible hybrid model' as a constructive alternative — this lets you acknowledge remote work's partial benefits while neutralizing any accusation that you are simply opposing flexibility."
    }
  },
 "A054": {
  "art": "table",
  "turns": {
   "zh": [
    {
     "ask": "我下週一入職，第一天應該做什麼準備？",
     "say": "歡迎加入！我幫你把第一週該完成的事排成一份檢查清單。先確認三件事：\n\n• 你的職務或角色是什麼？\n• 到職形式是進辦公室、遠距，還是混合？\n• 你的直屬主管和 buddy 已經確定了嗎？"
    },
    {
     "ask": "行銷企劃，混合辦公。主管確定了，buddy 還不知道是誰。",
     "steps": [
      "比對公司到職文件與 HR 政策",
      "依「行銷企劃」角色挑選必備工具",
      "區分第一天／第一週的先後順序",
      "標記待 HR 補齊的項目"
     ]
    }
   ],
   cn: [
     {
       ask: "我下周一入职，第一天该做点什么准备？",
       say: "欢迎加入！我帮你把第一周要完成的事整理成一份清单。先确认三件事：\n\n• 你的岗位或者角色是什么？\n• 入职形式是到岗、远程，还是混合？\n• 你的直属领导和 buddy 定下来了吗？"
     },
     {
       ask: "营销策划，混合办公。领导定了，buddy 还不知道是谁。",
       steps: ["比对公司入职文件和 HR 政策", "按“营销策划”角色挑选必备工具", "区分第一天／第一周的先后顺序", "标记需要 HR 补齐的项目"]
     }
   ],
   "en": [
    {
     "ask": "I'm starting Monday — what should I do to prepare for day one?",
     "say": "Welcome aboard! I'll turn your first week into a checklist. Three quick things first:\n\n• What's your role or job title?\n• Are you onsite, remote, or hybrid?\n• Do you already know your manager and onboarding buddy?"
    },
    {
     "ask": "Marketing planner, hybrid. Manager is confirmed, buddy is still TBC.",
     "steps": [
      "Cross-checking onboarding docs and HR policy",
      "Selecting the tools a marketing planner needs",
      "Sequencing day-one vs. week-one items",
      "Flagging what HR still needs to confirm"
     ]
    }
   ]
  },
  "title": {
   "zh": "第一週到職檢查清單",
   cn: "第一周入职检查清单",
   "en": "First-Week Onboarding Checklist"
  },
  "data": {
   "zh": {
    "head": [
     "項目",
     "什麼時候",
     "找誰",
     "優先"
    ],
    "rows": [
     [
      "完成帳號啟用與雙因素驗證",
      "第一天上午",
      "IT 服務台",
      "h"
     ],
     [
      "簽署到職文件與資安政策確認",
      "第一天",
      "HR 窗口",
      "h"
     ],
     [
      "和主管確認角色期待與首月重點",
      "第一天下午",
      "直屬主管",
      "h"
     ],
     [
      "加入團隊頻道、共用檔案庫與例會",
      "第一天到第二天",
      "團隊同事",
      "m"
     ],
     [
      "熟悉行銷企劃常用工具與內部範本",
      "第一週前半",
      "團隊 buddy",
      "m"
     ],
     [
      "指定 onboarding buddy（尚未確認）",
      "第一週內",
      "HR 窗口",
      "m"
     ],
     [
      "約定 30/60/90 天目標會議",
      "第一週結束前",
      "直屬主管",
      "h"
     ],
     [
      "瀏覽公司福利與請假流程",
      "第一週內",
      "HR 自助入口",
      "l"
     ]
    ]
   },
   cn: {
     head: ["项目", "什么时候", "找谁", "优先"],
     rows: [
       ["完成账号激活和双因素验证", "第一天上午", "IT 服务台", "h"],
       ["签署入职文件和安全政策确认", "第一天", "HR 对接人", "h"],
       ["和领导确认角色预期和首月重点", "第一天下午", "直属领导", "h"],
       ["加入团队频道、共享文件库和例会", "第一天到第二天", "团队同事", "m"],
       ["熟悉营销策划常用工具和内部模板", "第一周前半", "团队 buddy", "m"],
       ["指定 onboarding buddy（还没定）", "第一周内", "HR 对接人", "m"],
       ["约定 30/60/90 天目标会议", "第一周结束前", "直属领导", "h"],
       ["了解公司福利和请假流程", "第一周内", "HR 自助门户", "l"]
     ]
   },
   "en": {
    "head": [
     "Item",
     "When",
     "Who to ask",
     "Priority"
    ],
    "rows": [
     [
      "Activate your account and set up MFA",
      "Day 1, morning",
      "IT service desk",
      "h"
     ],
     [
      "Sign onboarding paperwork and security policy",
      "Day 1",
      "HR contact",
      "h"
     ],
     [
      "Align with your manager on role expectations",
      "Day 1, afternoon",
      "Your manager",
      "h"
     ],
     [
      "Join team channels, shared library and recurring meetings",
      "Day 1–2",
      "Your teammates",
      "m"
     ],
     [
      "Get familiar with marketing tools and internal templates",
      "Early week 1",
      "Team buddy",
      "m"
     ],
     [
      "Get an onboarding buddy assigned (still TBC)",
      "Within week 1",
      "HR contact",
      "m"
     ],
     [
      "Book your 30/60/90-day goals meeting",
      "By end of week 1",
      "Your manager",
      "h"
     ],
     [
      "Read up on benefits and the time-off process",
      "Within week 1",
      "HR self-service",
      "l"
     ]
    ]
   }
  },
  "rec": {
   "zh": "<b>下一步：</b>高優先項目集中在第一天，建議先把帳號與資安流程完成，其餘再依序推進；buddy 尚未指定，記得在第一週內向 HR 追一次。清單全部勾完後，就可以和主管排 30/60/90 天目標會議。",
   cn: "<b>下一步：</b>高优先的事都集中在第一天，建议先把账号和安全流程搞定，其余的再按顺序推进；buddy 还没定，记得第一周内找 HR 催一次。清单全部勾完，就可以和领导排 30/60/90 天目标会议了。",
   "en": "<b>Next：</b>The high-priority items all sit on day one — clear accounts and security first, then work down the list. Your buddy is still unassigned, so chase HR once during week one. Once the checklist is complete, book the 30/60/90-day goals meeting with your manager."
  }
 },
 "A055": {
  "art": "brief",
  "turns": {
   "zh": [
    {
     "ask": "幫我起草一封 Copilot 策略工作坊後的追蹤信，摘要結論、下一步與客戶價值。",
     "say": "沒問題。在我動筆前先釐清三件事，這樣草稿才會貼合情境：\n\n• 收件對象是與會的業務窗口，還是沒參加的決策主管？\n• 語氣要維持顧問式的正式，還是偏合作夥伴的輕鬆？\n• 下一步需要明確標出負責人與時間點嗎？"
    },
    {
     "ask": "寄給沒參加的決策主管，顧問式正式。下一步要標負責人，時間點寫相對週次就好。",
     "steps": [
      "讀取工作坊筆記與公司語氣指南",
      "依決策主管視角重排資訊優先序",
      "把討論結果轉為結論與行動項",
      "套用公司信件範本並覆核用語"
     ]
    }
   ],
   cn: [
     {
       ask: "帮我起草一封 Copilot 策略工作坊之后的跟进邮件，把结论、下一步和客户价值都总结一下。",
       say: "没问题。动笔之前先确认三件事，这样草稿才能贴合场景：\n\n• 收件人是参会的销售对接人，还是没到场的决策领导？\n• 语气是保持顾问式的正式，还是偏合作伙伴那种轻松？\n• 下一步需要明确写出负责人和时间点吗？"
     },
     {
       ask: "发给没到场的决策领导，顾问式正式。下一步要标负责人，时间点写相对周次就行。",
       steps: ["读取工作坊记录和公司语气指南", "按决策领导的视角重排信息优先级", "把讨论结果转成结论和行动项", "套用公司邮件模板并复核措辞"]
     }
   ],
   "en": [
    {
     "ask": "Draft a follow-up email after a Copilot strategy workshop. Summarize outcomes, next steps, and customer value.",
     "say": "Happy to. Three things to clarify before I draft, so it lands in context:\n\n• Is this going to the business contacts who attended, or to a decision maker who wasn't there?\n• Consultative and formal, or a lighter partner tone?\n• Should next steps name owners and dates?"
    },
    {
     "ask": "To a decision maker who missed it. Consultative and formal. Name owners; relative weeks are fine for timing.",
     "steps": [
      "Reading the workshop notes and tone-of-voice guide",
      "Re-prioritizing for a decision-maker's view",
      "Turning discussion into outcomes and actions",
      "Applying the company email template and reviewing wording"
     ]
    }
   ]
  },
  "title": {
   "zh": "工作坊追蹤信草稿",
   cn: "工作坊跟进邮件草稿",
   "en": "Workshop Follow-Up Email Draft"
  },
  "data": {
   "zh": [
    {
     "lv": "m",
     "cat": "主旨建議",
     "tx": "Copilot 策略工作坊｜結論摘要與後續行動建議"
    },
    {
     "lv": "m",
     "cat": "結論摘要",
     "tx": "與會團隊確認以「會議與文件產出」作為第一階段導入場景，其餘應用場景列為第二波評估。"
    },
    {
     "lv": "m",
     "cat": "結論摘要",
     "tx": "資安與資料治理需求由法務與 IT 共同把關，導入前先完成權限與敏感度標籤盤點。"
    },
    {
     "lv": "m",
     "cat": "下一步",
     "tx": "由業務窗口彙整第一階段使用者名單與現行流程痛點，於下週內回覆。"
    },
    {
     "lv": "m",
     "cat": "下一步",
     "tx": "由 IT 負責人啟動權限與標籤盤點，並在第三週的對焦會議提出初步結果。"
    },
    {
     "lv": "n",
     "cat": "客戶價值",
     "tx": "把重複性的會議紀錄與文件初稿交給 Copilot，讓團隊把時間放回判斷與溝通。"
    },
    {
     "lv": "n",
     "cat": "客戶價值",
     "tx": "從單一場景起步、驗證後再擴散，導入風險與變革阻力都比全面上線低。"
    },
    {
     "lv": "n",
     "cat": "收尾建議",
     "tx": "附上工作坊簡報與場景清單，並主動提議一次 30 分鐘的對焦會議。"
    }
   ],
   cn: [
     { lv: "m", cat: "主题建议", tx: "Copilot 策略工作坊｜核心结论梳理与下一步行动" },
     { lv: "m", cat: "结论摘要", tx: "参会团队一致确定，先以“会议和文档产出”作为第一阶段落地场景，其余应用场景放到第二波评估。" },
     { lv: "m", cat: "结论摘要", tx: "安全和数据治理需求由法务和 IT 共同把关，落地前先完成权限和敏感度标签的盘点。" },
     { lv: "m", cat: "下一步", tx: "由销售对接人汇总第一阶段用户名单和现有流程痛点，下周内回复。" },
     { lv: "m", cat: "下一步", tx: "由 IT 负责人启动权限和标签盘点，并在第三周的对齐会上给出初步结果。" },
     { lv: "n", cat: "客户价值", tx: "把重复性的会议记录和文档初稿交给 Copilot，让团队把时间放回到判断和沟通上。" },
     { lv: "n", cat: "客户价值", tx: "从单个场景起步、验证之后再铺开，落地风险和变革阻力都比全面上线低。" },
     { lv: "n", cat: "收尾建议", tx: "附上工作坊的演示文稿和场景清单，并主动提议开一次 30 分钟的对齐会。" }
   ],
   "en": [
    {
     "lv": "m",
     "cat": "Suggested subject",
     "tx": "Copilot strategy workshop — outcomes and recommended next steps"
    },
    {
     "lv": "m",
     "cat": "Outcome",
     "tx": "The team agreed to start with meetings and document drafting as the phase-one scenario; other use cases move to a second wave."
    },
    {
     "lv": "m",
     "cat": "Outcome",
     "tx": "Security and data governance will be jointly owned by Legal and IT, with a permissions and sensitivity-label review completed before rollout."
    },
    {
     "lv": "m",
     "cat": "Next step",
     "tx": "The business contact compiles the phase-one user list and current process pain points, back to us within the week."
    },
    {
     "lv": "m",
     "cat": "Next step",
     "tx": "The IT owner kicks off the permissions and label review, with initial findings at the week-three alignment call."
    },
    {
     "lv": "n",
     "cat": "Customer value",
     "tx": "Handing repetitive minutes and first drafts to Copilot puts the team's time back into judgement and conversation."
    },
    {
     "lv": "n",
     "cat": "Customer value",
     "tx": "Starting with one scenario and proving it out keeps both rollout risk and change resistance lower than a full launch."
    },
    {
     "lv": "n",
     "cat": "Closing",
     "tx": "Attach the workshop deck and scenario list, and proactively offer a 30-minute alignment call."
    }
   ]
  },
  "rec": {
   "zh": "<b>覆核提醒：</b>這是給沒參加的決策主管，因此把結論放在最前、細節收在附件。寄出前請確認兩個負責人姓名與時間點無誤；若對方偏好更短的版本，可只保留「結論摘要」與「下一步」兩段。",
   cn: "<b>复核提醒：</b>这封是给没到场的决策领导，所以把结论放最前面、细节收进附件。发出前请确认两位负责人的姓名和时间点没错；如果对方更喜欢短版本，可以只留“结论摘要”和“下一步”两段。",
   "en": "<b>Review note:</b> This is written for a decision maker who wasn't in the room, so outcomes lead and detail moves to the attachment. Confirm both owner names and timings before sending. If they prefer something shorter, keep only the Outcomes and Next steps sections."
  }
 },
 "A056": {
  "art": "table",
  "turns": {
   "zh": [
    {
     "ask": "請分析過去 30 天的 126 則產品評論，找出主要主題、情緒與前三項行動。",
     "say": "可以。請先確認產品版本、回饋來源，以及資安或法遵疑慮是否需要立即升報。"
    },
    {
     "ask": "版本 4.2，來源是 App Store 與客服工單；資安和法遵疑慮要立即標出。",
     "steps": [
      "移除重複、灌水與無關內容",
      "標記情緒與強度",
      "歸納高頻主題並計次",
      "依頻率、強度與商業影響排序"
     ]
    }
   ],
   cn: [
     {
       ask: "帮我分析过去 30 天的 126 条产品评论，找出主要主题、情绪和前三项行动。",
       say: "可以。先确认几件事：产品版本、反馈来源，还有安全或合规方面的问题要不要马上升级上报。"
     },
     {
       ask: "版本 4.2，来源是 App Store 和客服工单；安全和合规问题要马上标出来。",
       steps: ["去掉重复、灌水和无关内容", "标记情绪和强度", "归纳高频主题并计数", "按频率、强度和商业影响排序"]
     }
   ],
   "en": [
    {
     "ask": "Analyze 126 product reviews from the last 30 days and identify the main themes, sentiment, and top three actions.",
     "say": "I can do that. Please confirm the product version, feedback sources, and whether security or compliance concerns require immediate escalation."
    },
    {
     "ask": "Version 4.2, from App Store reviews and support tickets. Escalate security and compliance concerns immediately.",
     "steps": [
      "Removing duplicates, spam, and irrelevant entries",
      "Classifying sentiment and intensity",
      "Clustering recurring themes with counts",
      "Ranking by frequency, intensity, and business impact"
     ]
    }
   ]
  },
  "title": {
   "zh": "客戶回饋優先分析",
   cn: "客户反馈优先级分析",
   "en": "Customer Feedback Priority Analysis"
  },
  "data": {
   "zh": {
    "head": [
     "主題",
     "出現頻率",
     "主要情緒",
     "優先"
    ],
    "rows": [
     [
      "啟動與載入效能",
      "38 則",
      "強烈負面",
      "h"
     ],
     [
      "帳號登入可靠性",
      "24 則",
      "中度負面",
      "h"
     ],
     [
      "首次使用引導",
      "17 則",
      "中度負面",
      "m"
     ],
     [
      "新版介面",
      "14 則",
      "正負意見分歧",
      "m"
     ]
    ]
   },
   cn: {
     head: ["主题", "出现频率", "主要情绪", "优先"],
     rows: [
       ["启动和加载性能", "38 条", "强烈负面", "h"],
       ["账号登录可靠性", "24 条", "中度负面", "h"],
       ["首次使用引导", "17 条", "中度负面", "m"],
       ["新版界面", "14 条", "褒贬不一", "m"]
     ]
   },
   "en": {
    "head": [
     "Theme",
     "Frequency",
     "Primary sentiment",
     "Priority"
    ],
    "rows": [
     [
      "Startup and loading performance",
      "38 mentions",
      "Highly negative",
      "h"
     ],
     [
      "Sign-in reliability",
      "24 mentions",
      "Moderately negative",
      "h"
     ],
     [
      "First-use onboarding",
      "17 mentions",
      "Moderately negative",
      "m"
     ],
     [
      "New interface",
      "14 mentions",
      "Mixed",
      "m"
     ]
    ]
   }
  },
  "rec": {
   "zh": "<b>前三項行動：</b>效能團隊兩週內提出冷啟動改善方案；身分團隊 48 小時內檢查登入失敗紀錄；產品團隊在下一個 sprint 測試精簡版首次使用引導。未發現具證據支持的重大資安或法遵風險。",
   cn: "<b>前三项行动：</b>性能团队两周内拿出冷启动优化方案；身份团队 48 小时内排查登录失败日志；产品团队在下个 sprint 测试精简版的首次使用引导。未发现有证据支撑的重大安全或合规风险。",
   "en": "<b>Top three actions:</b> Performance team to propose a cold-start fix within two weeks; identity team to inspect sign-in failures within 48 hours; product team to test a shorter first-use flow next sprint. No evidence-supported critical security or compliance risk was identified."
  }
 },
 "A057": {
  "art": "brief",
  "turns": {
   "zh": [
    {
     "ask": "請依據目前這串客戶工作坊對話、會議筆記和附件，產出策略一頁報 PDF。",
     "steps": [
      "讀取對話、附件與知識來源",
      "辨識高階主管需要決定的核心議題",
      "區分事實、洞察與假設",
      "壓縮為 A4 直式單頁內容"
     ]
    }
   ],
   cn: [
     {
       ask: "根据现在这串客户工作坊对话、会议记录和附件，帮我出一份策略一页报的 PDF。",
       steps: ["读取对话、附件和知识来源", "识别高管需要拍板的核心议题", "区分事实、洞察和假设", "压缩成 A4 竖版单页内容"]
     }
   ],
   "en": [
    {
     "ask": "Generate a Strategic One-Pager PDF from this client-workshop thread, meeting notes, and attachments.",
     "steps": [
      "Reviewing the conversation, attachments, and knowledge sources",
      "Identifying the core executive decision",
      "Separating facts, insights, and assumptions",
      "Optimizing the content for one A4 portrait page"
     ]
    }
   ]
  },
  "title": {
   "zh": "Copilot 導入策略一頁報",
   cn: "Copilot 落地策略一页报",
   "en": "Copilot Adoption Strategic One-Pager"
  },
  "data": {
   "zh": [
    {
     "lv": "m",
     "cat": "執行摘要",
     "tx": "團隊已確認先以會議摘要與文件起草作為導入場景；決策點是是否核准 30 人、六週的受控試行。"
    },
    {
     "lv": "m",
     "cat": "洞察",
     "tx": "兩個首波場景頻率高且容易衡量，適合作為採用成效的早期證據。"
    },
    {
     "lv": "m",
     "cat": "風險",
     "tx": "權限與敏感度標籤盤點尚未完成，試行前必須由 IT 與法務共同確認。"
    },
    {
     "lv": "n",
     "cat": "機會",
     "tx": "小規模試行可先建立提示範本與成功案例，再降低第二波擴展阻力。"
    },
    {
     "lv": "m",
     "cat": "建議聚焦",
     "tx": "核准受控試行，但以完成權限盤點和確認成功指標作為啟動條件。"
    }
   ],
   cn: [
     { lv: "m", cat: "执行摘要", tx: "团队已确认先以会议摘要和文档起草作为落地场景；要拍板的是要不要批准一个 30 人、六周的受控试点。" },
     { lv: "m", cat: "洞察", tx: "这两个首波场景频率高、也好衡量，适合作为采用成效的早期证据。" },
     { lv: "m", cat: "风险", tx: "权限和敏感度标签盘点还没做完，试点前必须由 IT 和法务共同确认。" },
     { lv: "n", cat: "机会", tx: "小范围试点可以先沉淀出提示模板和成功案例，再降低第二波推广的阻力。" },
     { lv: "m", cat: "建议聚焦", tx: "批准受控试点，但把完成权限盘点、确认成功指标作为启动前提。" }
   ],
   "en": [
    {
     "lv": "m",
     "cat": "Executive summary",
     "tx": "The team selected meeting recap and document drafting as the first scenarios. The decision is whether to approve a controlled six-week pilot for 30 users."
    },
    {
     "lv": "m",
     "cat": "Insight",
     "tx": "Both initial scenarios are frequent and measurable, making them useful early evidence of adoption value."
    },
    {
     "lv": "m",
     "cat": "Risk",
     "tx": "The permissions and sensitivity-label review requires joint IT and Legal sign-off before launch."
    },
    {
     "lv": "n",
     "cat": "Opportunity",
     "tx": "A small pilot can establish reusable prompts and proof points before a broader second wave."
    },
    {
     "lv": "m",
     "cat": "Recommended focus",
     "tx": "Approve the pilot, conditional on completing the access review and confirming success measures."
    }
   ]
  },
  "rec": {
   "zh": "<b>假設提醒：</b>30 位試行使用者與六週時程來自工作坊提案，尚未正式核准；PDF 交付前應保留此標示。",
   cn: "<b>假设提醒：</b>30 位试点用户和六周周期来自工作坊的提案，还没正式批准；PDF 交付前应保留这个标注。",
   "en": "<b>Assumption:</b> The 30-user group and six-week timeline come from the workshop proposal and are not yet approved. Preserve that label in the delivered PDF."
  }
 },
 "A058": {
  "art": "brief",
  "turns": {
   "zh": [
    {
     "ask": "幫我研究三家競爭對手、分析市場定位，並產出附引用來源的簡報與比較投影片。我該用哪個 Copilot 工具？",
     "steps": [
      "判斷目標、來源深度與引用需求",
      "確認產出包含多份相關交付物",
      "比較 Researcher、PowerPoint Copilot 與 Cowork",
      "選出能完成任務的最簡單主選項"
     ]
    }
   ],
   cn: [
     {
       ask: "帮我调研三家竞争对手、分析市场定位，再出一份带引用来源的汇报和对比幻灯片。我该用哪个 Copilot 工具？",
       steps: ["判断目标、来源深度和引用需求", "确认产出包含多份相关交付物", "对比 Researcher、PowerPoint Copilot 和 Cowork", "选出能完成任务的最简单主选项"]
     }
   ],
   "en": [
    {
     "ask": "Research three competitors, analyze their positioning, and produce a cited briefing plus a comparison deck. Which Copilot tool should I use?",
     "steps": [
      "Evaluating the goal, source depth, and citation requirement",
      "Confirming multiple related deliverables",
      "Comparing Researcher, Copilot in PowerPoint, and Cowork",
      "Selecting the simplest primary option capable of the whole task"
     ]
    }
   ]
  },
  "title": {
   "zh": "Copilot 工具選用建議",
   cn: "Copilot 工具选用建议",
   "en": "Copilot Tool Recommendation"
  },
  "data": {
   "zh": [
    {
     "lv": "m",
     "cat": "最適選擇",
     "tx": "Cowork。這是跨網路研究、分析與多份交付物的協調型多步驟專案。"
    },
    {
     "lv": "m",
     "cat": "原因",
     "tx": "Researcher 適合附引用研究，但不適合單獨統籌完整簡報與比較投影片的端到端產出。"
    },
    {
     "lv": "m",
     "cat": "如何開始",
     "tx": "在 Cowork 建立任務，指定三家競爭對手、目標市場、來源要求、簡報受眾與兩份交付物。"
    },
    {
     "lv": "n",
     "cat": "可複製提示",
     "tx": "研究三家指定競爭對手，引用可靠來源比較其定位，產出高階摘要簡報與一份並列比較投影片。"
    },
    {
     "lv": "n",
     "cat": "替代方案",
     "tx": "若 Cowork 不可用，先用 Researcher 完成附引用研究，再到 PowerPoint 產出簡報。"
    }
   ],
   cn: [
     { lv: "m", cat: "最适选择", tx: "Cowork。这是一个横跨全网调研、分析和多份交付物的协调型多步骤项目。" },
     { lv: "m", cat: "原因", tx: "Researcher 适合做带引用的调研，但不适合单独统筹整份汇报和对比幻灯片的端到端产出。" },
     { lv: "m", cat: "怎么开始", tx: "在 Cowork 里建一个任务，指定三家竞争对手、目标市场、来源要求、汇报受众和两份交付物。" },
     { lv: "n", cat: "可复用提示", tx: "调研三家指定竞争对手，引用可靠来源比较它们的定位，产出一份高层摘要汇报和一份并排对比的幻灯片。" },
     { lv: "n", cat: "替代方案", tx: "如果 Cowork 用不了，先用 Researcher 做带引用的调研，再到 PowerPoint 里做汇报。" }
   ],
   "en": [
    {
     "lv": "m",
     "cat": "Best fit",
     "tx": "Cowork. This is a coordinated, multi-step project spanning web research, analysis, and several related deliverables."
    },
    {
     "lv": "m",
     "cat": "Why",
     "tx": "Researcher is strong for cited research but is not the most direct way to coordinate both deliverables end to end."
    },
    {
     "lv": "m",
     "cat": "How to start",
     "tx": "Create a Cowork task naming the three competitors, target market, source requirements, audience, and both deliverables."
    },
    {
     "lv": "n",
     "cat": "Copy-ready prompt",
     "tx": "Research the three named competitors, cite reliable sources, compare their positioning, and create an executive briefing plus a side-by-side comparison deck."
    },
    {
     "lv": "n",
     "cat": "Alternative",
     "tx": "If Cowork is unavailable, complete the cited research in Researcher and then create the deck in PowerPoint."
    }
   ]
  },
  "rec": {
   "zh": "<b>存取提醒：</b>Cowork、Researcher 與相關用量條件可能因授權和系統管理員設定而異，開始前請先確認組織內的可用性。",
   cn: "<b>访问提醒：</b>Cowork、Researcher 以及相关用量条件可能因为许可和管理员设置不同而有差异，开始前先确认下组织里能不能用。",
   "en": "<b>Access note:</b> Cowork, Researcher, and usage conditions can vary by license and administrator settings. Confirm availability in your organization before starting."
  }
 },

  /* ---------- Z4 風險與法遵 ---------- */
  A059: {
    "art": "table",
    "turns": {
      "zh": [
        {
          "ask": "這份合作合約下週要簽,我不是法務,想先自己看過一遍。",
          "say": "沒問題。請把合約檔案上傳,我會逐節檢查。開始前先確認:有沒有你特別在意的條款?例如責任上限、資料保護或終止條件。"
        },
        {
          "ask": "責任上限和資料保護要特別看,另外幫我確認有沒有漏掉的標準條款。",
          "say": "了解。我會分成三類回報:有風險的條款、語意模糊需要釐清的用語,以及應該有卻缺漏的條款。",
          "steps": [
            "解析合約結構與條款編號",
            "逐節比對常見標準條款清單"
          ]
        },
        {
          "ask": "好,最後也給我一份可以直接改的檔案。",
          "steps": [
            "標定風險等級與建議修改方向",
            "產出加註解的 Word 檔"
          ]
        }
      ],
      cn: [
        {
          ask: "这份合作合同下周要签，我不是法务，想先自己过一遍。",
          say: "没问题。把合同文件传上来，我会逐条检查。开始前先确认：有没有你特别在意的条款？比如责任上限、数据保护或者终止条件。"
        },
        {
          ask: "责任上限和数据保护要重点看，另外帮我确认有没有漏掉的标准条款。",
          say: "明白。我会分成三类反馈：有风险的条款、表述模糊需要澄清的措辞，以及本该有却缺失的条款。",
          steps: ["拆解合同结构和条款编号", "逐条比对常见标准条款清单"]
        },
        { ask: "好，最后再给我一份能直接改的文件。", steps: ["标定风险等级和建议修改方向", "生成带批注的 Word 文件"] }
      ],
      "en": [
        {
          "ask": "We're signing this partnership contract next week. I'm not legal, but I want to read it first.",
          "say": "Happy to help. Upload the contract and I'll go through it section by section. Anything you're especially worried about — liability caps, data protection, termination?"
        },
        {
          "ask": "Liability caps and data protection especially. Also tell me what standard clauses are missing.",
          "say": "Understood. I'll report back in three buckets: risky clauses, ambiguous wording that needs clarifying, and clauses that should be there but aren't.",
          "steps": [
            "Parsing contract structure and clause numbering",
            "Checking each section against the standard clause list"
          ]
        },
        {
          "ask": "And give me a file I can edit directly.",
          "steps": [
            "Assigning risk levels and suggested redlines",
            "Producing the annotated Word file"
          ]
        }
      ]
    },
    "title": {
      "zh": "合約審閱意見彙整",
      cn: "合同审阅意见汇总",
      "en": "Contract Review Summary"
    },
    "data": {
      "zh": {
        "head": [
          "條款",
          "發現的問題",
          "建議修改",
          "風險"
        ],
        "rows": [
          [
            "責任上限",
            "未設上限,理論上責任無限",
            "改為以合約總價金為上限",
            "h"
          ],
          [
            "保密義務",
            "全份合約未見保密條款",
            "補入雙向保密條款並約定存續期間",
            "h"
          ],
          [
            "交付期限",
            "僅寫「合理期間內完成」",
            "改為明確工作日數並定義起算日",
            "m"
          ],
          [
            "資料保護",
            "有提及個資,未寫委外處理與刪除義務",
            "補入資料處理範圍、再委外限制與終止後刪除",
            "m"
          ],
          [
            "終止條款",
            "僅對方可提前終止",
            "改為雙方對等,並約定通知期間",
            "m"
          ],
          [
            "準據法與爭議解決",
            "未約定管轄法院",
            "補入準據法與第一審管轄法院",
            "l"
          ]
        ]
      },
      cn: {
        head: ["条款", "发现的问题", "建议修改", "风险"],
        rows: [
          ["责任上限", "没设上限，理论上责任无限", "改为以合同总价款为上限", "h"],
          ["保密义务", "整份合同没有保密条款", "补入双向保密条款并约定存续期限", "h"],
          ["交付期限", "只写了“合理期间内完成”", "改成明确的工作日天数并定义起算日", "m"],
          ["数据保护", "提到了个人信息，但没写委托处理和删除义务", "补入数据处理范围、再委托限制和终止后删除", "m"],
          ["终止条款", "只有对方能提前终止", "改成双方对等，并约定通知期", "m"],
          ["准据法与争议解决", "没约定管辖法院", "补入准据法和一审管辖法院", "l"]
        ]
      },
      "en": {
        "head": [
          "Clause",
          "Issue found",
          "Suggested change",
          "Risk"
        ],
        "rows": [
          [
            "Limitation of liability",
            "No cap at all — exposure is unbounded",
            "Cap at total contract value",
            "h"
          ],
          [
            "Confidentiality",
            "No confidentiality clause anywhere in the draft",
            "Add mutual confidentiality with a survival period",
            "h"
          ],
          [
            "Delivery deadline",
            "Only says \"within a reasonable period\"",
            "State business days and define the start date",
            "m"
          ],
          [
            "Data protection",
            "Mentions personal data, silent on processing and deletion",
            "Add processing scope, sub-processor limits, deletion on termination",
            "m"
          ],
          [
            "Termination",
            "Only the counterparty may terminate early",
            "Make it mutual with a defined notice period",
            "m"
          ],
          [
            "Governing law & disputes",
            "No venue agreed",
            "Add governing law and court of first instance",
            "l"
          ]
        ]
      }
    },
    "rec": {
      "zh": "<b>審閱建議:</b>責任上限與保密條款兩項建議簽署前務必處理;語意模糊的期限用語雖非高風險,但最容易在事後爭議,一併改掉成本最低。最終條款仍請法務確認。",
      cn: "<b>审阅建议：</b>责任上限和保密条款这两项，签署前一定要处理；表述模糊的期限措辞虽然不算高风险，但最容易在事后扯皮，一起改掉成本最低。最终条款还是请法务把关。",
      "en": "<b>Review note:</b> Settle the liability cap and the missing confidentiality clause before signing. The vague deadline wording is lower risk but the most common source of later disputes — cheapest to fix now. Final wording still belongs with legal."
    }
  }
};
