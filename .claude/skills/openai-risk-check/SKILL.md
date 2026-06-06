---
name: openai-risk-check
description: 執行 OpenAI 履約/信用風險追蹤儀表板：透過五家上市對手方申報（MSFT 權益法損益、Oracle RPO、CoreWeave、AMD 權證、Nvidia 間接營收措辭）+ 資金面（融資/估值/IPO/S-1/DXYZ 標記）+ 承諾堆疊 vs 營收 + 市場代理（Oracle CDS、DDTL 5.0），按門檻輸出紅黃綠燈報告。Use when user asks to check OpenAI risk, 追蹤 OpenAI, run the OpenAI dashboard, 看 OpenAI 狀況, or mentions the $1.4T commitment stack / funding gap.
---

# OpenAI 履約風險儀表板 / OpenAI Commitment-Stack Risk Dashboard

背景：OpenAI 是全系統「承諾支出 vs 已籌資本」最大缺口（~$1.4T vs 2025 營收 ~$13B、HSBC 估 2030 缺口 ~$207B），
是主傳染路徑的需求端引爆器。它無自身申報，但在五家上市對手方財報留下影子。
完整脈絡見專案根目錄 `report.html` 與 `data/openai.js`。

## Quick start

```bash
bash .claude/skills/openai-risk-check/scripts/edgar_scan.sh 2026-06-06   # 參數=上次檢查日
```

## Workflow

1. **A 層：對手方申報掃描**（跑 `scripts/edgar_scan.sh <上次檢查日>`）：
   - EDGAR FTS「OpenAI」新申報——**任何 S-1/F-1 出現＝最高優先事件，立刻細讀**
   - MSFT 新 10-Q → 抓兩個數字：OpenAI 權益法當季損益（剔除一次性項）、注資進度（$X/$13B）
   - ORCL 新財報 → RPO 總額與環比、營收轉化、capex
   - AMD 新 10-Q/法說 → MI450 1GW 部署進度、權證是否開始 vest（vest 開始＝採購真實發生，正面）
   - NVDA 新 10-Q → 檢查「AI research and deployment company」措辭是否仍在（消失/弱化＝🟡）
   - CRWV 新 10-Q → OpenAI 相關集中度與付款行為（與 cohere-risk-check 共用，不重複細讀）
   - DXYZ（Destiny Tech100, CIK 1843974）新申報 → OpenAI 持倉公允價值標記
2. **B 層：資金面**（WebSearch ~3 條）：
   - `OpenAI funding round OR valuation OR down round <當年>`
   - `OpenAI IPO OR S-1 filing`
   - `SoftBank OpenAI tranche OR payment`（僅看 OpenAI 收款面；SoftBank 本體用 softbank-risk-check）
3. **C 層：承諾堆疊**（WebSearch ~2 條）：
   - `OpenAI compute commitment OR contract renegotiation OR Stargate cancellation`
   - `OpenAI revenue OR ARR OR burn <當年>`——對照堆疊增速 vs 營收增速
4. **D 層：市場代理**（WebSearch 1 條）：`Oracle CDS spread OpenAI`，加上 cohere skill 已有的 CRWV CDS
5. **輸出燈號報告**：對照 [REFERENCE.md](REFERENCE.md) 門檻表（12 項信號），格式同 cohere-risk-check：
   逐項表格 + 總評 + 下次檢查建議。重大變化（任一 🔴 或 ≥3 🟡）→ 建議更新 `data/openai.js` openai 節點，
   並把發現附加到 REFERENCE.md「檢查紀錄」。

## 領先順序（惡化時的預期亮燈次序）

對手方申報轉弱（MSFT 權益法損失放大 / Oracle RPO 停滯）→ 承諾走回頭路（站點取消、合約重談）→
SoftBank 通道斷流 → 估值下修/二級折價 → Oracle CDS 突破 → CRWV 撥備。
S-1 遞交是獨立的全揭露事件，無論燈號如何都立即觸發完整重估。
