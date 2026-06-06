#!/usr/bin/env bash
# SoftBank 風險儀表板 — 官方數字 + Arm 申報掃描
# 用法: scan.sh [上次檢查日 YYYY-MM-DD]（預設 30 天前）
set -uo pipefail
UA="research pgi squareznft@gmail.com"
SINCE="${1:-$(date -d '30 days ago' +%F 2>/dev/null || date -v-30d +%F)}"
TODAY=$(date +%F)

echo "SoftBank 風險儀表板掃描 | 區間: $SINCE → $TODAY"

echo ""
echo "=== 1. 官方 SOTP（NAV / LTV / 淨債）==="
curl -s -H "User-Agent: Mozilla/5.0 (research; squareznft@gmail.com)" "https://group.softbank/en/ir/stock/sotp" -o /tmp/sb_sotp.html
python3 << 'EOF'
import re, html
try:
    t = open('/tmp/sb_sotp.html', encoding='utf-8', errors='ignore').read()
    t2 = re.sub(r'<[^>]+>', ' ', t); t2 = html.unescape(t2); t2 = re.sub(r'[\s\xa0]+', ' ', t2)
    found = False
    for label in ['NAV', 'LTV', 'Net Debt', 'Equity Value of Holdings']:
        for m in list(re.finditer(label, t2))[:2]:
            print(' ', t2[max(0,m.start()-40):m.end()+90].strip())
            found = True
    if not found:
        print('  [頁面可能改版或 JS 渲染——改用 WebFetch https://group.softbank/en/ir/stock/sotp]')
except Exception as e:
    print('  [parse error]', e, '——改用 WebFetch')
EOF

echo ""
echo "=== 2. Arm Holdings (CIK 1973239) 新申報（NAV 最大成分）==="
curl -s -H "User-Agent: $UA" "https://data.sec.gov/submissions/CIK0001973239.json" | python3 -c "
import json,sys
d=json.load(sys.stdin); r=d['filings']['recent']
rows=[(r['filingDate'][i], r['form'][i], r['accessionNumber'][i], r['primaryDocument'][i])
      for i in range(len(r['form'])) if r['filingDate'][i] >= '$SINCE']
print(f'  Arm 新申報 since $SINCE: {len(rows)}')
for fd, fm, acc, doc in rows[:10]:
    print(' ', fd, fm.ljust(12), 'https://www.sec.gov/Archives/edgar/data/1973239/' + acc.replace('-','') + '/' + doc)
"

echo ""
echo "=== 3. EDGAR FTS: SoftBank 出現在他人申報（資產交易痕跡, 8-K/SC 13D/G）==="
curl -s -H "User-Agent: $UA" "https://efts.sec.gov/LATEST/search-index?q=%22SoftBank%22&forms=8-K,SC%2013D,SC%2013G&startdt=$SINCE&enddt=$TODAY" | python3 -c "
import json,sys
try: d=json.load(sys.stdin)
except Exception as e: print('  [fetch error]', e); sys.exit(0)
print(f'  hits since $SINCE: {d[\"hits\"][\"total\"][\"value\"]}')
for h in d['hits']['hits'][:12]:
    s=h['_source']
    print(' ', s['file_date'], s['form'].ljust(8), '|', ', '.join(s['display_names'])[:70])
"

echo ""
echo "=== 4. 財報 PDF 提示 ==="
echo "  財報季（5/8/11/2 月）手動確認最新季報/簡報："
echo "  https://group.softbank/en/ir/financials"
echo ""
echo "完成。接著執行 SKILL.md 步驟 2-3（新聞搜尋 → 燈號報告）。"
