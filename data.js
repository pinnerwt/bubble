// ============================================================
// AI 資金流動網絡 — 組裝層 / Assembler
// 數據按「公司/節點」拆在 data/，風險檢查只需讀對應檔案：
//   data/config.js        meta + categories + flowTypes
//   data/cohere.js        Cohere（/cohere-risk-check 主檔）
//   data/openai.js        OpenAI + Stargate（/openai-risk-check 主檔）
//   data/softbank.js      SoftBank（/softbank-risk-check 主檔）
//   data/anthropic.js     Anthropic + TPU SPV
//   data/coreweave.js     CoreWeave + DDTL SPV ×2
//   data/chips.js         Nvidia / AMD / Broadcom
//   data/hyperscalers.js  MSFT / GOOGL / AMZN / META / ORCL + Beignet
//   data/infra.js         Crusoe / Abilene / QTS / Talen
//   data/finance.js       私募信貸 / 主權 / 銀行 / 保險 / 退休金
// 每群組檔含 {entities, flows, circularity, contagionPaths}；
// 跨群流向按監測優先序只存一份（規則見各檔頭）。
// 瀏覽器：index.html 依序載入各檔後載入本檔。Node：require('./data.js')。
// ============================================================

const DATA = (() => {
  let cfg, groups;
  if (typeof module !== "undefined" && typeof require === "function") {
    cfg = require("./data/config.js");
    groups = ["cohere","anthropic","openai","softbank","coreweave","chips","hyperscalers","infra","finance"]
      .map(g => require(`./data/${g}.js`)["DATA_" + g.toUpperCase()]);
  } else {
    // 瀏覽器：頂層 const 在全域詞法作用域（不在 globalThis 上），必須用裸識別字引用
    cfg = { DATA_META, DATA_CATEGORIES, DATA_FLOWTYPES };
    groups = [DATA_COHERE, DATA_ANTHROPIC, DATA_OPENAI, DATA_SOFTBANK, DATA_COREWEAVE,
              DATA_CHIPS, DATA_HYPERSCALERS, DATA_INFRA, DATA_FINANCE];
  }
  const merge = key => groups.flatMap(g => g[key] || []);
  return {
    meta: cfg.DATA_META, categories: cfg.DATA_CATEGORIES, flowTypes: cfg.DATA_FLOWTYPES,
    entities: merge("entities"), flows: merge("flows"),
    circularity: merge("circularity"), contagionPaths: merge("contagionPaths"),
  };
})();

if (typeof module !== "undefined") module.exports = DATA;
