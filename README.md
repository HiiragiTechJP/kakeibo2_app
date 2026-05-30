# ポケット家計簿

スマホで使いやすいシンプルな家計簿 Web アプリ（PWA 対応）。

## 機能

- メール確認コードによるログイン
- 支出の追加・編集・削除
- 月別表示とカテゴリ別集計
- メモ入力

## 技術スタック

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Supabase (Auth / PostgreSQL)
- Vercel

## セットアップ

```bash
npm install
npm run dev
```

環境変数:

| 変数名 | 説明 |
|--------|------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase プロジェクト URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon キー |

Supabase 側では `supabase/seed-categories.sql` と `supabase/rls-auth.sql` を SQL Editor で実行してください。

## ライセンス

Private
