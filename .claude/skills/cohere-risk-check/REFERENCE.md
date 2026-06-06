# 基線與門檻 / Baselines & Thresholds

> 基線建立日 2026-06-06。每次檢查若有新數據，更新本表並在下方「檢查紀錄」留一行。

## 門檻表（10 項信號）

| # | 信號 | 基線（2026-06-06）| 🟡 黃燈 | 🔴 紅燈 |
|---|---|---|---|---|
| 1 | DDTL 5.0 二級價格 | 發行價 99（2026-05-18）| <95 | <90（80 以下＝distressed）|
| 2 | CRWV 5yr CDS | ~640bps（2025-11 高點）| >800bps | >1000bps 或無法發新債 |
| 3 | 私股二級折價 vs $7B | 員工二級已開放、價格未知 | 折價 >30% | 折價 >50% 或無買盤 |
| 4 | PSF NPORT-P Cohere 標記 | 持有確認（2025-11-20 申報）、金額待首查 | 環比 -20% | 環比 -40% |
| 5 | ARR 軌跡 | $240M、2025 季增 >50%（2026-02 備忘錄）| 季增 <20% | 持平或下滑 |
| 6 | 募資時鐘 | 上次 2025-08/09 共 $600M @ $7B | 2027-03 前無資金事件 | down round（<$7B）|
| 7 | IPO 進度 | CFO Chadwick 在任、「might IPO soon」| 推遲表態 | CFO 離職或撤回 |
| 8 | CoreWeave 10-Q 撥備 | 無 Cohere 相關撥備 | 出現一般撥備增加 | 點名客戶減值 |
| 9 | CoreWeave 客戶集中度 | Q1'26: A=45%, B=20%（10-Q）| 結構劇變 | 某客戶 % 歸零 |
| 10 | Cash Trap / EoD 揭露 | 無 | — | 出現即紅燈+交叉違約倒數 |

## 結構脈絡（不變的事實，出處見專案 report.html）

- DDTL 5.0：$3.1B、Ba2/BB+、SOFR+450、2031-11 到期、首檔可二級交易 GPU 債
- 兩家抵押客戶＝OpenAI + Cohere（Bloomberg 銀團報導；8-K 未具名）
- 信貸協議（ex10.1）：交叉抵押、放貸率 71.42%×capex、任一 MSA 重大違約→全設施 Cash Trap、
  任一 MSA 全面終止→整個 $3.1B EoD；CoreWeave Inc. 無條件母公司擔保
- Cohere：總募資 ~$1.54B、估值 $7B、獲利目標 2029、投資人含 Nvidia/AMD/PSP（加拿大退休金）
- 慣例：Cohere 投資人備忘錄每年 ~2 月經 CNBC/BetaKit 流出（ARR 更新的主要管道）

## 額外標記來源（2026-06-06 試跑發現）

- **Monroe Capital Income Plus Corp（CIK 1742313）與 Monroe Capital Enhanced Corporate Lending Fund（CIK 2061670）**
  的 10-Q 提及 Cohere——BDC 投資明細表若載有 Cohere＝疑似創投債部位，其公允價值與成本欄位是
  另一個季度級獨立標記；venture debt 出現本身也代表 Cohere 已在用債務融資（補充燒錢）。首查時確認部位性質。

## 關鍵連結

- EDGAR 全文搜尋 UI: https://efts.sec.gov/LATEST/search-index?q=%22Cohere%22 （API）/ https://www.sec.gov/cgi-srv/efts/search
- Private Shares Fund: https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001557265
- CoreWeave 申報: https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001769628
- DDTL 5.0 信貸協議: sec.gov/Archives/edgar/data/1769628/000176962826000236/ex101.htm
- 評級行動: fitchratings.com / moodys.com 搜 "CoreWeave Financing DDTL V"

## 檢查紀錄

- 2026-06-06：基線建立。全部 🟢（無新申報異常）。
