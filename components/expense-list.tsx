"use client";

import { getCategoryById } from "@/lib/categories";
import { formatDateJa, formatYen } from "@/lib/format";
import type { ExpenseRecord } from "@/lib/types";

type Props = {
  expenses: ExpenseRecord[];
  totalAmount: number;
  isReady: boolean;
};

export function ExpenseList({ expenses, totalAmount, isReady }: Props) {
  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-4 flex items-end justify-between gap-2">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          支出一覧
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          合計{" "}
          <span className="font-semibold text-emerald-700 dark:text-emerald-400">
            {formatYen(totalAmount)}
          </span>
        </p>
      </div>

      {!isReady ? (
        <p className="py-8 text-center text-sm text-zinc-500">読み込み中…</p>
      ) : expenses.length === 0 ? (
        <p className="py-8 text-center text-sm text-zinc-500">
          まだ支出がありません。上のフォームから追加してください。
        </p>
      ) : (
        <ul className="divide-y divide-zinc-100 dark:divide-zinc-800">
          {expenses.map((expense) => {
            const category = getCategoryById(expense.category_id);
            return (
              <li
                key={expense.id}
                className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-zinc-900 dark:text-zinc-50">
                    {category?.name ?? "未分類"}
                  </p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    {formatDateJa(expense.date)}
                  </p>
                </div>
                <p className="shrink-0 text-base font-semibold tabular-nums text-zinc-900 dark:text-zinc-50">
                  {formatYen(expense.amount)}
                </p>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
