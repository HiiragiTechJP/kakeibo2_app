# 認証セットアップ手順（Supabase ダッシュボード）

コード実装後、**必ず**以下を Supabase で設定してください。

## 1. Email プロバイダを有効化

1. [Supabase Dashboard](https://supabase.com/dashboard) → 対象プロジェクト
2. **Authentication** → **Providers** → **Email**
3. **Enable Email provider** を ON

## 2. リダイレクト URL（重要）

**Authentication** → **URL Configuration**

Vercel で公開している場合は、**本番 URL を主**に設定します。  
`your-app` の部分は Vercel ダッシュボードに表示されている実際の URL に置き換えてください（例: `kakeibo2-app.vercel.app`）。

| 項目 | 値 |
|------|-----|
| **Site URL** | `https://your-app.vercel.app` |
| **Redirect URLs** | 次の2つを**両方**登録（改行またはカンマ区切り） |

```
https://your-app.vercel.app/auth/callback
http://localhost:3000/auth/callback
```

### なぜ Vercel の URL が必要か

- マジックリンクのメールは、**アクセスしたサイトの URL**（`window.location.origin`）に戻るよう送られます
- 本番サイト（Vercel）でログインするなら、Supabase 側でその URL を **許可リスト（Redirect URLs）** に入れておく必要があります
- 登録されていない URL だと、リンククリック後に「ログインに失敗しました」になります

### Site URL と Redirect URLs の違い

| 設定 | 役割 |
|------|------|
| **Site URL** | デフォルトの戻り先。本番運用なら **Vercel の URL** を入れる |
| **Redirect URLs** | 許可するコールバック先の一覧。**本番 + ローカル** の両方を入れると開発しやすい |

ローカルだけ `localhost` にしていると、**Vercel 上のアプリから送ったログインリンクが失敗**します。

## 3. Vercel の環境変数

Vercel プロジェクト → **Settings** → **Environment Variables** に、ローカルの `.env.local` と同じ値を設定してください。

| 変数名 | 説明 |
|--------|------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase プロジェクト URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | anon 公開キー |

設定後は **Redeploy** が必要なことがあります。

## 4. RLS を認証用に切り替え

**SQL Editor** で `supabase/rls-auth.sql` の内容を実行します。

- 未ログイン（anon）では expenses にアクセスできません
- ログイン後は **自分の user_id の行だけ** 読み書き・削除できます

## 5. カテゴリの seed（未実行の場合）

`supabase/seed-categories.sql` をまだ実行していなければ実行してください。

## 6. 動作確認

### 本番（Vercel）

1. `https://your-app.vercel.app` を開く
2. メールアドレスを入力 → 「ログインリンクを送る」
3. 届いたメールのリンクをクリック
4. 家計簿画面が表示され、支出の追加・削除ができること

### ローカル（任意）

1. `npm run dev` で起動
2. `http://localhost:3000` で同様に確認  
   （Redirect URLs に localhost を入れておくこと）

## トラブルシュート

| 症状 | 確認すること |
|------|----------------|
| 本番でリンククリック後にエラー | Redirect URLs に `https://your-app.vercel.app/auth/callback` があるか |
| ローカルだけ失敗 | Redirect URLs に `http://localhost:3000/auth/callback` があるか |
| メールが届かない | Supabase の Authentication → Users。スパムフォルダ |
| 読み込み・追加が失敗 | `rls-auth.sql` を実行したか。ログインしているか |
| 本番だけ動かない | Vercel の環境変数と Redeploy |
