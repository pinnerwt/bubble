---
name: risk-dashboard
description: 一鍵執行 AI 資金鏈五大風險儀表板（coreweave + cohere + openai + softbank + anthropic risk-check）並輸出合併燈號總表與跨節點交叉信號。Use when user asks for the risk dashboard, 風險總覽, 跑全部檢查, check everything, or wants the combined AI capital chain status.
---

# AI 資金鏈風險總覽 / Combined Risk Dashboard

依序執行五個子儀表板，輸出合併報告。子 skill 各自的門檻與基線見其 REFERENCE.md。

## Workflow

1. **並行跑五個掃描腳本**（同一個 Bash 訊息發五個調用）：
   ```bash
   bash .claude/skills/coreweave-risk-check/scripts/scan.sh <上次檢查日>
   bash .claude/skills/cohere-risk-check/scripts/edgar_scan.sh <上次檢查日>
   bash .claude/skills/openai-risk-check/scripts/edgar_scan.sh <上次檢查日>
   bash .claude/skills/softbank-risk-check/scripts/scan.sh <上次檢查日>
   bash .claude/skills/anthropic-risk-check/scripts/edgar_scan.sh <上次檢查日>
   ```
2. **合併新聞搜尋**（去重後 ~8 條 WebSearch，避免各 skill 重複搜）：
   CoreWeave 新融資/票息/CDS、Cohere 募資/合併進度、OpenAI 融資/IPO/承諾、
   SoftBank 保證金貸款/資產出售、Anthropic run-rate/IPO/TPU SPV close、
   Oracle CDS、DDTL 5.0 價格、Stargate 履約
3. **依各 REFERENCE.md 門檻表評燈**，輸出合併總表：

```
# AI 資金鏈風險總覽 <日期>
| 節點 | 總評 | 變化摘要（一句）| 最值得注意的單一信號 |
|---|---|---|---|
| CoreWeave | 🟢/🟡/🔴 | … | … |
| Cohere | … | … | … |
| OpenAI | … | … | … |
| SoftBank | … | … | … |
| Anthropic | … | … | … |

## 跨節點交叉信號
- DDTL 5.0（OpenAI+Cohere 交叉抵押）與 CRWV CDS——子儀表板共用，只評一次
- AVGO Q2 FY26 10-Q 的 RVG 揭露——anthropic 檢查的 #4，也影響 TPU SPV 與 chips 節點
- 反身性鏈 ×2：OpenAI 估值 ↔ SoftBank NAV/抵押品 ↔ 出資能力；
  Anthropic 成長 ↔ 里程碑資本解鎖（Amazon $20B/Google $30B）↔ TPU 租金履約
- 傳染順位提醒：任一節點 🔴 時，引用 report.html 對應傳染路徑說明下一環是誰

## 總結論
🟢/🟡/🔴 + 三句話 + 下次檢查建議
```

4. 把各節點發現寫回**各自** REFERENCE.md 的「檢查紀錄」；重大變化同步 `data/<節點>.js` 對應節點健康度（coreweave/cohere/openai/softbank/anthropic 各自的檔案）。

## 注意

- 五個子 skill 的細節流程以各自 SKILL.md 為準；本 skill 只負責調度與合併，不重複定義門檻
- CRWV 申報在 coreweave/cohere/openai/anthropic 掃描中都會出現——**以 coreweave skill 的 XBRL+快篩為準**，其他只看增量；AMZN/GOOGL 申報在 openai 與 anthropic 掃描重疊——同樣只讀一次
- 若用戶只關心單一節點，建議直接用對應子 skill，不要跑總覽
