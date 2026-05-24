# 認証セットアップ手順（Supabase ダッシュボード）

コードは **メールの確認コード**（8桁）でログインします（マジックリンクは使いません）。

## 1. Email プロバイダを有効化

1. [Supabase Dashboard](https://supabase.com/dashboard) → 対象プロジェクト
2. **Authentication** → **Providers** → **Email**
3. **Enable Email provider** を ON

## 2. メールテンプレートにコードを表示

**Authentication** → **Email Templates** → **Magic Link**

本文に `{{ .Token }}` を入れてください。詳細は `supabase/email-template-otp.md` を参照。

## 3. URL Configuration

| 項目 | 推奨値（本番） |
|------|----------------|
| **Site URL** | `https://kakeibo2-app.vercel.app`（末尾 `/` なし） |

**Redirect URLs** は、コードログインだけなら **必須ではありません**。  
削除しても問題ありません。旧メールのリンク用に残しておいても害はありません。

## 4. Vercel の環境変数

| 変数名 | 説明 |
|--------|------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase プロジェクト URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | anon 公開キー |

## 5. RLS

**SQL Editor** で `supabase/rls-auth.sql` を実行済みであること。

## 6. カテゴリ seed

未実行なら `supabase/seed-categories.sql` を実行。

## 7. 動作確認

1. アプリを開く
2. メールアドレス入力 → **確認コードを送る**
3. メールの **8桁** をアプリに入力 → **ログインする**
4. 家計簿が表示され、支出の追加・削除ができること

## トラブルシュート

| 症状 | 確認すること |
|------|----------------|
| メールに数字がない | Email Templates に `{{ .Token }}` があるか |
| コードが通らない | 最新のメールのコードか。8桁すべて入力しているか |
| 送信制限エラー | 短時間に何度も送っていないか |
| 読み込み・追加失敗 | `rls-auth.sql` 実行済みか。ログイン済みか |
