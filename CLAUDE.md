## プロジェクト概要
楽器レビューアフィリエイトサイト（Astro v6.4.3製）
Amazonアフィリエイトタグ: `gearnoteguitar-22`

## 記事数の現状（合計70本）
- エレキギター: 22本 ✅（グレッチシリーズ7本・Gibsonコラム1本含む）
- 国産ヴィンテージギター: 8本 ✅（guitars/domestic/ 以下）
- エフェクター: 17本 ✅
- アンプ: 10本 ✅
- アコースティックギター: 4本 ✅
- DTM機材: 4本 ✅（Scarlett Solo + DTM入門ガイド + MOTU M2 + モニタースピーカーガイド）
- 初心者ガイド: 2本（要追加）

## 次のタスク
1. 初心者ガイドの追加（ギター弦の交換、チューニング方法）

---

## 技術仕様

### フロントマターのルール
- `publishedAt`: 2026年に統一（全記事設定済み）
- `thumbnail`: 記事カード用画像URL（全記事設定済み）
- `products[].image`: 商品カード内の画像URL（Amazonまたはサウンドハウスの画像URLを使用）
- `products[].ikebeUrl`: イケベ楽器中古検索URL（全記事設定済み）
- `products[].ishibashiUrl`: イシバシ楽器中古検索URL（全記事設定済み）

### productsスキーマ（content.config.ts）
```ts
products: z.array(z.object({
  name: z.string(),
  price: z.string(),
  amazonUrl: z.string().optional(),
  soundhouseUrl: z.string().optional(),
  ikebeUrl: z.string().optional(),
  ishibashiUrl: z.string().optional(),
  image: z.string().optional(),
  specs: z.record(z.string()).optional(),
})).optional()
```

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

### ProductCard.astro のボタン構成
Amazon・Soundhouse・イケベ・イシバシの4ボタン。全てグレー（bg-white + border）で統一。
- Amazon: `amazonUrl` prop
- サウンドハウス: `soundhouseUrl` prop（プレースホルダー運用中）
- イケベ楽器で探す: `ikebeUrl` prop（A8.net経由）
- イシバシ楽器で探す: `ishibashiUrl` prop（A8.net経由）

### 初心者向け記事の優先順位（guidePriority）
0. `category: beginners-guide`
1. ファイル名に `category-guide` を含む
2. ファイル名に `-vs-` または `-comparison` を含む
3. `/hub/` パス
4. `/category/` パス
5. その他の `-guide` ファイル

---

## アフィリエイトリンク生成ルール

### Amazon
```
https://www.amazon.co.jp/s?k={ブランド}+{型番}&tag=gearnoteguitar-22
```

### サウンドハウス（プレースホルダー）
```
[AFFILIATE_SOUNDHOUSE_ブランド_型番]
```

### イケベ楽器（A8.net: `4B5Q82+7EQ8KA+5KFA+BW0YB`）
- キーワード順: **型番+ブランド**（大文字）
- `+` は `%2B` にエンコード
```
https://px.a8.net/svt/ejp?a8mat=4B5Q82+7EQ8KA+5KFA+BW0YB&a8ejpredirect=https%3A%2F%2Fwww.ikebe-gakki.com%2FForm%2FProduct%2FProductList.aspx%3Fshop%3D0%26cat%3D%26bid%3Dec%26dpcnt%3D20%26img%3D1%26sort%3D07%26udns%3D1%26fpfl%3D0%26sfl%3D0%26pno%3D1%26swrd%3D{型番}%2B{ブランド}
```

### イシバシ楽器（A8.net: `4B5Q82+7FBO62+F14+BW0YB`）
- キーワード順: **ブランド+型番**（小文字）
- `+` は `%2B` にエンコード
```
https://px.a8.net/svt/ejp?a8mat=4B5Q82+7FBO62+F14+BW0YB&a8ejpredirect=https%3A%2F%2Fstore.ishibashi.co.jp%2Fsearch%3Fsort%3DNumber1%26q%3D{ブランド}%2B{型番}
```

---

## 価格管理のルール
- 価格は価格.comまたはサウンドハウスの実売価格を基準にする
- Amazonは503エラーが多いため、価格.com（search.kakaku.com）またはWebSearchで確認する
- 円安・値上がりにより旧価格との乖離が大きい（特にグレッチ系）
- 記事タイトルの年号は必ず **2026年** にする

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

## ディレクトリ構成（主要部分）

```
src/content/articles/
  guitars/
    electric/
      category/under-30000.md          # 3万円以下おすすめ3選
      category/30000-80000.md          # 3〜10万円台おすすめ7選
      individual/playtech-st250.md
      individual/squier-affinity-tele.md
    gretsch/
      hub/gretsch-guide.md
      category/gretsch-budget-guide.md
      individual/gretsch-g2622-review.md
      individual/gretsch-g5410t-review.md
      individual/gretsch-g5422-review.md
      individual/gretsch-g6120-review.md
      individual/gretsch-beginner-comparison.md
    gibson/
      individual/gibson-robot-guitar-history.md  # コラム記事
    domestic/                                     # 国産ヴィンテージ（2026-06-07追加）
      hub/japan-vintage-guitar-guide.md           # ハブ：ブランド比較・選び方
      category/gibson-copy-japan.md              # Gibson系コピー比較
      category/fender-copy-japan.md              # Fender系コピー比較
      individual/tokai-love-rock-review.md
      individual/greco-eg-review.md
      individual/burny-rlc-review.md
      individual/tokai-goldstar-review.md
      individual/grassroots-glp-review.md
  amps/
    hub/amp-guide.md
    category/home-practice.md          # 自宅練習用3選
    category/studio-live.md            # スタジオ・ライブ用2選
    category/recording.md              # レコーディング用2選
  dtm/
    hub/dtm-beginners-guide.md
    category/monitor-speaker-guide.md
    individual/motu-m2-review.md
  effectors/
    individual/boss-bd2-review.md
    individual/boss-ge7-booster.md
    individual/ibanez-ts9-booster.md
```

---

## 過去に対応したこと
- 全記事の価格を実売価格に修正
- UIデザイン改善（サブナビ削除・カテゴリページ分割・初心者セクション追加）
- electric-guitar-beginners-guide をハブ記事に書き直し
- 全記事に thumbnail・products[].image を設定
- 全記事の publishedAt を2026年に統一
- beginners-guide カテゴリページを全カテゴリのガイド記事を集約する形に修正
- ProductCard に ikebeUrl・ishibashiUrl ボタンを追加
- 全記事の products に ikebeUrl・ishibashiUrl を一括追加
- 自宅練習用アンプ記事の重複解消（home-practice-amp-guide.md を削除、amps/category/home-practice.md に統一）
- gibson-robot-guitar-history の category を guitars → electric-guitar に修正
- Google Analytics（GA4: G-V0SPGPCGWM）タグを BaseLayout.astro に追加（全ページ対応）
- Google Search Console 確認ファイルを public/ に追加
- 国産ヴィンテージギター記事8本を guitars/domestic/ に追加（トーカイ・グレコ・Burny・グラスルーツ）
  - 購入リンクは記事本文に「中古優先」形式で記載（ProductCard非使用）
  - thumbnail は未設定（要追加）
  - 検索ワードはメーカー名のみ（Greco・Burny・Grassroots）またはブランド+カテゴリ（TOKAI+レスポール）
