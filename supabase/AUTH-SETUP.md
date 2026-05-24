# 認証セットアップ手順（Supabase ダッシュボード）

コードは **メールの6桁コード** でログインします（マジックリンクは使いません）。

## 1. Email プロバイダを有効化

1. [Supabase Dashboard](https://supabase.com/dashboard) → 対象プロジェクト
2. **Authentication** → **Providers** → **Email**
3. **Enable Email provider** を ON

## 2. メールテンプレートにコードを表示

**Authentication** → **Email Templates** → **Magic Link**

本文に `{{ .Token }}` を入れてください。詳細は `supabase/email-template-otp.md` を参照。

## 3. URL Configuration（任意）

コードログインでは **リンクを押さない** ため、必須ではありません。  
将来リンク認証を併用する場合用に、次を登録しておいても問題ありません。

| 項目 | 値（本番例） |
|------|----------------|
| Site URL | `https://kakeibo2-app.vercel.app` |
| Redirect URLs | `https://kakeibo2-app.vercel.app/auth/callback` |
| | `http://localhost:3000/auth/callback` |

## 4. Vercel の環境変数

| 変数名 | 説明 |
|--------|------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase プロジェクト URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | anon 公開キー |

変更後は **Redeploy** が必要なことがあります。

## 5. RLS

**SQL Editor** で `supabase/rls-auth.sql` を実行済みであること。

## 6. カテゴリ seed

未実行なら `supabase/seed-categories.sql` を実行。

## 7. 動作確認

1. アプリを開く（Safari またはホーム画面アイコン）
2. メールアドレス入力 → **確認コードを送る**
3. メールの **6桁** をアプリに入力 → **ログインする**
4. 家計簿が表示され、支出の追加・削除ができること

## トラブルシュート

| 症状 | 確認すること |
|------|----------------|
| メールに数字がない | Email Templates に `{{ .Token }}` があるか |
| コードが通らない | 最新のメールのコードか。期限切れなら再送信 |
| 送信制限エラー | 短時間に何度も送っていないか（Supabase のメール上限） |
| 読み込み・追加失敗 | `rls-auth.sql` 実行済みか。ログイン済みか |
