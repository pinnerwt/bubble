# AI 資金鏈系統性風險研究 / AI Capital Chain Systemic Risk Study

研究美國機構資金（私募/銀行/基金/退休金/保險）在 AI 生態系的流動與最薄弱環節。
核心結論與引用見 `report.html`；互動可視化 `index.html`（本機預覽：`python3 -m http.server 8742`）。

## 資料層結構

`data.js` 是組裝層（瀏覽器全域變數 / node require 雙模式）；實際數據按公司拆在 `data/`：

| 檔案 | 內容 |
|---|---|
| `data/config.js` | meta + categories + flowTypes（很少動）|
| `data/cohere.js` | Cohere — `/cohere-risk-check` 主檔 |
| `data/openai.js` | OpenAI + Stargate — `/openai-risk-check` 主檔 |
| `data/softbank.js` | SoftBank — `/softbank-risk-check` 主檔 |
| `data/anthropic.js` | Anthropic + TPU SPV — `/anthropic-risk-check` 主檔 |
| `data/coreweave.js` | CoreWeave + DDTL SPV ×2 — `/coreweave-risk-check` 主檔 |
| `data/chips.js` | Nvidia / AMD / Broadcom |
| `data/hyperscalers.js` | MSFT / GOOGL / AMZN / META / ORCL + Beignet |
| `data/infra.js` | Crusoe / Abilene / QTS / Talen |
| `data/finance.js` | 私募信貸 / 主權 / 銀行 / 保險 / 退休金 |

### 跨群流向歸檔規則（監測優先序）

一條 flow 的 source 與 target 可能屬不同群組，**只存在優先序較高的那個檔案裡、不重複**：

```
cohere > anthropic > openai > softbank > coreweave > chips > hyperscalers > infra > finance
```

例：`openai→coreweave` 存在 `data/openai.js`（openai 優先序較高）。
被追蹤節點（cohere/openai/softbank）的檔案因此包含它們的完整流向故事。

### 編輯約定

- 健康度/註記更新只碰對應公司檔；新 flow 按優先序放對檔案
- `confidence` 只能是 `confirmed`（SEC/一手）/ `reported`（多源媒體）/ `estimate`；金額單位 USD billions
- **改完必跑** `node data.js`（不報錯＝組裝正常），完整檢查用：實體 ID 對應、type/confidence 枚舉、circularity chain 與 contagion steps 引用
- 瀏覽器頂層 `const` 不掛在 `globalThis`——組裝層用裸識別字引用各 `DATA_*`，新增群組檔時兩處都要加（index.html script 標籤 + data.js 兩個分支）

## 風險追蹤 skills（.claude/skills/）

`/coreweave-risk-check`（含 XBRL 自動數字）、`/cohere-risk-check`、`/openai-risk-check`、
`/softbank-risk-check`、`/anthropic-risk-check`（各帶掃描腳本 + REFERENCE.md 門檻表與
檢查紀錄）；`/risk-dashboard` 五合一總覽。
檢查後：發現寫回對應 REFERENCE.md「檢查紀錄」、重大變化同步 `data/<節點>.js` 健康度。
EDGAR 請求需帶 User-Agent（腳本內建）。
