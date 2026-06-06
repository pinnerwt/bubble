---
name: softbank-risk-check
description: 執行 SoftBank 槓桿風險追蹤儀表板：官方 NAV/LTV、Arm（NAV 最大成分）申報與股價、保證金貸款與 $40B 過橋狀態、資產出售、CDS 與信評，按門檻輸出紅黃綠燈報告。Use when user asks to check SoftBank risk, 追蹤 SoftBank/軟銀, run the SoftBank dashboard, or mentions the OpenAI margin loan / LTV / 9984.
---

# SoftBank 槓桿風險儀表板 / SoftBank Leverage Risk Dashboard

背景：SoftBank 對 OpenAI 承諾 $64.6B（~13%），部分以 OpenAI 股權抵押的保證金貸款融資——
是 OpenAI 估值的槓桿化公開代理，也是「最快路徑」傳染鏈的第一環（見 report.html 與 data.js softbank 節點）。
東京上市（9984.T），無 SEC 申報；用官方 IR + Arm（NASDAQ: ARM, 其 NAV 最大成分）+ 新聞三角定位。

## Quick start

```bash
bash .claude/skills/softbank-risk-check/scripts/scan.sh 2026-06-06   # 參數=上次檢查日
```

## Workflow

1. **官方數字**（跑 `scripts/scan.sh <上次檢查日>`）：
   - 抓 group.softbank SOTP 頁 → NAV、LTV、淨債、持股構成（腳本 grep；失敗就改用 WebFetch 同一網址）
   - Arm (CIK 1973239) 新申報——Arm 是 NAV 最大成分（基線 ¥19.15T ≈ 48% 持股價值），Arm 跌＝LTV 升
   - EDGAR FTS「SoftBank」近期 8-K/SC 13D——美股資產買賣的痕跡
2. **資金面信號**（WebSearch ~3 條）：
   - `SoftBank margin loan OpenAI OR bridge loan refinancing <當年>`
   - `SoftBank asset sale OR Arm stake OR Vision Fund <當年>`
   - `SoftBank CDS OR credit rating S&P <當年>`
3. **OpenAI 標記連動**：SoftBank NAV 中 OpenAI 不單列（藏於 SVF2/Others）——財報季（5/8/11/2 月）
   檢查季報 PDF 是否揭露 SVF2 對 OpenAI 的估值變動
4. **輸出燈號報告**：對照 [REFERENCE.md](REFERENCE.md) 門檻表（8 項信號），格式同 cohere-risk-check。
   重大變化 → 更新 `data/softbank.js` softbank 節點 + REFERENCE「檢查紀錄」。

## 領先順序

Arm 股價下跌/二級折價 → LTV 升破 20% → 追加資產出售（賣 Arm＝賣皇冠＝紅燈）→
保證金貸款追繳/過橋再融資困難 → CDS 突破 → 信評降級 → 對 OpenAI/Stargate 出資斷流。
注意反身性：OpenAI 估值下修會同時打擊 NAV 與抵押品價值，兩條線一起看。
