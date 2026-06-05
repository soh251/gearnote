## プロジェクト概要
楽器レビューアフィリエイトサイト（Astro v6.4.3製）
Amazonアフィリエイトタグ: `gearnoteguitar-22`

## 記事数の現状（合計54本）
- エレキギター: 22本 ✅（グレッチシリーズ7本含む）
- エフェクター: 17本 ✅
- アンプ: 8本 ✅
- アコースティックギター: 4本 ✅
- DTM機材: 1本（要追加）
- 初心者ガイド: 2本（要追加）

## 次のタスク
1. DTM機材の記事を追加する（オーディオI/F、MIDIキーボード、モニタースピーカー）
2. 初心者ガイドの追加（ギター弦の交換、チューニング方法）

---

## 技術仕様

### フロントマターのルール
- `publishedAt`: 2026年に統一（全記事設定済み）
- `thumbnail`: 記事カード用画像URL（全記事設定済み）
- `products[].image`: 商品カード内の画像URL（Amazonまたはサウンドハウスの画像URLを使用）

### 記事タイプの判定（パス・ファイル名ベース、スキーマ変更なし）
- `/hub/` → ガイド記事
- `/category/` → まとめ記事
- ファイル名が `-guide` で終わる → ガイド記事
- ファイル名に `-comparison` または `-vs-` を含む → まとめ記事

### UIのデザイン決定
- アクセントカラー: `#E65100`（オレンジ）
- 薄いオレンジ背景: `#FFF3E0`
- ヘッダーのアクティブ状態: `bg-[#FFF3E0] text-[#E65100]`
- トップページ: 「初心者はここから」（ガイド記事上位9本）＋「新着レビュー」（12本）
- カテゴリページ: 「まず読みたい記事」（ガイド）＋「個別レビュー」に分割
- サブナビ（カテゴリタブ）は削除済み

### 初心者向け記事の優先順位（guidePriority）
0. `category: beginners-guide`
1. ファイル名に `category-guide` を含む
2. ファイル名に `-vs-` または `-comparison` を含む
3. `/hub/` パス
4. `/category/` パス
5. その他の `-guide` ファイル

---

## 価格管理のルール
- 価格は価格.comまたはサウンドハウスの実売価格を基準にする
- Amazonは503エラーが多いため、価格.com（search.kakaku.com）またはWebSearchで確認する
- 円安・値上がりにより旧価格との乖離が大きい（特にグレッチ系）

### 確認済み実売価格（2026年6月時点）
**エフェクター**
- BOSS DS-1: ¥9,350〜
- BOSS SD-1: ¥8,900〜
- BOSS TU-3: ¥12,100〜
- BOSS CH-1: ¥14,400〜
- MXR M102: ¥16,200〜
- BOSS DD-3T: ¥18,500〜
- BOSS RV-6: ¥18,800〜

**アンプ**
- BOSS Katana-50 GEN 3: ¥42,800〜

**グレッチ**
- G2622 Streamliner: ¥77,000〜¥85,000
- G5410T Rat Rod: ¥104,800〜¥110,000
- G5422 Electromatic: ¥119,900〜¥148,000
- G6120T Players Edition Nashville: ¥278,000〜

---

## グレッチ記事構成
```
guitars/gretsch/
  hub/gretsch-guide.md              # 入門ガイド（ハブ）
  category/gretsch-budget-guide.md  # 予算別おすすめ5選
  individual/
    gretsch-g2622-review.md         # G2622レビュー
    gretsch-g5410t-review.md        # G5410Tレビュー
    gretsch-g5422-review.md         # G5422レビュー
    gretsch-g6120-review.md         # G6120レビュー
    gretsch-beginner-comparison.md  # G2420・G2622・G2655比較
```
※ gretsch-effector-pairing.md は削除済み

---

## 過去に対応したこと
- 全記事の価格を実売価格に修正（DS-1・SD-1・TU-3・CH-1・MXR・DD-3T・RV-6・Katana・グレッチ全機種）
- UIデザイン改善（サブナビ削除・カテゴリページ分割・初心者セクション追加）
- electric-guitar-beginners-guide をハブ記事に書き直し（内部リンク追加）
- 全記事にthumbnailを設定
- 各記事のproducts[].imageを設定（Amazon/サウンドハウス画像URL）
- 全記事のpublishedAtを2026年に統一
