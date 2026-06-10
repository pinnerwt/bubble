#!/usr/bin/env bash
# Anthropic 風險儀表板 — EDGAR 掃描（A 層對手方/持有人申報）
# 用法: edgar_scan.sh [上次檢查日 YYYY-MM-DD]（預設 30 天前）
set -uo pipefail
UA="research pgi squareznft@gmail.com"
SINCE="${1:-$(date -d '30 days ago' +%F 2>/dev/null || date -v-30d +%F)}"
TODAY=$(date +%F)
FTS="https://efts.sec.gov/LATEST/search-index"

section() { echo ""; echo "=== $1 ==="; }
fts() {
  sleep 1  # 避免 EDGAR FTS 限流
  curl -s -H "User-Agent: $UA" "$FTS?q=$1&startdt=$SINCE&enddt=$TODAY$2" | python3 -c "
import json,sys
try: d=json.load(sys.stdin)
except Exception as e: print('  [fetch error]', e); sys.exit(0)
if 'hits' not in d:
    print('  [API 回應異常（可能限流），稍後重跑此段]', str(d)[:150]); sys.exit(0)
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
  curl -s -H "User-Agent: $UA" "$url" -o /tmp/anth_scan.html
  for term in "$@"; do
    echo "    '$term': $(grep -oic "$term" /tmp/anth_scan.html || true)"
  done
}

echo "Anthropic 風險儀表板 EDGAR 掃描 | 區間: $SINCE → $TODAY"

section "1. Anthropic 全市場新申報（S-1 公開版＝最高優先；Form D feeder＝二級需求訊號）"
fts "%22Anthropic%22" "&forms=S-1,F-1,8-K,10-Q,10-K,D"

section '2. Amazon (1018724) — Anthropic 持倉標記 + $20B 里程碑額度'
recent "0001018724" "AMZN" "10-Q|10-K|8-K"
grep_latest "0001018724" "AMZN 10-Q 快篩" "10-Q|10-K" "Anthropic" "Level 3" "convertible notes" "milestones"

section "3. Alphabet (1652044) — VIE 出資 + 股權衍生品"
recent "0001652044" "GOOGL" "10-Q|10-K|8-K"
grep_latest "0001652044" "GOOGL 10-Q 快篩" "10-Q|10-K" "variable interest" "equity derivative" "funding commitment"

section "4. Broadcom (1730168) — RVG 是否現形（Q2 FY26 10-Q 重點）"
recent "0001730168" "AVGO" "10-Q|10-K|8-K"
grep_latest "0001730168" "AVGO 最新 10-Q 快篩" "10-Q|10-K" "Anthropic" "residual value" "guarantee" "TPU" "credit support"

section "5. CoreWeave (1769628) — Anthropic 協議進展"
recent "0001769628" "CRWV" "10-Q|10-K|8-K"

section "6. 基金 NPORT 中的 Anthropic 標記（獨立每股估值）"
fts "%22Anthropic%22" "&forms=NPORT-P"

echo ""
echo "完成。接著執行 SKILL.md 步驟 2-3（B/C 層搜尋 → 燈號報告）。"
