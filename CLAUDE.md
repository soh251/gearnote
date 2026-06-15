## プロジェクト概要
楽器レビューアフィリエイトサイト（Astro v6.4.3製）
Amazonアフィリエイトタグ: `gearnoteguitar-22`

## 記事数の現状（合計96本・category別）
- エレキギター（electric-guitar）: 49本 ✅（グレッチ7・Gibson系・変形ギター4・国産ヴィンテージ8・比較記事・予算別カテゴリ3階層 等を含む）
- エフェクター（effector）: 22本 ✅（マルチエフェクター含む）
- アンプ（amp）: 12本 ✅
- アコースティックギター（acoustic-guitar）: 5本 ✅
- DTM機材（dtm）: 4本 ✅
- 初心者ガイド（beginners-guide）: 4本 ✅（エレキ入門・エフェクターボード・チューニング・弦交換）

## 差別化方針（2026-06-15確定）
競合「エレキギター博士」(法人・総合情報サイト)とは網羅性で戦わない。
- **主軸**: ①「結局どっち」比較特化 ②中古・ジャパンヴィンテージ
- **脇役（収益の網）**: 便利グッズ・困り事解決（主役にしない。実体験を一滴入れて量産品化を避ける）
- **土台**: 個別レビュー（信頼性の基盤）
- **避ける**: 奏法・コード・音楽理論・練習曲
- 差別化はテーマでなく「切り口＝一人称の実体験＋ニッチ深掘り」から。星評価なし・「機材沼」「沼」表現は使わない
- ※詳細はメモリ `project_differentiation_strategy.md` にも記録

## 次のタスク
（現在の優先タスクなし。比較／中古ニッチを主軸に随時記事追加・価格更新）

---

## 技術仕様

### フロントマターのルール
- `publishedAt`: 2026年に統一（全記事設定済み）
- `thumbnail`: 記事カード用画像URL（全記事設定済み）
- `rating`: フィールドは残置だが表示はしない（2026-06-13全記事から星評価を撤去）
- `products[].image`: 商品カード内の画像URL（Amazonまたはサウンドハウスの画像URLを使用）
- `products[].ikebeUrl`: イケベ楽器中古検索URL（全記事設定済み）
- `products[].ishibashiUrl`: イシバシ楽器中古検索URL（全記事設定済み）

### keywordsフィールド（content.config.ts）
- `keywords: z.array(z.string()).optional()` — 日英両方の検索キーワードを配列で設定
- ArticleLayout.astro で `<div class="sr-only">` として出力 → Pagefindがインデックス化
- 全73記事に設定済み（エピフォン↔Epiphone、レスポール↔Les Paul 等）

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
- サイトロゴ: `public/logo.png`（ギターピック型・G+音符デザイン・オレンジ）
- ファビコン: `public/favicon.png`（同上）
- サイトキャッチコピー: 「GearNote — ギター機材レビューと比較情報」
  - トップページ説明バー・meta description・ヘッダーロゴ下に表示
- ヘッダー検索フォーム: デスクトップはインライン入力欄、モバイルはハンバーガーメニュー内

### ProductCard.astro のボタン構成
Amazon・Soundhouse・イケベ・イシバシの4ボタン。全てグレー（bg-white + border）で統一。
- Amazon: `amazonUrl` prop
- サウンドハウス: `soundhouseUrl` prop（プレースホルダー運用中）
  - `soundhouseUrl` が `[AFFILIATE_SOUNDHOUSE` で始まる場合はボタン非表示（ProductCard.astroで分岐済み）
  - 国産ヴィンテージ5記事のMarkdown本文内プレースホルダーはHTMLコメント化済み
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
**マルチエフェクター**
- BOSS GT-1: ¥22,000〜
- ZOOM G1X FOUR: ¥15,000〜
- Line 6 Pod Go: ¥55,000〜

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
- ORANGE Crush 20: ¥15,400〜
- Marshall MG: ¥22,000〜
- Fender Mustang GTX: ¥60,500〜
- Marshall DSL: ¥88,000〜
- Vox AC30C2: ¥157,800〜

**本格エレキ（10万円〜）**
- Fender Player Stratocaster: ¥97,800〜
- Gibson Les Paul Junior: ¥154,000〜
- Gibson SG Standard: ¥253,000〜
- Gibson Les Paul Standard: ¥330,000〜

**アコギ**
- Yamaha FG800: ¥27,500〜
- Fender CD-60S: ¥33,000〜
- Taylor GS Mini: ¥89,900〜
- Martin D-28: ¥239,800〜

