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
      en: [
        { ask: "We're launching an AI customer support tool next quarter and want to assess viability first.",
          say: "Happy to help. To make the SWOT genuinely useful, I need three things:\n\n1. Which customer segment does this tool serve?\n2. Is support fully human today, or partially automated?\n3. Are you optimizing primarily for cost, speed, or service quality?" },
        { ask: "SMB customers, fully human today. Response speed is the priority.",
          steps: ["Parsing subject and context", "Assessing internal factors (S/W)", "Scanning external environment (O/T)", "Assembling matrix and recommendations"] }
      ]
    },
    title: { zh: "SWOT 分析矩陣", en: "SWOT Matrix" },
    data: {
      zh: {
        S: ["24 小時即時回應,不受人力班表限制", "可同時處理多語言諮詢", "單次互動的邊際成本遠低於真人客服", "所有對話自動留存,便於後續分析"],
        W: ["複雜或高情緒案件仍須轉接真人", "初期需投入大量知識庫整理", "回答品質高度依賴文件完整度", "首次導入的流程改造成本不低"],
        O: ["把客服對話轉為產品改善的第一手洞察", "延伸為自助服務入口,降低進線量", "跨時區市場的進入門檻大幅下降", "可與既有 CRM 整合,補完客戶輪廓"],
        T: ["部分客戶對 AI 客服信任度仍偏低", "競爭者可在短期內推出同級功能", "個資與資料落地法規持續變動", "知識庫若未更新,錯誤答覆會傷害品牌"]
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
      en: [
        { ask: "start",
          say: "Hi! To keep you informed, I need a few things first:\n\n1. Which industry matters most to you?\n2. Any specific topics you're tracking?\n3. Any preferred news sources?" },
        { ask: "Semiconductors, focused on AI accelerators. Prioritize major financial media.",
          say: "Got it. Should I scope this to the last 14 days? And do you want competitor M&A and partnership news included?" },
        { ask: "Yes, last 14 days. Include competitor moves and flag Must-Know items.",
          steps: ["Running web search", "Filtering: relevance / credibility / last 14 days", "Categorizing into four themes", "Scoring impact and drafting the brief"] }
      ]
    },
    title: { zh: "主管摘要", en: "Executive Brief" },
    data: {
      zh: [
        { lv: "m", cat: "競爭對手動態", tx: "一家大型 GPU 供應商宣布收購網路互連技術廠商,補強資料中心叢集的傳輸瓶頸。" },
        { lv: "m", cat: "市場趨勢", tx: "先進製程的 AI 加速器訂單能見度延長,主要代工廠的相關產能已排至明年上半年。" },
        { lv: "n", cat: "新興技術", tx: "多家業者投入以光學互連取代銅線的方案,實驗室階段已見功耗改善。" },
        { lv: "n", cat: "法規變化", tx: "主要出口管制國家正評估調整特定 AI 晶片的輸出規範,細則尚未定案。" }
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
    title: { zh: "NDA 差異比對表", en: "NDA Comparison Table" },
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
      en: [
        { ask: "Just wrapped a product planning meeting — turn it into minutes for me.",
          say: "Sure. I can work from the recording or transcript. Which sections do you want?\n\n• Decisions\n• Action items and owners\n• Open issues\n• Full discussion narrative" },
        { ask: "First three only, skip the narrative. Owners must be named.",
          steps: ["Reading the transcript", "Identifying speakers and threads", "Extracting decisions, actions and owners", "Formatting the structured minutes"] }
      ]
    },
    title: { zh: "會議摘要", en: "Meeting Summary" },
    data: {
      zh: [
        { lv: "m", cat: "決議事項", tx: "確認下一版本以行動端體驗為優先,桌面端功能延後一個週期。" },
        { lv: "m", cat: "決議事項", tx: "既有付費方案維持不變,新方案設計延至市場調查完成後再議。" },
        { lv: "n", cat: "待辦事項", tx: "產品團隊於本週內提出行動端功能範圍草案,交由設計評估工時。" },
        { lv: "n", cat: "未解議題", tx: "跨區資料同步的延遲問題尚無結論,需工程團隊補充技術評估。" }
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
    title: { zh: "SMART 目標拆解", en: "SMART Goal Breakdown" },
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
    title: { zh: "需求探詢結果", en: "Requirement Discovery" },
    data: {
      zh: [
        { lv: "m", cat: "表面陳述", tx: "「報表載入很慢」— 這是症狀,不是需求本身。" },
        { lv: "m", cat: "可能根因", tx: "使用者多在每日晨會前查看,真正在意的是「能否在會議開始前拿到數字」。" },
        { lv: "n", cat: "待驗證假設", tx: "若提供前一日的預先產製快照,即使即時查詢仍慢,體感問題也可能消失。" },
        { lv: "n", cat: "建議追問", tx: "確認尖峰使用時段、可接受的資料新鮮度、以及是否所有欄位都必要。" }
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
      en: [
        { ask: "I'd like to start today's prompt engineering challenge", say: "Great! Today's challenge is 'Write a product-inquiry prompt using the GSEC framework.' Before we begin — how familiar are you with the four GSEC dimensions?" },
        { ask: "I know what the letters stand for, but I'm not sure how to apply them in practice", steps: ["Parse input", "Match framework", "Assess completeness", "Generate feedback"] }
      ]
    },
    title: { zh: "GSEC 提示詞挑戰回饋報告", en: "GSEC Prompt Challenge Feedback Report" },
    data: {
      zh: [
        { lv: "m", cat: "目標（G）", tx: "目標欄位已清楚點明「詢問產品規格」，語意完整，此維度達標" },
        { lv: "m", cat: "期望（E）", tx: "期望描述過於寬泛；建議改為「請以條列式輸出三項關鍵規格及交期」以提升可執行性" },
        { lv: "n", cat: "來源（S）", tx: "未指定參考來源；可加入「依照官網產品頁內容」強化回應準確性" },
        { lv: "n", cat: "情境（C）", tx: "補充「我是負責詢價的採購人員，對方是技術顧問」有助模型調整語氣與措詞" }
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
      en: [
        { ask: "What would be the impact on service coverage and total cost if we deploy 30 additional frontline staff in the northern region?", say: "This is well-suited for a sensitivity analysis. Before running the simulation, I need a couple of parameters: roughly how many frontline staff are currently in the northern region? And what is the primary metric for 'service coverage' — response time, visit frequency, or something else?" },
        { ask: "Around 100 currently; the main metric is average monthly client visits per staff", say: "Understood. I'll build three deployment-scale scenarios and flag the relative changes in cost and coverage.", steps: ["Parse assumptions", "Run sensitivity"] },
        { ask: "Please also add a comparison scenario using flexible scheduling instead of new hires", steps: ["Stochastic modelling", "Generate decision brief"] }
      ]
    },
    title: { zh: "前線人力部署情境決策簡報", en: "Frontline Staffing Deployment Decision Brief" },
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
      en: [
        { ask: "I wrote a prompt and would like your feedback: 'Help me write a weekly business update for my manager'", say: "A very common starting point! Before diving in, may I ask: what does your manager prefer to see — key numbers, narrative progress, or a list of blockers? Understanding their reading style lets me give you sharper advice." },
        { ask: "My manager prefers numbers and blockers up front — no background preamble needed", steps: ["Analyse 4 dimensions", "Assess completeness", "Draft rewrite", "Provide template"] }
      ]
    },
    title: { zh: "提示詞診斷報告：業務週報", en: "Prompt Diagnostic Report: Weekly Business Update" },
    data: {
      zh: [
        { lv: "m", cat: "目標（G）", tx: "目標欄位過於寬泛；建議改為「產出本週業務進度摘要，重點呈現達標率與三項待解問題」" },
        { lv: "m", cat: "期望（E）", tx: "完全缺少輸出格式；加入「以三段落、每段不超過 80 字，數字用條列呈現」可大幅提升品質" },
        { lv: "n", cat: "來源（S）", tx: "補充「依附件中的週報數據」或「根據以下摘要」，避免模型自行推測數字" },
        { lv: "n", cat: "情境（C）", tx: "加入「主管偏好直接看數字，不需背景說明」可讓輸出更貼合讀者習慣" }
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
      en: [
        { ask: "Our cross-department project approval process is too slow — it keeps getting stuck at the middle-management layer and seriously affects delivery timelines", say: "This is a classic organisational bottleneck. Before diving in, could you tell me: how many business days does an average approval take? And what is the main reason it stalls at the mid-manager layer — insufficient information, workload overload, or unclear delegation authority?" },
        { ask: "About 7 to 10 business days — mainly because managers are overloaded, and when one goes on leave the whole thing grinds to a halt", steps: ["Map problem structure", "Multi-angle analysis", "Identify leverage points", "Draft action path"] }
      ]
    },
    title: { zh: "跨部門審批瓶頸解題分析", en: "Cross-Department Approval Bottleneck Analysis" },
    data: {
      zh: {
        S: ["審批層級架構已明確，流程有跡可循", "中階主管掌握業務脈絡，審批品質有保障", "現有系統已能追蹤案件狀態", "團隊主動識別問題，具備改善意願"],
        W: ["審批無時限約束，缺乏 SLA 機制", "代理審批制度不健全，單點依賴風險高", "資訊不對稱，送件方無從得知卡關原因", "多數案件走序列流程，未善用並行審批"],
        O: ["建立自動提醒與逾期升級機制", "制定委辦授權清單，精簡不必要的審核層", "透過現有協作工具建立可視化進度看板", "定期用數據回顧 SLA，持續優化流程設定"],
        T: ["流程改動可能遭遇組織文化阻力", "過度自動化可能降低審批的嚴謹程度", "若未配套培訓，改善效果難以持久", "短期陣痛期可能衝擊時效敏感的案件交期"]
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
      en: [
        { ask: "Help me design an employee training module for our newly introduced expense reimbursement system", say: "Happy to help! To ensure the module fits real needs, could you tell me: how digitally savvy are your target learners — mostly proficient users or primarily basic users? And what is the core pain point — 'don't know how to use it' or 'know how but keep making errors'?" },
        { ask: "Mixed background, mostly basic users; the main pain point is incorrect submissions causing rejections", steps: ["Define objectives", "Plan modules", "Write scripts", "Design assessments"] }
      ]
    },
    title: { zh: "費用申報系統培訓模組設計", en: "Expense Reimbursement System Training Module Design" },
    data: {
      zh: [
        { lv: "m", cat: "學習目標", tx: "完訓後學員能獨立完成申報並正確選擇費用類別，降低因填寫錯誤導致的退件率" },
        { lv: "m", cat: "模組架構", tx: "建議三段式設計：①系統導覽（10分鐘）②常見情境演練（15分鐘）③知識確認小測驗（5分鐘）" },
        { lv: "n", cat: "互動設計", tx: "演練段落加入「常見錯誤糾錯題」，學員選錯後才觸發解說，有效加深記憶" },
        { lv: "n", cat: "語調建議", tx: "採支持性語調，將「不得提交重複單據」改為「建議送出前對照上月紀錄確認」，減少防衛感" }
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
      en: [
        { ask: "We're adding a leave application feature to our employee self-service app — please help me break down the user stories", say: "Got it! Before breaking it down, could you confirm which roles are in scope — beyond employees submitting requests, are manager approvals and HR inquiries also included? And what is the most painful part of the current process?" },
        { ask: "Three roles: employees, managers, and HR. The biggest pain is relying entirely on email — tracking status is a nightmare", steps: ["Define personas", "Break down stories", "Write acceptance criteria", "Prioritise"] }
      ]
    },
    title: { zh: "請假功能使用者故事清單", en: "Leave Application Feature — User Story Backlog" },
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
      en: [
        { ask: "We're launching a new B2B enterprise collaboration tool next month on LinkedIn and Instagram — please help me plan a content strategy", say: "Excellent plan! To sharpen the strategy, could you share the current follower count on each platform? And who are the primary target personas — IT managers, digital transformation leads, or general business managers?" },
        { ask: "About 3,000 on LinkedIn and 800 on Instagram; we're primarily targeting IT managers and digital transformation leads", steps: ["Analyse current state", "Assess competitive landscape", "Plan content mix", "Define posting strategy"] }
      ]
    },
    title: { zh: "B2B 協作工具社群行銷策略分析", en: "B2B Collaboration Tool Social Media Strategy Analysis" },
    data: {
      zh: {
        S: ["LinkedIn 已具備一定的專業受眾基礎，適合 B2B 決策者觸及", "產品定位明確，訴求 IT 主管與轉型負責人，利於精準訊息設計", "企業協作工具天然契合 LinkedIn 職場敘事場景", "可搭配真實使用情境示範（流程前後對比）增強說服力"],
        W: ["Instagram 受眾基礎偏小，初期有機觸及效益有限", "B2B 視覺內容產製資源通常不如 B2C 充裕，創作節奏難以持續", "兩平台目前可能缺乏一致的品牌視覺系統", "尚未建立跨平台內容複用機制，創作效率偏低"],
        O: ["LinkedIn Carousel 與文章格式對 B2B 決策者吸引力高，可重點投放", "工具操作短影音可吸引技術型受眾，有效展示功能價值", "邀請業界意見領袖共同創作，加速觸及目標決策圈", "試用邀請型貼文可直接將互動轉化為潛在商機"],
        T: ["同類企業工具品牌的社群運營已相當成熟，競爭激烈", "平台演算法變化可能壓縮有機觸及率", "若發布節奏不穩定，受眾黏著度可能快速下降", "職場社群的負評或誤解若處理不及時，影響力大於一般消費市場"]
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
      en: [
        { ask: "My manager just asked me to take over an ongoing project, but both of my current projects are in sprint — how do I decline professionally?", say: "This requires a carefully calibrated conversation. Before drafting a response, could you tell me: is your communication style with your manager direct and frank, or more formal? And when are the deadlines for your two current sprints?" },
        { ask: "Fairly direct communication; both sprints end at the end of this month", steps: ["Apply PLANT framework", "Identify negotiation chips", "Draft response", "Add alternatives"] }
      ]
    },
    title: { zh: "PLANT 框架婉拒回應建議稿", en: "PLANT Framework — Professional Decline Response Draft" },
    data: {
      zh: [
        { lv: "m", cat: "核心回應", tx: "「主管，我很想支援這個案子，但 A 和 B 兩個專案都在月底衝刺，若同時接手恐怕三個案子都會受影響——我們能先討論一下優先序嗎？」" },
        { lv: "m", cat: "替代方案", tx: "主動提議「月底交付後立刻接棒」或「協助找有餘力的同事先行接手」，展現的是支持而非拒絕" },
        { lv: "n", cat: "語氣提醒", tx: "使用「目前」而非「我沒辦法」，保留協商空間，避免讓主管感覺碰壁或被拒於門外" },
        { lv: "n", cat: "後續確認", tx: "對話結束後以 Teams 或 email 確認共識，保護雙方並留下可追溯的紀錄" }
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
      en: [
        { ask: "Please compare this month's (June) business KPIs against last month (May) and write an executive summary", say: "Got it! To make the report most useful, which metrics matter most to your executive audience — order volume, customer satisfaction, payment collection rate, or all of them? Should I also proactively flag significant month-over-month swings?" },
        { ask: "All three, and yes please flag highlights and risks — this report goes straight into the monthly business review", steps: ["Calculate MoM changes", "Flag highlights & risks", "Generate exec summary", "Draft recommendations"] }
      ]
    },
    title: { zh: "六月業務 KPI 月度比較報告", en: "June Monthly Business KPI Comparison Report" },
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
      en: [
        { ask: "Please help me design an Outlook invitation for next month's department off-site", say: "On it! A warm, well-crafted invitation can noticeably improve attendance. Could you confirm the date, time, and venue? And what's the overall tone — relaxed recharge trip, or strategy-focused workshop?" },
        { ask: "August 15–16, at a resort in Hualien, one overnight stay, mostly relaxed recharge; about 20 colleagues attending", steps: ["Gather event details", "Set tone & theme", "Write invitation body", "Suggest subject line"] }
      ]
    },
    title: { zh: "部門 Off-site 邀請函草稿", en: "Department Off-site Invitation Draft" },
    data: {
      zh: [
        { lv: "m", cat: "邀請正文", tx: "「夥伴們，讓我們暫時拋下螢幕，一起充電再出發！📍 8月15–16日｜花蓮度假中心。期待與大家一起探索、放鬆、重新連結——請於 8月8日前回覆確認出席，以利安排住宿。」" },
        { lv: "m", cat: "主旨建議", tx: "建議主旨：「🌊 部門年度充電之旅｜8/15–16 花蓮 Off-site 邀請確認」——長度符合 Outlook 行事曆標題顯示限制" },
        { lv: "n", cat: "行動呼籲", tx: "在正文末段加入明確的回覆截止日（建議活動前一週），可顯著提升住宿安排的及時性" },
        { lv: "n", cat: "表情符號", tx: "輕鬆型邀請可在適當位置加入 🌊🏔️✨ 增添視覺溫度，但總數建議不超過三個以維持專業感" }
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
      en: [
        { ask: "Please build a business case for 'deploying a unified project management tool across the company'", say: "Sure! A compelling business case needs clear pain-point evidence. Could you describe the main problems caused by each department using different tools — information loss, rework, or inability to track progress? Also, what is the headcount in scope and is there a budget estimate?" },
        { ask: "The main issues are information misalignment and tracking difficulty in cross-team collaboration; about 500 people company-wide; budget is TBD", say: "Understood — I'll flag missing financial figures as 'TBD' rather than invent numbers.", steps: ["Build problem statement", "Analyse cost-benefit"] },
        { ask: "Please also add the alternatives analysis and key risks section", steps: ["Assess risks", "Draft proposal"] }
      ]
    },
    title: { zh: "統一專案管理工具導入商業提案", en: "Business Case: Unified Project Management Tool Deployment" },
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
      en: [
        { ask: "I have a pile of Q3 core product-line materials to consolidate — emails, meeting notes, and a risk register — please generate an executive briefing for me", say: "Got it! Before consolidating, could you confirm: who is this briefing for — a department head or a C-level executive? And what is the single most critical decision that needs to come out of this meeting?" },
        { ask: "It's for a business-unit VP; the meeting's core purpose is a Q3 progress review and resource allocation decision", steps: ["Read & consolidate sources", "Identify key themes", "Extract decisions & risks", "Generate structured briefing"] }
      ]
    },
    title: { zh: "Q3 核心產品線主管簡報", en: "Q3 Core Product Line Executive Briefing" },
    data: {
      zh: [
        { lv: "m", cat: "執行摘要", tx: "Q3 整體進度落後預定時程，主因為一家關鍵供應商交期延誤；資源調配議題需 VP 於本次會議中拍板決策" },
        { lv: "m", cat: "待決策事項", tx: "①是否啟動備用供應商方案（需評估品質與交期風險）②是否將 A 產品線人力臨時移撥支援 B 產品線" },
        { lv: "n", cat: "資料矛盾", tx: "兩份文件對交期估算有出入（約差一週），建議會前向負責人確認最新數字，避免決策依據不一致" },
        { lv: "n", cat: "建議下一步", tx: "會後三個工作日內，由專案辦公室發出決策記錄並指定各行動項目的負責人與完成期限" }
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
      en: [
        { ask: "I need to write an SoW for a cloud database migration project. Can you help?", say: "Absolutely! Before I start drafting, let me clarify a few key details: What are the main deliverables? What is the timeline and acceptance criteria? Do you have an existing template to follow?" },
        { ask: "Deliverables include a migration plan, test report, and go-live acceptance document. 12-week timeline, live before Q3, no specific template.", say: "Got it. One last check: Is this SoW for an internal team or an external vendor? That affects how we frame liability and change-management clauses.", steps: ["Parse project scope and deliverable list", "Confirm timeline and key milestone checkpoints"] },
        { ask: "External vendor — formal liability clauses are required.", steps: ["Apply external contract tone and accountability format", "Generate SoW clause structure table"] }
      ]
    },
    title: { zh: "雲端資料庫遷移 — 工作說明書條款結構", en: "Cloud Database Migration — SoW Clause Structure" },
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
      en: [
        { ask: "We are planning to migrate from Exchange 2016 to Exchange Online — about 3,000 mailboxes — and need to finish before Q4. Can you give me a high-level plan?", say: "Sure! Let me confirm a few things first: Is the current environment pure on-premise or already hybrid? Any compliance or data-residency constraints? Are there scheduling conflicts for key stakeholders we need to work around?" },
        { ask: "Pure on-premise, no special compliance needs, but Q3 is peak business season so no large-scale migration during that window.", steps: ["Inventory mailboxes and confirm license requirements", "Design pilot group and batch migration strategy", "Plan Q3 peak-season freeze window", "Build milestone matrix and risk response table"] }
      ]
    },
    title: { zh: "Exchange Online 遷移 — 高層次專案計畫", en: "Exchange Online Migration — High-Level Project Plan" },
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
      en: [
        { ask: "I have uploaded a strategic partnership proposal. Please recommend an appropriate data classification label.", say: "Sure, I am reviewing the document now. Which classification framework does your organization use — for example, a four-tier system (Public / General / Confidential / Highly Confidential) or something else? Knowing the framework ensures my recommendation aligns with your policy." },
        { ask: "We use the standard four tiers: Public, General, Confidential, and Highly Confidential.", steps: ["Scan document content to identify sensitive information types and distribution", "Map findings against the four-tier classification criteria", "Generate classification recommendation with formal written rationale", "Flag ambiguous sections that require manual review"] }
      ]
    },
    title: { zh: "策略合作提案 — 文件分類建議報告", en: "Strategic Partnership Proposal — Classification Recommendation" },
    data: {
      zh: [
        { lv: "m", cat: "分類建議", tx: "建議標籤：機密 — 僅限內部存取（Confidential – Internal Use Only），禁止對外分享或公開刊載" },
        { lv: "m", cat: "敏感內容", tx: "文件含未公開合作條款、財務架構草案及商業策略方向，一旦外洩可能影響談判立場" },
        { lv: "n", cat: "分類依據", tx: "文件中多處出現「僅供內部討論」標註，內容類型符合機密層級的核心定義" },
        { lv: "n", cat: "後續行動", tx: "建議在 SharePoint 套用 MIP 機密標籤，並限制文件下載與外部分享權限" }
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
      en: [
        { ask: "Summarize this week's major industry news on AI accelerators in the semiconductor space, focusing on Must-Know items.", say: "Got it! Let me confirm a few preferences: How many days back should I cover? Do you want English sources summarized in Traditional Chinese, or Chinese sources directly? Should I filter out any content types, such as pure stock and financial analysis?" },
        { ask: "Past 7 days, English sources with Traditional Chinese summaries, and exclude pure financial and stock analysis.", steps: ["Fetch headlines and summaries for AI accelerator topics from past 7 days", "Rank and tag by importance and relevance", "Filter out pure financial content; retain industry and policy dynamics", "Re-summarize in Traditional Chinese and flag Must-Know items"] }
      ]
    },
    title: { zh: "AI 加速器產業週報 — 主管摘要", en: "AI Accelerator Industry Weekly — Executive Digest" },
    data: {
      zh: [
        { lv: "m", cat: "供應鏈", tx: "一家大型 GPU 供應商宣布下一代加速器晶片提前量產，下季出貨能見度明顯改善" },
        { lv: "m", cat: "競爭動態", tx: "兩家主要雲端服務商同週各自發布自研 AI 訓練晶片，加速市場去通用 GPU 化趨勢" },
        { lv: "n", cat: "政策法規", tx: "美國出口管制新規草案公告，高階 AI 晶片出口至特定地區將須事前申請許可" },
        { lv: "n", cat: "技術趨勢", tx: "多個研究機構報告指出 3D 封裝技術正成為提升 AI 推論效率的主要路徑之一" }
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
      en: [
        { ask: "I need to choose between three cloud migration options based on total cost of ownership, technical support quality, and deployment speed. Can you run an MCDA analysis for me?", say: "Sure, let us run a structured multi-criteria decision analysis. One key question first: how would you rank the relative importance of the three criteria — cost, support, and speed? Knowing the weights will make the results much more aligned with your actual priorities." },
        { ask: "Cost is most important (40%), technical support second (35%), speed least important (25%). I also want to add a fourth option: do nothing.", say: "Great — 'do nothing' is a valuable benchmark that sharpens the justification for any change. I will score all four options against your weighted criteria and present the results in a table.", steps: ["Define scoring scale for all four options and score each criterion", "Apply weighted calculation and rank all options"] },
        { ask: "Good, please go ahead.", steps: ["Confirm weighted totals and rankings", "Generate MCDA comparison table with decision recommendation"] }
      ]
    },
    title: { zh: "雲端遷移方案 — MCDA 多標準決策分析", en: "Cloud Migration Options — MCDA Decision Analysis" },
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
      en: [
        { ask: "Help me check the alignment between our annual strategic goals and the departmental execution plans — I am worried there are gaps or contradictions.", say: "Perfect, this is exactly what I am designed for. Paste the content you want me to analyze — strategy statements, plan summaries, any format works. I will scan for contradictions, gaps, and hidden dependencies, then present findings in a structured way." },
        { ask: "(Pastes annual OKRs and three departmental execution plan summaries)", steps: ["Parse key terms and logic from top-level goals and each departmental plan", "Map causal links between objectives and execution steps", "Identify contradictions, gaps, and unacknowledged cross-team dependencies", "Generate coherence gap analysis summary with improvement recommendations"] }
      ]
    },
    title: { zh: "策略目標與執行計畫 — 對齊落差分析", en: "Strategy vs. Execution — Coherence Gap Analysis" },
    data: {
      zh: [
        { lv: "m", cat: "矛盾點", tx: "策略目標強調「降低運營成本」，但兩個部門執行計畫同步要求擴編人力，缺乏資源取捨說明與優先序" },
        { lv: "m", cat: "落差", tx: "OKR 設有「客戶滿意度達 90%」目標，但所有執行計畫中均無對應的 CSAT 量測機制或明確負責單位" },
        { lv: "n", cat: "隱性依賴", tx: "Q3 產品上線里程碑依賴跨部門 API 整合，但計畫中未列出技術窗口、確認時程或升級路徑" },
        { lv: "n", cat: "優化建議", tx: "建議在各執行計畫中增加「策略連結欄」，明確標示每項行動對應的頂層 OKR，以利跨部門審查" }
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
      en: [
        { ask: "I want to write a performance review for my colleague Wei-Chen, who led cross-team coordination during our product launch. Can you help?", say: "Happy to help! A few quick questions: Is this positive recognition, constructive feedback, or both? And can you share 1–2 specific behaviors or outcomes that stood out most to you?" },
        { ask: "Both. His cross-team integration made the product launch happen on time, but his communication pace was too fast and others often struggled to keep up.", say: "Very useful context. For the fast-pace issue, I would suggest framing it as 'behavioral impact' rather than a character judgment — it is better received while still being honest. Let me draft a balanced feedback message.", steps: ["Combine positive behavioral description with concrete outcome evidence", "Reframe growth suggestion using a behavioral-impact lens"] },
        { ask: "Great, please generate the full feedback draft.", steps: ["Add an encouraging close to strengthen message warmth", "Output a complete four-section structured feedback text"] }
      ]
    },
    title: { zh: "同儕績效回饋 — Wei-Chen，產品上市跨部門協調", en: "Peer Performance Feedback — Wei-Chen, Product Launch Coordination" },
    data: {
      zh: [
        { lv: "m", cat: "正面肯定", tx: "Wei-Chen 在產品上市期間展現出卓越的跨部門協調能力，有效整合工程、行銷與客服三個團隊的資源，確保專案如期完成" },
        { lv: "m", cat: "成長建議", tx: "建議在重要進度節點後安排 5 分鐘快速確認，讓不同步調的夥伴也能保持對齊，避免資訊落差擴大" },
        { lv: "n", cat: "影響說明", tx: "此次準時上市是難得的里程碑，Wei-Chen 的主動推進與問題預判是團隊能達成目標的關鍵因素之一" },
        { lv: "n", cat: "語氣建議", tx: "建議在書面回饋最後加入一句期待未來合作的話，例如「期待與你在下個專案中再度攜手」，讓訊息更有溫度" }
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
      en: [
        { ask: "Help me draft Q1 OKRs for the theme 'improving company-wide AI productivity' — targeting all employees.", say: "Great, let us turn that theme into a rigorously structured OKR. A few baseline questions: Do you have any current data on AI tool adoption or productivity? When Q1 ends, what is the most important visible change — tool penetration rate, hours saved, or self-reported capability improvement?" },
        { ask: "Current Copilot adoption is around 40%; the goal is to reach 70% by end of Q1. We also want to collect at least 50 employee-reported time-saving examples.", steps: ["Define a qualitative Objective statement that is inspiring and directional", "Draft 3 measurable KRs with baseline and target values", "Design corresponding action plans and cross-team dependencies", "Generate complete OKR structure table with coherence check"] }
      ]
    },
    title: { zh: "Q1 OKR — 全員 AI 生產力提升計畫", en: "Q1 OKR — Company-Wide AI Productivity Initiative" },
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
      en: [
        { ask: "I need to plan a change initiative for an ERP rollout across 12 countries. Can you help me use the Why/What/Who/How/When framework?", say: "Absolutely — this framework is well-suited for large cross-border change! Before we start: which stakeholder group is showing the most resistance? And are there any hard freeze periods or immovable deadlines? Both factors significantly shape the rollout strategy." },
        { ask: "Finance and warehouse teams are most resistant because their workflows change the most. Q4 is peak season, so no major changes during that window.", say: "Understood. Finance and warehouse resistance usually comes from 'what will I lose?' fears — I recommend prioritizing 1:1 conversations with these groups in the Who stage. The Q4 freeze is a sound design choice and I will build it into the timeline.", steps: ["Frame the Why narrative to establish change urgency and rationale", "Identify high-resistance groups and tailored communication strategies"] },
        { ask: "Great, please generate the full five-dimension change plan table.", steps: ["Design pilot country selection logic and phased rollout strategy", "Output the Why/What/Who/How/When five-dimension change plan table"] }
      ]
    },
    title: { zh: "跨國 ERP 導入 — 五維變革推進計畫", en: "Cross-Border ERP Rollout — Five-Dimension Change Plan" },
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
      en: [
        { ask: "I want to stress-test this idea: a weekly internal newsletter curated by leadership and sent to all employees every Friday, aimed at boosting employee engagement.", say: "I am not here to tell you it is a great idea. Let me ask first: what is the core assumption behind this plan? Why do you believe employees will read it? Have you asked what is actually broken in your current internal communication?" },
        { ask: "We assume employees want to know what is happening company-wide but the information is too scattered — a newsletter consolidates it.", steps: ["Deconstruct core assumptions and surface hidden premises and unverified inferences", "Generate the toughest objections the most critical executive in the room would raise", "Run a pre-mortem: if this plan fails, what are the most likely causes?", "Present a full stress-test using a SWOT framework"] }
      ]
    },
    title: { zh: "內部電子報計畫 — 全面壓力測試報告", en: "Internal Newsletter Plan — Full Stress-Test Report" },
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
      en: [
        { ask: "Our new employee IT onboarding takes 7 working days from signing to receiving all accounts and equipment. I want to cut it down to 2 days. Can you help optimize this process?", say: "That is a well-defined optimization target! Before I start planning, let me ask: where is the biggest bottleneck in the current 7 days — the HR-to-IT handoff, equipment procurement lead time, or account provisioning approval? Also, which systems are you using to manage the process, such as an HR platform or IT ticketing system?" },
        { ask: "The biggest bottleneck is the HR-to-IT handoff — IT sometimes does not even know a new hire is starting. Equipment is also often late; people sometimes have no laptop on Day 1. We use SuccessFactors, ServiceNow, and Entra ID.", steps: ["Map current process steps with time estimates and ownership", "Design SuccessFactors → ServiceNow auto-trigger chain to eliminate the HR-IT handoff black hole", "Plan Entra ID account pre-provisioning and early equipment trigger mechanism", "Output optimized process structure table with Before → After comparison"] }
      ]
    },
    title: { zh: "新人 IT Onboarding — 優化流程結構表（7 天 → 2 天）", en: "New Hire IT Onboarding — Optimized Process Table (7 Days → 2 Days)" },
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
      en: [
        { ask: "I need to design a half-day AI use-case exploration workshop for 20 HR team members, 3 hours total. Can you help me build the agenda and activity design?", say: "Great! Before I start, let me confirm a few things: What is the participants' AI familiarity level — beginners, some experience, or mixed? What is the most important tangible output you want each person to leave with?" },
        { ask: "Most participants are beginners. The end goal is for each person to produce a personal 'HR AI Use Case' list and a draft action plan.", steps: ["Define 2–3 SMART learning objectives aligned to beginner needs", "Design a 3-hour agenda with each segment mapped to a learning objective", "Design use-case exploration activity (design-thinking groups + use-case cards)", "Design action commitment card to ensure a tangible take-home output"] }
      ]
    },
    title: { zh: "HR AI 應用探索工作坊 — 議程與練習設計", en: "HR AI Use-Case Workshop — Agenda & Activity Design" },
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
      en: [
        { ask: "What are the highlights of this event? Which sessions should I prioritize?", say: "Happy to help! What's your main focus — technical sessions, keynote speakers, or the exhibition floor?" },
        { ask: "Mainly the afternoon keynotes and AI-related sessions", steps: ["📅 Scanning session schedule", "🎤 Pulling speaker profiles", "📍 Mapping venue and transit routes", "⭐ Flagging must-attend sessions"] }
      ]
    },
    title: { zh: "今日活動精選導覽", en: "Today's Event Highlights Guide" },
    data: {
      zh: [
        { lv: "m", cat: "主題演講", tx: "下午 2:00 大會堂主舞台的開幕主題演講聚焦 AI 企業落地最新實踐，建議提早 10 分鐘入場佔位。" },
        { lv: "m", cat: "精選場次", tx: "AI 工作流自動化工作坊限額 50 人，須現場至 A3 報到台換票；目前仍有名額，請盡快前往。" },
        { lv: "n", cat: "講者互動", tx: "三位主題講者將於演講後在 Lounge B 進行 30 分鐘開放交流，適合深度提問與名片交換。" },
        { lv: "n", cat: "場地提醒", tx: "主展區與工作坊區步行約 8 分鐘，換場時請預留足夠緩衝時間，以免錯過開場。" }
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
      en: [
        { ask: "Generate 10 creative names with slogans for our new internal data analytics platform", say: "Great! What is the platform's core function? Which teams will use it? Should the tone be formal and professional, or innovative and energetic?" },
        { ask: "Core features are data visualization and predictive analytics, used by finance and operations, professional tone preferred", steps: ["🧠 Analyzing platform positioning and core value", "💡 Brainstorming 30+ candidate names", "🔍 Filtering for originality and brand fit", "✍️ Pairing slogans for memorability"] }
      ]
    },
    title: { zh: "數據分析平台命名建議（精選 5 名）", en: "Analytics Platform Name Recommendations (Top 5)" },
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
      en: [
        { ask: "Help me write high-quality instructions for a customer service Agent handling order inquiries and return/exchange requests", say: "Great! A few questions first: Is the target user a general consumer or a business client? Should the Agent's tone be warm and friendly, or formal and efficient? Are there specific prohibited actions I should build in?" },
        { ask: "General consumers, friendly but efficient tone, must not promise any unconfirmed refund timelines", steps: ["📋 Defining Agent identity and scope boundaries", "🎯 Designing core instructions and behavior rules", "🔄 Building escalation and exception-handling logic", "✅ Outputting best-practice instructions in Markdown"] }
      ]
    },
    title: { zh: "客服 Agent 指示詞品質分析報告", en: "Customer Service Agent Instruction Quality Report" },
    data: {
      zh: [
        { lv: "m", cat: "身份定義", tx: "明確宣告 Agent 為「訂單客服助理」並列出可處理的三類請求，避免範圍蔓延至無法處理的問題。" },
        { lv: "m", cat: "行為規則", tx: "設定「先確認訂單編號再執行任何動作」的核心守則，並加入禁止推測性回答的限制，確保資訊準確性。" },
        { lv: "n", cat: "升級邏輯", tx: "建議加入「連續三次無法解決時，主動提供人工客服選項」的升級觸發條件，提升使用者信任感。" },
        { lv: "n", cat: "語氣設定", tx: "在系統提示中插入語氣範例句（如「我來幫你確認一下！」），引導 Agent 避免生硬的錯誤訊息回應。" }
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
      en: [
        { ask: "Help me create a complete pre-deployment checklist for a production software release", say: "Sure! How many services or systems are involved? Any compliance requirements? What is the deployment window, and do you need a rollback plan?" },
        { ask: "Three microservices, ISO 27001 required, two-hour deployment window, must support fast rollback", steps: ["🔍 Breaking down each critical deployment phase", "⚠️ Flagging high-risk steps and owner roles", "🔄 Adding rollback triggers and compliance checkpoints", "📝 Outputting an executable step-by-step checklist"] }
      ]
    },
    title: { zh: "正式環境部署前置作業清單", en: "Production Deployment Pre-Flight Checklist" },
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
      en: [
        { ask: "I work over eight hours a day and completely lose focus around 3 PM — I want to fix this", say: "I totally get that! Let me ask a couple of things: Is your work mostly continuous creative thinking or structured data tasks? Does the afternoon slump hit suddenly, or does it fade gradually?" },
        { ask: "Mostly writing and thinking work, it fades gradually rather than a sudden crash", steps: ["🧘 Assessing current energy management patterns", "⏱️ Designing an optimal work rhythm plan", "🧍 Creating desk stretches and micro-break routines", "🌿 Integrating mindfulness techniques for recovery"] }
      ]
    },
    title: { zh: "個人化健康生產力改善計畫", en: "Personalized Wellness Productivity Plan" },
    data: {
      zh: [
        { lv: "m", cat: "專注節律", tx: "採用「50-10 工作法」：專心寫作 50 分鐘後離開螢幕 10 分鐘，可有效延緩認知疲勞累積，比番茄鐘更適合長篇思考工作。" },
        { lv: "m", cat: "下午儀式", tx: "每天下午 2:45 設定「能量補給提示」：起身喝水並做 3 分鐘站立伸展，有助於提升後續 90 分鐘的工作品質。" },
        { lv: "n", cat: "桌邊伸展", tx: "試試「坐姿脊椎扭轉」：坐直後右手扶椅背，上半身往右轉停留 10 秒再換邊，快速舒緩因久坐造成的頸肩緊繃。" },
        { lv: "n", cat: "正念練習", tx: "每天早上花 5 分鐘做「4-7-8 呼吸法」啟動一天，能有效降低皮質醇分泌，讓整個上午的認知狀態更加穩定清晰。" }
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
      en: [
        { ask: "I want to build a habit of exercising three times a week this year, but I keep quitting within three weeks — help me find the real blockers", say: "Let's use the COM-B behavioral science framework for a deep diagnosis! During your last attempt, what was the most common reason you skipped exercise — 'I didn't know what to do,' 'the environment wasn't convenient,' or 'I just had no motivation in the moment'?" },
        { ask: "Mainly too tired after work, unsure which exercise suits me, and the gym is a bit far from my office", steps: ["🔬 Diagnosing against all three COM-B dimensions", "🎯 Identifying the highest-leverage intervention points", "🗓️ Designing actionable behavior change strategies", "📊 Setting tracking metrics and the first milestone"] }
      ]
    },
    title: { zh: "運動習慣 COM-B 行為障礙分析", en: "Exercise Habit COM-B Behavior Barrier Analysis" },
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
      en: [
        { ask: "I have a 90-slide presentation for a 60-minute C-level meeting next week — help me optimize it", say: "Happy to help streamline it! How much time should be reserved for Q&A? Do the executives have background on the topic, or does context need to be built from scratch? Is the core goal to inform, get approval, or drive a decision?" },
        { ask: "15 minutes for Q&A, audience has basic context, main goal is getting Q2 budget approved", steps: ["📊 Scanning all 90 slides for duplication and redundancy", "✂️ Flagging slides to merge or remove", "⏱️ Re-timing against a C-level attention curve", "📋 Outputting a streamlined section plan with time allocation"] }
      ]
    },
    title: { zh: "C-Level 簡報精簡優化方案", en: "C-Level Presentation Streamlining Plan" },
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
      en: [
        { ask: "Design A/B test hypotheses to improve trial sign-up conversion on our SaaS product landing page", say: "Got it! What is the main traffic source for the page? Any specific elements you want to prioritize — headline copy, CTA button, or social proof module?" },
        { ask: "Mainly search ad traffic, priority is headline and CTA button, then social proof", steps: ["🎯 Analyzing the biggest drop-off points in the conversion funnel", "💡 Generating test hypotheses and variable designs", "📐 Confirming sample size and statistical significance requirements", "📋 Outputting an executable A/B test plan matrix"] }
      ]
    },
    title: { zh: "登陸頁面 A/B 測試計畫（試用版轉換優化）", en: "Landing Page A/B Test Plan (Trial Conversion Optimization)" },
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
      en: [
        { ask: "Help me prepare for a 30-minute meeting tomorrow with the VP to discuss Q1 marketing budget — I want to secure a 20% increase over last year", say: "Happy to help you plan! Does the VP have an existing lean on budget increases? Were there any standout results or items needing explanation in last quarter's budget execution?" },
        { ask: "VP may challenge ROI; last quarter execution rate was 95% and one campaign performed well but results are hard to quantify", steps: ["📋 Planning the 30-minute meeting rhythm", "💡 Structuring the ROI narrative and supporting arguments", "🛡️ Anticipating three likely objections with counters", "✅ Preparing a clear decision ask"] }
      ]
    },
    title: { zh: "Q1 行銷預算會議準備摘要", en: "Q1 Marketing Budget Meeting Prep Summary" },
    data: {
      zh: [
        { lv: "m", cat: "開場框架", tx: "先用「上季執行率 95% + 高成效活動」建立可信度，再提出增幅訴求，讓 VP 在聽到數字前先認可「錢花得值」的前提。" },
        { lv: "m", cat: "效益論述", tx: "將難以量化的活動成效轉化為「品牌資產累積與潛在客戶管道擴大」，並對比同行業投入水位以支撐增幅合理性。" },
        { lv: "n", cat: "質疑預案", tx: "預備三個反駁要點：① 增幅低於通膨率；② 投資新渠道比加碼既有花費更高效；③ 不投資的機會成本估算。" },
        { lv: "n", cat: "收尾行動", tx: "結尾提出清晰 Ask：「請在本週五前給予原則性批准，細部計畫下週一提交」，避免 VP 離場後決策懸而未決。" }
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
      en: [
        { ask: "Help me plan morale-boosting activities for a 10-person remote dev team spread across three time zones", say: "Got it! Before I suggest ideas, can you share the main reason morale is low — work pressure, lack of belonging, or recent team changes?" },
        { ask: "Mainly the time zone spread makes everyone feel isolated, lacking connection, and two new members just joined", steps: ["🌍 Analyzing time zone connection pain points", "🎯 Filtering activities suitable for async + sync hybrid", "👋 Designing an accelerated new-member onboarding experience", "📋 Outputting a low-cost, high-frequency recurring morale plan"] }
      ]
    },
    title: { zh: "遠距開發團隊士氣提振活動計畫", en: "Remote Dev Team Morale Boost Activity Plan" },
    data: {
      zh: [
        { lv: "m", cat: "連結感", tx: "導入「咖啡輪盤」：每兩週由系統隨機配對兩人進行 15 分鐘非工作話題視訊閒聊，有效打破跨時區的孤立感。" },
        { lv: "m", cat: "新人融入", tx: "為每位新成員安排一位「文化大使」，前三週每週進行 30 分鐘非正式一對一，協助快速建立人際脈絡與文化認同。" },
        { lv: "n", cat: "非同步肯定", tx: "在 Teams 建立「本週亮點牆」頻道：每週五每人具名分享一位隊友做得很棒的具體事蹟，增強非同步正向互動。" },
        { lv: "n", cat: "里程碑慶祝", tx: "每個 Sprint 結束後舉辦 10 分鐘「勝利回顧」線上聚會，公開表揚一個團隊共同成就，建立集體榮譽感。" }
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
      en: [
        { ask: "I want to design a half-day workshop helping the marketing team boost daily productivity with Microsoft 365 Copilot", say: "Great topic! Let me gather a few key details: ① Expected headcount and participants' Copilot experience level? ② In-person, online, or hybrid? ③ What is the one thing you most want participants to be able to do immediately after the workshop?" },
        { ask: "About 12 people, most are just starting with Copilot, in-person format, want them to immediately use Copilot in Teams and Outlook", steps: ["🎯 Setting 2–3 SMART learning objectives", "📐 Designing the timed agenda and materials list", "🎮 Building at least one interactive activity per segment", "📝 Writing the facilitator script and prep checklist"] }
      ]
    },
    title: { zh: "Copilot 行銷團隊工作坊設計方案（半天）", en: "Copilot Marketing Team Workshop Design (Half-Day)" },
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
      en: [
        { ask: "I need to turn five project emails and two spreadsheets from last quarter into a board-level summary presentation — Copilot Chat or Copilot Cowork?", say: "Great question! Let me ask two key things: ① Is the expected output a full PowerPoint presentation, or is a text summary sufficient? ② Is this a one-time task, or will you repeat it every quarter?" },
        { ask: "Need a complete PowerPoint presentation, it is a one-time task but may become a regular quarterly process if it works well", steps: ["🔍 Evaluating task characteristics across six dimensions", "⚖️ Scoring against the tool selection decision framework", "🧭 Arriving at one of three clear conclusions", "📋 Generating a ready-to-use execution Prompt"] }
      ]
    },
    title: { zh: "Copilot 工具選用分析：董事會摘要簡報任務", en: "Copilot Tool Selection Analysis: Board Summary Presentation Task" },
    data: {
      zh: [
        { lv: "m", cat: "工具結論", tx: "✅ 建議使用 Copilot Cowork：此任務需跨 Outlook、Excel、PowerPoint 三個 App 端到端整合，已超出單一 Chat 對話的合理處理範疇。" },
        { lv: "m", cat: "執行提示", tx: "委派給 Cowork：「請讀取 Outlook 中標題含『Q3 專案』的五封信件，以及 OneDrive 的 Q3_data.xlsx，整合成一份 8 頁的 PowerPoint 董事會摘要，每頁一個核心洞察。」" },
        { lv: "n", cat: "翻轉因素", tx: "若無 Cowork 授權或期限緊迫，可退而使用 Copilot Chat（2–3 個 Prompt 序列）：先在 Word 整理摘要，再手動匯入 PowerPoint 補充視覺化。" },
        { lv: "n", cat: "未來規劃", tx: "若此工作流程固定化，建議在 Cowork 儲存為循環委派範本，未來每季只需更換檔案連結，大幅縮短重複執行時間。" }
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
      en: [
        { ask: "I have meeting notes from last week's Copilot Studio workshop and want to turn them into a shareable knowledge article.", say: "Great! What output format would you prefer — (1) Key summary, (2) Quiz questions, (3) Application tips, or a combination?" },
        { ask: "Please give me a key summary combined with application tips.", steps: ["Parse meeting notes structure", "Identify core learning points"] },
        { ask: "This looks great — please output the full knowledge article.", steps: ["Compile application tips section", "Generate Markdown knowledge article"] }
      ]
    },
    title: { zh: "Copilot Studio 工作坊知識萃取報告", en: "Copilot Studio Workshop Knowledge Extraction Report" },
    data: {
      zh: [
        { lv: "m", cat: "核心概念", tx: "Copilot Studio 可在無程式碼介面中建立自訂 AI 代理人，快速對應各業務場景的落地需求。" },
        { lv: "m", cat: "最佳實務", tx: "設計對話流程前，應先明確定義使用者意圖，可大幅降低後期維護成本。" },
        { lv: "n", cat: "應用提示", tx: "從單一部門的小規模試行出發，收集回饋後再逐步擴展至全公司部署。" },
        { lv: "n", cat: "延伸學習", tx: "整合 Power Automate 可讓代理人跨系統執行端對端自動化，顯著擴充套用場景。" }
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
      en: [
        { ask: "I work in HR and spend two full days each month manually reviewing employee feedback surveys. I want to know how AI can help.", say: "Understood! What format are the surveys mostly in — open-ended text, rating scales, or a mix? And roughly how many do you process per month?" },
        { ask: "Mostly a mix, around 200 per month. The biggest bottleneck is compiling them into a monthly report.", steps: ["Diagnose workflow pain points", "Evaluate applicable AI solutions"] },
        { ask: "Please give me a prioritized list of recommendations.", steps: ["Map to Microsoft 365 Copilot capabilities", "Output prioritized action recommendations"] }
      ]
    },
    title: { zh: "HR 員工回饋流程 AI 優化建議", en: "HR Feedback Workflow AI Optimization Recommendations" },
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
      en: [
        { ask: "I have a draft invitation email for a key client's VP of Procurement and I'm not sure the tone is right. Can you review it?", say: "Of course! What is the main goal of the email — scheduling a meeting, presenting a proposal, or following up? Could you paste the draft?" },
        { ask: "The goal is to invite them to a solution presentation next week. Here's the draft: [invitation email draft]", steps: ["Analyze tone and clarity", "Check structure and logical flow"] },
        { ask: "Please give me specific line-by-line revision suggestions.", steps: ["Highlight areas needing improvement", "Provide rewrite examples for each issue"] }
      ]
    },
    title: { zh: "提案邀請信校稿報告", en: "Proposal Invitation Email Proofreading Report" },
    data: {
      zh: [
        { lv: "m", cat: "語氣調整", tx: "開頭過於謙遜，建議改為自信且尊重的語調，例如將「冒昧打擾」替換為直接陳述拜訪目的。" },
        { lv: "m", cat: "段落結構", tx: "核心價值主張應移至第一段，讓讀者在三秒內了解這封信的價值，避免在後段流失注意力。" },
        { lv: "n", cat: "行動呼籲", tx: "CTA 不夠明確，建議加入具體簡報日期、時間與確認方式，降低對方的決策摩擦。" },
        { lv: "n", cat: "用詞精簡", tx: "兩處冗長複合句建議拆為短句，提升閱讀速度，符合 C-level 對象的閱讀習慣。" }
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
      en: [
        { ask: "I need to renegotiate our annual software license renewal next week — the supplier is hinting at a price increase. I need a strategy.", say: "Understood! To build the best strategy: is this a long-term partnership? And what is your primary goal — capping the price increase, adding seats, or gaining extra services?" },
        { ask: "Three-year partnership. Main goal is to keep the increase under 5% and add two license seats without locking in more than one year.", steps: ["Analyze leverage points and alternatives", "Simulate likely supplier negotiation positions"] },
        { ask: "Please give me the full negotiation strategy framework.", steps: ["Design opening offer and concession sequence", "Output strategy action comparison table"] }
      ]
    },
    title: { zh: "軟體授權續約談判策略框架", en: "Software License Renewal Negotiation Strategy Framework" },
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
      en: [
        { ask: "Our customer service team wants to know about emerging AI trends in customer service and how to apply them.", say: "Great question! What are your team's primary channels — phone, live chat, email? And what is the biggest pain point you most want to address?" },
        { ask: "Mainly live chat and email. The biggest issue is that repetitive questions take up too much capacity, slowing complex case resolution.", steps: ["Scan customer service AI trend database", "Map current state against trend gaps"] },
        { ask: "Please compile actionable innovation recommendations we can act on right away.", steps: ["Synthesize trend insights", "Translate into concrete action plans"] }
      ]
    },
    title: { zh: "客服 AI 創新趨勢雷達報告", en: "Customer Service AI Innovation Trend Radar Report" },
    data: {
      zh: [
        { lv: "m", cat: "即時趨勢", tx: "生成式 AI 自動回覆已可有效處理大量標準查詢，顯著釋放客服人員處理複雜案件的產能。" },
        { lv: "m", cat: "優先行動", tx: "部署 Copilot Studio 建立知識庫驅動的 FAQ 代理人，優先覆蓋最頻繁的重複問題類別。" },
        { lv: "n", cat: "深層趨勢", tx: "即時情感偵測技術已能識別高挫折感對話，並自動升級至資深客服，有效提升化解率。" },
        { lv: "n", cat: "協作策略", tx: "設計人機協作分流機制——AI 處理初層篩選與標準回覆，人工聚焦於高價值複雜案件。" }
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
      en: [
        { ask: "Next month I'm presenting a new product line launch at an all-hands meeting. The current deck reads like a spec sheet — I want it to be more persuasive.", say: "Great starting point! Who is your audience — executives, sales, engineering, or a full mix? And what is the single outcome you want them to leave with?" },
        { ask: "It's all employees including non-technical staff. I want them excited about the product and eager to recommend it to customers.", steps: ["Diagnose current structure weaknesses", "Apply Hero's Journey story framework"] },
        { ask: "Please give me specific improvement recommendations.", steps: ["Design a situational opening hook", "Output story arc optimization suggestions"] }
      ]
    },
    title: { zh: "產品發表全員大會故事力優化報告", en: "Product Launch All-Hands Storytelling Improvement Report" },
    data: {
      zh: [
        { lv: "m", cat: "故事結構", tx: "將「功能列表」架構改為「英雄之旅」——先描繪使用者的現實痛點，再呈現產品帶來的轉化時刻。" },
        { lv: "m", cat: "開場設計", tx: "用一個真實客戶情境（匿名化處理）作為開場鉤子，比數據圖表更能觸發情感共鳴。" },
        { lv: "n", cat: "語言策略", tx: "對非技術聽眾，每個功能後接一句「這代表你可以...」，將技術特性轉化為個人具體利益。" },
        { lv: "n", cat: "收尾設計", tx: "簡報結尾應以明確行動號召收場而非技術規格摘要，讓聽眾帶著「下一步」離開會場。" }
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
      en: [
        { ask: "Please analyze the cloud computing services industry using Porter's Five Forces, from the perspective of major incumbent providers in the enterprise market.", say: "Understood! Before I begin, please confirm scope: global market or a specific region? And will this be used for a strategy report or investment evaluation?" },
        { ask: "Global market, for an internal strategy report.", steps: ["Research force intensity indicators", "Assess inter-force dynamics"] },
        { ask: "Please output the full Five Forces analysis.", steps: ["Quantify threat level per force", "Generate strategic insights and action recommendations"] }
      ]
    },
    title: { zh: "雲端運算產業波特五力分析（企業級市場）", en: "Cloud Computing Industry Porter's Five Forces Analysis (Enterprise Market)" },
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
      en: [
        { ask: "Please help me draft a company policy on employee use of generative AI tools. We have around 3,000 employees.", say: "Happy to help! Before I start: should the policy lean toward 'permitted with disclosure' or 'requires prior approval'? And are there specific compliance frameworks to align with?" },
        { ask: "We'll go with 'permitted with disclosure', aligned with our existing data protection policy, but no external standards for now.", steps: ["Build policy section framework", "Apply enterprise-standard tone template"] },
        { ask: "Please output the full policy document structure.", steps: ["Populate core content for each section", "Add compliance clauses and review mechanism"] }
      ]
    },
    title: { zh: "生成式 AI 工具使用規範政策（草稿）", en: "Generative AI Tool Usage Policy (Draft)" },
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
      en: [
        { ask: "We just updated our remote work policy — it's 25 pages. I want a plain-language one-pager for new employees.", say: "Got it! Which role should this be tailored for — general employees, managers, or IT staff? Are there specific topics or common misconceptions you want to highlight?" },
        { ask: "For general new employees. The most common issues are not knowing how to apply for the equipment allowance and not understanding the home-office security requirements.", steps: ["Parse policy structure and key clauses", "Filter most critical sections for new employees"] },
        { ask: "Please output the plain-language one-page guide.", steps: ["Convert to plain, easy-to-read language", "Generate role-tailored one-page guide"] }
      ]
    },
    title: { zh: "遠距工作政策新進員工一頁指南", en: "Remote Work Policy New Employee One-Page Guide" },
    data: {
      zh: [
        { lv: "m", cat: "必做事項", tx: "設備補助申請須於到職後 30 天內透過 IT 入口網站提交，逾期需重新申請且不溯及既往。" },
        { lv: "m", cat: "資安規定", tx: "使用公司設備時必須連線公司 VPN，禁止在公共 Wi-Fi 環境下開啟或傳送任何機密文件。" },
        { lv: "n", cat: "出勤彈性", tx: "遠距員工不強制特定上班時段，但須在核心時間（10:00–16:00）保持可聯繫狀態。" },
        { lv: "n", cat: "設備事故", tx: "設備遺失或損壞須於 24 小時內通報 IT Help Desk，以啟動帳號停用與資料保護流程。" }
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
      en: [
        { ask: "I need to generate the July KPI report for my sales team. I have this month's and last month's numbers and need a format suitable for presenting to management.", say: "Understood! Please paste this month's and last month's KPI values along with any context notes, such as promotions or staffing changes. I'll base the report solely on what you provide." },
        { ask: "This month: new client acquisition 45 (last: 40), close rate 23% (last: 26%), avg. sales cycle 18 days (last: 20), CSAT 4.2/5 (unchanged). Note: last month's close rate was elevated by a promotional campaign.", steps: ["Compare each KPI month-over-month", "Interpret changes using provided context notes"] },
        { ask: "Please output the full executive summary and an email version.", steps: ["Flag improving and watch-list indicators", "Output manager-ready report format"] }
      ]
    },
    title: { zh: "業務團隊七月 KPI 執行摘要", en: "Sales Team July KPI Executive Summary" },
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
      en: [
        { ask: "Please challenge this argument: 'All knowledge workers should be required to work remotely, as it improves productivity and reduces costs.' Context: internal leadership debate next week, I'm on the opposition side. Depth: deep analysis.", say: "Got it! Before I begin, what angle is most critical for your position — challenging the productivity data, countering the cost argument, or highlighting organizational culture risks?" },
        { ask: "All three, but most importantly I need logic-backed arguments, not just gut-feel objections.", steps: ["Deconstruct core assumptions of the argument", "Identify logical gaps and faulty premises"] },
        { ask: "Please output the full structured counter-arguments.", steps: ["Construct evidence-based counter-arguments", "Output structured counter-argument list"] }
      ]
    },
    title: { zh: "反方論證：「強制遠距工作提升生產力」", en: "Counter-Arguments: 'Mandatory Remote Work Boosts Productivity'" },
    data: {
      zh: [
        { lv: "m", cat: "反論一", tx: "生產力提升在自律型個人工作者中成立，但協作密集型角色（如新產品設計、跨部門整合）在遠距環境中普遍出現溝通延遲與創意損耗。" },
        { lv: "m", cat: "反論二", tx: "「降低成本」通常僅計算辦公室租金，忽略居家設備補助、網路費、心理健康支持等成本實際上的轉嫁效應。" },
        { lv: "n", cat: "反論三", tx: "強制遠距對新進員工傷害最大——學習曲線延長、師徒文化削弱，長期將侵蝕組織的知識傳承能力。" },
        { lv: "n", cat: "反論四", tx: "早期生產力提升數據多來自疫情初期短期效應，缺乏長期追蹤的系統性研究，現有學術結論仍存在分歧。" }
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
   "en": "<b>Access note:</b> Cowork, Researcher, and usage conditions can vary by license and administrator settings. Confirm availability in your organization before starting."
  }
 }
};
