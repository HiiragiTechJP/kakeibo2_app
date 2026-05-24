-- 既に rls-prototype.sql を実行済みの場合、削除機能だけ追加する用
-- Supabase ダッシュボード → SQL Editor で実行してください。

DROP POLICY IF EXISTS "prototype_delete_expenses" ON expenses;
CREATE POLICY "prototype_delete_expenses"
  ON expenses
  FOR DELETE
  TO anon, authenticated
  USING (true);
