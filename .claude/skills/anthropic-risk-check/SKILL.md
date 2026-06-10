---
name: anthropic-risk-check
description: 執行 Anthropic 履約/信用風險追蹤儀表板：對手方申報標記（Amazon 10-Q 持倉公允價值、Alphabet VIE 出資、Broadcom RVG 揭露、CoreWeave）+ 資金面（$965B 估值/IPO/里程碑資本解鎖）+ TPU SPV 租約履約 + run-rate vs 算力承諾，按門檻輸出紅黃綠燈報告。Use when user asks to check Anthropic risk, 追蹤 Anthropic, run the Anthropic dashboard, 看 Anthropic 狀況, or mentions the TPU SPV / Broadcom RVG / Apollo $36B deal.
---

# Anthropic 履約風險儀表板 / Anthropic Commitment Risk Dashboard

背景：Anthropic 基本面是全系統最強（$965B 估值、run-rate 超車 OpenAI），但圍繞它的結構是次傳染路徑：
~$36B TPU SPV 的**唯一主要還款來源是它的租金**、$4.5B B 段無增強、Broadcom RVG 至今零文件揭露。
Broadcom 8-K 原文：「消耗取決於 Anthropic 持續的商業成功」——結構假設成長永不中斷。
完整脈絡見 `report.html` 與 `data/anthropic.js`（anthropic / anthropic-tpu-spv 節點）。

## Quick start

```bash
bash .claude/skills/anthropic-risk-check/scripts/edgar_scan.sh 2026-06-06   # 參數=上次檢查日
```

## Workflow

1. **A 層：對手方/持有人申報**（跑 `scripts/edgar_scan.sh <上次檢查日>`）：
   - EDGAR FTS「Anthropic」新申報——**S-1 公開版出現＝最高優先**（已於 2026-06-01 機密遞件，
     公開翻牌通常在上市前數週＝財務全裸時刻）；新 Form D feeder（HII/Pachamama 類）＝二級需求訊號
   - AMZN 新 10-Q → **Anthropic 持倉公允價值與 Level 3 變動**（Note 2）——全市場最即時的季度標記；
     $20B 算力里程碑融資額度的提取進度
   - GOOGL 新 10-Q → VIE 出資承諾（基線 $40.7B）、$10B 首筆是否如期撥付（預定 Q2'26）、股權衍生品價值
   - AVGO 新 10-Q（Q2 FY26 ~6 月中）→ **RVG 是否現形**：交易若 close 而 10-Q 仍零揭露＝紅旗
   - CRWV → Anthropic 多年期協議進展（金額未揭露；不在 DDTL 5.0 抵押池）
   - 基金 NPORT-P 中的 Anthropic 每股標記（FTS 過濾 NPORT）
2. **B 層：資金面**（WebSearch ~2 條）：
   - `Anthropic IPO OR S-1 OR valuation <當年>`（機密遞件 6/1、$65B @ $965B 基線）
   - `Anthropic funding OR milestone OR Amazon Google investment <當年>`
3. **C 層：營收與 TPU SPV**（WebSearch ~2 條）：
   - `Anthropic revenue OR run-rate OR ARR <當年>`（注意 gross/net 爭議 ~$8B）
   - `Apollo Blackstone Anthropic TPU SPV close OR pricing`——SPV close 狀態、B 段去向、租金履約
4. **輸出燈號報告**：對照 [REFERENCE.md](REFERENCE.md) 門檻表（11 項信號），格式同 cohere-risk-check。
   重大變化（任一 🔴 或 ≥3 🟡）→ 更新 `data/anthropic.js` 對應節點 + REFERENCE「檢查紀錄」。

## 領先順序（惡化時的預期亮燈次序）

run-rate 增速放緩（洩漏管道）→ 里程碑資本停止解鎖（Amazon $20B/Google $30B 是成長的函數）→
Amazon/Alphabet 10-Q 標記下修 → TPU 產能消耗遞延（AVGO 法說）→ SPV 租金壓力 → B 段折價/RVG 觸發。
S-1 公開翻牌＝獨立全揭露事件，立即觸發完整重估（含 gross/net 爭議的最終答案）。
