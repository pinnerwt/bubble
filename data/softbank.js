// AI 資金流地圖 — SoftBank（/softbank-risk-check 主檔）
// 流向歸檔規則：監測優先序 cohere > anthropic > openai > softbank > coreweave > chips > hyperscalers > infra > finance
// （本檔含「優先序輪到本群」的所有流向；跨群流向只存一份）

const DATA_SOFTBANK = {
  entities: [
  {
    "id": "softbank",
    "name": "SoftBank",
    "category": "sovereign",
    "health": {
      "score": 38,
      "notesZh": "對 OpenAI 承諾 $64.6B（~13%）；總債務 ~$135B；為籌資賣 Nvidia($5.83B)+T-Mobile($12.73B)、$40B 過橋貸款、再疊 $10B 保證金貸款（抵押品=OpenAI 股權, SOFR+425）；S&P BB+ 展望負向、CDS ~360bps、兩年缺口 $32B。OpenAI 估值的槓桿化單邊押注",
      "notesEn": "$64.6B committed to OpenAI (~13%); ~$135B total debt; sold Nvidia ($5.83B) + T-Mobile ($12.73B), $40B bridge + margin loan collateralized BY the OpenAI stake; S&P BB+ negative, CDS ~360bps. A leveraged one-way bet on OpenAI's valuation"
    },
    "leverage": {
      "totalDebt": 135,
      "cash": null,
      "netDebt": 55,
      "ebitda": null,
      "debtToEbitda": null,
      "ocf": null,
      "capex": null,
      "fcf": null,
      "offBS": null,
      "effectiveLeverage": null,
      "period": "FY2025 (2026-03-31) 官方 SOTP/財報；非 SEC（東京上市）",
      "citation": "group.softbank SOTP: NAV ¥40.06T、淨債 ¥8.21T、LTV 17.0%（公司自報口徑）；總債 ~$135B 為合併口徑 (TNW)",
      "keyRisksZh": [
        "公司自報 LTV 17.0% vs 合併總債 ~$135B——口徑差異巨大（LTV 排除部分資產擔保融資）",
        "OpenAI 持股在官方 SOTP 中不單列（藏於 SVF2 ¥17.19T / Others ¥4.61T）——NAV 最大單一不透明項",
        "2026-05-08：保證金貸款目標從 $10B 砍 40% 至 $6B（Bloomberg）——市場胃納不足的直接證據"
      ]
    }
  }
],
  flows: [
  {
    "source": "banks",
    "target": "softbank",
    "type": "debt",
    "amount": 10,
    "date": "2026-04",
    "confidence": "reported",
    "citation": "TNW (2026-04-23): $10B 保證金貸款、SOFR+425(~7.88%)、2+1 年、抵押品=OpenAI 持股；疊在 $40B 過橋之上；公布後 CDS +10bps 至 ~360",
    "noteZh": "保證金貸款：抵押品是 OpenAI 股權本身——估值即抵押品價值",
    "noteEn": "Margin loan collateralized by the OpenAI stake itself — the valuation IS the collateral"
  }
],
  circularity: [
  {
    "id": "softbank-margin-loop",
    "titleZh": "SoftBank 自舉迴圈：用 OpenAI 股權借錢、再投 OpenAI",
    "titleEn": "SoftBank bootstrap: borrow against the OpenAI stake to fund OpenAI",
    "multiplier": "估值=抵押品",
    "chain": [
      "openai",
      "softbank",
      "banks",
      "softbank",
      "openai"
    ],
    "confidence": "reported",
    "descZh": "SoftBank 對 OpenAI 的 $64.6B 承諾，部分資金來自以 OpenAI 持股為抵押的 $10B 保證金貸款（SOFR+425）+ $40B 過橋。OpenAI 的一級市場估值（無日常定價）同時是 SoftBank 的資產、抵押品、與繼續出資的依據——估值漲，借款能力漲，再投入，估值再漲。反向亦然。",
    "descEn": "Part of SoftBank's $64.6B OpenAI commitment is funded by a $10B margin loan collateralized by the OpenAI stake itself plus a $40B bridge. The (unmarked) private valuation is simultaneously SoftBank's asset, its collateral, and its capacity to keep investing — reflexive in both directions.",
    "citation": "TNW (2026-04-23)；SoftBank 財報未直接驗證（東京上市、無 SEC 文件）"
  }
],
  contagionPaths: [
  {
    "id": "softbank-openai-channel",
    "titleZh": "槓桿股權通道：SoftBank（OpenAI 估值的保證金貸款化）",
    "titleEn": "Levered-equity channel: SoftBank (OpenAI's valuation, margin-loaned)",
    "trigger": "softbank",
    "steps": [
      {
        "from": "openai",
        "to": "softbank",
        "mechanismZh": "OpenAI 估值($852B)下修 → $110B 持股縮水，而 $10B 保證金貸款的抵押品就是這筆持股",
        "mechanismEn": "OpenAI valuation cut → $110B stake shrinks; the $10B margin loan is collateralized by that very stake"
      },
      {
        "from": "softbank",
        "to": "banks",
        "mechanismZh": "追繳保證金 + $40B 過橋再融資困難；CDS 已 ~360bps、BB+ 負向",
        "mechanismEn": "Margin calls + $40B bridge refi stress; CDS ~360bps, BB+ negative"
      },
      {
        "from": "softbank",
        "to": "stargate",
        "mechanismZh": "Stargate 出資斷流 → 資料中心建設中斷（Abilene 已現取消訊號）",
        "mechanismEn": "Stargate funding stalls → DC buildout halts (Abilene cancellation signal already visible)"
      }
    ],
    "severity": "high"
  }
],
};

if (typeof module !== "undefined") module.exports = { DATA_SOFTBANK };
