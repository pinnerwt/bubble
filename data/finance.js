// AI 資金流地圖 — 金融層：私募信貸/主權/銀行/保險/退休金
// 流向歸檔規則：監測優先序 cohere > anthropic > openai > softbank > coreweave > chips > hyperscalers > infra > finance
// （本檔含「優先序輪到本群」的所有流向；跨群流向只存一份）

const DATA_FINANCE = {
  entities: [
  {
    "id": "apollo",
    "name": "Apollo / Athene",
    "category": "private-credit",
    "health": {
      "score": 58,
      "notesZh": "保險浮存金（Athene）支撐 AI 信貸；共同結構 Anthropic TPU SPV；Athene 對 AI 信貸的確切組合占比未揭露",
      "notesEn": "Athene float backs AI credit; co-structuring Anthropic TPU SPV; Athene's exact AI-credit portfolio share undisclosed"
    }
  },
  {
    "id": "blackstone",
    "name": "Blackstone (BXCI)",
    "category": "private-credit",
    "health": {
      "score": 62,
      "notesZh": "錨定 CW DDTL 4.0（攜保險資金）；共構 Anthropic TPU SPV；旗下 QTS 重度證券化",
      "notesEn": "Anchored CW DDTL 4.0 (with insurance capital); co-structuring Anthropic TPU SPV; owns heavily-securitized QTS"
    }
  },
  {
    "id": "blueowl",
    "name": "Blue Owl",
    "category": "private-credit",
    "health": {
      "score": 55,
      "notesZh": "Hyperion JV 80% + Abilene JV 發起人 + $7B 數位基建基金（NY/PA 退休金為 LP）——單一管理人橫跨三大結構",
      "notesEn": "80% of Hyperion + Abilene JV sponsor + $7B digital infra fund (NY/PA pensions as LPs) — one manager across three structures"
    }
  },
  {
    "id": "pimco",
    "name": "PIMCO",
    "category": "private-credit",
    "health": {
      "score": 65,
      "notesZh": "Hyperion 債券錨定買家 ~$18B（144A）——退休帳戶與保險資金的下游管道",
      "notesEn": "Hyperion notes anchor ~$18B (144A) — downstream conduit for retirement & insurance money"
    }
  },
  {
    "id": "mgx",
    "name": "MGX (Abu Dhabi)",
    "category": "sovereign",
    "health": {
      "score": 72,
      "notesZh": "Anthropic Series G 共同領投（額度未拆分）；Stargate 股東；對 OpenAI 確切支票額未公開",
      "notesEn": "Anthropic Series G co-lead (allocation undisclosed); Stargate shareholder; OpenAI check size undisclosed"
    }
  },
  {
    "id": "gic",
    "name": "GIC / Coatue 等機構",
    "category": "sovereign",
    "health": {
      "score": 75,
      "notesZh": "Anthropic $30B Series G 領投（GIC+Coatue, 含 D.E. Shaw/Dragoneer/Founders Fund/ICONIQ/MGX）",
      "notesEn": "Led Anthropic's $30B Series G (GIC+Coatue, with DESV/Dragoneer/FF/ICONIQ/MGX)"
    }
  },
  {
    "id": "banks",
    "name": "銀行體系 Banks (JPM/MS/MUFG/GS)",
    "category": "bank",
    "health": {
      "score": 70,
      "notesZh": "CW 融資結構/主辦行；Abilene $9.6B 貸款；Meta $30B 債承銷；對私募信貸基金授信 ~$220B（FSB）",
      "notesEn": "CW facility arrangers; $9.6B Abilene loans; Meta $30B underwriting; ~$220B credit lines to private credit funds (FSB)"
    }
  },
  {
    "id": "insurers",
    "name": "壽險業 Life Insurers",
    "category": "insurer",
    "health": {
      "score": 60,
      "notesZh": "投資組合 ~10% 在私募信貸（FSB）；直接參與 CW DDTL 4.0；PE 系保險（Athene/Global Atlantic）確切金額未揭露",
      "notesEn": "~10% of portfolios in private credit (FSB); directly in CW DDTL 4.0; PE-owned insurer dollar amounts undisclosed"
    }
  },
  {
    "id": "pensions",
    "name": "美國退休基金 US Pensions",
    "category": "pension",
    "health": {
      "score": 66,
      "notesZh": "持有私募信貸基金 ~31% 資產（Fed via FSB）；NY/PA 州退休金在 Blue Owl $7B 基金——傳染鏈終點＝一般人的退休金",
      "notesEn": "~31% of private credit fund assets (Fed via FSB); NY/PA state plans in Blue Owl's $7B fund — terminal node = ordinary people's retirement money"
    }
  }
],
  flows: [
  {
    "source": "pensions",
    "target": "blueowl",
    "type": "equity",
    "amount": 7,
    "date": "2025",
    "confidence": "confirmed",
    "citation": "Senate letter: NY+PA 州退休金投資 Blue Owl $7B 數位基建基金（LP 占比未揭露）",
    "noteZh": "紐約州+賓州退休金 → Blue Owl 數位基建基金",
    "noteEn": "NY+PA state pensions → Blue Owl digital infra fund"
  },
  {
    "source": "pensions",
    "target": "apollo",
    "type": "equity",
    "amount": 0,
    "date": "2026",
    "confidence": "confirmed",
    "citation": "Fed via FSB (2026-05-06): 退休基金持有私募信貸基金 ~31% 資產（比例確認、AI 部分絕對額未拆分）",
    "noteZh": "退休基金＝私募信貸最大 LP（~31%）；以比例呈現",
    "noteEn": "Pensions = private credit's largest LP base (~31%); shown as share"
  },
  {
    "source": "insurers",
    "target": "apollo",
    "type": "equity",
    "amount": 0,
    "date": "2026",
    "confidence": "confirmed",
    "citation": "FSB (2026-05): 壽險組合 ~10% 在私募信貸；保險資金直接參與 CW DDTL 4.0",
    "noteZh": "壽險 ~10% 組合在私募信貸",
    "noteEn": "~10% of life insurer portfolios in private credit"
  },
  {
    "source": "banks",
    "target": "apollo",
    "type": "debt",
    "amount": 220,
    "date": "2026-05",
    "confidence": "confirmed",
    "citation": "FSB Report on Vulnerabilities in Private Credit (2026-05-06): 銀行對私募信貸基金授信 ~$220B（全行業，掛 Apollo 節點代表整層）",
    "noteZh": "銀行 → 私募信貸授信 ~$220B（行業合計）",
    "noteEn": "~$220B bank credit lines to private credit funds (industry-wide proxy)"
  }
],
  circularity: [],
  contagionPaths: [],
};

if (typeof module !== "undefined") module.exports = { DATA_FINANCE };
