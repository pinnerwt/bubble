#!/usr/bin/env bash
# Cohere 風險儀表板 — EDGAR 掃描（確定性部分）
# 用法: edgar_scan.sh [上次檢查日 YYYY-MM-DD]（預設 30 天前）
set -uo pipefail
UA="research pgi squareznft@gmail.com"
SINCE="${1:-$(date -d '30 days ago' +%F 2>/dev/null || date -v-30d +%F)}"
TODAY=$(date +%F)
FTS="https://efts.sec.gov/LATEST/search-index"

section() { echo ""; echo "=== $1 ==="; }
fts() { # $1=query $2=extra params
  curl -s -H "User-Agent: $UA" "$FTS?q=$1&startdt=$SINCE&enddt=$TODAY$2" | python3 -c "
import json,sys
try: d=json.load(sys.stdin)
except Exception as e: print('  [fetch error]', e); sys.exit(0)
total=d['hits']['total']['value']
print(f'  hits since $SINCE: {total}')
for h in d['hits']['hits'][:12]:
    s=h['_source']
    print(' ', s['file_date'], s['form'].ljust(10), '|', ', '.join(s['display_names'])[:70])
"
}
recent() { # $1=CIK $2=label $3=form regex
  curl -s -H "User-Agent: $UA" "https://data.sec.gov/submissions/CIK$1.json" | python3 -c "
import json,sys,re
d=json.load(sys.stdin); r=d['filings']['recent']
rows=[(r['filingDate'][i], r['form'][i], r['accessionNumber'][i], r['primaryDocument'][i])
      for i in range(len(r['form']))
      if r['filingDate'][i] >= '$SINCE' and re.match(r'$3', r['form'][i])]
print(f'  $2 新申報 since $SINCE: {len(rows)}')
for fd, fm, acc, doc in rows[:15]:
    print(' ', fd, fm.ljust(10), 'https://www.sec.gov/Archives/edgar/data/' + str(int('$1')) + '/' + acc.replace('-','') + '/' + doc)
"
}

echo "Cohere 風險儀表板 EDGAR 掃描 | 區間: $SINCE → $TODAY"

section "1. Cohere 全市場新申報（S-1/F-1 出現＝重大）"
fts "%22Cohere%22" ""

section "2. Private Shares Fund (CIK 1557265) — NPORT-P 估值標記來源"
recent "0001557265" "Private Shares Fund" "NPORT-P|N-CSR"

section "3. Buttonwood First Access Fund (CIK 2104046)"
recent "0002104046" "Buttonwood" "N-2|NPORT-P|N-CSR"

section "4. CoreWeave (CIK 1769628) — 8-K/10-Q"
recent "0001769628" "CoreWeave" "8-K|10-Q|10-K"

section "5. Monroe Capital BDC（疑似 Cohere 創投債持倉，獨立標記來源）"
recent "0001742313" "Monroe Income Plus" "10-Q|10-K"
recent "0002061670" "Monroe Enhanced" "10-Q|10-K"

section "6. CoreWeave 最新 10-Q/10-K 風險字樣快篩（cash trap / termination / allowance）"
curl -s -H "User-Agent: $UA" "https://data.sec.gov/submissions/CIK0001769628.json" | python3 -c "
import json,sys
d=json.load(sys.stdin); r=d['filings']['recent']
for i in range(len(r['form'])):
    if r['form'][i] in ('10-Q','10-K'):
        print('https://www.sec.gov/Archives/edgar/data/1769628/' + r['accessionNumber'][i].replace('-','') + '/' + r['primaryDocument'][i])
        break
" | while read -r url; do
  echo "  最新主檔: $url"
  curl -s -H "User-Agent: $UA" "$url" -o /tmp/crwv_latest.html
  for term in "cash trap" "Cash Trap Event" "termination of the" "allowance for credit losses" "event of default" "Customer A" "Customer B" "Customer C"; do
    n=$(grep -oic "$term" /tmp/crwv_latest.html || true)
    echo "    '$term': $n"
  done
done

echo ""
echo "完成。接著執行 SKILL.md 步驟 2-4（新聞與市場信號 → 燈號報告）。"
