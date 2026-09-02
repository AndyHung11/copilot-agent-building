const ZONES = [
  {
    "id": "Z1",
    "name": "策略觀測站",
    "nameEn": "Strategy Observatory",
    "icon": "🛰️",
    "color": "#4f7cff",
    "count": 10
  },
  {
    "id": "Z2",
    "name": "創意光譜艙",
    "nameEn": "Creative Spectrum Dome",
    "icon": "🌈",
    "color": "#ff6f91",
    "count": 8
  },
  {
    "id": "Z3",
    "name": "生態培育艙",
    "nameEn": "Crew & Biosphere Dome",
    "icon": "🌱",
    "color": "#34c38f",
    "count": 8
  },
  {
    "id": "Z4",
    "name": "護盾管制站",
    "nameEn": "Shield Control Station",
    "icon": "🛡️",
    "color": "#f0a500",
    "count": 4
  },
  {
    "id": "Z5",
    "name": "深空通訊站",
    "nameEn": "Deep Space Comms Array",
    "icon": "📡",
    "color": "#8378de",
    "count": 6
  },
  {
    "id": "Z6",
    "name": "工程機庫",
    "nameEn": "Engineering Hangar",
    "icon": "⚙️",
    "color": "#2196f3",
    "count": 10
  },
  {
    "id": "Z7",
    "name": "推進實驗艙",
    "nameEn": "Propulsion Lab",
    "icon": "🚀",
    "color": "#00c2d1",
    "count": 5
  },
  {
    "id": "Z8",
    "name": "Agent 訓練艙",
    "nameEn": "Agent Training Dome",
    "icon": "🧬",
    "color": "#ffb703",
    "count": 7
  }
];

