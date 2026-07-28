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
  }
};
