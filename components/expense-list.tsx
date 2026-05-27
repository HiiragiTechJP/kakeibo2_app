"use client";

import { getCategoryById } from "@/lib/categories";
import { formatDateJa, formatYen } from "@/lib/format";
import type { ExpenseRecord } from "@/lib/types";

type Props = {
  expenses: ExpenseRecord[];
  totalAmount: number;
  selectedMonthLabel: string;
  isReady: boolean;
  onDelete: (id: string) => void | Promise<void>;
  deletingId: string | null;
};

export function ExpenseList({
  expenses,
  totalAmount,
  selectedMonthLabel,
  isReady,
  onDelete,
  deletingId,
}: Props) {
  async function handleDelete(expense: ExpenseRecord) {
    const category = getCategoryById(expense.category_id);
    const label = category?.name ?? "未分類";
    const confirmed = window.confirm(
      `${label}（${formatYen(expense.amount)}）を削除しますか？`,
    );
    if (!confirmed) return;

    try {
      await onDelete(expense.id);
    } catch {
      // エラー表示は useExpenses の error で行う
    }
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md shadow-slate-200/70 dark:border-slate-800 dark:bg-slate-900 dark:shadow-slate-950/30">
      <div className="mb-4 flex items-end justify-between gap-2">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
          支出一覧
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          合計{" "}
          <span className="font-semibold text-sky-700 dark:text-sky-300">
            {formatYen(totalAmount)}
          </span>
        </p>
      </div>

      {!isReady ? (
        <p className="py-8 text-center text-sm text-slate-500 dark:text-slate-400">
          読み込み中…
        </p>
      ) : expenses.length === 0 ? (
        <p className="py-8 text-center text-sm text-slate-500 dark:text-slate-400">
          {selectedMonthLabel}の支出はまだありません。上のフォームから追加してください。
        </p>
      ) : (
        <ul className="divide-y divide-slate-100 dark:divide-slate-800">
          {expenses.map((expense) => {
            const category = getCategoryById(expense.category_id);
            return (
              <li
                key={expense.id}
                className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-slate-900 dark:text-slate-50">
                    {category?.name ?? "未分類"}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {formatDateJa(expense.date)}
                  </p>
                  {expense.memo ? (
                    <p className="mt-1 truncate text-sm text-slate-600 dark:text-slate-300">
                      {expense.memo}
                    </p>
                  ) : null}
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <p className="text-base font-semibold tabular-nums text-slate-900 dark:text-slate-50">
                    {formatYen(expense.amount)}
                  </p>
                  <button
                    type="button"
                    onClick={() => handleDelete(expense)}
                    disabled={deletingId === expense.id}
                    aria-label={`${category?.name ?? "未分類"} ${formatYen(expense.amount)} を削除`}
                    className="rounded-lg px-2 py-1 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50 dark:text-red-400 dark:hover:bg-red-950/70"
                  >
                    {deletingId === expense.id ? "削除中…" : "削除"}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
