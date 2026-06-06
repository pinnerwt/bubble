// AI 資金流地圖 — Anthropic + TPU SPV
// 流向歸檔規則：監測優先序 cohere > anthropic > openai > softbank > coreweave > chips > hyperscalers > infra > finance
// （本檔含「優先序輪到本群」的所有流向；跨群流向只存一份）

const DATA_ANTHROPIC = {
  entities: [
  {
    "id": "anthropic",
    "name": "Anthropic",
    "category": "ai-lab",
    "health": {
      "score": 62,
      "updateZh": "2026-06 更新：$65B 融資 @ $965B（5/28, 史上首度估值超車 OpenAI）+ 6/1 機密遞件 IPO——TPU SPV 的主還款人信用顯著改善",
      "notesZh": "資本充足且成長中：$30B Series G @ $380B(2026-02)；run-rate $14B(2月)→$30B+(4月,毛額;競對備忘錄稱淨額~$22B)→$47B(5月底,報導)。但 TPU 租金是 $36B SPV 唯一主要還款來源",
      "notesEn": "Well-capitalized & growing: $30B Series G @ $380B; run-rate $14B(Feb)→$30B+(Apr, gross; ~$22B net per disputed memo)→$47B(late May, reported). But TPU rent is the $36B SPV's primary repayment source"
    }
  },
  {
    "id": "anthropic-tpu-spv",
    "name": "Anthropic TPU SPV",
    "category": "spv",
    "health": {
      "score": 35,
      "notesZh": "~$36B（Burry 5/29 文中 $38B）：$6B A1 + $25B A2(~5.75%) + $4.5B B；6/5 仍在銷售未 close；B 段為無增強損失層；Broadcom RVG 承接 senior 尾部風險",
      "notesEn": "~$36B (Burry's '$38B'): $6B A1 + $25B A2 (~5.75%) + $4.5B B; not closed as of Jun 5; B tranche is the unenhanced loss piece; Broadcom RVG absorbs senior tail"
    }
  }
],
  flows: [
  {
    "source": "anthropic",
    "target": "coreweave",
    "type": "purchase",
    "amount": 6.8,
    "date": "2026-04-10",
    "confidence": "estimate",
    "citation": "CoreWeave Q1'26 8-K 確認協議存在但未揭露金額；$6.8B 數字僅來自單一聚合媒體（MarketMinute/FinancialContent, 2026-04-10, 自註「第三方內容未經驗證」）——以 estimate 標記",
    "noteZh": "Anthropic 多年期協議（金額 $6.8B 為弱來源估計）；此合約不在 DDTL 5.0 抵押池內",
    "noteEn": "Anthropic multi-year agreement ($6.8B from a single weak source); NOT in the DDTL 5.0 collateral pool"
  },
  {
    "source": "gic",
    "target": "anthropic",
    "type": "equity",
    "amount": 30,
    "date": "2026-02-12",
    "confidence": "confirmed",
    "citation": "Anthropic 一手新聞稿 + GIC 官網: $30B Series G @ $380B post（GIC/Coatue 領投, MGX 等共同領投）",
    "noteZh": "Series G $30B @ $380B；同稿揭露 run-rate $14B、連三年 >10x",
    "noteEn": "$30B Series G @ $380B; same release: $14B run-rate, >10x annually for 3 yrs"
  },
  {
    "source": "amzn",
    "target": "anthropic",
    "type": "equity",
    "amount": 13,
    "date": "2026-04-20",
    "confidence": "confirmed",
    "citation": "Amazon 10-Q Q1'26 Note 2: $8.0B 可轉債（2023 Q3-2025 Q4）+ 期後 $5.0B 無表決權特別股；另有 $5B 後續輪選擇權",
    "noteZh": "已投 ~$13B；持倉帳面值一季 $16.2B→$48.1B（Level 3 增值入損益）",
    "noteEn": "~$13B invested; carrying value $16.2B→$48.1B in one quarter (Level 3 markups through P&L)"
  },
  {
    "source": "amzn",
    "target": "anthropic",
    "type": "debt",
    "amount": 20,
    "date": "2026-04",
    "confidence": "confirmed",
    "citation": "Amazon 10-Q Q1'26 Note 2: 至 $20B 融資額度，可用額度隨 Amazon「交付算力里程碑」解鎖（含 AWS 晶片性能合約義務）；提取以 Anthropic 可轉債/普通股形式",
    "noteZh": "⚠ 循環設計：Amazon 交付算力 → 解鎖 Amazon 借錢給 Anthropic → Anthropic 付 AWS 算力費",
    "noteEn": "⚠ Circular by design: Amazon delivers compute → unlocks Amazon lending to Anthropic → Anthropic pays AWS"
  },
  {
    "source": "googl",
    "target": "anthropic",
    "type": "equity",
    "amount": 10,
    "date": "2026-04-24",
    "confidence": "confirmed",
    "citation": "Alphabet 10-Q Q1'26 VIE 註記：未具名「未來私人投資」$10B 資本承諾 + $30B 里程碑出資（至 2030）、會計列為 Level 3 股權衍生品；VIE 承諾 $1.1B→$40.7B；對手與 Anthropic 報導一致（Bloomberg 2026-04）",
    "noteZh": "$10B 前置（Q2'26 撥付）+ $30B 里程碑——10-Q 以股權衍生品揭露",
    "noteEn": "$10B upfront (funding Q2'26) + $30B milestone — disclosed in 10-Q as an equity derivative"
  },
  {
    "source": "nvda",
    "target": "anthropic",
    "type": "equity",
    "amount": 10,
    "date": "2025-11",
    "confidence": "confirmed",
    "citation": "Nvidia Q3 FY26 10-Q 原文：「2025 年 11 月簽訂協議（附成交條件）投資 Anthropic 至 $10B」（XBRL tag: AnthropicPBCMember）",
    "noteZh": "Nvidia 至 $10B（10-Q 確認；後續關係惡化、黃仁勳稱可能是最後一輪）",
    "noteEn": "Up to $10B (10-Q confirmed; relationship later soured, Huang: likely 'its last')"
  },
  {
    "source": "apollo",
    "target": "anthropic-tpu-spv",
    "type": "debt",
    "amount": 18,
    "date": "2026-05",
    "confidence": "reported",
    "citation": "Bloomberg (2026-05-28) / PE Wire / PitchBook: Apollo+Blackstone 共構 ~$36B（平均拆分顯示）",
    "noteZh": "~$36B 結構：$6B A1 + $25B A2(~5.75%) + $4.5B B；6/5 仍在銷售",
    "noteEn": "~$36B: $6B A1 + $25B A2 (~5.75%) + $4.5B B; in syndication as of Jun 5"
  },
  {
    "source": "blackstone",
    "target": "anthropic-tpu-spv",
    "type": "debt",
    "amount": 18,
    "date": "2026-05",
    "confidence": "reported",
    "citation": "Bloomberg (2026-05-28): Burry 5/29 引用數字為 $38B；是否已 close 兩輪深研皆未能確認",
    "noteZh": "共同結構方；close 與否未確認",
    "noteEn": "Co-structuring; closing unconfirmed"
  },
  {
    "source": "anthropic-tpu-spv",
    "target": "googl",
    "type": "purchase",
    "amount": 36,
    "date": "2026",
    "confidence": "reported",
    "citation": "PE Wire: SPV 募資購買 Google TPU",
    "noteZh": "SPV 買 TPU——Google 立即變現、硬體風險出表",
    "noteEn": "SPV buys TPUs — Google monetizes instantly, hardware off its books"
  },
  {
    "source": "anthropic-tpu-spv",
    "target": "anthropic",
    "type": "lease",
    "amount": 36,
    "date": "2026",
    "confidence": "reported",
    "citation": "PE Wire/Bloomberg: 長期租約；Anthropic 租金為主要還款來源",
    "noteZh": "Anthropic 租金＝SPV 債務唯一主要還款來源（~1GW TPU）",
    "noteEn": "Anthropic's rent is the debt's primary repayment source (~1GW TPUs)"
  },
  {
    "source": "avgo",
    "target": "anthropic-tpu-spv",
    "type": "guarantee",
    "amount": 31,
    "date": "2026-06-02",
    "confidence": "reported",
    "citation": "Bloomberg (2026-06-02): Broadcom RVG 壓低 A2 至 ~5.75%；⚠ 全市場 EDGAR 全文搜尋驗證（2026-06-05）：無任何 SEC 申報者揭露此擔保；Broadcom 4/6 8-K 確認商業框架（3.5GW 透過 Broadcom）但無 RVG 字樣、融資仍在洽談",
    "noteZh": "Broadcom 殘值擔保——目前只活在報導裡、任何資產負債表上都看不到；成交後依 ASC 460 必須入 Broadcom 合併報表（全體系僅一個 SEC 申報主體、無子公司可藏）",
    "noteEn": "Broadcom's RVG — exists only in press so far, invisible on every balance sheet; once issued, ASC 460 forces it into Broadcom Inc.'s consolidated disclosures (sole SEC registrant — no subsidiary to hide in)"
  }
],
  circularity: [
  {
    "id": "amzn-mark-to-model",
    "titleZh": "Amazon–Anthropic：投資→交付算力解鎖貸款→紙上增值入損益",
    "titleEn": "Amazon–Anthropic: invest → compute delivery unlocks lending → paper gains to P&L",
    "multiplier": "65% 營業利益",
    "chain": [
      "amzn",
      "anthropic",
      "amzn"
    ],
    "confidence": "confirmed",
    "descZh": "Amazon 10-Q 原文：$8B 可轉債 + $5B 特別股 + 至 $20B 融資額度——額度隨 Amazon「交付算力里程碑」解鎖。同時 Q1'26 認列 $15.6B 其他收益（$12.3B 為 Anthropic 特別股 Level 3 模型增值）≈ 當季營業利益的 65%。自己投資、自己供貨、自己放貸、自己估值、增值記進自己的獲利。",
    "descEn": "Filing-verbatim: $8B notes + $5B preferred + up-to-$20B facility unlocking as Amazon hits compute-delivery milestones; meanwhile Q1'26 booked a $15.6B other-income gain ($12.3B Level 3 markup on Anthropic preferred) ≈ 65% of operating income. Invest, supply, lend, mark, and book the markup — all in-house.",
    "citation": "SEC 10-Q amzn-20260331 Note 2（Level 3、未實現、可反轉；另 $4.1B 離散稅費）"
  },
  {
    "id": "googl-equity-derivative",
    "titleZh": "Alphabet：$40B 投資以「股權衍生品」入帳、對手不具名",
    "titleEn": "Alphabet: a $40B investment booked as an 'equity derivative', counterparty unnamed",
    "multiplier": "$1.1B→$40.7B",
    "chain": [
      "googl",
      "anthropic",
      "anthropic-tpu-spv",
      "googl"
    ],
    "confidence": "confirmed",
    "descZh": "Alphabet 10-Q：VIE 出資承諾一季從 $1.1B 跳到 $40.7B（$10B 資本承諾 + $30B 至 2030 里程碑出資、列為 Level 3 股權衍生品；對手未具名、與 Anthropic 一致）。同時 Google 把 TPU 賣給 Apollo/Blackstone SPV 收現、Anthropic 再用 Google 的錢付 TPU 租金。Alphabet 另揭露 $28.4B 資料中心信用衍生品 + $33.3B backstop 框架——也在變成第三方資料中心債的保險人。",
    "descEn": "Alphabet's VIE commitments jumped $1.1B→$40.7B in one quarter ($10B + $30B milestone, booked as a Level 3 equity derivative, counterparty unnamed/Anthropic-consistent), while Google monetizes TPUs through the Apollo/Blackstone SPV and Anthropic pays TPU rent partly with Google's money. Alphabet also discloses $28.4B of DC credit derivatives + a $33.3B backstop framework — becoming an insurer of third-party data-center debt.",
    "citation": "SEC 10-Q goog-20260331 VIE/衍生品註記"
  }
],
  contagionPaths: [
  {
    "id": "anthropic-tpu-cascade",
    "titleZh": "次路徑：Anthropic TPU SPV（Burry 的 $38B）",
    "titleEn": "Secondary: Anthropic TPU SPV (Burry's $38B)",
    "trigger": "anthropic",
    "steps": [
      {
        "from": "anthropic",
        "to": "anthropic-tpu-spv",
        "mechanismZh": "Anthropic 租金＝唯一主要還款來源；run-rate 有 gross/net 爭議(~$8B)",
        "mechanismEn": "Anthropic rent = primary repayment source; run-rate has an ~$8B gross/net dispute"
      },
      {
        "from": "anthropic-tpu-spv",
        "to": "avgo",
        "mechanismZh": "TPU 殘值擔保觸發 → Broadcom 承接 senior 尾部風險",
        "mechanismEn": "RVG triggered → Broadcom absorbs senior tail risk"
      },
      {
        "from": "anthropic-tpu-spv",
        "to": "apollo",
        "mechanismZh": "$4.5B B 段（無增強損失層）先歸零，再傷 A2",
        "mechanismEn": "$4.5B B tranche zeroes first, then A2 impaired"
      },
      {
        "from": "apollo",
        "to": "insurers",
        "mechanismZh": "Athene 式保險浮存金直接曝險",
        "mechanismEn": "Athene-style insurance float directly exposed"
      }
    ],
    "severity": "high"
  }
],
};

if (typeof module !== "undefined") module.exports = { DATA_ANTHROPIC };