const AGENTS = [
  {
    "id": "A001",
    "zone": "Z2",
    "emoji": "📰",
    "cname": "主管新聞聚合器",
    "ename": "Exec News Aggregator",
    "headline": "主管新聞聚合器登場！",
    "tagline": "✨ 一鍵掌握產業關鍵動態，告別資訊爆炸",
    "description": "主管新聞聚合器（Exec News Aggregator） 透過蒐集、過濾、摘要近期、可信賴且相關的產業新聞與趨勢，協助你保持資訊靈通。\n它會交付精簡、聚焦決策的更新內容，並依你的關注領域客製化，\n幫助你掌握市場變化、競爭對手動態與法規異動，避免資訊過載。",
    "painPoints": [
      "每天 50 個 RSS 看到眼花還沒抓到重點",
      "老闆問動態 都是 30 秒前才 google",
      "競爭對手早一週 才在會議上聽說"
    ],
    "quickStart": [
      "啟用 Agent 後輸入 start 。",
      "回答三個問題： 產業焦點 、 關注主題 、 偏好來源 （例：Bloomberg、Reuters、TechCrunch）",
      "馬上拿到一份 近 14 天 的條列式產業摘要，每則都已分級。"
    ],
    "example": "start\n請整理本週\n半導體產業\n在\nAI 加速器\n的最新動向，來源以\nBloomberg、Reuters\n為主。\n過去 14 天有哪些\n競爭對手的併購或合作消息\n？請標出 Must-Know 等級。",
    "license": "free"
  },
  {
    "id": "A002",
    "zone": "Z8",
    "emoji": "🤖",
    "cname": "每日挑戰 Agent",
    "ename": "Daily Challenge Agent",
    "headline": "每日挑戰 Agent 登場！",
    "tagline": "✨ 每天一道練習題，Prompt 技能突飛猛進！",
    "description": "這個 Agent 透過每日挑戰與互動測驗，幫助使用者提升提示詞工程技能。它使用\nGSEC 框架\n（目標 Goal、來源 Source、期望 Expectation、情境 Context）教導並強化最佳實踐，並透過實作練習鼓勵使用者不斷迭代、反思與成長。",
    "painPoints": [
      "提示詞每次 靠猜、靠運氣",
      "知道 GSEC 框架 沒有地方練習",
      "沒有即時回饋 不知道自己進步了沒"
    ],
    "quickStart": [
      "輸入 開始挑戰 或 開始測驗",
      "告訴 Agent 你的工作職位，它會量身打造今日挑戰內容",
      "依 GSEC 框架撰寫你的提示詞，獲得即時引導與回饋"
    ],
    "example": "開始挑戰\n開始測驗",
    "license": "free"
  },
  {
    "id": "A003",
    "zone": "Z1",
    "emoji": "🤖",
    "cname": "SWOT 分析 Agent",
    "ename": "SWOT Analysis Agent",
    "headline": "SWOT 分析 Agent 登場！",
    "tagline": "✨ 任何決策前，先用 SWOT 找到你的致勝優勢！",
    "description": "SWOT Agent 協助使用者針對各種主題——包括產品、團隊、事業單位、策略與計畫——產生結構化且具洞察力的 SWOT 分析。它是策略規劃、回顧會議、工作坊和主管報告的寶貴工具，幫助找出關鍵洞察、對齊利害關係人，並以清晰精準的方式支援決策制定。",
    "painPoints": [
      "開策略會 SWOT 填不完整",
      "結論太籠統 無法轉化成行動",
      "快速對齊主管 分析文件耗費數小時"
    ],
    "quickStart": [
      "告訴 Agent 你想分析什麼（產品、團隊、計畫或競爭對手）",
      "提供背景資訊（績效數據、市場狀況、客戶回饋等）",
      "選擇輸出格式（高層摘要 / 深度分析），獲得完整 SWOT"
    ],
    "example": "為我們新的 AI 客服工具產生 SWOT 分析。\n針對本週衝刺目標，給我一份快速 SWOT 評估。",
    "license": "free"
  },
  {
    "id": "A004",
    "zone": "Z6",
    "emoji": "🤖",
    "cname": "工作說明書 Agent",
    "ename": "Statement Of Work Agent",
    "headline": "工作說明書 Agent 登場！",
    "tagline": "✨ 從目的到交付，逐步生成專業級工作說明書！",
    "description": "你是一位工作說明書建立工具。你的職責是根據使用者輸入及提供的參考文件或範本，撰寫詳細且有效的工作說明書（Statement of Work, SoW）。",
    "painPoints": [
      "每次 SOW 從零開始耗時排版",
      "容易漏掉 風險管理或驗收條件",
      "成本估算 和時程規劃不知從何著手"
    ],
    "quickStart": [
      "輸入「 你的技能是什麼？ 」了解 Agent 的所有功能選項",
      "輸入「 引導我建立 SOW 文件 」開始逐步建立流程",
      "回答 Agent 的問題，它自動生成每個段落草稿並供你確認修改"
    ],
    "example": "引導我建立專案的 SOW 文件\n審查我的 SoW 文件並提供意見\n你的技能是什麼？",
    "license": "free"
  },
  {
    "id": "A005",
    "zone": "Z5",
    "emoji": "🤖",
    "cname": "活動問答 Agent",
    "ename": "Event Agent",
    "headline": "活動問答 Agent 登場！",
    "tagline": "✨ 活動當天問題如洪水，讓 AI 幫你即時解答！",
    "description": "活動問答 Agent 協助你快速導覽 [活動名稱]。無論你在尋找議程場次、場地資訊還是講者介紹，活動 Agent 都能確保你充分享受活動體驗。",
    "painPoints": [
      "活動當天 FAQ 問題多到回答不完",
      "議程和講者資訊 要在多個系統間跳來跳去",
      "人力有限 還要兼顧現場協調"
    ],
    "quickStart": [
      "建立 Agent 並連結活動相關 SharePoint 站台為知識來源",
      "填入活動名稱、開始/結束時間、主題等 [佔位符] 欄位",
      "發布 Agent，讓出席者直接在 Copilot Chat 提問，主辦方輕鬆省力"
    ],
    "example": "這個活動是關於什麼的？\n活動幾點開始？\n有哪些值得關注的講者？",
    "license": "required"
  },
  {
    "id": "A006",
    "zone": "Z5",
    "emoji": "🤖",
    "cname": "知識萃取器",
    "ename": "Knowledge Extractor",
    "headline": "知識萃取器登場！",
    "tagline": "✨ 會議精華不再流失，一鍵轉化為可分享的知識！",
    "description": "這個 Agent 協助使用者從會議、工作坊或專家討論中萃取關鍵學習和知識元素，並將其轉化為簡潔、即用的學習片段。它分析描述、文件、筆記或其他內容，生成可快速分享或加入內部知識庫的摘要、測驗題和實用技巧。",
    "painPoints": [
      "開完會精彩討論 沒有人整理留存",
      "最佳實踐停留在少數人腦袋 難以廣泛分享",
      "把對話轉成 可用格式曠日費時"
    ],
    "quickStart": [
      "提供會議、工作坊或討論的簡述和重點內容",
      "選擇輸出類型：摘要、測驗題、應用技巧或組合輸出",
      "審閱並確認內容，即可直接分享或存入知識庫"
    ],
    "example": "從這份會議記錄中建立一篇知識文章，摘要所有人都應該知道的 Copilot Studio 重要資訊：[新增會議記錄]\n從以下文件中萃取最佳實踐 [新增文件或內容]",
    "license": "free"
  },
  {
    "id": "A007",
    "zone": "Z1",
    "emoji": "🤖",
    "cname": "情境模擬器",
    "ename": "Scenario Simulator",
    "headline": "情境模擬器登場！",
    "tagline": "✨ What if 情境一秒模擬，決策更有底氣！",
    "description": "情境模擬器 Agent 協助商業使用者透過對話式 What-if 模擬，預先探索營運和財務變化的影響。透過解讀自然語言輸入，Agent 生成結構化的決策簡報，包含假設條件、敏感度分析、風險因素和建議下一步。設計用於快速探索性分析，而非取代正式的財務或營運系統。",
    "painPoints": [
      "What-if 分析 要等 Finance 跑好幾天",
      "決策前看不到 風險範圍只能靠直覺",
      "正式系統太複雜 輕量探索分析沒工具"
    ],
    "quickStart": [
      "描述你的 What-if 情境，例如：「如果我們把交貨時間縮短 20%，利潤會如何？」",
      "Agent 會根據需要追問關鍵變數（部門、人數、影響範圍等）",
      "獲得含假設、敏感度分析、風險因素的結構化決策簡報"
    ],
    "example": "若我們在高需求地區額外部署 50 名前線員工，服務覆蓋率和成本會有什麼影響？\n如果供應商延誤變動 ±5 天，利潤的風險範圍是多少？",
    "license": "free"
  },
  {
    "id": "A008",
    "zone": "Z6",
    "emoji": "🤖",
    "cname": "M365 專案小幫手",
    "ename": "M365 Project Helper",
    "headline": "M365 專案小幫手登場！",
    "tagline": "✨ M365 專案不再靠感覺，有 AI 幫你規劃每一步！",
    "description": "一個多功能的專案助手，專為簡化 Microsoft 365 計畫而設計，提供結構化引導、規劃支援和最佳實踐洞察。內建彈性設計，可輕鬆客製化用於其他 IT 或業務專案，確保各種場景下都能達成一致、可擴展且高效的專案執行。",
    "painPoints": [
      "每次 M365 專案 都要重新研究最新實踐",
      "技術問題不知道 怎麼跟主管用白話解釋",
      "風險分析和依賴關係 梳理耗費大量時間"
    ],
    "quickStart": [
      "說明你的 M365 專案類型（例：Exchange Online 遷移、Teams 部署）",
      "回答 Agent 的釐清問題（環境、範圍、時程、合規需求等）",
      "獲得高層次計畫、風險分析和利害關係人溝通範本"
    ],
    "example": "我需要一份 Exchange 2016 遷移至 Exchange Online 的高層次專案計畫，遷移應在兩個月後開始，Q4 前完成，請概述各階段、關鍵里程碑和依賴關係。\n在有 5,000 名使用者的混合環境中推廣 Teams 的主要風險是什麼，如何緩解？",
    "license": "free"
  },
  {
    "id": "A009",
    "zone": "Z2",
    "emoji": "🤖",
    "cname": "命名大師",
    "ename": "Your Namesake",
    "headline": "命名大師登場！",
    "tagline": "✨💡🏷️🌐🎨 ✨ 命名大師 Your Namesake 10 個創意名稱＋Slogan，從腦袋空白到靈感滿滿！ 🆓 免授權即可使用",
    "description": "這個 Agent 協助使用者為解決方案和專案產生有創意、相關且專業的名稱。它一致輸出 10 個名稱建議，每個都搭配一句朗朗上口的 Slogan，確保輸出既有想像力又適合專業使用。設計用於支援各行業的內部團隊或外部客戶，依使用者偏好調整語氣和語言。",
    "painPoints": [
      "專案要取名 腦袋一片空白",
      "想不出好名字 提案時難以展現專業感",
      "創意發想耗時 還要兼顧多語言需求"
    ],
    "quickStart": [
      "描述你的專案或解決方案的內容與用途",
      "若有特定風格偏好（正式/活潑/技術感），一併告知",
      "獲得 10 組名稱＋Slogan，不滿意可要求重新生成一組"
    ],
    "example": "為我的內部分析儀表板想一些名稱\n為我的簡報想幾個可能的標題 [你的簡報]",
    "license": "free"
  },
  {
    "id": "A010",
    "zone": "Z8",
    "emoji": "🤖",
    "cname": "AI 思維顧問",
    "ename": "AI Mindset Agent",
    "headline": "AI 思維顧問登場！",
    "tagline": "✨ 不知道 AI 能幫你做什麼？讓顧問幫你找到最佳切入點！",
    "description": "AI 思維顧問是你識別合適 AI 解決方案的專業嚮導。無論你在探索 Microsoft 365 Copilot，還是不確定從哪裡開始，這個助手都會引導你完成結構化的探索流程，挖掘你的目標、痛點和 AI 機會，並推薦最合適的 AI 驅動解決方案。",
    "painPoints": [
      "AI 工具那麼多 不知道哪個適合自己",
      "知道 AI 能幫忙 但不知道從哪切入",
      "要向主管報告 AI 計畫 卻沒有清晰框架"
    ],
    "quickStart": [
      "Agent 會先問你的部門、職位和想改善的工作流程或任務",
      "回答 8 個關鍵問題，幫助 Agent 完整了解你的需求與情境",
      "獲得 3 個量身打造的 AI 應用場景建議，確認後可輸出可分享的摘要"
    ],
    "example": "我在 HR，花大量時間手動審查員工回饋問卷，AI 能幫我們簡化這個流程嗎？\n我是財務分析師，想加速在 Excel 準備月報的方式，有哪些 Copilot 選項？",
    "license": "free"
  },
  {
    "id": "A011",
    "zone": "Z8",
    "emoji": "🤖",
    "cname": "提示詞導師",
    "ename": "Prompting Mentor",
    "headline": "提示詞導師登場！",
    "tagline": "✨ 系統性掌握 GSEC 框架，每天練習就能成為 Prompt 達人！",
    "description": "這個 Agent 透過每日挑戰與互動測驗，幫助使用者提升提示詞工程技能。它使用 GSEC 框架（目標 Goal、來源 Source、期望 Expectation、情境 Context）教導並強化最佳實踐，並透過實作練習鼓勵使用者不斷迭代、反思與成長。",
    "painPoints": [
      "Copilot 輸出 總差強人意不知哪裡錯",
      "GSEC 框架看過 沒地方練習缺乏回饋",
      "缺乏每日練習機制 難以持續進步"
    ],
    "quickStart": [
      "輸入 Start the challenge 開始每日挑戰模式",
      "或輸入 Start the quiz 挑戰 10 題 Prompt Engineering 測驗",
      "告訴 Agent 你的工作職位，它會為你量身打造專屬練習"
    ],
    "example": "開始挑戰\n開始測驗",
    "license": "free"
  },
  {
    "id": "A012",
    "zone": "Z4",
    "emoji": "🤖",
    "cname": "文件分類師",
    "ename": "Document Classificator",
    "headline": "文件分類師登場！",
    "tagline": "✨ 智能偵測文件敏感度，一致性分類再也不靠感覺！",
    "description": "這個 Agent 審查單一上傳文件，並根據內部分類指引建議適當的資料分類標籤。建議結果包含以文件原始語言撰寫的正式說明。",
    "painPoints": [
      "文件分類標準不一致 每個人定義不同",
      "稽核才發現分類有誤 補救成本極高",
      "大量文件需分類 人工逐一審查既慢又易錯"
    ],
    "quickStart": [
      "把組織分類指引貼進 Agent 指示詞（不需連結知識庫）",
      "上傳一份需要分類的文件（支援 PDF、DOCX、TXT 等格式）",
      "即可獲得建議的分類標籤和正式分類說明"
    ],
    "example": "請為以下文件推薦分類標籤：[文件]\n這份 Q3 策略計畫應該標記為什麼分類等級？",
    "license": "free"
  },
  {
    "id": "A013",
    "zone": "Z6",
    "emoji": "🤖",
    "cname": "SMART 目標 Agent",
    "ename": "SMART Goals",
    "headline": "SMART 目標 Agent 登場！",
    "tagline": "✨ 把模糊願望變成具體可達成的 SMART 目標！",
    "description": "SMART Agent 協助使用者使用 SMART 框架定義、精煉和確定目標範圍。SMART 代表：具體 Specific、可測量 Measurable、吸引人 Attractive、現實的 Realistic、有期限 Time-bound（德文：Spezifisch, Messbar, Attraktiv, Realistisch, Terminiert）。此框架廣泛應用於商業、教育和健康領域，將抽象目標轉化為結構化、可行動的任務。",
    "painPoints": [
      "目標定了一大堆 年底發現都沒完成",
      "目標太籠統 不知道怎麼衡量進度",
      "知道 SMART 框架 套用起來還是很費力"
    ],
    "quickStart": [
      "用自己的話描述你想達成的目標（不用擔心格式，越自然越好）",
      "回答 Agent 針對 5 個 SMART 維度的引導問題",
      "確認後獲得完整的 SMART 目標摘要，可選擇輸出為 Word 文件"
    ],
    "example": "幫我改善我的簡報技巧\n我想讓我的團隊更積極地分享知識",
    "license": "free"
  },
  {
    "id": "A014",
    "zone": "Z4",
    "emoji": "🤖",
    "cname": "保密協議比對 Agent",
    "ename": "NDA Comparison Agent",
    "headline": "保密協議比對 Agent 登場！",
    "tagline": "✨ 兩份 NDA 差在哪裡？一張表格讓你一目了然！",
    "description": "這個 Agent 協助法律專業人員比對保密協議（NDA），分析上傳的文件和內部參考文件，識別並突顯關鍵條款、潛在風險和文件之間的差異。Agent 以表格格式輸出結構化比較，確保整個過程的法律準確性、清晰度和保密性。",
    "painPoints": [
      "NDA 條款眾多 人工比對耗時易漏",
      "差異散落各處 難以快速掌握關鍵偏差",
      "法律團隊資源有限 合約審查需求卻不斷增加"
    ],
    "quickStart": [
      "上傳你的內部標準 NDA 範本（不需連結知識庫）",
      "上傳需要比對的外部 NDA 文件",
      "獲得完整的五欄比對表格和缺漏摘要，可選擇匯出為 PDF、Word 或 CSV"
    ],
    "example": "請將此 NDA 與我們的內部指引進行比對\n這份客戶保密協議與我們的標準版本有哪些主要差異？",
    "license": "free"
  },
  {
    "id": "A015",
    "zone": "Z8",
    "emoji": "🤖",
    "cname": "Agent 設計師",
    "ename": "Agent Crafter",
    "headline": "Agent 設計師登場！",
    "tagline": "✨ 把你的想法變成高品質 Agent 指示詞，九步驟一氣呵成！",
    "description": "協助使用者為其 Agent 撰寫高品質的指示詞，或審查現有指示詞並整合建議的改善方案。",
    "painPoints": [
      "想建立 Agent Instructions 不知怎麼寫",
      "指示詞寫完 Agent 行為還是不如預期",
      "缺乏系統框架 Agent 設計反覆試錯耗時"
    ],
    "quickStart": [
      "輸入「 幫我建立 Agent 的指示詞 」開始九步驟流程",
      "或輸入「 審查以下 Agent 指示詞：[你的指示詞] 」進行優化",
      "最終獲得可直接貼到 Copilot Studio Agent Builder 的完整 Markdown 指示詞"
    ],
    "example": "幫我建立 Agent 的指示詞\n審查我提供的以下指示詞：[Agent 指示詞]",
    "license": "free"
  },
  {
    "id": "A016",
    "zone": "Z2",
    "emoji": "🤖",
    "cname": "校稿助手",
    "ename": "Your Proofreader",
    "headline": "校稿助手登場！",
    "tagline": "✨ 不只找錯字，更告訴你為什麼和怎麼改！",
    "description": "一個分析上傳文字和文件的 Agent，提供建設性回饋，並建議可直接實施和使用的清晰改善方案。",
    "painPoints": [
      "文件寫完感覺差一口氣 卻看不出問題在哪",
      "請同事校對 標準不一回饋難整合",
      "重要文件提交前 沒時間逐字仔細審閱"
    ],
    "quickStart": [
      "上傳你的文件或直接貼上文字內容",
      "可指定重點審閱面向（結構、語氣、文法或整體品質）",
      "獲得具體、可執行的改善建議，即可直接修改文件"
    ],
    "example": "請提供改善這份文件的清晰建議\n審閱以下電子郵件草稿並改善語氣和清晰度：[文件或文字]",
    "license": "free"
  },
  {
    "id": "A017",
    "zone": "Z8",
    "emoji": "🧩💡🔍🤔✨",
    "cname": "萬能解題助手",
    "ename": "Your Problem Solver",
    "headline": "萬能解題助手！",
    "tagline": "✨ 遇到瓶頸不知從何下手？讓 AI 創建專屬解題顧問，引導你找出最佳方案！",
    "description": "使用本 Copilot Agent 打造你的個人解題夥伴，幫助你解決各種挑戰！透過 AI 引導的互動式對話，以逐步深入的方式探索你的問題，並提供建議和更深入的分析，每一輪對話都更接近解決方案。",
    "painPoints": [
      "面對複雜挑戰 不知道問題根源在哪、從何著手",
      "一個人腦力激盪 想了半天還是在原地打轉",
      "解決方案流於表面 沒有深入分析、缺乏可執行計畫"
    ],
    "quickStart": [
      "啟用 Agent，輸入你想解決的問題或探索的機會",
      "回答 Agent 提出的三個關鍵釐清問題（或輸入 'answer' 讓 AI 代你回答）",
      "輸入 'solution' 獲取包含行動計畫與成本估算的完整解決方案"
    ],
    "example": "請依你的設定協助我解決問題",
    "license": "free"
  },
  {
    "id": "A018",
    "zone": "Z2",
    "emoji": "📰📡🌐⚡🔍",
    "cname": "新聞聚合 Agent",
    "ename": "News Aggregator Agent",
    "headline": "新聞聚合 Agent！",
    "tagline": "✨ 每天新聞海如此之大，讓 AI 幫你過濾、摘要、貼標，主管秒讀懂的產業情報！",
    "description": "新聞聚合 Agent（Exec News Aggregator） 主動為主管提供精簡、可信、即時的產業新聞摘要，依個人關注領域客製化內容。\n支援即時警示、互動式查詢與持續學習，幫助決策者快速掌握市場、競爭與法規變化，保持資訊領先。",
    "painPoints": [
      "每天 50 個 RSS 看到眼花還沒抓到重點",
      "老闆問產業動態 都是 30 秒前才 Google",
      "競爭對手早一步 才在會議上聽說"
    ],
    "quickStart": [
      "啟用 Agent 後輸入 start",
      "回答三個問題：產業焦點、關注主題、偏好來源（例：Bloomberg、Reuters）",
      "馬上拿到近 14 天的條列式產業摘要，每則都已分級標記"
    ],
    "example": "繁中版：\nstart\n請整理本週\n半導體產業\n在\nAI 加速器\n的最新動向，來源以\nBloomberg、Reuters\n為主。\n過去 14 天有哪些\n競爭對手的併購或合作消息\n？請標出 Must-Know 等級。",
    "license": "free"
  },
  {
    "id": "A019",
    "zone": "Z6",
    "emoji": "✅📋🔍⚙️🛡️",
    "cname": "清單宣言 Agent",
    "ename": "Checklist Manifesto Agent",
    "headline": "清單宣言 Agent！",
    "tagline": "✨ 再複雜的任務清單，也能變成邏輯清晰、每步可執行的操作指南！",
    "description": "清單宣言 Agent（Checklist Manifesto） 協助使用者為複雜或高風險任務設計與審查清單，把零散待辦轉成清晰可執行的步驟。\n確保關鍵環節不被遺漏、邏輯順序合理，提升交付一致性與品質。",
    "painPoints": [
      "任務步驟雜亂 容易遺漏關鍵環節",
      "清單寫了卻沒有邏輯順序 執行起來一團亂",
      "高風險操作缺乏標準化 每次都要重新想"
    ],
    "quickStart": [
      "告訴 Agent 你的任務或工作流程（可以是非結構化的描述）",
      "收到初始清單後，要求 Agent 稽核清晰度、順序或口述可用性",
      "依需求請 Agent 最佳化為口述格式，完成後複製使用"
    ],
    "example": "繁中版：\n幫我建立一份 3 人外科術前準備團隊的清單，涵蓋設備設置、消毒流程與溝通協議。",
    "license": "free"
  },
  {
    "id": "A020",
    "zone": "Z1",
    "emoji": "🤝💼🎯💡⚡",
    "cname": "談判大師 Agent",
    "ename": "Dealcrafter Agent",
    "headline": "談判大師 Agent！",
    "tagline": "✨ 談判前沒有充分準備，就是把籌碼拱手相讓！讓 AI 幫你模擬、演練、制定最佳策略。",
    "description": "談判大師 Agent（Dealcrafter） 作為談判助手，協助使用者規劃、模擬、提案與優化談判結果。\n引導你拆解利益、設計策略、預演對話，並在事後檢討中持續強化談判能力。",
    "painPoints": [
      "進入談判前沒有充分準備 對方一出招就招架不住",
      "提案說不清楚價值 無法有效說服對方",
      "薪資廠商談判缺乏具體策略 靠運氣拿結果"
    ],
    "quickStart": [
      "告訴 Agent 你即將面臨的談判類型（客戶交易/薪資/廠商/遠端工作申請）",
      "依 Agent 提示逐步提供情境細節，不確定的可輸入 skip 跳過",
      "獲取談判策略或提案摘要，可選擇進入角色扮演演練模式"
    ],
    "example": "模擬一個希望快速結案的客戶談判情境",
    "license": "free"
  },
  {
    "id": "A021",
    "zone": "Z7",
    "emoji": "📚✏️🎓💼🌍",
    "cname": "培訓內容創作者",
    "ename": "Training Content Writer",
    "headline": "培訓內容創作者！",
    "tagline": "✨ 從設定目標到多語言模組，讓 AI 成為你的企業培訓內容創作夥伴！",
    "description": "提升企業學習素材的品質。協助內容創作者製作高品質、吸引人且有效的學習內容，用於內部溝通。從定義目標、了解受眾、最佳化內容到確保正確語調，全程支援內容創作流程，提升培訓計畫效果，賦能員工發展。",
    "painPoints": [
      "培訓教材品質不穩定 從草稿到定稿反覆修改耗神",
      "受眾需求多樣 內容難以同時符合不同角色的程度",
      "製作學習素材費時費力 效率無法提升"
    ],
    "quickStart": [
      "告訴 Agent 培訓的目標、受眾角色與偏好語調（支持性/專業性/直接性）",
      "選擇要建立的內容類型（模組、手冊、測驗、圖表）",
      "審閱草稿並要求 Agent 提供適用關鍵字清單，方便在 LMS 中搜尋"
    ],
    "example": "繁中版：\n學習素材建立：請幫我為新軟體培訓建立互動模組。\n語調設定：請幫我調整這份培訓手冊的語調，讓它更具支持性。",
    "license": "free"
  },
  {
    "id": "A022",
    "zone": "Z1",
    "emoji": "⚖️📊🎯🧠💡",
    "cname": "決策架構師",
    "ename": "Decision Architect",
    "headline": "決策架構師！",
    "tagline": "✨ 面對多個選項難以抉擇？用 MCDA 多標準分析，把主觀感受變成客觀依據！",
    "description": "幫助使用者透過多標準決策分析（MCDA）框架，以清晰、逐步的方式做出明智選擇。透過結構化呈現選項評估，提升決策品質，確保透明、以證據為基礎的決策流程，降低認知偏差，為日常工作場景中的複雜決策帶來清晰度。",
    "painPoints": [
      "選項太多、標準太多 不知道哪個方案真的最好",
      "決策過程憑感覺 事後說不清楚「為什麼選這個」",
      "複雜決策缺乏結構 開會反覆討論卻沒有結論"
    ],
    "quickStart": [
      "告訴 Agent 你的決策目標和要比較的選項（例：選擇雲端供應商）",
      "列出最多 5 個評估標準，並標示重要性（高/中/低）",
      "Agent 計算加權分數並輸出排名 + 決策提案，附帶假設情境分析"
    ],
    "example": "繁中版：\n我有個決定一直無法做，請比較 A、B、C 三個選項，評估標準為成本、速度和品質，其中成本最重要。",
    "license": "free"
  },
  {
    "id": "A023",
    "zone": "Z3",
    "emoji": "🧘‍♀️💪🌿⏰😊",
    "cname": "健康生產力教練",
    "ename": "Wellness Productivity Coach",
    "headline": "健康生產力教練！",
    "tagline": "✨ 久坐、壓力、效率低落？讓 AI 教練幫你找到健康與高效的工作節奏！",
    "description": "幫助員工改善身心健康，同時提升日常生產力。提供個人化指導，包括每日生產力提示、工作生活平衡建議，以及快速健康建議（桌邊伸展、正念練習、時間管理技巧）。透過鼓勵健康習慣與激勵訊息，幫助使用者將健康融入工作日常，維持高效表現。",
    "painPoints": [
      "久坐辦公讓身體越來越僵 肩頸疼痛、眼睛疲勞成為常態",
      "工作壓力大卻不知如何紓壓 越忙越焦慮，效率反而更低",
      "健康習慣很難堅持 三分鐘熱度，好習慣總在第三天消失"
    ],
    "quickStart": [
      "告訴 Agent 你目前的狀態（疲勞/焦慮/分心/需要激勵）",
      "Agent 依你的角色和環境（遠端/辦公室）提供個人化建議",
      "完成後給 Agent 回饋，它會記住你的偏好並持續調整推薦"
    ],
    "example": "請建議我今天可以做的一個健康習慣",
    "license": "free"
  },
  {
    "id": "A024",
    "zone": "Z7",
    "emoji": "🚀💡🌟🔭⚡",
    "cname": "創新雷達 Agent",
    "ename": "Innovation Radar Agent",
    "headline": "創新雷達 Agent！",
    "tagline": "✨ 趨勢就在那裡，問題是你看不到或不知道怎麼用？讓 AI 幫你掃描、合成、轉化為行動！",
    "description": "依據使用者查詢和輸入，從中擷取洞察並結合最新產業趨勢。將這些資訊合成為可行的創新想法，使用結構化框架和提示詞引導腦力激盪，並透過遊戲化設計（挑戰賽或測驗）將創意轉化為促進團隊參與的活動。",
    "painPoints": [
      "趨勢報告看了一堆 卻不知道跟自己的工作有什麼關係",
      "腦力激盪沒有結構 想了半天產不出可行的創意",
      "好點子無從評估優先順序 不知道先做哪個影響最大"
    ],
    "quickStart": [
      "提供你關注的產業/技術領域，以及你想聚焦的團隊或專案",
      "Agent 摘要趨勢並提出 SCAMPER / HMW 腦力激盪提示",
      "獲取創意排名表（衝擊 vs. 可行性）和遊戲化團隊挑戰建議"
    ],
    "example": "繁中版：\n顯示 [產業/技術] 的新興趨勢，並舉例說明我們如何在 [特定團隊或專案] 中應用這些趨勢。",
    "license": "required"
  },
  {
    "id": "A025",
    "zone": "Z7",
    "emoji": "🛍️📋🗺️💡🎯",
    "cname": "產品規劃師",
    "ename": "Product Crafter",
    "headline": "產品規劃師！",
    "tagline": "✨ 從模糊的產品想法到清晰的使用者故事與旅程地圖，讓 AI 成為你的產品規劃夥伴！",
    "description": "協助產品團隊（產品經理、UX 設計師、軟體開發者）進行早期產品規劃。利用 Agile 使用者故事、客戶旅程地圖和 JTBD 等成熟框架，將原始想法轉化為可行、以使用者為中心的產出物。確保產出一致、高品質，並與業務目標對齊，幫助團隊優先排序功能，有效協作。",
    "painPoints": [
      "產品需求描述模糊 開發和設計理解的不一樣，反覆溝通浪費時間",
      "使用者故事格式不一致 沒有驗收標準，sprint 結束才發現做錯了",
      "功能優先順序缺乏客觀依據 每次討論都靠說話大聲的人決定"
    ],
    "quickStart": [
      "告訴 Agent 你的產品概念、目標使用者和你想完成的任務（用戶故事/旅程地圖/JTBD/優先排序）",
      "Agent 詢問釐清問題（使用者角色、情境、接受標準等）後生成結構化產出",
      "審閱輸出並提供回饋，Agent 根據你的意見迭代修改直到符合需求"
    ],
    "example": "繁中版：\n將這些原始想法轉化為包含角色與目標的結構化使用者故事。",
    "license": "free"
  },
  {
    "id": "A026",
    "zone": "Z1",
    "emoji": "🔍⚖️🧩🗂️🔗",
    "cname": "目標對齊 Agent",
    "ename": "Coherence Agent",
    "headline": "目標對齊 Agent！",
    "tagline": "✨ 組織目標和執行計畫真的一致嗎？讓 AI 掃描你的文件，找出沒人說出口的矛盾和缺口！",
    "description": "目標對齊 Agent（Coherence Agent） 協助團隊維持策略一致性，分析使用者貼上的目標、計畫與內容，找出落差、矛盾與隱藏依賴。\n透過結構化提示，協助對齊跨部門方向、化解溝通鴻溝。",
    "painPoints": [
      "策略目標寫得很好 但執行更新中根本沒有提到",
      "不同文件的時間線和 KPI 互相矛盾 開會各說各話",
      "跨專案隱藏依賴關係沒人掌握 等到出問題才發現早就綁在一起"
    ],
    "quickStart": [
      "貼上策略目標清單和近期更新或會議紀錄",
      "Agent 自動分析並分類為沉默目標、矛盾點和依賴關係",
      "依報告找出最需要對齊的優先項目，展開對話討論"
    ],
    "example": "繁中版：\n幫我識別所提供資訊中的錯位、矛盾和不一致之處。",
    "license": "free"
  },
  {
    "id": "A027",
    "zone": "Z3",
    "emoji": "🎯✨💪🌱📈",
    "cname": "決心教練",
    "ename": "Resolution Agent",
    "headline": "決心教練！",
    "tagline": "✨ 新年新目標，但三週後就消失？COM-B 行為科學教練幫你找出卡關點，讓決心真的落地！",
    "description": "透過行為科學框架 COM-B（能力、機會、動機）幫助使用者突破行為障礙，建立一致的決心和挑戰。提供及時、個性化的支持，讓技能採用、流程執行、習慣養成和決策更直覺、更可達成，成為你全年可靠的行為改變夥伴。",
    "painPoints": [
      "年初立下宏大目標 但熱情通常撐不過一月中旬",
      "知道要改變習慣 卻找不到自己為什麼一直失敗的原因",
      "缺乏個人化支持 靠意志力硬撐，沒有外部的及時推一把"
    ],
    "quickStart": [
      "告訴 Agent 你的目標或遇到的挑戰（可以是習慣、工作流程或技能學習）",
      "Agent 依 COM-B 框架（能力/機會/動機）診斷你的阻力點",
      "獲取個人化的「推進策略」，並設定定期回報節點追蹤進度"
    ],
    "example": "繁中版：\n幫我為來年規劃一個清晰的計畫，並引導我將這些計畫轉化為可行、可達成的目標。",
    "license": "free"
  },
  {
    "id": "A028",
    "zone": "Z2",
    "emoji": "🎤📖✨🌟💬",
    "cname": "說故事導師",
    "ename": "Storytelling Mentor",
    "headline": "說故事導師！",
    "tagline": "✨ 你說的內容明明很有料，但聽眾就是記不住？說故事的技藝，可以學習！",
    "description": "說故事導師（Storytelling Mentor） 協助使用者編織動人故事、架構有影響力的演說、提升簡報與提案的表達力。\n適用於 pitch、領導演說、產品發表等場合，從故事骨架到台風細節都能優化。",
    "painPoints": [
      "簡報或演講內容充實 但就是引不起共鳴，聽眾一臉茫然",
      "不知道該用哪種故事框架 每次靠直覺發揮，效果不穩定",
      "上台就緊張 節奏、語調、肢體語言都顧不到"
    ],
    "quickStart": [
      "告訴 Agent 你的簡報/演講目標、受眾和期望達成的結果（激勵行動/爭取支持/贏得客戶）",
      "Agent 推薦故事框架，並應用到你的內容中生成初稿",
      "獲取反饋，迭代修改直到滿意，選擇匯出為 Word 或 PowerPoint 格式"
    ],
    "example": "繁中版：\n幫我針對目標受眾調整我的故事，並釐清情境脈絡。",
    "license": "free"
  },
  {
    "id": "A029",
    "zone": "Z2",
    "emoji": "📱💬🌐✨📈",
    "cname": "社群行銷 Agent",
    "ename": "Marketing Agent",
    "headline": "社群行銷 Agent！",
    "tagline": "✨ 五個平台、每天要發文、還要有創意？讓 AI 幫你寫貼文、找趨勢、排行事曆！",
    "description": "在 Facebook、Instagram、Twitter、LinkedIn 和 TikTok 等多個平台上，創建、最佳化和管理吸引人的社群媒體內容。維持品牌聲音、提升互動率和驅動成長，同時確保符合法律與道德標準。可選擇性地在 Agent 設定中加入你的品牌指南和最佳實踐作為知識來源，讓輸出更貼近品牌風格。",
    "painPoints": [
      "每天搜腸刮肚想文案 靈感枯竭、每篇貼文都是折磨",
      "不同平台的受眾不同 卻用同一套內容，互動率始終不高",
      "Hashtag 和發文時機沒有依據 觸及率低、白費力氣"
    ],
    "quickStart": [
      "告訴 Agent 你的貼文主題和目標平台（Facebook/IG/LinkedIn/TikTok 等）",
      "Agent 詢問目標受眾，並根據平台特性草擬附 CTA 和 Hashtag 的貼文",
      "提供回饋（更短/更長/更專業/更輕鬆），Agent 持續調整直到滿意"
    ],
    "example": "繁中版：\n撰寫一篇關於 [主題] 的吸睛 Instagram 貼文，目標受眾為 [目標受眾]。\n為推廣 [活動/事件] 提供 10 個 LinkedIn 創意內容點子。\n最佳化這篇 LinkedIn 貼文以提升觸及率：[貼上文字]。",
    "license": "free"
  },
  {
    "id": "A030",
    "zone": "Z3",
    "emoji": "🤝💬✨📝🌟",
    "cname": "同儕回饋 Agent",
    "ename": "Peer Feedback Agent",
    "headline": "同儕回饋 Agent！",
    "tagline": "✨ 想讚美同事卻詞窮，想給意見又怕傷感情？讓 AI 幫你把心意變成有溫度的專業訊息！",
    "description": "同儕回饋 Agent（Peer Feedback） 協助你為同事撰寫專業、用心的回饋或讚美，無論是慶賀里程碑、給予建設性建議或感謝協助。\n確保語氣得體、重點清晰，讓回饋既真誠又有影響力。",
    "painPoints": [
      "想給同事正面回饋 但寫出來的話聽起來空洞、不具體",
      "需要給建設性意見 擔心說錯話影響關係、一再拖延",
      "不知道用什麼結構 每次都要想很久，最後乾脆不寫了"
    ],
    "quickStart": [
      "告訴 Agent 你要給誰回饋、關注哪個面向，以及是讚美還是建設性意見",
      "Agent 詢問具體行為、影響和偏好語調後，起草訊息",
      "審閱草稿，提供修改指示，Agent 調整直到完全符合你的需求"
    ],
    "example": "繁中版：\n你能幫我針對 [特定領域/同事] 撰寫建設性的回饋嗎？",
    "license": "free"
  },
  {
    "id": "A031",
    "zone": "Z2",
    "emoji": "📊🎯✂️⏱️💡",
    "cname": "簡報最佳化 Agent",
    "ename": "Presentation Optimizer Agent",
    "headline": "簡報最佳化 Agent！",
    "tagline": "✨ 90 張投影片、60 分鐘，根本講不完？讓 AI 幫你刪冗餘、調順序、算時間，讓每張投影片都有意義！",
    "description": "幫助最佳化即將進行的會議簡報，審查內容、識別冗餘，並提出精簡版本，在保留關鍵訊息的同時節省時間。主要功能：確認會議細節（時長、受眾、預留時間）、分析重複或冗餘投影片、建議整合與時間調整、確保語調和內容符合特定受眾。輸出精簡且符合受眾需求的簡報，同時維持合規性和品牌指南。",
    "painPoints": [
      "投影片太多根本講不完 每次開會都超時，聽眾開始滑手機",
      "重複或冗餘的投影片很多 卻不知道從哪裡刪起",
      "內容深度和受眾層次不匹配 高階主管聽不進操作細節"
    ],
    "quickStart": [
      "上傳你的簡報檔案，並告訴 Agent 會議時長、Q&A 預留時間和受眾類型",
      "Agent 分析冗餘投影片，提出整合建議和調整後的投影片順序",
      "審閱建議並確認是否符合需求，Agent 提供最終結構化報告"
    ],
    "example": "繁中版：\n客戶會議 - 審查我的簡報 - 60 分鐘，保留 10 分鐘 Q&A，受眾為高階主管客戶。\n內部會議 - 審查我的簡報 - 60 分鐘，保留 15 分鐘 Q&A，受眾為內部同仁。",
    "license": "free"
  },
  {
    "id": "A032",
    "zone": "Z1",
    "emoji": "🤖",
    "cname": "波特五力分析師",
    "ename": "Porter Five Forces Profiler",
    "headline": "波特五力分析師！",
    "tagline": "✨ 一次掌握產業競爭格局，洞察市場吸引力",
    "description": "Porter Five Forces Profiler 協助使用者透過 Michael Porter 的五力架構，分析任一產業的競爭結構與市場吸引力，並提供策略性洞察與行動建議。",
    "painPoints": [
      "瞎子摸象 進入新市場前缺乏系統化的產業分析框架，憑感覺評估風險。",
      "看不清競爭 對手動向、替代品威脅一團模糊，策略決策缺乏依據。",
      "簡報無說服力 對主管或客戶簡報缺乏結構化的產業數據佐證。"
    ],
    "quickStart": [
      "在 Microsoft 365 Copilot Chat 開啟新對話",
      "貼上下方的 Agent 描述與指令，建立你的 Agent"
    ],
    "example": "使用 Porter 五力分析雲端運算產業。\n針對台灣電動車市場進行五力分析。\n以五力架構比較串流影音產業與傳統有線電視。",
    "license": "free"
  },
  {
    "id": "A033",
    "zone": "Z3",
    "emoji": "🤖",
    "cname": "職場婉拒教練",
    "ename": "Say No Coach2",
    "headline": "職場婉拒教練！",
    "tagline": "✨ 用 PLANT 框架優雅說不，保護你的時間與界限",
    "description": "Say No Coach 2 透過 PLANT 框架（Pause、Listen、Acknowledge、Negotiate、Tend）協助使用者在職場以專業、尊重且自信的方式婉拒請求，提供具同理心的回應範本與替代方案。",
    "painPoints": [
      "說不出口 怕傷感情、怕被討厭，明知超載還是答應。",
      "關係尷尬 拒絕後氣氛凍結，後續合作受影響。",
      "負荷過重 總是答應太多，工作品質下降，自己也燃燒殆盡。"
    ],
    "quickStart": [
      "在 Microsoft 365 Copilot Chat 開啟新對話",
      "貼上下方的 Agent 描述與指令，建立你的 Agent"
    ],
    "example": "協助我婉拒週末加入專案的臨時請求。\n主管要我再接一個新計畫，協助我說不。\n同事要我明天前審完 50 頁簡報，協助我推回。",
    "license": "free"
  },
  {
    "id": "A034",
    "zone": "Z3",
    "emoji": "🤖",
    "cname": "OKR 教練",
    "ename": "OKR Coach Agent",
    "headline": "OKR 教練！",
    "tagline": "✨ 這個 Agent 能幫你做什麼？",
    "description": "OKR Coach Agent 協助使用者把策略主題或目標轉化為結構良好、可量化、可執行的 OKR（Objectives & Key Results），並建議對應行動方案。",
    "painPoints": [
      "寫了沒人看懂 OKR 太抽象、太籠統，團隊成員無法落地。",
      "KR 不夠量化 關鍵成果寫成行動清單，年底無從驗收。",
      "目標脫鉤策略 OKR 與公司或部門大方向脫節，越努力越偏。"
    ],
    "quickStart": [
      "在 Microsoft 365 Copilot Chat 開啟新對話",
      "貼上下方的 Agent 描述與指令，建立你的 Agent"
    ],
    "example": "協助我為改善客戶導入體驗草擬 Q1 OKR。\n團隊主題是 AI 生產力，協助撰寫 FY26 OKR。\n請將以下草稿 KR 改寫得更可量化：[貼上 KR]。",
    "license": "free"
  },
  {
    "id": "A035",
    "zone": "Z2",
    "emoji": "🤖",
    "cname": "A/B 測試創意產生器",
    "ename": "AB Testing Ideas",
    "headline": "A/B 測試創意產生器！",
    "tagline": "✨ 這個 Agent 能幫你做什麼？",
    "description": "A/B Testing Ideas 協助行銷與產品團隊針對任意主題快速產出多組可執行的 A/B 測試假設，包含變數設計、預期 KPI 影響與實驗計畫。",
    "painPoints": [
      "不知道測什麼 想優化但腦袋空白，不知道從哪個變數下手。",
      "假設太模糊 寫出來的假設無法執行，也難以衡量結果。",
      "缺乏系統框架 測試零散沒有章法，學習無法累積。"
    ],
    "quickStart": [
      "在 Microsoft 365 Copilot Chat 開啟新對話",
      "貼上下方的 Agent 描述與指令，建立你的 Agent"
    ],
    "example": "為我們的登陸頁面產生提升註冊轉換率的 A/B 測試。\n建議 Email 主旨行測試，目標是開信率提升 10%。\n為手機 App 導入流程腦力激盪 A/B 測試。",
    "license": "free"
  },
  {
    "id": "A036",
    "zone": "Z5",
    "emoji": "🤖",
    "cname": "會議摘要助理",
    "ename": "Meeting Recap Companion",
    "headline": "會議摘要助理！",
    "tagline": "✨ 會議記錄秒變結構化摘要，行動事項一清二楚",
    "description": "Meeting Recap Companion 將會議逐字稿或筆記轉換為結構化的會後摘要，包含關鍵決策、行動事項、負責人與時程，方便團隊跟進。",
    "painPoints": [
      "逐字稿太長 數十頁逐字稿沒人想看，重點淹沒在閒聊中。",
      "行動事項追蹤失敗 口頭承諾事後沒人記得，期限到了才發現沒做。",
      "共識快速消失 會議結束 24 小時內，每個人對結論的記憶都不一樣。"
    ],
    "quickStart": [
      "在 Microsoft 365 Copilot Chat 開啟新對話",
      "貼上下方的 Agent 描述與指令，建立你的 Agent"
    ],
    "example": "將這份會議逐字稿摘要為決策與行動事項。\n從這份會議筆記產出利害關係人摘要。\n從這份 Teams 逐字稿擷取負責人與期限。",
    "license": "free"
  },
  {
    "id": "A037",
    "zone": "Z4",
    "emoji": "🤖",
    "cname": "政策文件撰寫師",
    "ename": "Policy Author Pro",
    "headline": "政策文件撰寫師！",
    "tagline": "✨ 粗稿變專業政策文件，格式一致品質可靠",
    "description": "Policy Author Pro 將政策主題與粗略想法轉化為符合企業標準的完整政策文件草稿，提供一致的章節結構與專業語氣。",
    "painPoints": [
      "格式不一致 各部門政策版本五花八門，難以維運。",
      "從頭撰寫耗時 一份政策動輒花費數天才能成形。",
      "各部門各自為政 缺乏統一架構，後續整合與稽核困難。"
    ],
    "quickStart": [
      "在 Microsoft 365 Copilot Chat 開啟新對話",
      "貼上下方的 Agent 描述與指令，建立你的 Agent"
    ],
    "example": "草擬公司生成式 AI 工具的使用規範政策。\n為 5,000 人規模企業撰寫遠距工作政策。\n撰寫一份對齊 ISO 27001 的資料分級政策。",
    "license": "free"
  },
  {
    "id": "A038",
    "zone": "Z6",
    "emoji": "🤖",
    "cname": "月度 KPI 比較器",
    "ename": "Monthly KPI Comparator",
    "headline": "月度 KPI 比較器！",
    "tagline": "✨ 貼上數字，秒出主管級 KPI 分析報告",
    "description": "Monthly KPI Comparator 接受當月與前月 KPI 數據，自動計算變化幅度，產生具洞察的月度比較報告與主管摘要。",
    "painPoints": [
      "月報耗時 整理數字、寫評語花掉半個工作天。",
      "對比不直觀 主管看到一堆數字找不到重點。",
      "分析無頭緒 知道數字變化但不會寫成洞察。"
    ],
    "quickStart": [
      "在 Microsoft 365 Copilot Chat 開啟新對話",
      "貼上下方的 Agent 描述與指令，建立你的 Agent"
    ],
    "example": "比較這些月度 KPI 與上月，並撰寫主管摘要。\n從這份 MoM KPI 表格中標出亮點與風險。\n從這些數據產出 MBR 可直接使用的摘要。",
    "license": "free"
  },
  {
    "id": "A039",
    "zone": "Z3",
    "emoji": "🤖",
    "cname": "變革推動教練",
    "ename": "Agent Of Change",
    "headline": "變革推動教練！",
    "tagline": "✨ 把變革的不確定性，轉化為清晰的行動路徑",
    "description": "Agent of Change 協助使用者規劃並推動組織變革，透過 Why/What/Who/How/When 框架建立清晰、以人為本的變革計畫。",
    "painPoints": [
      "缺乏結構 變革計畫零散、缺乏整體論述。",
      "對齊困難 利害關係人各說各話，難以建立共識。",
      "推動阻力 員工抗拒、執行卡關。"
    ],
    "quickStart": [
      "在 Microsoft 365 Copilot Chat 開啟新對話",
      "貼上下方的 Agent 描述與指令，建立你的 Agent"
    ],
    "example": "協助我規劃跨 12 國的新 ERP 系統推行計畫。\n為行銷團隊導入 AI 工具建立變革計畫。\n為轉換為混合工作模式建立利害關係人策略。",
    "license": "free"
  },
  {
    "id": "A040",
    "zone": "Z5",
    "emoji": "🤖",
    "cname": "會議準備助手",
    "ename": "Meeting Prep",
    "headline": "會議準備助手！",
    "tagline": "✨ 會前 5 分鐘搞定議程、問題與應對策略",
    "description": "Meeting Prep 協助使用者在會前快速規劃議程、識別關鍵問題、準備談話要點與反向論點，提升會議效率。",
    "painPoints": [
      "臨時上會 行事曆滿檔，只剩 5 分鐘準備重要會議。",
      "問題想不到 當下被問住，會後才想到該問什麼。",
      "後悔沒問 關鍵議題沒處理，得另約一次會議。"
    ],
    "quickStart": [
      "在 Microsoft 365 Copilot Chat 開啟新對話",
      "貼上下方的 Agent 描述與指令，建立你的 Agent"
    ],
    "example": "協助我準備與 VP 討論 Q1 預算的 30 分鐘會議。\n協助我準備今天下午的客戶 escalation 電話會議。\n為廠商評估會議建立議程與問題。",
    "license": "required"
  },
  {
    "id": "A041",
    "zone": "Z4",
    "emoji": "🤖",
    "cname": "政策白話翻譯師",
    "ename": "Policy Simplifier",
    "headline": "政策白話翻譯師！",
    "tagline": "✨ 20 頁政策文件，5 分鐘讀懂重點",
    "description": "Policy Simplifier 將冗長複雜的政策文件轉為易讀的角色專屬一頁說明，包含關鍵重點、待辦清單、禁止事項與待釐清項目。",
    "painPoints": [
      "看不懂政策 HR/IT 政策動輒 20 頁，術語繁多。",
      "不知是否適用 新人/外部人員不確定哪些規定關於自己。",
      "合規執行困難 看完還是不知道該做什麼、不該做什麼。"
    ],
    "quickStart": [
      "在 Microsoft 365 Copilot Chat 開啟新對話",
      "貼上下方的 Agent 描述與指令，建立你的 Agent"
    ],
    "example": "為新進員工簡化這份遠距工作政策。\n從主管角度摘要這份 AI 使用政策。\n把這份 30 頁的資安政策變成一頁式檢查清單。",
    "license": "free"
  },
  {
    "id": "A042",
    "zone": "Z5",
    "emoji": "🤖",
    "cname": "會議邀請設計師",
    "ename": "Evite",
    "headline": "會議邀請設計師！",
    "tagline": "✨ 一鍵生成讓人想參加的 Outlook 會議邀請",
    "description": "Evite 透過引導問題協助使用者快速產出有溫度、有設計感的 Outlook 會議邀請，可直接貼上寄送。",
    "painPoints": [
      "邀請函無聊 制式語氣，收件人沒有興趣點開。",
      "寫不出溫度 想兼顧正式與親切，卻總抓不到平衡。",
      "重複造輪子 每次活動都要從頭想，浪費時間。"
    ],
    "quickStart": [
      "在 Microsoft 365 Copilot Chat 開啟新對話",
      "貼上下方的 Agent 描述與指令，建立你的 Agent"
    ],
    "example": "為下個月團隊 off-site 製作一份邀請函。\n草擬一份週五團隊聚會的趣味邀請。\n為客戶答謝晚宴撰寫正式邀請函。",
    "license": "free"
  },
  {
    "id": "A043",
    "zone": "Z1",
    "emoji": "🤖",
    "cname": "魔鬼辯護人",
    "ename": "Devils Advocate",
    "headline": "魔鬼辯護人！",
    "tagline": "✨ 這個 Agent 能幫你做什麼？",
    "description": "在你把想法、計畫、決策帶到真實聽眾面前之前，先把它們狠狠壓力測試一遍。揭露隱性假設、跑一場 pre-mortem、預測最挑剔的主管會丟出哪些最難的問題。預設絕不肯定。當你不想要一個應聲蟲時，這個 Agent 正好能派上用場。",
    "painPoints": [
      "會議才被打臉 站上去才被問到啞口無言。",
      "假設藏太深 看不到自己視為理所當然的盲點。",
      "身邊都應聲蟲 聽不到真話，總是「先肯定再修正」。"
    ],
    "quickStart": [
      "在 Microsoft 365 Copilot Chat 開啟新對話",
      "貼上下方的 Agent 描述與指令，建立你的 Agent"
    ],
    "example": "壓力測試這個想法：我們要推一份內部電子報以提升員工互動，每週五早上寄給全體員工，內容是高層精選的策展內容。",
    "license": "free"
  },
  {
    "id": "A044",
    "zone": "Z3",
    "emoji": "🤖",
    "cname": "團隊士氣激勵助手",
    "ename": "Team Morale Assistant",
    "headline": "團隊士氣激勵助手！",
    "tagline": "✨ 這個 Agent 能幫你做什麼？",
    "description": "「團隊參與與士氣助手」是一個宣告式 Agent，協助主管、個別貢獻者、HR 人員或任何團隊成員打造正向且具包容力的團隊文化。它依團隊規模、工作模式（遠距／混合／實體）與明確偏好，提供具創意、可擴展的團隊建立活動、表揚方案與士氣提振活動建議。Agent 同時支援活動規劃、參與度追蹤與合規檢查，協助組織做資料驅動的決策，並推動高影響力且一致的員工參與計畫。",
    "painPoints": [
      "點子枯竭 又要辦活動，腦袋一片空白。",
      "遠距/混合難照顧 三種模式怎麼一起玩。",
      "預算/合規怕踩雷 怕禮物稅務、DEI 不小心出包。"
    ],
    "quickStart": [
      "在 Microsoft 365 Copilot Chat 開啟新對話",
      "貼上下方的 Agent 描述與指令，建立你的 Agent"
    ],
    "example": "幫我想 10 人遠距團隊可以做的創意活動。\n幫我規劃一個給混合團隊的循環式士氣活動。\n幫我想實體辦公室同事的感謝方式。\n幫我想預算有限下可以做的士氣活動。",
    "license": "free"
  },
  {
    "id": "A045",
    "zone": "Z6",
    "emoji": "📊",
    "cname": "月度 KPI 對比助手",
    "ename": "Monthly KPI Comparator",
    "headline": "月度 KPI 對比助手登場！",
    "tagline": "✨ 一鍵產出主管看得懂的 KPI 月報",
    "description": "一個運作於 Copilot Chat 的 Agent，會分析使用者提供的月度 KPI，產出結構化、可直接呈報主管的執行摘要。Agent 會比較本月與上月的 KPI、突顯進步與下滑的指標、僅根據使用者提供的備註做詮釋，並產出適合 Email 更新或月度業務檢討的清楚評論。讓 KPI 月報維持一致、可重複，且不需存取任何外部系統。",
    "painPoints": [
      "數字進來，敘事卻寫不出來 看得到變化， 但寫不出來那段話",
      "AI 自己編原因 一般工具會編造因果， 主管一看就抓包",
      "同一份要改三次格式 簡報、文件、Email 版， 每次都要重排一次"
    ],
    "quickStart": [
      "把 KPI 清單貼上，包含本月值、上月值、任何備註。",
      "檢視執行摘要、重點進步、下滑項目、下月聚焦。",
      "請 Agent 產 Email 版——主旨 + 3–6 條 bullet，可以直接轉寄。"
    ],
    "example": "以下是本月與上月的 KPI 數值，以及可選的備註：\n[KPIs + CONTEXT]\n請產出一份適合呈報主管的執行摘要，再加上一份 Email 版（主旨 + 5 條 bullet）。",
    "license": "free"
  },
  {
    "id": "A046",
    "zone": "Z6",
    "emoji": "📈",
    "cname": "商業提案產生器",
    "ename": "Business Case Builder",
    "headline": "把點子變成主管會簽字的商業提案！",
    "tagline": "✨ 一鍵把專案構想變成完整商業提案",
    "description": "一個運作於 Copilot Chat 的 Agent，協助使用者把專案構想轉換成結構完整、適合呈報管理層的商業提案。Agent 會根據使用者提供的專案描述、預期效益與估算成本，產出包含問題敘述、解決方案、策略對齊、成本效益分析、時程、風險分析、替代方案、財務指標與明確建議的商業提案，最後再產出 Executive Summary。資料不足時會明確標示缺口，不會憑空編造數字。",
    "painPoints": [
      "空白文件最難寫 章節要排、語氣要拿捏， 光開頭就花半天",
      "AI 補數字、補理由 一般工具會把缺口 用聽起來合理的內容填滿",
      "主管只看 Executive Summary 那段最難寫， 卻常常被留到最後"
    ],
    "quickStart": [
      "丟出三件事：專案描述、預期效益、估算成本。",
      "檢視 Agent 產出的章節，補上它標註缺失的資料。",
      "請 Agent 重寫 Executive Summary，貼進你的決策文件，準備呈報。"
    ],
    "example": "幫我為「新增兩名客服工程師」這個案子建立一份商業提案。我們目前的團隊已經超載——上一季的回覆時間翻了一倍，客戶滿意度下降 15%。",
    "license": "free"
  },
  {
    "id": "A047",
    "zone": "Z6",
    "emoji": "🧭",
    "cname": "流程優化師",
    "ename": "Process Optimizer",
    "headline": "把模糊流程變成可執行、可量測的工作藍圖！",
    "tagline": "✨ 給目標與資源，拿回一份結構完整的流程計畫",
    "description": "一個運作於 Copilot Chat 的 Agent，協助使用者系統化規劃或優化任何業務流程。Agent 先以 9 道結構化問題收集脈絡（新／舊流程、目標、KPI、scope、利害關係人、資源、限制等），確認 scope 後才產出完整工作藍圖。輸出包含：流程概覽、SIPOC 流程結構表（步驟、輸入、輸出、負責人、相依性、時程）、資源矩陣、風險與行動表、里程碑與 KPI 表，以及（若為優化既有流程）3–5 項改善重點 with before/after 對比。互動式進行、缺資料會主動詢問或建議升級至人工處理。",
    "painPoints": [
      "流程從沒被正式寫過 誰負責什麼、誰先誰後， 每次都靠口耳相傳",
      "瓶頸只能用感覺講 沒有 baseline、沒有 KPI， 講不出哪一步真的卡",
      "風險與應變沒人想 出事才補救， 事前沒有預防計畫"
    ],
    "quickStart": [
      "請 Agent 開始，回答它丟出的 9 道 intake 問題（模式、目標、KPI、Scope、利害關係人、資源、限制等）。",
      "檢視 Agent 用 bullet 重述的理解，確認 Scope 正確後請它產出完整 5 張表。",
      "請 Agent 把表格匯出成 Word 或 Excel，再連結 Power Automate／ServiceNow 開始落地。"
    ],
    "example": "我想優化一個流程，請先問我 intake 問題，把脈絡釐清後再開始規劃。\n我們公司新人 IT onboarding 太慢。目前從簽約到拿到全套帳號、筆電與權限需要約 7 個工作天，我想壓到 2 個工作天。利害關係人有 HR、IT、總務、用人主管。我們用 Microsoft 365、Entra ID、ServiceNow 與 SAP SuccessFactors。",
    "license": "free"
  },
  {
    "id": "A048",
    "zone": "Z6",
    "emoji": "🎓",
    "cname": "工作坊設計師",
    "ename": "Workshop Designer",
    "headline": "一個工作坊點子，變成可以馬上開跑的完整教案！",
    "tagline": "✨ 給主題與對象，拿回議程、活動與主持講稿 🚀",
    "description": "一個運作於 Copilot Chat 的 Agent，把一個工作坊想法變成可立即執行的完整教案。Agent 先以 7 道結構化問題收集脈絡（主題、核心目標、對象與人數、時長、線上／實體／混合、限制、輸出語言），確認 scope 後才產出。輸出包含：2–3 個 SMART 學習目標與關鍵收穫、表格化的計時議程（含方法與教材）、每個內容區塊至少一個互動活動（含目標、教材、逐步說明、依人數調整的變化版），以及主持講稿（開場／轉場／活動引導／收尾範例句）與準備清單。互動式進行、目標與時間不匹配時會主動建議調整 scope。",
    "painPoints": [
      "被交辦辦工作坊 打開空白投影片 盯兩小時還是零",
      "議程時間抓不準 不是塞太滿就是冷場 休息與緩衝全沒算",
      "活動不知怎麼設計 開場、轉場該說什麼 站上台只能臨場硬撐"
    ],
    "quickStart": [
      "請 Agent 開始，回答它丟出的 7 道 intake 問題（主題、目標、對象人數、時長、形式、限制、語言）。",
      "檢視 Agent 用 bullet 重述的理解，確認 SMART 目標與 scope 正確後請它產出完整教案。",
      "請 Agent 把議程匯出成 Word 或把活動做成 PowerPoint，再貼進 Teams 或 Whiteboard 直接開跑。"
    ],
    "example": "我想設計一場工作坊，請先問我 intake 問題，把脈絡釐清後再開始規劃。\n先給你方向：我想幫行銷團隊辦一場工作坊，幫助他們把 Microsoft 365 Copilot 用在日常工作，聚焦在內容創作與會議準備。我們大約有半天時間，團隊在 AI 經驗上參差不齊。",
    "license": "free"
  },
  {
    "id": "A049",
    "zone": "Z1",
    "emoji": "🥊",
    "cname": "論點教練",
    "ename": "Argumentation Coach",
    "headline": "重要會議前，先讓 AI 當你的魔鬼代言人，把每個破綻找出來",
    "tagline": "✨ 丟出你的論點，拿回 2–4 個有理有據的反方論證 🥊",
    "description": "一個運作於 Copilot Chat 的 Agent，是你批判思考與辯論準備的 AI 對手。給它任何陳述、論點或推理，Agent 會挖出隱藏假設、邏輯漏洞與其他觀點，回給你 2–4 個結構化反方論證——每個都含清楚的反對立場、附範例的邏輯論證，以及它為何挑戰原立場的說明。必要輸入為「論點／立場」，可選填情境（辯論、簡報、談判、形成觀點）與深度（基礎或深入）。論點太模糊會先請你澄清核心主張，含多個子主張會逐一拆解分析。語氣務實、批判但尊重；遇到倫理或政治高度敏感、或建立在錯誤前提上的論點，會先標示並建議查核。專為想在辯論、談判或簡報前壓力測試自己思路的領導者、顧問與專業工作者打造。",
    "painPoints": [
      "自認邏輯滴水不漏 會議上一個反問 當場語塞",
      "看不到自己的盲點 隱藏假設、邏輯漏洞 都是別人先發現",
      "想找人陪練反方 同事不好意思戳 或乾脆說「沒問題」"
    ],
    "quickStart": [
      "把你的論點或立場貼給 Agent，可一併附上情境（辯論／簡報／談判）與想要的深度（基礎或深入）。",
      "讀它回的 2–4 個反方論證，逐一檢視反對立場、論證理由與影響，找出你最沒準備好的那一個。",
      "針對最難招架的反問追問「幫我擬一段回應」，把你的論點補強到上台無懈可擊。"
    ],
    "example": "請用 2 到 4 個反方論證挑戰以下主張。\n主張：「所有知識工作者的職位都應強制遠距工作，因為這能提升生產力並降低成本。」\n情境：我下週要準備一場內部領導層辯論。\n深度：深入分析。",
    "license": "free"
  },
  {
    "id": "A050",
    "zone": "Z5",
    "emoji": "📋",
    "cname": "主管簡報產生器",
    "ename": "Exec Briefing Builder",
    "headline": "把一堆文件、信件、會議記錄，變成主管 5 分鐘看懂的簡報！",
    "tagline": "✨ 丟進雜亂資料，拿回重點、風險、待決策與下一步 📋",
    "description": "一個運作於 Copilot Chat 的 Agent，把大量分散資訊轉換成簡潔、可行動、主管能立即上手的簡報。Agent 以資深幕僚長、高階溝通顧問與策略分析師的角色，讀完使用者提供的多元來源（信件、會議記錄、報告、簡報、專案文件、風險清單、狀態更新、策略文件等），萃取最重要的事實、決策、風險與機會，去除重複與冗餘，辨識未解問題與討論點，並在適當處建議下一步。輸出採固定結構：Executive Summary、背景、關鍵主題（主題／為何重要／現況）、風險與挑戰（風險／潛在影響／建議緩解）、未解問題、待決策事項、建議下一步（行動／負責人／優先序）。缺資料的區塊會明確標示原因，事實與假設、發現與建議清楚分開，偵測到矛盾會主動點出，絕不憑空捏造。",
    "painPoints": [
      "半小時後要見主管 桌上一疊資料 根本來不及消化",
      "怕漏掉某個風險 或某個待決事項 開會被問倒",
      "五封信兩份記錄 內容重複又分散 抓重點抓到眼花"
    ],
    "quickStart": [
      "把要開會用的資料（信件、會議記錄、報告、簡報）貼上或上傳給 Agent，越多元越好。",
      "請它「為這場會議產一份主管簡報」，它會輸出摘要、關鍵主題、風險、未解問題、待決策與下一步。",
      "追問補強——「待決策事項各加上負責人與優先序」「風險按影響排序」——再貼進 Word 或 Teams 直接帶進會議。"
    ],
    "example": "幫我為即將到來的會議建立一份主管簡報。請摘要關鍵主題、風險、未解問題、討論重點與建議下一步。\n（接著把相關的信件、會議記錄、報告或簡報一起貼上或上傳給它）",
    "license": "free"
  },
  {
    "id": "A051",
    "zone": "Z6",
    "emoji": "🧑‍🏫",
    "cname": "工作坊規劃引導師",
    "ename": "Workshop Planning Facilitator",
    "headline": "從目標、議程到互動練習，一步步幫你設計出真的有效的工作坊！",
    "tagline": "✨ 結構化訪談 → SMART 目標 → 對齊目標的議程 → 帶得動的互動練習 🧑‍🏫",
    "description": "一個運作於 Copilot Chat 的互動式工作坊設計助理，以逐步教練式的引導，帶協同引導者完成工作坊的四個階段：訪談收集（主題、對象、人數、先備知識、時長、形式）、目標定義（產出 2～3 個 SMART 學習目標）、議程規劃（把每個環節對齊學習目標，含實際時間、休息與 Q&A，並以 Markdown 表格呈現）、練習設計（為每個主題設計互動練習，附標題、對應目標、目的、所需物料、逐步引導說明與預估時間，並提供不同人數／時間／經驗的調整）。每個階段都有確認關卡，未確認不進到下一步；並在超時、超過 25 人、目標與時間不符等情況主動提出調整建議。最終輸出一份結構完整、他人可直接執行的工作坊計畫。免 M365 Copilot 授權。",
    "painPoints": [
      "議程東拼西湊 不知道參加者 到底該帶走什麼",
      "內容太多時間太少 塞不進去 又不知道砍哪段",
      "隨便找個練習 結果大家盯著地板 尷尬冷場"
    ],
    "quickStart": [
      "告訴它工作坊主題、參加對象與人數、時長和形式（實體／線上／混合），它會先跟你做結構化訪談。",
      "跟著它的引導確認 SMART 學習目標與議程——它會用表格把每段對齊目標，你逐步確認即可。",
      "讓它為每個環節設計互動練習（含引導說明與物料），最後產出完整計畫，貼進 Word 或 Loop 就能帶著開場。"
    ],
    "example": "我需要協助設計一場工作坊。\n請幫我定義 SMART 學習目標、建立議程，並設計能幫參加者找出 HR 應用情境、產出 AI 導入行動計畫的實作練習。",
    "license": "free"
  },
  {
    "id": "A052",
    "zone": "Z8",
    "emoji": "🧭",
    "cname": "Copilot Chat 或 Cowork 選用指南",
    "ename": "Copilot vs. Cowork - Guide",
    "headline": "這件事該用 Copilot Chat 還是 Cowork？描述任務，它幫你選對工具、附上現成 Prompt！",
    "tagline": "✨ 依任務複雜度、速度、來源、產出，給明確結論＋現成 Prompt 🧭",
    "description": "一個運作於 Copilot Chat 的互動式選用指南，幫你判斷任務該用 Copilot Chat 還是 Copilot Cowork。它以官方「何時用哪個」對照表為依據，先做結構化訪談（任務一兩句話說明、輸入與來源是單一還是多個、期望產出是快速答案還是完整多段成品、是否需要重複或排程），再依六個面向（本質、最適用途、速度、任務複雜度、使用時機、情境）評分，得出三選一的明確結論：✅ Copilot Chat—一個 Prompt、✅ Copilot Chat—2～3 個 Prompt（同一對話）、🚀 Copilot Cowork（跨 app 端到端）。輸出含結論、理由（2～4 點）、如何執行（現成可貼的 Prompt／Prompt 序列／Cowork 委派），以及模稜兩可時的關鍵翻轉因素。它只負責選路與交付 Prompt，不代為執行任務（除非你在得到結論後明確要求）。免 M365 Copilot 授權。",
    "painPoints": [
      "同一件事 該用 Chat 還是 Cowork 每次都在猜",
      "把複雜的跨 app 任務 硬塞進一個 Chat 做得零零落落",
      "簡單一句話的事 卻開了 Cowork 等半天才回"
    ],
    "quickStart": [
      "用一兩句話描述你想請 AI 做的事——它會視需要再問你來源、期望產出與是否要重複。",
      "看它的結論與理由：該用 Copilot Chat（一個或幾個 Prompt）還是 Copilot Cowork。",
      "拿它交回的現成 Prompt（或 Cowork 委派）直接執行；模稜兩可時，依它點出的翻轉因素自己拍板。"
    ],
    "example": "我要把上一季五封專案信件和兩份試算表，變成一份董事會等級的摘要簡報——該用 Copilot Chat 還是 Cowork？",
    "license": "free"
  },
  {
    "id": "A053",
    "zone": "Z7",
    "emoji": "🕵️",
    "cname": "需求偵探",
    "ename": "Requirements Detective",
    "headline": "把模糊的想法，一步步問成清晰、排好優先序的需求文件！",
    "tagline": "✨ 結構化訪談 → 找缺口／模糊／矛盾 → MoSCoW 排序 → User Story／清單／BRD 🕵️",
    "description": "一個運作於 Copilot Chat 的互動式需求助理，以資深商業分析師與需求工程師的角色，透過結構化探索挖掘功能與非功能需求，辨識缺口、模糊與矛盾，並產出清晰、排好優先序的需求文件，格式三選一：User Stories、結構化需求清單，或完整商業需求文件（BRD）。訪談先行（主題、範圍、對象、輸出格式），一次問一個問題；階段一逐維度探索（利害關係人、問題、目標、功能／非功能需求、限制與假設）並設確認關卡；階段二做缺口／模糊／矛盾／未言明需求分析並以 MoSCoW 排序；階段三依選定格式輸出。附品質檢核清單（每條可測試、去模糊、Must Have 可追溯）。只挖需求，不設計方案、不寫程式。免 M365 Copilot 授權。",
    "painPoints": [
      "想做個東西 但需求一團模糊 不知從何寫起",
      "做到一半才發現 缺東缺西又矛盾 成本已經燒下去",
      "「要快、要簡單」 誰都這樣說 沒人講得清標準"
    ],
    "quickStart": [
      "告訴它你要定義的主題、範圍（新建／改善／修問題）、文件給誰看，以及想要的輸出格式。",
      "跟著它一次一個問題把需求聊清楚——它會在進到分析前先摘要、請你確認。",
      "看它列出缺口／模糊／矛盾並用 MoSCoW 排序，逐項確認後，產出你選定格式的需求文件。"
    ],
    "example": "我需要為採購單定義一套全新的內部簽核流程需求。我們想把它數位化，但不確定從哪裡開始。",
    "license": "free"
  },
  {
    "id": "A054",
    "zone": "Z3",
    "emoji": "🧭",
    "cname": "新人領航員",
    "ename": "Onboarding Agent",
    "headline": "從『我該從哪開始？』到『我準備好了』——新人領航員陪你走過第一週",
    "tagline": "✨ 首週檢查清單 → HR 資源速查 → 依角色推薦工具 → 30/60/90 天目標排程",
    "description": "一個在 Copilot Chat 中運作的到職引導助理，先給新人第一天／第一週檢查清單與 HR 資源連結，再依角色推薦該熟悉的軟體與工作方法，並在清單完成後提醒安排 30/60/90 天目標會議。全程語氣友善專業，鼓勵新人放心發問。需 M365 Copilot 授權。",
    "painPoints": [
      "第一天到職 完全不知道 該做什麼",
      "公司內網像迷宮 找不到我要的 那份 SOP",
      "怕問太多問題 顯得狀況外 只好悶頭亂試"
    ],
    "quickStart": [
      "建立 Onboarding Agent，附上公司的到職文件與 HR 政策，開口先看它給的第一天／第一週檢查清單。",
      "說出你的職務或角色，讓它依此推薦該熟悉的軟體與工作方法。",
      "清單勾完後，照它的提醒和主管排 30/60/90 天目標會議。"
    ],
    "example": "我下週一入職，第一天應該做什麼準備？",
    "license": "required"
  },
  {
    "id": "A055",
    "zone": "Z1",
    "emoji": "🎩",
    "cname": "私人幕僚長",
    "ename": "Personal Chief of Staff",
    "headline": "把想法、問題、任務，交給你的私人幕僚長變成決策、計畫與定稿文件",
    "tagline": "✨ 先問清楚再動手 → 套用公司知識與語氣 → 腦力激盪／溝通／規劃三合一",
    "description": "一個在 Copilot Chat 中運作的情境感知助理，以 Chief of Staff 的效率、策略思維與執行力，把想法、問題、任務轉化為清楚的決策、可行的計畫與專業溝通。套用公司知識、流程、目標受眾與語氣指南，遵循「釐清→分析→執行→覆核→交付」五步驟，確保每次輸出都貼合情境、可立即使用、符合公司標準。需 M365 Copilot 授權或按量付費。",
    "painPoints": [
      "腦子裡想法一堆 但沒空整理成 能執行的東西",
      "AI 給的答案 千篇一律 跟公司語氣搭不上",
      "草稿拿到手 還是要從頭 改到能用"
    ],
    "quickStart": [
      "建立 Personal Chief of Staff，上傳你公司的資訊、流程手冊與語氣指南作為知識來源。",
      "丟出你的任務（腦力激盪、寫信、規劃），回答它反問的釐清問題。",
      "拿到符合公司語氣、可直接使用的輸出，需要調整就直接請它修改。"
    ],
    "example": "幫我起草一封 Copilot 策略工作坊後的追蹤信，摘要結論、下一步與客戶價值。",
    "license": "required"
  },
  {
    "id": "A056",
    "zone": "Z7",
    "emoji": "📣",
    "cname": "客戶回饋綜整器",
    "ename": "Customer Feedback Synthesizer",
    "headline": "把散落各處的客戶聲音，整理成主題、情緒與最該先做的三件事",
    "tagline": "✨ 去重清洗 → 情緒分級 → 主題歸類 → 排出三大優先行動 📣",
    "description": "客戶回饋綜整器能把問卷、客服工單、評論、社群媒體與直接互動中的非結構化回饋，轉化為清楚的洞察與排好優先序的行動。它會去除重複與無關內容，歸納主題，評估情緒與出現頻率，並突顯最重要的改善機會，協助團隊依據客戶意見做出有依據的決策。需 M365 Copilot 授權或按量付費。",
    "painPoints": [
      "問卷、工單與評論散在不同地方 手動整理又慢又容易重複",
      "回饋看了一大堆 卻說不清負面情緒與高頻主題各佔多少",
      "報告只有模糊結論 主管看完還是不知道下週該做什麼"
    ],
    "quickStart": [
      "提供至少十則客戶回饋，以及產品、服務、來源和時間區間。",
      "讓它去重、排除無關內容，分析情緒並將回饋歸納成有計次的主題。",
      "檢視前三大優先主題，以及各自的具體行動、預期成效、負責人與時程。"
    ],
    "example": "請分析以下我們產品評論在過去 30 天內收集到的客戶回饋。歸納出主要主題、摘要情緒分布、排出最重要的問題優先序，並為產品團隊提供三項可執行的建議。",
    "license": "required"
  },
  {
    "id": "A057",
    "zone": "Z1",
    "emoji": "📄",
    "cname": "策略一頁報",
    "ename": "Strategic One-Pager",
    "headline": "把對話、會議與附件濃縮成一頁可供主管快速決策的 PDF",
    "tagline": "✨ 執行摘要 → 三個洞察 → 風險與機會 → 一句建議聚焦 📄",
    "description": "策略一頁報能把對話、文件、會議紀錄、研究發現、簡報與知識來源，轉化為精簡且可供高階主管直接使用的一頁式簡報。它會辨識最重要的洞察、商業意涵、機會、風險與建議的下一步，再製作成專業、便於利害關係人閱讀、專為快速決策設計的 PDF。最佳做法是把 Agent 加入現有對話並以 @Strategic One-Pager 標記它。",
    "painPoints": [
      "對話、附件與會議結論散得到處都是 花時間整理卻沒時間思考",
      "主管只有五分鐘 卻找不到能直接支撐決策的摘要",
      "事實、推論與假設混在一起 風險和下一步說不清楚"
    ],
    "quickStart": [
      "把 Agent 加進現有對話，或提供相關文件、會議紀錄與研究內容。",
      "用 @Strategic One-Pager 標記它，讓它判斷主題、閱讀對象與決策重點。",
      "取得 A4 直式單頁 PDF，覆核三個洞察、風險／機會與建議聚焦。"
    ],
    "example": "請依據目前這串對話與可用的內容產出一份策略一頁報。分析已提供的內容，並將最終的策略一頁報製作成 PDF。",
    "license": "free"
  },
  {
    "id": "A058",
    "zone": "Z8",
    "emoji": "🧭",
    "cname": "Copilot 選用羅盤",
    "ename": "Copilot Compass",
    "headline": "描述你要完成的工作，立刻知道該用哪一個 Copilot 工具",
    "tagline": "✨ 說出任務 → 判斷目標與複雜度 → 推薦最佳入口 → 附上可直接複製的提示 🧭",
    "description": "協助 Microsoft 365 Copilot 使用者為手上的任務挑選最合適的 Copilot 工具。它會依據工作內容與期望成果，把需求對應到 Copilot Chat、Microsoft 365 應用程式中的 Copilot、Researcher、Analyst、專用 Agent 或 Cowork 等能力，並提供選擇理由、開始方式與可直接使用的提示詞。不需 M365 Copilot 授權。",
    "painPoints": [
      "Copilot 入口越來越多 每次開始工作前都先卡在該用哪一個",
      "簡單任務用了太重的工具 複雜任務又塞進一次 Chat",
      "知道工具名稱 卻不知道如何開始或該下什麼提示"
    ],
    "quickStart": [
      "描述你的目標、需要的產出、素材來源，以及工作涉及哪些應用程式。",
      "讓它依複雜度、是否需要直接動作與存取限制，推薦一個主選項。",
      "使用它提供的開始方式與可直接複製提示；需要時再評估替代方案。"
    ],
    "example": "幫我研究三家競爭對手、分析他們的市場定位，並產出一份附引用來源的簡報與一份比較用投影片。我應該用哪一個 Copilot 工具？",
    "license": "free"
  }
];
