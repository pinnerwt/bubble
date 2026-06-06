// AI 資金流地圖 — 設定層：meta / categories / flowTypes（很少變動）
// 由 data.js 拆分 (2026-06-06)。更新後跑 node data.js 驗證。

const DATA_META = {
  "title": "美國 AI 資金流動與系統性風險地圖 / US AI Capital Flow & Systemic Risk Map",
  "asOf": "2026-06-05",
  "status": "v3 FINAL · 2 輪深研 + 定向補抓",
  "disclaimer": "研究用途。confirmed=SEC/一手文件、reported=多源媒體、estimate=估計或未經本研究驗證。健康度評分為本研究綜合判斷（信評、CDS、槓桿、對手集中度、折舊缺口、資金缺口），非信評機構評級。"
};

const DATA_CATEGORIES = {
  "ai-lab": {
    "zh": "AI 實驗室",
    "en": "AI Lab",
    "color": "#e8554e"
  },
  "hyperscaler": {
    "zh": "雲端巨頭",
    "en": "Hyperscaler",
    "color": "#4e79e8"
  },
  "chip": {
    "zh": "晶片/硬體",
    "en": "Chips / Hardware",
    "color": "#2eb086"
  },
  "neocloud": {
    "zh": "新雲/GPU租賃",
    "en": "Neocloud / GPU Lease",
    "color": "#e89a3c"
  },
  "reit": {
    "zh": "資料中心 REIT",
    "en": "Data Center REIT",
    "color": "#9a6fe8"
  },
  "private-credit": {
    "zh": "私募信貸/PE",
    "en": "Private Credit / PE",
    "color": "#d44fb0"
  },
  "sovereign": {
    "zh": "主權/超大基金",
    "en": "Sovereign / Mega Fund",
    "color": "#5fb4d4"
  },
  "insurer": {
    "zh": "保險",
    "en": "Insurance",
    "color": "#c2b03c"
  },
  "pension": {
    "zh": "退休基金",
    "en": "Pension Fund",
    "color": "#8a8f3c"
  },
  "bank": {
    "zh": "銀行",
    "en": "Bank",
    "color": "#6b7280"
  },
  "spv": {
    "zh": "SPV/合資/分拆",
    "en": "SPV / JV / Spin-off",
    "color": "#f0599a"
  },
  "energy": {
    "zh": "電力/基建",
    "en": "Power / Infra",
    "color": "#49c0b6"
  }
};

const DATA_FLOWTYPES = {
  "equity": {
    "zh": "股權投資",
    "en": "Equity",
    "dash": null
  },
  "debt": {
    "zh": "債務融資",
    "en": "Debt",
    "dash": "6,3"
  },
  "lease": {
    "zh": "租賃契約",
    "en": "Lease",
    "dash": "2,3"
  },
  "purchase": {
    "zh": "採購承諾",
    "en": "Purchase Commitment",
    "dash": "10,4"
  },
  "revenue": {
    "zh": "營收回流",
    "en": "Revenue",
    "dash": null
  },
  "spv": {
    "zh": "SPV/表外",
    "en": "SPV / Off-B/S",
    "dash": "1,4"
  },
  "guarantee": {
    "zh": "擔保/追索",
    "en": "Guarantee / Recourse",
    "dash": "8,2,2,2"
  }
};

if (typeof module !== "undefined") module.exports = { DATA_META, DATA_CATEGORIES, DATA_FLOWTYPES };
