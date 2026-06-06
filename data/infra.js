// AI 資金流地圖 — 基建：Crusoe/Abilene/QTS/Talen
// 流向歸檔規則：監測優先序 cohere > anthropic > openai > softbank > coreweave > chips > hyperscalers > infra > finance
// （本檔含「優先序輪到本群」的所有流向；跨群流向只存一份）

const DATA_INFRA = {
  entities: [
  {
    "id": "crusoe",
    "name": "Crusoe",
    "category": "neocloud",
    "health": {
      "score": 45,
      "notesZh": "Stargate Abilene 建設方/JV 共同發起人；2026-03 約 600MW 擴建計畫取消、Microsoft 接收相鄰產能——需求軟化首個實體訊號",
      "notesEn": "Abilene builder/JV co-sponsor; ~600MW expansion scrapped Mar 2026, Microsoft took adjacent capacity — first physical demand-softening signal"
    }
  },
  {
    "id": "abilene",
    "name": "Stargate Abilene JV",
    "category": "spv",
    "health": {
      "score": 50,
      "notesZh": "旗艦 1.2GW 園區：Crusoe/Blue Owl 實物資產/Primary Digital $15B JV（股權比例未公開）；JPMorgan ~$9.6B 貸款（含 $7.1B 建設段）；Oracle 營運、OpenAI 使用",
      "notesEn": "Flagship 1.2GW campus: $15B Crusoe/Blue Owl Real Assets/Primary Digital JV (splits undisclosed); ~$9.6B JPMorgan loans (incl. $7.1B construction); Oracle operates for OpenAI"
    }
  },
  {
    "id": "qts",
    "name": "QTS (Blackstone)",
    "category": "reit",
    "health": {
      "score": 55,
      "notesZh": "Blackstone 2021 年 ~$10B 收購後擴張 8 倍、3GW+；重度證券化：$3.46B CMBS(2025-11)+$1.5B(2025-07)；資料中心 ABS/CMBS H1'25 $13.4B（年增一倍）、佔 SASB 市場 13%",
      "notesEn": "8x expansion since Blackstone's ~$10B 2021 take-private, 3GW+; heavily securitized: $3.46B CMBS (Nov-25) + $1.5B (Jul-25); DC ABS/CMBS $13.4B H1'25 (2x YoY), 13% of SASB market"
    }
  },
  {
    "id": "talen",
    "name": "Talen Energy",
    "category": "energy",
    "health": {
      "score": 62,
      "notesZh": "Susquehanna 核電 1,920MW PPA 供 AWS 至 2042（~$18B 估）；長約「顯著降低 Talen 市場風險」＝需求風險轉移給 Amazon；2026-04 發 $4B 新債、贖回 $1.2B 高息債",
      "notesEn": "1,920MW nuclear PPA to AWS thru 2042; demand risk transferred to Amazon; Apr-26: $4B new notes, redeemed $1.2B high-cost debt"
    },
    "leverage": {
      "totalDebt": 6.78,
      "cash": 1.03,
      "netDebt": 5.75,
      "ebitda": 1.9,
      "debtToEbitda": 3,
      "ocf": null,
      "capex": null,
      "fcf": null,
      "offBS": null,
      "effectiveLeverage": 3.6,
      "period": "10-Q Q1 2026 (2026-03-31)；EBITDA 為 2026 指引中值 $1.75-2.05B",
      "citation": "Talen Q1 2026 10-Q/8-K（tln-20260331）",
      "keyRisksZh": [
        "淨槓桿 ~3.0×（目標 <3.5×）——AI 鏈中相對健康",
        "2026-04 再發 $4B 債（Cornerstone 收購）",
        "現金流命脈已綁定單一買家（AWS）至 2042"
      ]
    }
  }
],
  flows: [
  {
    "source": "blueowl",
    "target": "abilene",
    "type": "equity",
    "amount": 15,
    "date": "2025-05-21",
    "confidence": "confirmed",
    "citation": "Crusoe 一手新聞稿: Crusoe + Blue Owl Real Assets + Primary Digital $15B JV 二期（1.2GW、八棟、2026 年中通電；股權比例未揭露）",
    "noteZh": "$15B JV 計畫總額（三方聯合, 比例未公開）",
    "noteEn": "$15B JV program (three sponsors, splits undisclosed)"
  },
  {
    "source": "banks",
    "target": "abilene",
    "type": "debt",
    "amount": 9.6,
    "date": "2025",
    "confidence": "reported",
    "citation": "CoStar via 深研: JPMorgan ~$9.6B 貸款（含 $7.1B 建設段）",
    "noteZh": "JPMorgan 建設融資",
    "noteEn": "JPMorgan construction financing"
  },
  {
    "source": "blackstone",
    "target": "qts",
    "type": "equity",
    "amount": 10,
    "date": "2021-08",
    "confidence": "reported",
    "citation": "Bisnow: Blackstone ~$10B 私有化 QTS，其後擴張 8 倍",
    "noteZh": "PE 持有 + 重度證券化的資料中心平台",
    "noteEn": "PE-owned, heavily securitized DC platform"
  },
  {
    "source": "banks",
    "target": "qts",
    "type": "debt",
    "amount": 5,
    "date": "2025-07/11",
    "confidence": "reported",
    "citation": "Bisnow: $3.46B CMBS (2025-11, 10 座 DC) + $1.5B CMBS (2025-07)；DC ABS/CMBS H1'25 $13.4B、年增一倍、佔 SASB 13%",
    "noteZh": "資料中心債務進入 CMBS 市場——傳染面再擴一層",
    "noteEn": "DC debt enters CMBS — one more contagion surface"
  }
],
  circularity: [],
  contagionPaths: [],
};

if (typeof module !== "undefined") module.exports = { DATA_INFRA };
