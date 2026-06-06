#!/usr/bin/env bash
# OpenAI 風險儀表板 — EDGAR 掃描（A 層對手方申報）
# 用法: edgar_scan.sh [上次檢查日 YYYY-MM-DD]（預設 30 天前）
set -uo pipefail
UA="research pgi squareznft@gmail.com"
SINCE="${1:-$(date -d '30 days ago' +%F 2>/dev/null || date -v-30d +%F)}"
TODAY=$(date +%F)
FTS="https://efts.sec.gov/LATEST/search-index"

section() { echo ""; echo "=== $1 ==="; }
fts() {
  curl -s -H "User-Agent: $UA" "$FTS?q=$1&startdt=$SINCE&enddt=$TODAY$2" | python3 -c "
import json,sys
try: d=json.load(sys.stdin)
except Exception as e: print('  [fetch error]', e); sys.exit(0)
print(f'  hits since $SINCE: {d[\"hits\"][\"total\"][\"value\"]}')
for h in d['hits']['hits'][:12]:
    s=h['_source']
    print(' ', s['file_date'], s['form'].ljust(10), '|', ', '.join(s['display_names'])[:70])
"
}
recent() { # $1=CIK(10碼) $2=label $3=form regex
  curl -s -H "User-Agent: $UA" "https://data.sec.gov/submissions/CIK$1.json" | python3 -c "
import json,sys,re
d=json.load(sys.stdin); r=d['filings']['recent']
rows=[(r['filingDate'][i], r['form'][i], r['accessionNumber'][i], r['primaryDocument'][i])
      for i in range(len(r['form']))
      if r['filingDate'][i] >= '$SINCE' and re.match(r'$3', r['form'][i])]
print(f'  $2 新申報 since $SINCE: {len(rows)}')
for fd, fm, acc, doc in rows[:10]:
    print(' ', fd, fm.ljust(10), 'https://www.sec.gov/Archives/edgar/data/' + str(int('$1')) + '/' + acc.replace('-','') + '/' + doc)
"
}
grep_latest() { # $1=CIK $2=label $3=form regex $4...=grep terms
  cik="$1"; label="$2"; formre="$3"; shift 3
  url=$(curl -s -H "User-Agent: $UA" "https://data.sec.gov/submissions/CIK$cik.json" | python3 -c "
import json,sys,re
d=json.load(sys.stdin); r=d['filings']['recent']
for i in range(len(r['form'])):
    if re.match(r'$formre', r['form'][i]):
        print('https://www.sec.gov/Archives/edgar/data/' + str(int('$cik')) + '/' + r['accessionNumber'][i].replace('-','') + '/' + r['primaryDocument'][i]); break
")
  [ -z "$url" ] && { echo "  $label: 找不到目標申報"; return; }
  echo "  $label 最新檔: $url"
  curl -s -H "User-Agent: $UA" "$url" -o /tmp/oai_scan.html
  for term in "$@"; do
    echo "    '$term': $(grep -oic "$term" /tmp/oai_scan.html || true)"
  done
}

echo "OpenAI 風險儀表板 EDGAR 掃描 | 區間: $SINCE → $TODAY"

section "1. OpenAI 全市場新申報（S-1/F-1 出現＝最高優先）"
fts "%22OpenAI%22" "&forms=S-1,F-1,8-K,10-Q,10-K"

section "2. Microsoft (789019) — 權益法損益 + 注資進度"
recent "0000789019" "MSFT" "10-Q|10-K|8-K"
grep_latest "0000789019" "MSFT 10-Q 快篩" "10-Q|10-K" "OpenAI" "equity method" "funded" "dilution"

section "3. Oracle (1341439) — RPO"
recent "0001341439" "ORCL" "10-Q|10-K|8-K"

section "4. AMD (2488) — 1GW 部署 + 權證 vest"
recent "0000002488" "AMD" "10-Q|10-K|8-K"
grep_latest "0000002488" "AMD 10-Q 快篩" "10-Q|10-K" "OpenAI" "warrant" "vest" "Instinct"

section "5. Nvidia (1045810) — 間接營收措辭檢查"
recent "0001045810" "NVDA" "10-Q|10-K"
grep_latest "0001045810" "NVDA 10-Q 措辭" "10-Q|10-K" "AI research and deployment company" "indirectly"

section "6. DXYZ Destiny Tech100 (1843974) — OpenAI 標記"
recent "0001843974" "DXYZ" "N-PORT|NPORT-P|N-CSR|424|N-2"

section "7. CoreWeave (1769628) — 與 cohere skill 共用，僅列新檔"
recent "0001769628" "CRWV" "10-Q|10-K|8-K"

echo ""
echo "完成。接著執行 SKILL.md 步驟 2-4（B/C/D 層搜尋 → 燈號報告）。"
