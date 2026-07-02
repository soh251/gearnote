---
description: 月次の記事企画を生成する。keyword-planner→competitor-analystを順に実行し、企画カード一式を作って停止する（採用判断はオーナー）。
---

# 月次企画の生成

GearNoteの月次記事企画を、以下の順で実行してください。**企画カードの生成までで停止**します。記事本文の作成や記事ファイルの編集は行いません。

## 手順

1. **keyword-planner** を Agent として起動する。
   - 差別化方針（比較・悩み・中古の3系統／奏法・理論は除外）に沿ってWebSearchでキーワード候補を発掘し、既存記事と重複除外のうえ `planning/keyword-candidates-YYYY-MM.md`（当月）に企画カードを出力させる。

2. keyword-plannerの完了後、**competitor-analyst** を Agent として起動する。
   - 生成された企画カードの各キーワードをWebSearch/WebFetchで競合分析し、勝算評価（高/中/低）と差別化の切り口を同じ企画カードに追記させる。

3. 両方の完了後、**勝算「高」の企画を優先度順に並べてオーナーに要約報告**する。

## 停止条件・制約
- ここで**停止**する。experience-interviewer（Phase 3）はオーナーが企画を採用してから、個別に指示があったときだけ実行する。
- 記事ファイル（`src/content/articles/`）は作成・修正しない。成果物は `planning/` 配下の企画カードのみ。
- 年号ラベル・星評価・「機材沼」表現は企画段階から使わない。
