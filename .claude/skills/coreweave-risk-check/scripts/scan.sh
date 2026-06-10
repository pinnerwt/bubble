#!/usr/bin/env bash
# CoreWeave 風險儀表板 — 申報掃描 + XBRL 自動數字
# 用法: scan.sh [上次檢查日 YYYY-MM-DD]（預設 30 天前）
set -uo pipefail
UA="research pgi squareznft@gmail.com"
SINCE="${1:-$(date -d '30 days ago' +%F 2>/dev/null || date -v-30d +%F)}"
TODAY=$(date +%F)
CIK="0001769628"

echo "CoreWeave 風險儀表板掃描 | 區間: $SINCE → $TODAY"

echo ""
echo "=== 1. CRWV 新申報（8-K 多半是新融資——記金額與票息）==="
curl -s -H "User-Agent: $UA" "https://data.sec.gov/submissions/CIK$CIK.json" -o /tmp/crwv_subs.json
python3 -c "
import json
d=json.load(open('/tmp/crwv_subs.json')); r=d['filings']['recent']
rows=[(r['filingDate'][i], r['form'][i], r['accessionNumber'][i], r['primaryDocument'][i])
      for i in range(len(r['form']))
      if r['filingDate'][i] >= '$SINCE' and r['form'][i] in ('10-Q','10-K','8-K','S-1','424B5')]
print(f'  新申報 since $SINCE: {len(rows)}')
for fd, fm, acc, doc in rows[:15]:
    print(' ', fd, fm.ljust(8), 'https://www.sec.gov/Archives/edgar/data/1769628/' + acc.replace('-','') + '/' + doc)
"

echo ""
echo "=== 2. XBRL 自動數字（近四期）==="
curl -s -H "User-Agent: $UA" "https://data.sec.gov/api/xbrl/companyfacts/CIK$CIK.json" -o /tmp/crwv_facts.json
python3 << 'EOF'
import json
d = json.load(open('/tmp/crwv_facts.json'))
gaap = d.get('facts', {}).get('us-gaap', {})

def show(label, tags, unit='USD', quarterly=True):
    for tag in tags:
        if tag in gaap and unit in gaap[tag].get('units', {}):
            vals = gaap[tag]['units'][unit]
            # 取 instant（資產負債表）或 duration（損益/現金流, 取 ~90 天期間）
            rows = []
            for v in vals:
                if 'start' in v:
                    from datetime import date
                    s = [int(x) for x in v['start'].split('-')]; e = [int(x) for x in v['end'].split('-')]
                    days = (date(*e) - date(*s)).days
                    if quarterly and not (80 <= days <= 100): continue
                rows.append((v['end'], v['val'], v.get('form','')))
            rows = sorted(set(rows), reverse=True)[:4]
            if rows:
                print(f'  {label} [{tag}]:')
                for end, val, form in rows:
                    print(f'    {end}  ${val/1e9:,.2f}B  ({form})')
                return
    print(f'  {label}: 無對應 XBRL 標籤（{tags[0]} 等）——改讀 10-Q 原文')

show('現金及約當現金', ['CashAndCashEquivalentsAtCarryingValue'])
show('流動債務', ['DebtCurrent','LongTermDebtCurrent'])
show('非流動債務', ['LongTermDebtNoncurrent'])
show('利息費用(季)', ['InterestExpenseNonoperating','InterestExpense','InterestIncomeExpenseNet'])
show('營收(季)', ['RevenueFromContractWithCustomerExcludingAssessedTax','Revenues'])
show('營運現金流(累計期間)', ['NetCashProvidedByUsedInOperatingActivities'], quarterly=False)
EOF

echo ""
echo "=== 3. 最新 10-Q/10-K 快篩（風險字樣）==="
url=$(python3 -c "
import json
d=json.load(open('/tmp/crwv_subs.json')); r=d['filings']['recent']
for i in range(len(r['form'])):
    if r['form'][i] in ('10-Q','10-K'):
        print('https://www.sec.gov/Archives/edgar/data/1769628/' + r['accessionNumber'][i].replace('-','') + '/' + r['primaryDocument'][i]); break
")
echo "  最新主檔: $url"
curl -s -H "User-Agent: $UA" "$url" -o /tmp/crwv_latest.html
for term in "going concern" "substantial doubt" "cash trap" "event of default" "allowance for credit losses" "useful life" "six years" "Customer A" "Customer B" "Customer C" "remaining performance obligations"; do
  echo "    '$term': $(grep -oic "$term" /tmp/crwv_latest.html || true)"
done

echo ""
echo "完成。接著執行 SKILL.md 步驟 2（市場信號搜尋 → 燈號報告）。"
