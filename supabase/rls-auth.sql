-- 認証あり運用用 RLS（マジックリンクログイン後）
-- Supabase ダッシュボード → SQL Editor で実行してください。
-- 実行前に expenses のテストデータは削除済みであることを確認してください。

-- プロトタイプ用ポリシーを削除
DROP POLICY IF EXISTS "prototype_select_categories" ON categories;
DROP POLICY IF EXISTS "prototype_select_expenses" ON expenses;
DROP POLICY IF EXISTS "prototype_insert_expenses" ON expenses;
DROP POLICY IF EXISTS "prototype_delete_expenses" ON expenses;

-- categories: ログインユーザーは参照のみ
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "categories_select_authenticated" ON categories;
CREATE POLICY "categories_select_authenticated"
  ON categories
  FOR SELECT
  TO authenticated
  USING (true);

-- expenses: 自分の行だけ
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "expenses_select_own" ON expenses;
CREATE POLICY "expenses_select_own"
  ON expenses
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "expenses_insert_own" ON expenses;
CREATE POLICY "expenses_insert_own"
  ON expenses
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "expenses_delete_own" ON expenses;
CREATE POLICY "expenses_delete_own"
  ON expenses
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);
