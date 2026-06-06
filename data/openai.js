// AI 資金流地圖 — OpenAI + Stargate（/openai-risk-check 主檔）
// 流向歸檔規則：監測優先序 cohere > anthropic > openai > softbank > coreweave > chips > hyperscalers > infra > finance
// （本檔含「優先序輪到本群」的所有流向；跨群流向只存一份）

const DATA_OPENAI = {
  entities: [
  {
    "id": "openai",
    "name": "OpenAI",
    "category": "ai-lab",
    "health": {
      "score": 36,
      "updateZh": "2026-06 更新：$122B 融資 close @ $852B（3/31, 一手）；IPO 目標 2026-09 @ >$1T（GS+MS）；承諾堆疊 $1.4T→~$600B（2 月投資人溝通, 多源 reported）+ Stargate 棄 JV 改租賃——自身信用改善，但改善的方式（合約重談潮）正是對手方傳染的觸發器；ARR >$25B 但 WSJ 報導 2026 營收 miss",
      "notesZh": "全系統最大「承諾支出 vs 已籌資本」缺口：~$1.4T 算力成本(至2033, HSBC模型) vs 2025 營收 ~$13B；HSBC 估 2030 前缺口 ~$207B。估值 $852B(2026-03)、累計融資 $110B+ 是唯一緩衝。需求端的根源風險",
      "notesEn": "Largest committed-spend vs funded-capital mismatch: ~$1.4T compute costs (thru 2033, HSBC) vs ~$13B 2025 revenue; ~$207B funding gap by 2030. $852B valuation / $110B+ raised is the only buffer. The demand-side root risk"
    }
  },
  {
    "id": "stargate",
    "name": "Stargate JV",
    "category": "spv",
    "health": {
      "score": 30,
      "updateZh": "2026-06 更新：OpenAI 實質放棄 JV/自建模式（「傘形名詞」、改租賃；TX 擴建放棄、UK 站暫停）——$500B 宣示縮水為雙邊租約集合",
      "notesZh": "宣示 $500B；股權比例（OpenAI/SoftBank/Oracle/MGX）與已部署資本未公開——兩輪深研皆無法驗證，本身就是不透明度的證據",
      "notesEn": "Announced $500B; equity split & deployed capital undisclosed — survived neither research round; the opacity is itself a finding"
    }
  }
],
  flows: [
  {
    "source": "openai",
    "target": "msft",
    "type": "purchase",
    "amount": 250,
    "date": "2025-10-28",
    "confidence": "confirmed",
    "citation": "Microsoft 8-K (SEC, msft-ex99_2): OpenAI contracted to purchase an incremental $250B of Azure services",
    "noteZh": "$250B Azure 增量採購承諾（同一 8-K 揭露微軟持股 ~27%/$135B、放棄 ROFR）",
    "noteEn": "$250B incremental Azure commitment (same 8-K discloses ~27%/$135B stake, dropped ROFR)"
  },
  {
    "source": "msft",
    "target": "openai",
    "type": "equity",
    "amount": 13,
    "date": "2023-2026",
    "confidence": "confirmed",
    "citation": "Microsoft 10-Q FY26Q3：承諾 $13B/已注資 $11.8B、持股 ~27%（HLBV 權益法）；2025-10 OpenAI 重組產生一次性 $5.9B 稀釋利益（9 個月、稅後 +$4.48B 淨利 ≈ EPS $0.60）",
    "noteZh": "$13B 承諾（$11.8B 已注資）→ ~27%；重組稀釋利益 $5.9B 為一次性非現金",
    "noteEn": "$13B committed ($11.8B funded) → ~27%; the $5.9B recap dilution gain is one-time, non-cash"
  },
  {
    "source": "openai",
    "target": "amzn",
    "type": "purchase",
    "amount": 38,
    "date": "2025-11-03",
    "confidence": "confirmed",
    "citation": "OpenAI + AWS 雙方一手新聞稿：7 年 $38B（數十萬顆 GB200/GB300）",
    "noteZh": "AWS 7 年 $38B 算力協議",
    "noteEn": "7-yr $38B AWS compute arrangement"
  },
  {
    "source": "openai",
    "target": "orcl",
    "type": "purchase",
    "amount": 300,
    "date": "2025-09",
    "confidence": "reported",
    "citation": "Moody's via Reuters (2025-09-17) + Senate FSOC letter",
    "noteZh": "Oracle $300B AI 合約（OpenAI 為主）——HSBC 模型總承諾 ~$1.4T 的最大單筆",
    "noteEn": "Oracle's $300B AI contracts (mostly OpenAI) — largest single piece of the ~$1.4T stack"
  },
  {
    "source": "openai",
    "target": "coreweave",
    "type": "purchase",
    "amount": 22.4,
    "date": "2025",
    "confidence": "confirmed",
    "citation": "Senate letter + CoreWeave 揭露: $11.9B(3月)+~$4B(5月)+至$6.5B(9月)",
    "noteZh": "OpenAI → CoreWeave 算力採購累計 ~$22.4B",
    "noteEn": "Cumulative ~$22.4B compute commitments"
  },
  {
    "source": "openai",
    "target": "amd",
    "type": "purchase",
    "amount": 20,
    "date": "2025-10-06",
    "confidence": "estimate",
    "citation": "AMD 8-K + IR: 6GW 標題中僅首 1GW MI450 有約束力（2H26 部署）；金額為估計（AMD CFO 稱數百億美元級營收）",
    "noteZh": "1GW 有約束力採購（6GW 為上限）；金額估計",
    "noteEn": "1 GW binding (6 GW ceiling); amount estimated ('tens of billions' per AMD CFO)"
  },
  {
    "source": "amd",
    "target": "openai",
    "type": "equity",
    "amount": 25,
    "date": "2025-10-05",
    "confidence": "confirmed",
    "citation": "AMD 8-K (SEC): 160M 股認股權證 @ $0.01、~10% 股本、2030/10/5 到期；解鎖綁部署里程碑+股價目標(至$600)；價值隨股價變動（此處以名目估計呈現）",
    "noteZh": "160M 股權證（~10% AMD）——循環供應商激勵；金額為名目估計",
    "noteEn": "160M-share warrant (~10% of AMD) — circular vendor incentive; notional estimate"
  },
  {
    "source": "nvda",
    "target": "openai",
    "type": "equity",
    "amount": 30,
    "date": "2026-02",
    "confidence": "reported",
    "citation": "TechCrunch (2026-03-04): $100B 承諾(2025-09)實際僅 $30B；Q3 FY26 10-Q 確認簽有 OpenAI 投資意向書（LOI）；單季非上市股權現金投入 $18.6B（10-Q 現金流量表）",
    "noteZh": "Nvidia 實投 $30B（承諾 $100B 的 30%）後宣布撤退；LOI 經 10-Q 確認",
    "noteEn": "Deployed $30B of the $100B pledge, then retreated; the LOI itself is 10-Q-confirmed"
  },
  {
    "source": "softbank",
    "target": "openai",
    "type": "equity",
    "amount": 64.6,
    "date": "2025-12 / 2026",
    "confidence": "reported",
    "citation": "TNW (2026-04-23): $40-41B 已完成(2025-12) + $30B 待 close = $64.6B 取得 ~13%",
    "noteZh": "SoftBank 累計承諾 $64.6B（~13%）——用賣資產+過橋+保證金貸款拼出來的",
    "noteEn": "SoftBank's $64.6B (~13%) — funded by asset sales + bridge + margin loan"
  },
  {
    "source": "coreweave",
    "target": "openai",
    "type": "equity",
    "amount": 0.35,
    "date": "2025-03",
    "confidence": "confirmed",
    "citation": "Senate letter: OpenAI 在算力協議中收到 $350M CoreWeave 股票",
    "noteZh": "客戶的客戶收到客戶的股票——循環第三邊",
    "noteEn": "The customer's customer paid in the customer's stock — third leg of the circle"
  },
  {
    "source": "openai",
    "target": "stargate",
    "type": "equity",
    "amount": 19,
    "date": "2025-01",
    "confidence": "estimate",
    "citation": "2025-01 宣布時廣泛報導之初始承諾；股權比例與實際部署未公開、本研究未能驗證",
    "noteZh": "宣示性承諾（未驗證）",
    "noteEn": "Announced commitment (unverified)"
  },
  {
    "source": "softbank",
    "target": "stargate",
    "type": "equity",
    "amount": 19,
    "date": "2025-01",
    "confidence": "estimate",
    "citation": "同上；SoftBank 為主要出資方之一",
    "noteZh": "宣示性承諾（未驗證）",
    "noteEn": "Announced commitment (unverified)"
  },
  {
    "source": "mgx",
    "target": "stargate",
    "type": "equity",
    "amount": 7,
    "date": "2025-01",
    "confidence": "estimate",
    "citation": "同上；MGX 確切支票額未公開",
    "noteZh": "宣示性承諾（未驗證）",
    "noteEn": "Announced commitment (unverified)"
  },
  {
    "source": "abilene",
    "target": "stargate",
    "type": "lease",
    "amount": 15,
    "date": "2026",
    "confidence": "reported",
    "citation": "DCD/Epoch AI tracker: Abilene 為 Stargate 旗艦站、Oracle 營運供 OpenAI 使用；2026-03 約 600MW 擴建取消",
    "noteZh": "旗艦站產能供給（3 月已現需求軟化訊號）",
    "noteEn": "Flagship capacity (demand-softening signal in March)"
  }
],
  circularity: [
  {
    "id": "msft-openai-loop",
    "titleZh": "Microsoft–OpenAI 迴圈：投資變營收、虧損變權益法",
    "titleEn": "Microsoft–OpenAI loop: investment becomes revenue, losses become equity-method",
    "multiplier": "1$→2 帳",
    "chain": [
      "msft",
      "openai",
      "msft"
    ],
    "confidence": "reported",
    "descZh": "Microsoft 投資 ~$13B 取得 ~27%（$135B, 8-K）→ OpenAI 承諾回購 $250B Azure 服務 → 微軟一邊認列 Azure 營收、一邊按權益法吸收 OpenAI 虧損（列於其他收支）。同一段關係在微軟報表上同時是營收與虧損來源；具體權益法損失金額本研究未能從文件確認。",
    "descEn": "Microsoft's ~$13B for ~27% → OpenAI's $250B Azure commitment → Microsoft books Azure revenue while absorbing equity-method losses in other income/expense. The exact loss line was not filing-confirmed this round.",
    "citation": "Microsoft 8-K (msft-ex99_2)；權益法損失：deepquarry/calcbench 分析（reported 級）"
  }
],
  contagionPaths: [],
};

if (typeof module !== "undefined") module.exports = { DATA_OPENAI };
