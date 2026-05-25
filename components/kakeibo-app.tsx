"use client";

import { useMemo, useState } from "react";
import { AddExpenseForm } from "@/components/add-expense-form";
import { ExpenseList } from "@/components/expense-list";
import { useExpenses } from "@/hooks/use-expenses";
import { EXPENSE_CATEGORIES } from "@/lib/categories";
import {
  formatMonthJa,
  formatYen,
  isDateInMonth,
  shiftIsoMonth,
  todayIsoMonth,
} from "@/lib/format";

export function KakeiboApp() {
  const {
    expenses,
    addExpense,
    removeExpense,
    isReady,
    error,
    deletingId,
  } = useExpenses();
  const currentMonth = todayIsoMonth();
  const [selectedMonth, setSelectedMonth] = useState(() => currentMonth);

  const monthlyExpenses = useMemo(
    () => expenses.filter((expense) => isDateInMonth(expense.date, selectedMonth)),
    [expenses, selectedMonth],
  );

  const monthlyTotal = useMemo(
    () => monthlyExpenses.reduce((sum, expense) => sum + expense.amount, 0),
    [monthlyExpenses],
  );

  const categorySummary = useMemo(() => {
    const totals = new Map<string, number>();

    for (const expense of monthlyExpenses) {
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
  }, [monthlyExpenses]);

  const selectedMonthLabel = formatMonthJa(selectedMonth);
  const isCurrentMonthSelected = selectedMonth === currentMonth;

  return (
    <main className="mx-auto flex w-full max-w-lg flex-col gap-6">
      {error ? (
        <p
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-200"
          role="alert"
        >
          {error}
        </p>
      ) : null}

      <section className="rounded-2xl bg-emerald-600 px-5 py-6 text-white shadow-md">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-emerald-100">
              {selectedMonthLabel}の支出合計
            </p>
            <p className="mt-1 text-3xl font-bold tabular-nums tracking-tight">
              {isReady ? formatYen(monthlyTotal) : "—"}
            </p>
            <p className="mt-2 text-sm text-emerald-100">
              {monthlyExpenses.length} 件の支出
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-1 rounded-full bg-white/10 px-1 py-1">
            <button
              type="button"
              onClick={() => setSelectedMonth((prev) => shiftIsoMonth(prev, -1))}
              aria-label="前の月を表示"
              className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold text-white transition-colors hover:bg-white/10 active:bg-white/20"
            >
              ←
            </button>
            <p className="min-w-[6.5rem] text-center text-sm font-medium text-white">
              {selectedMonthLabel}
            </p>
            <button
              type="button"
              onClick={() => setSelectedMonth((prev) => shiftIsoMonth(prev, 1))}
              aria-label="次の月を表示"
              disabled={isCurrentMonthSelected}
              className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold text-white transition-colors hover:bg-white/10 active:bg-white/20 disabled:cursor-not-allowed disabled:opacity-40"
            >
              →
            </button>
          </div>
        </div>

        <div className="mt-4 rounded-xl bg-white/10 px-4 py-3">
          <p className="text-sm font-medium text-white">カテゴリ別</p>
          {!isReady ? (
            <p className="mt-2 text-sm text-emerald-100">読み込み中…</p>
          ) : categorySummary.length === 0 ? (
            <p className="mt-2 text-sm text-emerald-100">
              {selectedMonthLabel}のカテゴリ別データはまだありません。
            </p>
          ) : (
            <ul className="mt-3 space-y-2">
              {categorySummary.map((category) => (
                <li
                  key={category.id}
                  className="flex items-center justify-between gap-3 text-sm"
                >
                  <span className="text-emerald-50">{category.name}</span>
                  <span className="font-semibold tabular-nums text-white">
                    {formatYen(category.amount)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <AddExpenseForm
        onAdd={addExpense}
        selectedMonth={selectedMonth}
        disabled={!isReady}
      />
      <ExpenseList
        expenses={monthlyExpenses}
        totalAmount={monthlyTotal}
        selectedMonthLabel={selectedMonthLabel}
        isReady={isReady}
        onDelete={removeExpense}
        deletingId={deletingId}
      />
    </main>
  );
}
