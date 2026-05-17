import type { CategoryRecord } from "@/lib/types";

/** 将来 Supabase に seed するカテゴリ（id は固定） */
export const EXPENSE_CATEGORIES: readonly CategoryRecord[] = [
  { id: "c1000001-0000-4000-8000-000000000001", name: "食費", type: "expense" },
  { id: "c1000001-0000-4000-8000-000000000002", name: "交通", type: "expense" },
  { id: "c1000001-0000-4000-8000-000000000003", name: "日用品", type: "expense" },
  { id: "c1000001-0000-4000-8000-000000000004", name: "娯楽", type: "expense" },
  { id: "c1000001-0000-4000-8000-000000000005", name: "その他", type: "expense" },
] as const;

const categoryMap = new Map(
  EXPENSE_CATEGORIES.map((c) => [c.id, c] as const),
);

export function getCategoryById(id: string): CategoryRecord | undefined {
  return categoryMap.get(id);
}
