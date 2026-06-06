// AI 資金流地圖 — 晶片商：Nvidia/AMD/Broadcom
// 流向歸檔規則：監測優先序 cohere > anthropic > openai > softbank > coreweave > chips > hyperscalers > infra > finance
// （本檔含「優先序輪到本群」的所有流向；跨群流向只存一份）

const DATA_CHIPS = {
  entities: [
  {
    "id": "nvda",
    "name": "Nvidia",
    "category": "chip",
    "health": {
      "score": 78,
      "notesZh": "資產負債表無懈可擊（債 $8.5B vs 季 OCF $50B），但盈餘品質與集中度惡化：單季 $18.6B 投入私人 AI 股權（=OCF 37%）、非上市投組 15 個月 12.5 倍（$3.4B→$42.3B）+$27B 待投；單季 $15.9B 股權利得入損益；前三大客戶 54% 營收、單一客戶應收 ~$12B；10-K/10-Q 連三季原文：「一家 AI 研究與部署公司透過向我們的客戶購買雲服務、間接貢獻可觀營收」",
      "notesEn": "Pristine B/S (debt $8.5B vs $50B/qtr OCF) but earnings quality & concentration deteriorating: $18.6B/qtr into private AI equity (37% of OCF), non-marketable portfolio 12.5x in 15 months (+$27B committed); $15.9B/qtr equity gains in P&L; top-3 customers = 54% of revenue, one owes ~$12B AR; three consecutive filings: 'one AI research and deployment company contributed meaningful revenue indirectly'"
    },
    "leverage": {
      "totalDebt": 8.5,
      "cash": 80.6,
      "netDebt": -72.1,
      "ebitda": null,
      "debtToEbitda": null,
      "ocf": 201.4,
      "capex": 7,
      "fcf": 194.4,
      "offBS": 185.5,
      "effectiveLeverage": 1,
      "period": "10-K FY2026 (2026-01-25) + 10-Q Q1 FY2027 (2026-04-26)；OCF/capex 為 Q1 年化",
      "citation": "SEC 10-K nvda-20260125 + 10-Q nvda-20260426（XBRL 交叉驗證）",
      "keyRisksZh": [
        "表外/遠期合計 ~$185.5B：供應承諾 $119B（半年翻倍）+ 雲服務協議 $30B（CoreWeave 式回購所在科目）+ 投資承諾 $27B + 廠商 $6B + 資料中心租約擔保 $3.5B（押金僅 $712M）",
        "單季 $18.6B 買私人股權＝拿 37% 營運現金流回灌自己的客戶生態系",
        "$15.9B 單季股權利得（大多未實現；$27.4B 短期鎖倉+$8.9B 鎖至 2027/12）",
        "AR 集中：30%/18%/16%——單一匿名客戶欠 ~$12B"
      ]
    }
  },
  {
    "id": "amd",
    "name": "AMD",
    "category": "chip",
    "health": {
      "score": 72,
      "notesZh": "OpenAI 6GW 標題中僅 1GW 有約束力（8-K）；Q1'26 10-Q 確認發了兩份 160M 股 penny warrant（OpenAI 2025-10 + Meta 2026-02, $0.01 行使價），解鎖含「透過授權第三方間接採購」——經雲端中介的採購也算；尚未有股份 vest、暫列負債",
      "notesEn": "Only 1 of 6 GW binding; Q1'26 10-Q confirms TWO 160M-share penny warrants (OpenAI Oct-25 + Meta Feb-26), vesting incl. purchases 'indirectly through authorized third parties'; none vested yet, liability-classified"
    }
  },
  {
    "id": "avgo",
    "name": "Broadcom",
    "category": "chip",
    "health": {
      "score": 68,
      "notesZh": "AI 半導體營收 Q2 FY26 $10.8B（+143%）、Q3 指引 $16B；8-K (2026-04-06)：與 Google 簽 TPU 長約+供應保證至 2031、Anthropic 自 2027「透過 Broadcom」取得 ~3.5GW、消耗「取決於 Anthropic 持續商業成功」、融資「洽談中」；⚠ 殘值擔保經全市場 EDGAR 驗證零揭露（Broadcom 全體系僅一個申報主體、無子公司可藏；ASC 460 下擔保一經簽發必須入合併報表）——成交前是揭露真空、成交後 Q2 10-Q 必須現形",
      "notesEn": "AI semis $10.8B (+143%), $16B Q3 guide; 8-K (2026-04-06): Google TPU LTA + supply assurance thru 2031, Anthropic accesses ~3.5GW 'through Broadcom' from 2027, consumption 'dependent on Anthropic's continued commercial success', financing 'in discussions'; ⚠ RVG verified ZERO disclosure market-wide on EDGAR (Broadcom has exactly ONE SEC registrant — no subsidiary to hide in; ASC 460 forces consolidated disclosure once issued)"
    },
    "leverage": {
      "totalDebt": 64.9,
      "cash": 19.6,
      "netDebt": 45.3,
      "ebitda": null,
      "debtToEbitda": null,
      "ocf": 42,
      "capex": 0.9,
      "fcf": 41,
      "offBS": 4.3,
      "effectiveLeverage": 1.6,
      "period": "Q2 FY2026 8-K (2026-05-03) + Q1 FY2026 10-Q；OCF/FCF 為 Q2 年化",
      "citation": "SEC 8-K avgo-05032026 + Q1 10-Q；RVG 搜尋為負面發現",
      "keyRisksZh": [
        "債務 $64.9B（VMware 遺留）持平、AI 成長全靠 OCF 自籌",
        "報導中的 ~$31B TPU 殘值擔保未出現在任何文件——或有負債的揭露真空",
        "Q2 FY26 10-Q（~6 月中）是下一個可能現形的地方"
      ]
    }
  }
],
  flows: [],
  circularity: [
  {
    "id": "nvda-triple-role",
    "titleZh": "Nvidia 三重角色：供應商＋股東＋需求買回方",
    "titleEn": "Nvidia's triple role: supplier + shareholder + demand backstop",
    "multiplier": "3 角色",
    "chain": [
      "nvda",
      "coreweave",
      "nvda"
    ],
    "confidence": "confirmed",
    "descZh": "CoreWeave 8-K (2025-09-15) 原文確認：Nvidia 同時是 (a) GPU 供應商 (b) 股東 (c) 依 $6.3B 訂單義務回購 2032/4 前未售產能。供應商的銷售收入→變成客戶的資產→客戶拿資產抵押借錢→再買供應商的貨——而需求不足時由供應商自己接盤。",
    "descEn": "CRWV 8-K confirms Nvidia is simultaneously (a) GPU supplier (b) stockholder (c) obligated buyer of unsold capacity through Apr 2032 ($6.3B order). Vendor revenue → customer asset → collateral for debt → more vendor purchases — with the vendor itself backstopping demand.",
    "citation": "SEC 8-K crwv-20250909 Item 1.01（上限 $6.3B、可因違約/破產 30 日終止）"
  },
  {
    "id": "amd-warrants",
    "titleZh": "AMD 雙 penny warrant：客戶用「採購」換股權，間接採購也算",
    "titleEn": "AMD's twin penny warrants: equity for purchases — indirect ones count",
    "multiplier": "2 份",
    "chain": [
      "amd",
      "openai",
      "amd"
    ],
    "confidence": "confirmed",
    "descZh": "AMD Q1'26 10-Q：對 OpenAI（2025-10）與 Meta（2026-02）各發 160M 股 @ $0.01 權證，解鎖綁 Instinct GPU 採購里程碑——「含透過授權第三方間接採購」。意即經 Oracle/neocloud 中介的採購同樣解鎖股權：同一筆 GPU 訂單在中介商記營收、在 AMD 記營收、又解鎖客戶的 AMD 股權。截至 2026-03-28 尚無股份 vest。",
    "descEn": "AMD 10-Q: 160M-share $0.01 warrants to both OpenAI (Oct-25) and Meta (Feb-26), vesting on Instinct purchase milestones 'including indirectly through authorized third parties' — one GPU order books revenue at the intermediary, revenue at AMD, and vests the customer's AMD equity. None vested as of Mar 28, 2026.",
    "citation": "SEC 10-Q amd-20260328（權證列負債直到符合權益分類條件）"
  },
  {
    "id": "nvda-flywheel",
    "titleZh": "Nvidia 飛輪：37% 營運現金流回灌客戶生態系、間接營收連三季自揭",
    "titleEn": "Nvidia flywheel: 37% of OCF recycled into its customer ecosystem; indirect revenue self-disclosed three quarters running",
    "multiplier": "37% OCF",
    "chain": [
      "nvda",
      "openai",
      "coreweave",
      "nvda"
    ],
    "confidence": "confirmed",
    "descZh": "全研究最強的 filing 級循環證據。Nvidia 10-K/10-Q 連續三份原文：「我們估計一家 AI 研究與部署公司（=OpenAI 的自我描述）透過向我們的客戶購買雲服務、間接貢獻了可觀的營收。」同期：單季 $18.6B 現金買私人 AI 股權（=當季 OCF 的 37%）、非上市投組 15 個月 $3.4B→$42.3B、另 $27B 已承諾；$15.9B 單季股權利得（含 CoreWeave/Intel 增值）灌入損益；前三大匿名客戶佔營收 54%、應收 64%。每一條腿文件都揭露了，只是從不把它們連成一個圈。",
    "descEn": "The strongest filing-level circularity in this study. Three consecutive Nvidia filings state verbatim that 'one AI research and deployment company' (OpenAI's self-description) drives meaningful revenue indirectly through Nvidia's cloud customers — while Nvidia deploys $18.6B/quarter (37% of OCF) into private AI equity, books $15.9B/quarter of equity gains, and concentrates 54% of revenue in three unnamed customers. Every leg is disclosed; the circle is never drawn.",
    "citation": "SEC 10-K nvda-20260125 + 10-Q nvda-20260426 + 10-Q nvda-20251026（OpenAI 指認為高度可信推論，文件未具名）"
  }
],
  contagionPaths: [],
};

if (typeof module !== "undefined") module.exports = { DATA_CHIPS };
