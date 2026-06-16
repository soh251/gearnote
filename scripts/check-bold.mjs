// ビルド済みHTMLに、太字化されず文字として残った "**" がないか検査する。
// 原因: CommonMark のフランキング規則により、** の開始直後 / 終了直前に
// 日本語の記号（「」（）『』〜' など）が来ると太字として認識されず ** が残る。
// 対策: 記事本文で `**「…」**` → `「**…**」`、`**語（注釈）**` → `**語**（注釈）` のように
//       ** を記号の外側へ置く。詳細は CLAUDE.md「太字（**）の書き方ルール」を参照。
//
// このスクリプトは render 後の dist を見るので、書き方の正誤を確実に判定できる。
// 残存を見つけたら一覧を表示して非ゼロ終了し、ビルドを失敗させる。

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const DIST = "dist";

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) {
      // pagefind の生成物（検索UI/インデックス）は対象外
      if (name === "pagefind") continue;
      out.push(...walk(p));
    } else if (name.endsWith(".html")) {
      out.push(p);
    }
  }
  return out;
}

// <script> と <style> の中身は除外（GA や pagefind-ui の初期化コードに ** が含まれうるため）
function stripCode(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "");
}

const hits = [];
for (const file of walk(DIST)) {
  const body = stripCode(readFileSync(file, "utf8"));
  let idx = body.indexOf("**");
  while (idx !== -1) {
    const snippet = body.slice(idx, idx + 40).replace(/\s+/g, " ");
    hits.push(`${file}: …${snippet}…`);
    idx = body.indexOf("**", idx + 2);
  }
}

if (hits.length) {
  console.error(
    `\n✗ 太字にならず "**" が残っている箇所が ${hits.length} 件あります:\n`
  );
  for (const h of hits) console.error("  " + h);
  console.error(
    '\n修正方法: ** を日本語の記号の外側へ。例 `**「A」**` → `「**A**」` / `**B（注）**` → `**B**（注）`\n'
  );
  process.exit(1);
}

console.log("✓ bold check: 残存する ** はありません");
