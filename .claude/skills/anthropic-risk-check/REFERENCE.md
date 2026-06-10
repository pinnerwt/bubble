# Anthropic 基線與門檻 / Baselines & Thresholds

> 基線建立日 2026-06-06。每次檢查更新本表並在「檢查紀錄」留一行。

## 門檻表（11 項信號）

| # | 信號 | 基線（2026-06-06）| 🟡 黃燈 | 🔴 紅燈 |
|---|---|---|---|---|
| 1 | AMZN 10-Q Anthropic 標記 | 非權益法私人投資帳面 $48.1B（Q1'26, 含 OpenAI 特別股；Q1 認列 $12.3B Anthropic Level 3 增值）| 標記環比 -20% 或出現 Level 3 減值 | -40% 或 Amazon 減記 |
| 2 | AMZN $20B 里程碑融資 | 期後事件已設立、隨「Amazon 交付算力」解鎖 | 解鎖停滯 | 額度取消/重談 |
| 3 | GOOGL VIE 出資 | 承諾 $40.7B；$10B 首筆預定 Q2'26 撥付 | 撥付延遲 | 縮減承諾 |
| 4 | AVGO RVG 揭露 | 零揭露（Q1 10-Q 全文搜尋陰性；交易 6/5 未確認 close）| 交易 close 但下一份 10-Q 仍無揭露＝透明度紅旗（升級處理）| RVG 被觸發 |
| 5 | TPU SPV 狀態 | ~$36B 銷售中未確認 close；$6B A1/$25B A2(~5.75%)/$4.5B B | Q3'26 仍未 close 或 B 段流標 | 租金違約/重談 |
| 6 | Run-rate | $47B（5 月底, 報導, 毛額）；gross/net 爭議 ~$8B（淨額 ~$22B 說）| 增速 <20% QoQ 或爭議擴大 | 持平/下滑 |
| 7 | 估值 | **$965B**（$65B 輪, 2026-05-28, 首度超車 OpenAI）| 二級折價 >20% | down round |
| 8 | IPO | **已於 2026-06-01 機密遞件**（Fortune）| 撤回/明顯延期 | —（公開 S-1＝立即全面重估，中性事件）|
| 9 | 算力承諾堆疊 | TPU SPV 租約 ~$36B + GCP ~5GW/5 年 + 經 Broadcom 3.5GW（2027 起）+ AWS Trainium + CoreWeave（金額未揭露）| 新增大額承諾而營收增速放緩 | 產能消耗遞延（AVGO 法說提及）|
| 10 | 地緣/政策 | 曾被報導列入聯邦黑名單（TechCrunch 2026-03 提及）；對中晶片立場與 Nvidia 關係惡化 | 新制裁/禁令影響政府業務 | 重大市場關閉 |
| 11 | 基金 NPORT 每股標記 | 待首查建立（Fidelity 系/HII feeder 等持有）| 環比 -20% | 環比 -40% |

## 結構脈絡（出處見專案 report.html / data/anthropic.js）

- TPU SPV（Burry 的 $38B）：SPV 買 Google TPU 租給 Anthropic；租金＝唯一主要還款來源；
  Broadcom RVG 壓低 A2 至 ~5.75% 但**法律上还不存在於任何帳上**；$4.5B B 段＝無增強損失層
- 里程碑資本的反身性：Amazon $20B 隨「Amazon 交付算力」解鎖（Anthropic 用得越多、Amazon 借它越多、
  租金流回 AWS）；Google $30B 綁營運/財務里程碑（Level 3 股權衍生品）——兩者都是「成長的函數」，
  成長停＝資本同時停
- 與 OpenAI 對照：Anthropic 是「資本充足+成長中」，風險不在償付而在**結構對增速的依賴**；
  AVGO 8-K 原文「dependent on Anthropic's continued commercial success」
- CoreWeave 協議（2026-Q1, 金額未揭露）不在 DDTL 5.0 抵押池（該池＝OpenAI+Cohere）

## 關鍵 CIK

AMZN 1018724 · GOOGL 1652044 · AVGO 1730168 · CRWV 1769628 · DXYZ 1843974（持倉待確認）

## 檢查紀錄

- 2026-06-06：基線建立。近期重大利好已入帳：$65B @ $965B（5/28）+ 機密遞件 IPO（6/1）——
  data/anthropic.js 健康度已調至 62。#4（AVGO RVG）為下一個關鍵觀察點：Q2 FY26 10-Q ~6 月中。
- 2026-06-06（首次完整檢查）：總評 🟢（全系統最強節點）。要點：
  (1) **RVG 結構首次有細節**（PitchBook/銀團報導）：Anthropic 租金違約達一定期間 → SPV 賣晶片償債，
  不足部分 **Broadcom 100% 補足 A1+A2（$31B）**；**$4.5B B 段無任何保護**——#4 門檻表已照此校準；
  (2) **SPV close 進行式**：訂單本週截止、最快下週 close（Bloomberg 5/28）——close 後租金時鐘開始走，
  AVGO 揭露義務也隨之成立（Q2 10-Q 若早於 close 日則看 8-K/Q3）；
  (3) **公司向投資人預告 2026 年 6 月季度首度獲利**——下一個可證偽測試點（懷疑方：wheresyoured.at
  "Profitability Swindle" 質疑會計口徑）；(4) ARR ~$45B（Sacra, 5 月）自 2025 底 $9B；IPO 目標 10 月；
  (5) **NPORT 每股標記基線**：Fidelity VIP Growth Opps（2026-03-31 報告期）Series D $274.07 /
  Series E/F/G $259.14——此標記在 Series H（$965B）之前，**下一季標記是否跳升 ~2.5 倍＝獨立估值
  追認測試**；(6) 5 月新增 4 個 Form D feeder（HII-02/Inflection/WU/Granada）＝二級需求旺。
  下次：SPV close 公告（~6 月中）、AVGO Q2 10-Q、7 月底 AMZN/GOOGL Q2 10-Q 標記、
  或 S-1 公開翻牌（10 月上市前數週）。
