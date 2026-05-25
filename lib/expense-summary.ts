import { EXPENSE_CATEGORIES } from "@/lib/categories";
import { isDateInMonth } from "@/lib/format";
import type { ExpenseRecord } from "@/lib/types";

export type CategorySummaryItem = {
  id: string;
  name: string;
  amount: number;
};

export function filterExpensesByMonth(
  expenses: ExpenseRecord[],
  isoMonth: string,
): ExpenseRecord[] {
  return expenses.filter((expense) => isDateInMonth(expense.date, isoMonth));
}

export function calculateExpenseTotal(expenses: ExpenseRecord[]): number {
  return expenses.reduce((sum, expense) => sum + expense.amount, 0);
}

export function buildCategorySummary(
  expenses: ExpenseRecord[],
): CategorySummaryItem[] {
  const totals = new Map<string, number>();

  for (const expense of expenses) {
    totals.set(
      expense.category_id,
      (totals.get(expense.category_id) ?? 0) + expense.amount,
    );
  }

  return EXPENSE_CATEGORIES.map((category) => ({
    id: category.id,
    name: category.name,
    amount: totals.get(category.id) ?? 0,
  })).filter((category) => category.amount > 0);
}
