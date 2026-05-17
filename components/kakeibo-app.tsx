"use client";

import { AddExpenseForm } from "@/components/add-expense-form";
import { ExpenseList } from "@/components/expense-list";
import { useExpenses } from "@/hooks/use-expenses";
import { formatYen } from "@/lib/format";

export function KakeiboApp() {
  const { expenses, addExpense, isReady, totalAmount } = useExpenses();

  return (
    <div className="mx-auto flex w-full max-w-lg flex-col gap-6">
      <section className="rounded-2xl bg-emerald-600 px-5 py-6 text-white shadow-md">
        <p className="text-sm font-medium text-emerald-100">支出合計</p>
        <p className="mt-1 text-3xl font-bold tabular-nums tracking-tight">
          {isReady ? formatYen(totalAmount) : "—"}
        </p>
        <p className="mt-2 text-sm text-emerald-100">
          {expenses.length} 件の支出
        </p>
      </section>

      <AddExpenseForm onAdd={addExpense} />
      <ExpenseList
        expenses={expenses}
        totalAmount={totalAmount}
        isReady={isReady}
      />
    </div>
  );
}
