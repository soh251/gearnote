---
description: 運用メンテナンスを実行する。gsc-planner（CSVがあれば）とprice-patrolを走らせ、改稿プランと価格チェックのレポートを出力する。
---

# 運用メンテナンス

GearNoteの既存記事のメンテナンスを、以下を実行して行ってください。**レポート出力のみ**で、記事ファイルの修正はしません。

## 手順

1. **gsc-planner** を Agent として起動する。
   - `reports/gsc-export.csv` があれば、11〜30位かつ表示回数の多いクエリを抽出し、該当記事の改稿指示を `planning/rewrite-plan-YYYY-MM.md`（当月）に優先度順で出力させる。
   - CSVが**無い**場合は、その旨と「Search Consoleからエクスポートして `reports/gsc-export.csv` に置いてください」という案内だけを報告させ、この手順はスキップする（捏造しない）。

2. **price-patrol** を Agent として起動する。
   - CLAUDE.mdの確認済み実売価格を基準に、WebSearchで現在価格を確認し、±15%以上乖離した商品と該当記事を `reports/price-check-YYYY-MM.md` に出力させる（検出のみ）。

3. 両レポートの要点（改稿優先3件・要更新価格の商品）をオーナーに要約報告する。

## 制約
- 記事ファイル（`src/content/articles/`）や価格の書き換えは**しない**。実修正はオーナー承認後にメインセッションで行う。
- 星評価・「機材沼」表現・年号ラベルは改稿案でも使わない。
