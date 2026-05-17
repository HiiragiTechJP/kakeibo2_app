-- アプリ (lib/categories.ts) と同じ ID でカテゴリを投入
-- Supabase → SQL Editor で実行

INSERT INTO categories (id, name, type) VALUES
  ('c1000001-0000-4000-8000-000000000001', '食費', 'expense'),
  ('c1000001-0000-4000-8000-000000000002', '交通', 'expense'),
  ('c1000001-0000-4000-8000-000000000003', '日用品', 'expense'),
  ('c1000001-0000-4000-8000-000000000004', '娯楽', 'expense'),
  ('c1000001-0000-4000-8000-000000000005', 'その他', 'expense')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  type = EXCLUDED.type;
