// AI 資金流地圖 — Cohere（/cohere-risk-check 主檔）
// 流向歸檔規則：監測優先序 cohere > anthropic > openai > softbank > coreweave > chips > hyperscalers > infra > finance
// （本檔含「優先序輪到本群」的所有流向；跨群流向只存一份）

const DATA_COHERE = {
  entities: [
  {
    "id": "cohere",
    "name": "Cohere",
    "category": "ai-lab",
    "health": {
      "score": 42,
      "updateZh": "2026-06 更新：與 Aleph Alpha 宣布合併（~$20B、Cohere 股東 ~90%）+ Schwarz Group $600M Series E + 德國政府錨定客戶——募資時鐘重置、信用改善（合併未 close 前維持謹慎）",
      "notesZh": "DDTL 5.0 兩家抵押信用之一。財務體質（2026-02 投資人備忘錄, CNBC/BetaKit）：ARR $240M（2024 底 $62M → +287%，季增 >50%）、毛利 ~70%、85% 來自企業私有部署（Oracle/Fujitsu/RBC/LG）；估值 $7B、歷史總募資僅 ~$1.54B；獲利目標 2029（=持續燒錢）；投資人含 Nvidia、AMD Ventures、PSP（加拿大退休金）。⚠ 規模與 OpenAI 差兩個數量級，卻共同支撐 $3.1B 公開交易 GPU 債",
      "notesEn": "One of DDTL 5.0's two collateral credits. Financials (Feb-26 investor memo): ARR $240M (+287% YoY from $62M), ~70% GM, 85% enterprise private deployments; $7B valuation, only ~$1.54B ever raised; profitability targeted 2029 (= burning until then); investors include Nvidia, AMD Ventures, PSP (Canadian pension). ⚠ Two orders of magnitude smaller than OpenAI, yet co-supporting $3.1B of publicly traded GPU debt"
    },
    "leverage": {
      "totalDebt": null,
      "cash": null,
      "netDebt": null,
      "ebitda": null,
      "debtToEbitda": null,
      "ocf": 0.24,
      "capex": null,
      "fcf": null,
      "offBS": null,
      "effectiveLeverage": null,
      "period": "投資人備忘錄 (2026-02, CNBC/BetaKit 轉述)；私人公司無申報；ocf 欄位放 ARR $240M 作參考",
      "citation": "CNBC (2026-02-13) + BetaKit；募資: cohere.com (2025-08 $500M @ $6.8B) + BetaKit (2025-09 +$100M @ $7B)",
      "keyRisksZh": [
        "CoreWeave 合約金額未揭露（信貸協議中以[*]刪節、schedule 未附）",
        "⚠ 交叉違約：信貸協議下 Cohere 的 MSA 若被全面終止＝整個 $3.1B 設施的違約事件——它不是池子裡的一小塊，是同等引爆器",
        "歷史總募資 $1.54B、獲利要等 2029：付租金靠募資+成長",
        "Nvidia/AMD 既是投資人又是其算力的最終供應商——循環再現"
      ]
    }
  }
],
  flows: [
  {
    "source": "cohere",
    "target": "coreweave",
    "type": "purchase",
    "amount": 0,
    "date": "2026",
    "confidence": "reported",
    "citation": "Bloomberg 銀團報導 + PitchBook LCD (2026-04/05): DDTL 5.0 募資購置的 GPU 部署給 OpenAI 與 Cohere（合約金額未揭露）",
    "noteZh": "Cohere 合約＝DDTL 5.0 抵押現金流的一半來源（金額未揭露）",
    "noteEn": "Cohere's contract = half the DDTL 5.0 collateral cash flow (amount undisclosed)"
  }
],
  circularity: [],
  contagionPaths: [
  {
    "id": "cohere-price-discovery",
    "titleZh": "資訊路徑：Cohere＝GPU 債的公開溫度計（金額無關、價格有關）",
    "titleEn": "Information path: Cohere = the public thermometer of GPU debt (size-irrelevant, price-relevant)",
    "trigger": "cohere",
    "steps": [
      {
        "from": "cohere",
        "to": "cw-spv5",
        "mechanismZh": "Cohere 成長放緩/違約 → 唯一可公開交易的 GPU 債（DDTL 5.0）價格下跌——金額 ~$1.5B 不重要，公開報價才重要",
        "mechanismEn": "Cohere stumbles → the only publicly traded GPU debt reprices — the ~$1.5B is irrelevant, the public mark is everything"
      },
      {
        "from": "cw-spv5",
        "to": "blackstone",
        "mechanismZh": "全市場第一個 public comp：$200B+ 不可交易 GPU 私募信貸被迫參照市價（FSB 的 stale-marks 問題終結）",
        "mechanismEn": "First public comp: $200B+ of unmarked GPU private credit gets a reference price (ends FSB's stale-marks regime)"
      },
      {
        "from": "blackstone",
        "to": "coreweave",
        "mechanismZh": "抵押品品質假設連鎖重審（RPO $98.8B → Oracle $553B → 102% LTC/折舊/殘值）→ CoreWeave 再融資窗口關閉——2026 到期 $6.1B vs 現金 $2.2B",
        "mechanismEn": "Collateral-quality assumptions cascade (RPO → LTC → residuals) → CoreWeave's refi window shuts: $6.1B due 2026 vs $2.2B cash"
      },
      {
        "from": "coreweave",
        "to": "pensions",
        "mechanismZh": "2007 ABX 先例：最小的違約 tranche + 公開指數 = 全體系被迫按市價計提",
        "mechanismEn": "The 2007 ABX precedent: tiny defaulted tranches + a public index = system-wide forced marks"
      }
    ],
    "severity": "medium"
  }
],
};

if (typeof module !== "undefined") module.exports = { DATA_COHERE };