**Gibson変形ギター**
- Gibson 70s Flying V: ¥313,500〜
- Epiphone Flying V: ¥94,600〜
- Gibson Firebird: ¥280,000〜
- Epiphone Firebird: ¥90,000〜
- Gibson Explorer: ¥220,000〜
- Epiphone Explorer: ¥80,000〜

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
      category/over-100000.md          # 10万円以上おすすめ（本格派）
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
      individual/gibson-flying-v-review.md        # Gibson+Epiphone両方掲載
      individual/gibson-firebird-review.md
      individual/gibson-explorer-review.md
      category/gibson-unusual-shapes.md           # 変形ギター3機種まとめ比較
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
    hub/multi-effects-guide.md           # マルチエフェクター選び方ガイド
    category/multi-vs-compact.md         # マルチ vs コンパクト比較
    individual/boss-bd2-review.md
    individual/boss-ge7-booster.md
    individual/ibanez-ts9-booster.md
    individual/boss-gt1-review.md        # BOSS GT-1（2026-06-13追加）
    individual/zoom-g1xfour-review.md    # ZOOM G1X FOUR（入門・1万円台）
    individual/line6-podgo-review.md     # Line 6 Pod Go
  guitars/
    gibson/
      category/gibson-vs-epiphone.md     # Gibson vs Epiphone 比較コラム（2026-06-12追加）

  # ルート直下の主なガイド/比較記事（2026-06-15追加分）
  les-paul-vs-stratocaster.md            # 比較（偏愛宣言オチ）
  squier-vs-epiphone.md                  # 比較（入門ブランド対決）
  used-guitar-buying-guide.md            # 中古ギターの選び方（中古軸の柱）
  budget-guitar-guide.md                 # 予算別エレキ（ハブ）
  budget-acoustic-guide.md               # 予算別アコギ
  budget-amp-guide.md                    # 予算別アンプ
  guitar-accessories-guide.md            # アクセサリー完全ガイド
  guitar-strings-guide.md                # 弦の選び方
  guitar-noise-guide.md                  # ノイズ対策（困り事）
  live-guitar-gear-guide.md              # ライブ便利グッズ
  guitar-tuning-guide.md / string-change-guide.md  # 初心者ガイド
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
  - thumbnail はAI生成画像（フラットデザイン・ヴィンテージ風）を /images/ に設定済み
  - 検索ワードはメーカー名のみ（Greco・Burny・Grassroots）またはブランド+カテゴリ（TOKAI+レスポール）
- 全記事タイトルから「【2026年版】」を削除
- アンプ記事4本のサムネイルをAI生成画像（フラットデザイン・オレンジ系）に変更
  - public/images/amp-guide.png・home-practice-amp.png・recording-amp.png・studio-live-amp.png
- Pagefind による全文検索機能を追加（/search ページ・ヘッダーインライン検索フォーム）
  - ビルドコマンド: `astro build && pagefind --site dist`
  - 日英キーワードで検索可能（keywordsフィールド経由）
- 記事本文内の外部リンク（http/https）を新しいタブで開くよう変更（ArticleLayout.astro）
- 全73記事に keywords フィールドを追加（日英両方の検索ワード）
- Gibson変形ギター記事4本追加（guitars/gibson/）
  - Flying V・Firebird・Explorer 各個別レビュー（Gibson版+Epiphone版両方掲載）
  - gibson-unusual-shapes.md（3機種まとめ比較）
- サイトロゴを新デザインに更新（ギターピック型・G+音符・オレンジ）
  - public/logo.png・public/favicon.png
- サイトキャッチコピー追加：「GearNote — ギター機材レビューと比較情報」
- Soundhouseプレースホルダーリンク切れを修正（ProductCard.astroで分岐・国産5記事のMarkdownをコメント化）
- sr-only CSSをglobal.cssに明示定義（Tailwind v4でキーワードが本文に表示される不具合を修正）
- PR広告表記をArticleLayout最上部に統一（全Markdownから削除、レイアウトで一元管理）
- 法務・運営者ページ4本追加（/privacy・/disclaimer・/contact・/about）
  - /contact はGoogleフォームURL設定済み
  - /about に「ちゃんそう」プロフィール文設定済み
- フッターのhref="#"リンクを実URLに修正・「運営者情報」リンク追加
- under-30000.mdの【2024年版】→【2026年版】に修正
- 全記事から星評価（StarRating）を撤去（ArticleCard・ArticleLayout両方）
  - 新規記事にratingフィールドは設定しない方針
- Gibson vs Epiphone 比較コラム追加（guitars/gibson/category/gibson-vs-epiphone.md）
  - 管理人「ちゃんそう」の実体験ベースの一人称コラム形式
- マルチエフェクター記事5本追加（effectors/）
  - hub/multi-effects-guide.md・category/multi-vs-compact.md
  - individual/boss-gt1-review.md・zoom-g1xfour-review.md・line6-podgo-review.md
  - 各記事に筆者見解を追記

### 2026-06-14〜15 セッション（差別化方針の本格始動）
- 初心者ガイド2本追加（guitar-tuning-guide・string-change-guide）。本人の体験談・語呂を反映
- 販売終了のZoom G3Xn記事をZOOM G1X FOUR（¥15,000〜）に差し替え（関連リンク・hub・比較記事も更新）
- orange-amp-guide を Rocker 15 Terror→ORANGE Crush 20（¥15,400〜）の単体レビューに作り替え
- 全記事の products[].image 未設定を補完（マルチ系・spatial・gibson-vs-epiphone 等）
- **比較クラスタ**: les-paul-vs-stratocaster（偏愛宣言オチ付き）・squier-vs-epiphone を追加
- **中古クラスタ**: used-guitar-buying-guide（全中古共通のチェックポイント柱記事）を追加
- **予算別クラスタ**: budget-guitar-guide（ハブ）・guitars/electric/category/over-100000（価格3階層完成）・budget-acoustic-guide・budget-amp-guide
- **便利グッズ/困り事クラスタ**: guitar-accessories-guide・guitar-noise-guide・guitar-strings-guide・live-guitar-gear-guide
  - 便利グッズ系は空ProductCardを作らず、本文にAmazonアフィリ検索リンク（tag=gearnoteguitar-22）を埋め込む方式
- 「機材沼」「沼」表現を全記事・プロフィールから削除（本人の意向）
- 差別化方針を確定しメモリ（project_differentiation_strategy.md）に記録
