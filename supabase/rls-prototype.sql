-- プロトタイプ用 RLS（認証なし・anon キーから読み書き可）
-- Supabase ダッシュボード → SQL Editor で実行してください。

-- categories: 読み取りのみ
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "prototype_select_categories" ON categories;
CREATE POLICY "prototype_select_categories"
  ON categories
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- expenses: 読み取り・追加
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "prototype_select_expenses" ON expenses;
CREATE POLICY "prototype_select_expenses"
  ON expenses
  FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "prototype_insert_expenses" ON expenses;
CREATE POLICY "prototype_insert_expenses"
  ON expenses
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "prototype_delete_expenses" ON expenses;
CREATE POLICY "prototype_delete_expenses"
  ON expenses
  FOR DELETE
  TO anon, authenticated
  USING (true);
