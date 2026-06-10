---
name: coreweave-risk-check
description: 執行 CoreWeave（全研究最弱環節）破產風險追蹤儀表板：XBRL 自動拉現金/債務/利息費用、10-Q 快篩（客戶集中度/撥備/折舊政策/Cash Trap）、再融資窗口與新債票息軌跡、CDS 與 DDTL 5.0 價格、評級行動，按門檻輸出紅黃綠燈報告。Use when user asks to check CoreWeave risk, 追蹤 CoreWeave, run the CoreWeave dashboard, 看 CoreWeave 狀況, or mentions CRWV debt / maturity wall / refinancing window.
---

# CoreWeave 破產風險儀表板 / CoreWeave Bankruptcy Risk Dashboard

背景：全研究最可能違約的公司（健康度 15）。SEC 文件確認：FY25 償債 $4.4B＞OCF $3.1B、
現金 $2.2B vs 2026 內到期 $6.1B、利息 ≈ 營收 25%、含表外有效槓桿 ~24×、除 DDTL 4.0 外
全部設施由母公司無條件擔保。它活著的唯一方式是再融資窗口持續開啟（YTD 已募 $20B+）。
完整脈絡見 `report.html` 與 `data/coreweave.js`（coreweave / cw-spv8 / cw-spv5 節點）。

## Quick start

```bash
bash .claude/skills/coreweave-risk-check/scripts/scan.sh 2026-06-06   # 參數=上次檢查日
```

## Workflow

1. **申報與 XBRL**（跑 `scripts/scan.sh <上次檢查日>`，五個區塊）：
   - CRWV 新申報（10-Q/10-K/8-K）——**新 8-K 多半是新融資：記下金額與票息，更新票息軌跡**
   - XBRL 自動數字：現金、流動/非流動債務、利息費用、營收（近四季）——直接算
     償債覆蓋與利息/營收比
   - 最新 10-Q 快篩：客戶集中度 %、allowance、cash trap、useful life（折舊政策變動＝大事）、
     going concern 字樣
   - 與其他 skill 共用：DDTL 5.0 細節在 cohere skill、客戶端在 openai/anthropic skill——不重複細讀
2. **市場信號**（WebSearch ~3 條）：
   - `CoreWeave CDS spread OR stock <當月>`
   - `CoreWeave DDTL loan price OR secondary OR rating Moody's Fitch <當年>`
   - `CoreWeave debt raise OR notes OR facility <當月>`——再融資窗口的即時狀態
3. **輸出燈號報告**：對照 [REFERENCE.md](REFERENCE.md) 門檻表（12 項信號），格式同 cohere-risk-check。
   重大變化（任一 🔴 或 ≥3 🟡）→ 更新 `data/coreweave.js` 對應節點 + REFERENCE「檢查紀錄」。

## 領先順序（惡化時的預期亮燈次序）

新債票息走高/條款變嚴 → 募資從債轉純股權/可轉債（債市先關門）→ CDS 突破 800 →
DDTL 5.0 跌破 95 → 評級下調 → 10-Q 出現流動性風險語言加重 → 撥備/客戶縮減 →
Cash Trap / 違約事件揭露。**這家公司的死法是再融資窗口關閉，不是單季虧損**——
窗口狀態（#3）權重最高。折舊政策再延長＝盈餘品質紅旗（反向：縮短＝誠實但 EPS 受擊）。
