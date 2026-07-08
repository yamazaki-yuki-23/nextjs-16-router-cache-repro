# nextjs-16-router-cache-repro

Next.js 16.2 で、同じキーを複数回並べる検索パラメータ（例: `?tag=react&tag=nextjs`）を
使ったフィルタUIで発生するクライアントルーターキャッシュのバグを再現する最小プロジェクトです。

関連 Issue: [vercel/next.js#92152](https://github.com/vercel/next.js/issues/92152)

## 症状

タグのチェックボックス（複数選択）で `?tag=react&tag=nextjs` のように2つ選んだ状態から、
**末尾ではない方**（この例では `react`）のチェックを外すと、

- URL は `?tag=nextjs` に変わる
- しかし一覧の表示は古いまま更新されない（`react` のチェックも外れない）
- `Suspense` の `読み込み中...` も表示されない

一方、**末尾の値**（`nextjs`）を外す場合は正しく更新されます。
また、バグが起きた状態でページをリロードするとサーバーは正しく描画するため、
これはサーバーではなくクライアントのルーターキャッシュの問題だと分かります。

## ブランチ構成

| ブランチ | Next.js | 挙動 |
|---|---|---|
| `main` | 16.1.7 | 正常（末尾でない値を外しても正しく更新される） |
| `repro/16.2-bug` | 16.2.10 | バグが再現する |

## 再現手順

Node は Volta で固定しています（`node@24.16.0`）。

```bash
# バグを再現する
git checkout repro/16.2-bug
npm install
npm run build && npm start
```

1. http://localhost:3000/articles?tag=react&tag=nextjs を開く
2. `react` のチェックを外す
3. URL は `?tag=nextjs` に変わるが、一覧が更新されない（6件のまま）

```bash
# 16.1 では直っていることを確認する
git checkout main
npm install
npm run build && npm start
```

同じ手順で、今度は一覧が3件に正しく更新される。

> [!NOTE]
> `next dev` では再現しません。`next build && next start`（本番ビルド）で確認してください。

## 原因（概要）

クライアント側でページキャッシュのキーを作るとき、
`Object.fromEntries(new URLSearchParams(...))` を使っている箇所があり、
同じキーが複数回現れると最後の値だけに潰れてしまいます。

- `?tag=react&tag=nextjs` → `{ tag: "nextjs" }`
- `?tag=nextjs` → `{ tag: "nextjs" }`

この2つのURLが同じキャッシュキーになり、遷移先のキーが既存エントリと衝突するため、
古い描画結果がそのまま再利用されます。サーバー側は `{ tag: string | string[] }` の形で
配列を保持するため、クライアントとキーの計算が食い違うのが根本原因です。

修正PR: [vercel/next.js#93368](https://github.com/vercel/next.js/pull/93368)（本リポジトリ作成時点で未マージ）
