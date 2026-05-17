import type { ExpenseRecord } from "@/lib/types";

const STORAGE_KEY = "kakeibo_expenses";

export function loadExpenses(): ExpenseRecord[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isExpenseRecord);
  } catch {
    return [];
  }
}

export function saveExpenses(expenses: ExpenseRecord[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
}

function isExpenseRecord(value: unknown): value is ExpenseRecord {
  if (!value || typeof value !== "object") return false;
  const r = value as Record<string, unknown>;
  return (
    typeof r.id === "string" &&
    (r.user_id === null || typeof r.user_id === "string") &&
    typeof r.amount === "number" &&
    typeof r.category_id === "string" &&
    typeof r.date === "string" &&
    (r.memo === null || typeof r.memo === "string") &&
    typeof r.created_at === "string"
  );
}
