// AI 資金流地圖 — CoreWeave + 兩個 DDTL SPV
// 流向歸檔規則：監測優先序 cohere > anthropic > openai > softbank > coreweave > chips > hyperscalers > infra > finance
// （本檔含「優先序輪到本群」的所有流向；跨群流向只存一份）

const DATA_COREWEAVE = {
  entities: [
  {
    "id": "coreweave",
    "name": "CoreWeave",
    "category": "neocloud",
    "health": {
      "score": 15,
      "notesZh": "⚠ 最薄弱環節（SEC 文件逐行確認）：債務 15 個月 3 倍（$8.0B→$21.6B→$25.1B，Q1'26 後再加 $9.9B）；FY25 償債 $4.4B＞OCF $3.1B；利息年化 $1.55B≈營收 25%；現金 $2.2B vs 2026 年內到期 $6.1B；Microsoft 佔營收 67%；表外租約 $40.7B+；除 DDTL 4.0 外全部設施由母公司無條件擔保",
      "notesEn": "⚠ Weakest link (filing-verified): debt 3x in 15 months ($8.0B→$21.6B→$25.1B, +$9.9B post-Q1); FY25 debt service $4.4B > OCF $3.1B; interest ~25% of revenue; cash $2.2B vs $6.1B due within 2026; Microsoft = 67% of revenue; $40.7B+ off-B/S leases; all DDTLs except 4.0 unconditionally parent-guaranteed"
    },
    "leverage": {
      "totalDebt": 25.1,
      "cash": 2.2,
      "netDebt": 22.9,
      "ebitda": 3.1,
      "debtToEbitda": 6.9,
      "ocf": 3,
      "capex": 10.3,
      "fcf": -7.25,
      "offBS": 50,
      "effectiveLeverage": 24.2,
      "period": "10-K FY2025 + 10-Q 2026-03-31（Q1 後另有 $4B 可轉債+$2.8B 9.75% 債+$3.1B DDTL 5.0）",
      "citation": "SEC: crwv-20251231 (10-K), crwv-20260331 (10-Q), 4Q25 earnings 8-K",
      "keyRisksZh": [
        "FY25 償債 $4.4B > 營運現金流 $3.1B",
        "Capex = OCF 的 2.6-3.4×，全靠新債+增資餵養",
        "債務/調整後EBITDA 6.9×（含營業租賃 9.6×；含表外總索賠 ~$75-90B vs EBITDA $3.1B ≈ 24×+）",
        "DDTL 實際利率 7-15%；9.75% 高息債",
        "到期牆：2026 剩餘 $6.1B、2027 $5.7B vs 現金 $2.2B",
        "RPO $98.8B 僅 36% 在 24 個月內認列——抵押品是長天期承諾",
        "受限現金瀑布：先償債、後放款給公司",
        "GPU 資產 $33.9B 僅折舊 $3.4B——年輕未經考驗的資產基礎"
      ]
    }
  },
  {
    "id": "cw-spv8",
    "name": "CW SPV VIII (DDTL 4.0)",
    "category": "spv",
    "health": {
      "score": 50,
      "notesZh": "$8.5B、首例投資級 GPU 抵押融資（A3/A-low, SOFR+225）；無追索但含 bad-boy 擔保；抵押＝SPV 全資產+客戶合約+資料中心租約三層；advance rate 建設期 90% LTC、穩定後 1.2x DSCR ⇒ 可達 ~102% LTC——債可超過資產成本",
      "notesEn": "$8.5B, first IG GPU-backed (A3/A-low); non-recourse but bad-boy guarantee; collateral = SPV assets + customer contract + DC leases; 90% LTC in construction, 1.2x DSCR post-stabilization ⇒ up to ~102% LTC — debt can exceed asset cost"
    }
  },
  {
    "id": "cw-spv5",
    "name": "CW DDTL V SPV (5.0)",
    "category": "spv",
    "health": {
      "score": 20,
      "notesZh": "$3.1B 垃圾級(Ba2/BB+) SOFR+450；兩家客戶＝OpenAI + Cohere（銀團報導）。信貸協議（ex10.1, 101 處[*]刪節）顯示兩份 MSA 交叉抵押進同一池、無分層：單一放貸公式 71.42%×capex（隱含總建置 ~$4.34B、股權墊 28.6%）；任一 MSA 重大違約→全設施 Cash Trap；任一 MSA 全面終止→整個 $3.1B 的違約事件——最弱信用（Cohere）持有與 OpenAI 同等的引爆權；唯一不對稱：其中一份 MSA 的附屬基建認列有[*]上限。可公開交易但抵押池組成被刪節——買方看得到價格、看不到池子",
      "notesEn": "$3.1B junk; customers = OpenAI + Cohere. Credit agreement (ex10.1, 101 redactions) shows the two MSAs are CROSS-COLLATERALIZED into one pool, no tranching: single 71.42%-of-capex advance formula (implies ~$4.34B total build); material breach of EITHER MSA → facility-wide Cash Trap; full termination of EITHER MSA → Event of Default on the whole $3.1B — the weakest credit (Cohere) holds the same detonator as OpenAI; only asymmetry: one MSA's ancillary-infra attribution is capped at [*]. Publicly tradeable, but the pool composition is redacted"
    }
  }
],
  flows: [
  {
    "source": "meta",
    "target": "coreweave",
    "type": "purchase",
    "amount": 21,
    "date": "2026-03",
    "confidence": "confirmed",
    "citation": "CoreWeave Q1'26 earnings 8-K (2026-05-07): 3 月與 Meta 簽新 $21B 承諾（在原 ~$14.2B 之上）；backlog 增至 $99.4B",
    "noteZh": "Meta 3 月再簽 $21B——CoreWeave 對 Meta 依賴度進一步上升",
    "noteEn": "Meta signed a NEW $21B commitment in March — CoreWeave's Meta dependence deepens further"
  },
  {
    "source": "blackstone",
    "target": "cw-spv8",
    "type": "debt",
    "amount": 8.5,
    "date": "2026-03-31",
    "confidence": "confirmed",
    "citation": "CoreWeave 8-K Ex.99.1 (SEC): BXCI 錨定 + 保險投資人 + 資管；A3/A-low、SOFR+225、無追索權",
    "noteZh": "DDTL 4.0：首例投資級 GPU 抵押融資——但評級靠 Meta 合約現金流",
    "noteEn": "DDTL 4.0: first IG GPU-backed — but the rating leans on the Meta contract"
  },
  {
    "source": "cw-spv8",
    "target": "coreweave",
    "type": "spv",
    "amount": 8.5,
    "date": "2026-03",
    "confidence": "confirmed",
    "citation": "8-K: secured by substantially all assets of CoreWeave Compute Acquisition Co. VIII, LLC",
    "noteZh": "SPV 資金注入基建（4.0 確實無追索）",
    "noteEn": "Funds infrastructure (4.0 genuinely non-recourse)"
  },
  {
    "source": "meta",
    "target": "cw-spv8",
    "type": "purchase",
    "amount": 19,
    "date": "2026",
    "confidence": "reported",
    "citation": "8-K: 單一「leading AI enterprise」合約為抵押核心；二手分析指認 Meta、~$19B backlog",
    "noteZh": "單一客戶合約＝抵押品——投資級評級實質依賴 Meta 信用",
    "noteEn": "Single-customer contract IS the collateral — IG rating leans on Meta's credit"
  },
  {
    "source": "banks",
    "target": "cw-spv5",
    "type": "debt",
    "amount": 3.1,
    "date": "2026-05-15",
    "confidence": "confirmed",
    "citation": "CoreWeave 8-K (crwv-20260515): Ba2/BB+、SOFR+450、2031/11 到期、MS+MUFG 主辦；兩家客戶＝OpenAI + Cohere（Bloomberg 銀團報導 + PitchBook LCD, 2026-04/05；8-K 本身未具名）",
    "noteZh": "DDTL 5.0：垃圾級、可二級交易；GPU 部署給 OpenAI 與 Cohere——OpenAI 在 CoreWeave 結構中第二度成為抵押信用",
    "noteEn": "DDTL 5.0: junk, tradeable; GPUs deployed for OpenAI and Cohere — OpenAI appears as a collateral credit in CoreWeave's stack for the second time"
  },
  {
    "source": "cw-spv5",
    "target": "coreweave",
    "type": "spv",
    "amount": 3.1,
    "date": "2026-05",
    "confidence": "confirmed",
    "citation": "8-K: 5.5 年期「對齊 GPU 部署時程與使用壽命」",
    "noteZh": "把 6 年折舊假設直接寫進資本結構",
    "noteEn": "Embeds the 6-yr depreciation assumption into the capital structure"
  },
  {
    "source": "coreweave",
    "target": "cw-spv5",
    "type": "guarantee",
    "amount": 3.1,
    "date": "2026-05-15",
    "confidence": "confirmed",
    "citation": "8-K: 所有義務由 CoreWeave, Inc. 無條件擔保 + 100% 借款人股權質押",
    "noteZh": "⚠ 母公司全額擔保——「破產隔離」是假象，SPV 違約直接回傷母公司",
    "noteEn": "⚠ Full parent guarantee — 'bankruptcy-remote' is illusory; SPV default recourses straight back"
  },
  {
    "source": "nvda",
    "target": "coreweave",
    "type": "equity",
    "amount": 2,
    "date": "2025",
    "confidence": "reported",
    "citation": "Senate FSOC letter: Nvidia 持 CoreWeave ~7%（金額按市值估）",
    "noteZh": "晶片商持股自家客戶 ~7%",
    "noteEn": "Chip vendor holds ~7% of its own customer"
  },
  {
    "source": "nvda",
    "target": "coreweave",
    "type": "purchase",
    "amount": 6.3,
    "date": "2025-09",
    "confidence": "confirmed",
    "citation": "CoreWeave 8-K (2025-09-09): Nvidia 義務回購未售產能至 2032/04/13、訂單 $6.3B",
    "noteZh": "Nvidia 回購未售算力（上限 $6.3B）——供應商為客戶需求背書",
    "noteEn": "Nvidia backstops unsold capacity (capped $6.3B) — vendor guarantees customer demand"
  }
],
  circularity: [
  {
    "id": "cw-claim-stack",
    "titleZh": "CoreWeave 索賠堆疊：一條客戶現金流上的 5-7 層權利",
    "titleEn": "CoreWeave claim stack: 5-7 layers on one customer cash flow",
    "multiplier": "5-7×",
    "chain": [
      "msft",
      "coreweave",
      "cw-spv8",
      "banks",
      "pensions"
    ],
    "confidence": "confirmed",
    "descZh": "同一條客戶合約現金流同時支撐：(1) SPV 資產質押 (2) 客戶合約質押 (3) SPV 股權質押 (4) 資料中心租約質押 (5) 母公司無條件擔保（DDTL 4.0 除外，為 bad-boy 擔保）(6) 計入 $98.8B RPO 支撐公司債與股權估值 (7) 同一義務出現（或表外掛著）在雲端巨頭自己帳上。Advance rate 可達 ~102% LTC——僅債務層就可超過資產成本。",
    "descEn": "One contracted cash flow simultaneously supports: SPV asset pledge, contract pledge, SPV equity pledge, DC lease pledge, parent guarantee (all but 4.0), inclusion in $98.8B RPO backing corporate notes & equity, and the same obligation on the hyperscaler's own books. Advance rates to ~102% LTC — the debt layer alone can exceed asset cost.",
    "citation": "CRWV 10-K FY2025 / 10-Q Q1'26 / DDTL 4.0 投資人簡報 (2026-03)；堆疊計數為對已驗證條款的分析推論"
  }
],
  contagionPaths: [
  {
    "id": "coreweave-cascade",
    "titleZh": "主路徑：CoreWeave 違約（FSB/BIS/參議院共同指認；母公司擔保使隔離失效）",
    "titleEn": "Primary: CoreWeave default (flagged by FSB/BIS/Senate; parent guarantee defeats isolation)",
    "trigger": "coreweave",
    "steps": [
      {
        "from": "openai",
        "to": "coreweave",
        "mechanismZh": "OpenAI 營收($13B) 撐不起承諾($1.4T) → 算力合約縮減/違約",
        "mechanismEn": "OpenAI revenue ($13B) can't carry commitments ($1.4T) → contract cuts/defaults"
      },
      {
        "from": "coreweave",
        "to": "cw-spv5",
        "mechanismZh": "SPV 抵押現金流中斷；GPU 租金市價已兩年跌 60-75%",
        "mechanismEn": "SPV collateral cash flows break; GPU rentals already down 60-75% in 2 yrs"
      },
      {
        "from": "cw-spv5",
        "to": "coreweave",
        "mechanismZh": "⚠ 母公司全額擔保 → 違約直接回傷 CoreWeave Inc. 全體債權人",
        "mechanismEn": "⚠ Parent guarantee → default recourses to ALL CoreWeave Inc. creditors"
      },
      {
        "from": "coreweave",
        "to": "blackstone",
        "mechanismZh": "私募信貸錨定投資人減記；可二級交易的 GPU 債價格崩跌放大訊號",
        "mechanismEn": "Private credit anchors write down; tradeable GPU debt crashes, amplifying the signal"
      },
      {
        "from": "blackstone",
        "to": "insurers",
        "mechanismZh": "保險組合（~10% 私募信貸）受損",
        "mechanismEn": "Insurer portfolios (~10% private credit) hit"
      },
      {
        "from": "blackstone",
        "to": "pensions",
        "mechanismZh": "退休基金 LP（~31% 私募信貸資產）淨值下修",
        "mechanismEn": "Pension LPs (~31% of assets) marked down"
      },
      {
        "from": "blackstone",
        "to": "banks",
        "mechanismZh": "銀行 ~$220B 授信被抽取/減值；CMBS 市場（DC 佔 SASB 13%）重定價",
        "mechanismEn": "~$220B bank lines drawn/impaired; DC CMBS (13% of SASB) reprices"
      }
    ],
    "severity": "high"
  }
],
};

if (typeof module !== "undefined") module.exports = { DATA_COREWEAVE };
