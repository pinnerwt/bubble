// AI 資金流地圖 — 雲端巨頭：MSFT/GOOGL/AMZN/META/ORCL + Beignet
// 流向歸檔規則：監測優先序 cohere > anthropic > openai > softbank > coreweave > chips > hyperscalers > infra > finance
// （本檔含「優先序輪到本群」的所有流向；跨群流向只存一份）

const DATA_HYPERSCALERS = {
  entities: [
  {
    "id": "msft",
    "name": "Microsoft",
    "category": "hyperscaler",
    "health": {
      "score": 85,
      "notesZh": "持 OpenAI ~27%（$13B 承諾/$11.8B 已注資；10-Q 確認）；$196.6B 未開始租約＝全研究最大表外數字；9 個月 PP&E 從 $205B 增至 $283B；現金 9 個月減 $16B；OpenAI 重組產生一次性 $5.9B 稀釋利益（非現金）",
      "notesEn": "~27% OpenAI ($13B committed/$11.8B funded per 10-Q); $196.6B uncommenced leases = largest off-B/S figure in this study; PP&E $205B→$283B in 9 months; one-time $5.9B OpenAI dilution gain (non-cash)"
    },
    "leverage": {
      "totalDebt": 125.4,
      "cash": 78.3,
      "netDebt": 47.1,
      "ebitda": null,
      "debtToEbitda": null,
      "ocf": 170,
      "capex": 132.8,
      "fcf": 37.2,
      "offBS": 196.6,
      "effectiveLeverage": 1.9,
      "period": "10-Q FY26 Q3 (2026-03-31)；OCF/capex 為 9 個月年化",
      "citation": "SEC 10-Q msft-20260331 (acc. 0001193125-26-191507)",
      "keyRisksZh": [
        "表內債 $40.3B + 融資租賃 $62.9B + 營業租賃 $22.2B",
        "$196.6B 未開始租約（FY26-31 起租、最長 21 年）",
        "現金+短投 $94.6B→$78.3B（9 個月）",
        "OpenAI 權益法帳面 $6.0B→$11.1B；$5.9B 利益為一次性稀釋利得"
      ]
    }
  },
  {
    "id": "googl",
    "name": "Google",
    "category": "hyperscaler",
    "health": {
      "score": 82,
      "notesZh": "Q1'26 長債 $46.5B→$77.5B；正在變成 neocloud 層的擔保人：$9.0B 財務擔保 + $28.4B 資料中心信用衍生品名目（一季前 $16.9B）+ $33.3B 後續 backstop 框架（4 月已承諾 $15.3B 給某資料中心商）；VIE 出資承諾 $1.1B→$40.7B（$10B+$30B 里程碑、會計上列為股權衍生品，未具名但與 Anthropic 一致）",
      "notesEn": "LT debt $46.5B→$77.5B in Q1'26; becoming the neocloud layer's guarantor: $9.0B guarantees + $28.4B DC credit derivatives (vs $16.9B a quarter ago) + $33.3B backstop framework ($15.3B committed Apr); VIE commitments $1.1B→$40.7B ($10B+$30B milestone equity derivative, unnamed but Anthropic-consistent)"
    },
    "leverage": {
      "totalDebt": 95.9,
      "cash": 126.8,
      "netDebt": -30.9,
      "ebitda": null,
      "debtToEbitda": null,
      "ocf": 183.2,
      "capex": 142.7,
      "fcf": 40.5,
      "offBS": 478.7,
      "effectiveLeverage": 3.1,
      "period": "10-Q Q1 2026 (2026-03-31)；OCF/capex 為 Q1 年化",
      "citation": "SEC 10-Q goog-20260331 (acc. 0001652044-26-000048)",
      "keyRisksZh": [
        "表外合計 $478.7B：未開始租約 $75.6B + 採購承諾 $332.4B + 擔保 $9.0B + 信用衍生品 $28.4B + backstop 框架 $33.3B",
        "信用衍生品一季 $16.9B→$28.4B（最長 15 年）——對手未具名",
        "非上市證券 $68.7B→$106.9B（一季）"
      ]
    }
  },
  {
    "id": "amzn",
    "name": "Amazon",
    "category": "hyperscaler",
    "health": {
      "score": 76,
      "notesZh": "⚠ 槓桿上升最快的巨頭：債務面值一季 $68.8B→$122.6B（3 月單月發 $37B+€14.5B）；TTM 自由現金流 $25.9B→$1.2B 崩跌；Q1 其他收益 $15.6B 主要來自 Anthropic Level 3 紙上增值（≈營業利益 65%）；折舊 6→5 年（誠實面）；Talen PPA 需求風險自擔",
      "notesEn": "⚠ Fastest-levering hyperscaler: debt face $68.8B→$122.6B in one quarter; TTM FCF collapsed $25.9B→$1.2B; Q1 other income $15.6B mostly Level 3 Anthropic markup (≈65% of operating income); depreciation honestly cut 6→5 yrs; bears Talen PPA demand risk"
    },
    "leverage": {
      "totalDebt": 227.5,
      "cash": 143.1,
      "netDebt": 84.4,
      "ebitda": null,
      "debtToEbitda": null,
      "ocf": 148.5,
      "capex": 147.3,
      "fcf": 1.2,
      "offBS": 210.1,
      "effectiveLeverage": 2.9,
      "period": "10-Q Q1 2026 (2026-03-31)；OCF/capex/FCF 為 TTM",
      "citation": "SEC 10-Q amzn-20260331 (acc. 0001018724-26-000014)",
      "keyRisksZh": [
        "債務面值 $122.6B + 租賃 $104.9B；利息 Q1 $541M→$800M",
        "TTM capex $147.3B ≈ TTM OCF $148.5B——自由現金流歸零",
        "表外：未開始租約 $106.3B（含物流設施）+ 無條件採購義務 $103.8B；合約承諾總額 $569.3B",
        "Anthropic/OpenAI 持倉 $16.2B→$48.1B（一季），Level 3 增值入損益"
      ]
    }
  },
  {
    "id": "meta",
    "name": "Meta",
    "category": "hyperscaler",
    "health": {
      "score": 74,
      "notesZh": "10-Q 確認：Hyperion JV 為不併表權益法 VIE（持 20%、非主要受益人）；$28B 殘值擔保門檻「未認列任何負債」；揭露最大損失曝險 $45.99B；表外租約 $182.9B + 採購承諾 $237.7B，4 月再加 ~$24B；Burry 指控 2028 盈餘高估 20.8%",
      "notesEn": "10-Q confirms: Hyperion is an UNCONSOLIDATED equity-method VIE (20%, not primary beneficiary); $28B RVG threshold with NO liability recorded; disclosed max exposure $45.99B; $182.9B off-B/S leases + $237.7B purchase commitments, +$24B in April"
    },
    "leverage": {
      "totalDebt": 86.7,
      "cash": 81.2,
      "netDebt": 5.5,
      "ebitda": null,
      "debtToEbitda": null,
      "ocf": 128.9,
      "capex": 79.4,
      "fcf": 49.5,
      "offBS": 448.6,
      "effectiveLeverage": 4.2,
      "period": "10-Q Q1 2026 (2026-03-31)；OCF/capex 為 Q1 年化",
      "citation": "SEC 10-Q meta-20260331 (acc. 0001628280-26-028526)",
      "keyRisksZh": [
        "長債 $58.7B + 營業租賃 $28.0B",
        "表外 $448.6B：未開始租約 $182.9B（至 2036 起租、最長 30 年）+ 採購承諾 $237.7B + RVG $28B（零負債認列）",
        "Hyperion 最大損失曝險 $45.99B（自揭）",
        "4 月單月再加 ~$24B 多年期基建合約"
      ]
    }
  },
  {
    "id": "orcl",
    "name": "Oracle",
    "category": "hyperscaler",
    "health": {
      "score": 38,
      "updateZh": "2026-06-06 更新：CDS 創歷史紀錄 ~198bps（4 月, 超越 2008 峰值）、股價 YTD -25%、計畫 2026 再募 $45-50B（債+股）——OpenAI 砍承諾的同時 Oracle 還在加碼；重談潮直指其 $300B 合約；Q4 FY26 財報（6/10）的 RPO 轉化＝第一個現形點",
      "notesZh": "Q3 FY26 (2026-02-28)：RPO $553B（年增 325%）；借款 ~$134.6B vs 現金 $38.5B（3.5 倍）；TTM 自由現金流 -$24.7B（capex $48.3B ≈ OCF 的 2 倍）；CDS 151.3bps 創 2009 以來新高；S&P/Moody's 展望負向。OpenAI 風險進入公開債市的最大管道",
      "notesEn": "Q3 FY26: RPO $553B (+325% YoY); borrowings ~$134.6B vs cash $38.5B; TTM FCF -$24.7B (capex ~2x OCF); CDS highest since 2009; negative outlooks. Largest channel from OpenAI risk into public bond markets"
    },
    "leverage": {
      "totalDebt": 134.6,
      "cash": 38.5,
      "netDebt": 96.1,
      "ebitda": null,
      "debtToEbitda": null,
      "ocf": 23.5,
      "capex": 48.25,
      "fcf": -24.7,
      "offBS": null,
      "effectiveLeverage": 5.7,
      "period": "Q3 FY2026 (2026-02-28) 8-K 財報；OCF/capex/FCF 為 TTM；FY26 10-K 約 7 月才發布",
      "citation": "Oracle Q3 FY26 earnings 8-K Ex.99.1 (2026-03-10)",
      "keyRisksZh": [
        "TTM FCF -$24.7B——巨頭中唯一深度負值",
        "RPO $553B 年增 325%，集中於 OpenAI——backlog 是承諾不是現金",
        "借款 $134.6B、現金 $38.5B",
        "FY26 全年 capex 指引 ~$50B；表外未開始租約本輪未取得"
      ]
    }
  },
  {
    "id": "beignet",
    "name": "Beignet LLC (Hyperion JV)",
    "category": "spv",
    "health": {
      "score": 60,
      "notesZh": "Blue Owl 80%/Meta 20%；~$27.3B A+ 債（PIMCO 錨定 ~$18B）+~$2.5B 股權；Meta 售後回租+$28B 殘值擔保（未列或有負債）",
      "notesEn": "Blue Owl 80%/Meta 20%; ~$27.3B A+ notes (PIMCO ~$18B) + ~$2.5B equity; Meta leaseback + $28B RVG (unreported contingent liability)"
    }
  }
],
  flows: [
  {
    "source": "blueowl",
    "target": "beignet",
    "type": "equity",
    "amount": 2,
    "date": "2025-10",
    "confidence": "confirmed",
    "citation": "Meta 一手新聞稿 (2025-10-21): Beignet Investor LLC、Blue Owl 80%/Meta 20%、股權合計 ~$2.5B",
    "noteZh": "Blue Owl 持 JV 80%",
    "noteEn": "Blue Owl holds 80%"
  },
  {
    "source": "meta",
    "target": "beignet",
    "type": "equity",
    "amount": 0.5,
    "date": "2025-10",
    "confidence": "confirmed",
    "citation": "Meta 新聞稿: 20% 股權",
    "noteZh": "Meta 出 20% 股權、保留營運控制與殘值擔保義務",
    "noteEn": "Meta: 20% equity, keeps operational control and the RVG obligation"
  },
  {
    "source": "pimco",
    "target": "beignet",
    "type": "debt",
    "amount": 27.3,
    "date": "2025-10",
    "confidence": "confirmed",
    "citation": "Senate letter + Bloomberg: ~$27.3B A+ 債、PIMCO 錨定 ~$18B、Morgan Stanley 主辦 (144A)",
    "noteZh": "債券投資人實質持有 Meta 的資料中心",
    "noteEn": "Bondholders effectively own Meta's data center"
  },
  {
    "source": "beignet",
    "target": "meta",
    "type": "lease",
    "amount": 27,
    "date": "2025-10",
    "confidence": "confirmed",
    "citation": "Senate letter: Meta 售後回租 + 殘值擔保",
    "noteZh": "售後回租——表外但風險未消失（BIS:『槓桿不會因為看不見而消失』）",
    "noteEn": "Leaseback — off-B/S but risk persists (BIS: 'leverage does not disappear by being out of sight')"
  },
  {
    "source": "meta",
    "target": "beignet",
    "type": "guarantee",
    "amount": 28,
    "date": "2025-10",
    "confidence": "confirmed",
    "citation": "Meta 10-Q Q1'26 權益法投資註記原文：RVG 門檻合計 ~$28B（隨時間遞減）、「付款不被認為可能、迄今未認列負債」；不併表 VIE、最大損失曝險 $45.99B",
    "noteZh": "$28B 殘值擔保、零負債認列（10-Q 原文確認）；Meta 自揭最大曝險 $45.99B",
    "noteEn": "$28B RVG, zero liability recorded (10-Q verbatim); Meta's own disclosed max exposure: $45.99B"
  },
  {
    "source": "banks",
    "target": "meta",
    "type": "debt",
    "amount": 30,
    "date": "2025-10-30",
    "confidence": "confirmed",
    "citation": "Bloomberg: JV 公布數日後發 $30B 公司債（2025 美國投資級最大、$125B 認購簿）",
    "noteZh": "出表的同時又上槓桿",
    "noteEn": "Levering up on-B/S while moving assets off-B/S"
  },
  {
    "source": "amzn",
    "target": "talen",
    "type": "purchase",
    "amount": 18,
    "date": "2025-06-11",
    "confidence": "confirmed",
    "citation": "Talen 8-K (SEC): Susquehanna 1,920MW 供 AWS 至 2042（~$18B 為二手估計）；長約「顯著降低 Talen 市場風險」",
    "noteZh": "核電 PPA——擱淺資產/需求風險由買方 Amazon 承擔",
    "noteEn": "Nuclear PPA — stranded/demand risk borne by offtaker Amazon"
  }
],
  circularity: [],
  contagionPaths: [
  {
    "id": "oracle-channel",
    "titleZh": "公開市場通道：Oracle（最大投資級傳導體）",
    "titleEn": "Public-market channel: Oracle (largest IG transmission)",
    "trigger": "orcl",
    "steps": [
      {
        "from": "openai",
        "to": "orcl",
        "mechanismZh": "$300B 合約若不實現，Oracle 債務（現金 4 倍）擱淺；CDS 已創 2009 來新高",
        "mechanismEn": "If $300B doesn't materialize, Oracle's debt (4x cash) strands; CDS already at post-2009 high"
      },
      {
        "from": "orcl",
        "to": "banks",
        "mechanismZh": "投資級債減值 → 公開債市、貨幣基金、401(k) 全面波及",
        "mechanismEn": "IG bond impairment → public bond markets, MMFs, 401(k)s"
      }
    ],
    "severity": "medium"
  }
],
};

if (typeof module !== "undefined") module.exports = { DATA_HYPERSCALERS };
