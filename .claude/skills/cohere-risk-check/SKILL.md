---
name: cohere-risk-check
description: 執行 Cohere 破產風險追蹤儀表板：掃 EDGAR（Cohere 新申報、Private Shares Fund NPORT-P 估值、CoreWeave 撥備/客戶集中度/Cash Trap）、新聞信號（募資/down round/裁員/IPO/CFO）、CRWV 市場信號，按門檻輸出紅黃綠燈報告。Use when user asks to check Cohere risk, 追蹤 Cohere, run the Cohere dashboard, 看 Cohere 狀況, or mentions DDTL 5.0 / CoreWeave collateral health.
---

# Cohere 破產風險儀表板 / Cohere Bankruptcy Risk Dashboard

背景：Cohere 是 CoreWeave DDTL 5.0（$3.1B 公開交易 GPU 債）兩家交叉抵押客戶之一（另一家為 OpenAI）。
信貸協議為交叉違約結構——Cohere 的 MSA 被全面終止＝整個 $3.1B 的違約事件。
完整脈絡見專案根目錄 `report.html` 與 `data/cohere.js` 與 `data/coreweave.js`。

## Quick start

```bash
bash .claude/skills/cohere-risk-check/scripts/edgar_scan.sh 2026-06-06   # 參數=上次檢查日
```

然後執行下方「新聞信號」搜尋，最後按 REFERENCE.md 的門檻表輸出燈號報告。

## Workflow

1. **EDGAR 掃描**（跑 `scripts/edgar_scan.sh <上次檢查日>`，輸出四個區塊）：
   - Cohere 全市場新申報（任何 form：S-1/F-1 出現＝重大事件）
   - Private Shares Fund (CIK 1557265) 新 NPORT-P → 有新檔就抓 Cohere 持倉公允價值，與 REFERENCE.md 基線比
   - Buttonwood First Access Fund (CIK 2104046) 新 N-2/NPORT
   - CoreWeave (CIK 1769628) 新 8-K/10-Q → 讀：客戶集中度 %、應收帳款信用損失撥備、RPO 環比、
     任何 Cash Trap / MSA termination / Event of Default 字樣（用 grep，不要全文細讀）
2. **新聞信號**（WebSearch，約 3 條查詢）：
   - `Cohere funding round OR down round OR valuation <當年>`
   - `Cohere layoffs OR CFO OR IPO OR S-1`
   - `CoreWeave DDTL 5.0 loan price OR secondary trading`
3. **市場信號**：CRWV 股價趨勢與 CDS 報導（WebSearch `CoreWeave CDS spread`）；
   私股二級折價（WebSearch `Cohere Forge OR EquityZen OR Hiive secondary price`）
4. **輸出燈號報告**：對照 [REFERENCE.md](REFERENCE.md) 門檻表，逐項標 🟢🟡🔴，格式：

```
## Cohere 風險檢查 <日期>
| 信號 | 現值 | 基線 | 燈號 |
|---|---|---|---|
（10 項信號逐列）
**總評**: 🟢/🟡/🔴 + 兩三句變化摘要
**下次檢查建議**: <日期或觸發事件>
```

5. 若有重大變化（任一 🔴 或 ≥3 個 🟡）：建議用戶更新 `data/cohere.js` 的 cohere 節點健康度，
   並把本次發現附加到 REFERENCE.md 的「檢查紀錄」段（含日期）。

## 領先順序（惡化時的預期亮燈次序）

私股二級折價 → ARR 洩漏轉弱（慣例每年 2 月 CNBC/BetaKit）→ 募資延宕 →
CoreWeave 10-Q 撥備 → DDTL 5.0 跌破 95 → 評級行動 → Cash Trap 揭露。
後兩項亮燈時交叉違約已在倒數——報告中須明確警示。
