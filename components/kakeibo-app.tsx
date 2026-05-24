"use client";

import { AddExpenseForm } from "@/components/add-expense-form";
import { ExpenseList } from "@/components/expense-list";
import { useExpenses } from "@/hooks/use-expenses";
import { formatYen } from "@/lib/format";

export function KakeiboApp() {
  const {
    expenses,
    addExpense,
    removeExpense,
    isReady,
    totalAmount,
    error,
    deletingId,
  } = useExpenses();

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
        <p className="text-sm font-medium text-emerald-100">支出合計</p>
        <p className="mt-1 text-3xl font-bold tabular-nums tracking-tight">
          {isReady ? formatYen(totalAmount) : "—"}
        </p>
        <p className="mt-2 text-sm text-emerald-100">
          {expenses.length} 件のデータ
        </p>
      </section>

      <AddExpenseForm onAdd={addExpense} disabled={!isReady} />
      <ExpenseList
        expenses={expenses}
        totalAmount={totalAmount}
        isReady={isReady}
        onDelete={removeExpense}
        deletingId={deletingId}
      />
    </main>
  );
}
