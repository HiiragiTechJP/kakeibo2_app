-- 既に rls-auth.sql を実行済みの環境に、UPDATE ポリシーだけを追加するスクリプト。
-- Supabase ダッシュボード → SQL Editor で実行してください。

DROP POLICY IF EXISTS "expenses_update_own" ON expenses;
CREATE POLICY "expenses_update_own"
  ON expenses
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id OR user_id IS NULL)
  WITH CHECK (auth.uid() = user_id);
