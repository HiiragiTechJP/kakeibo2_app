"use client";

import { FormEvent, useState } from "react";
import { EXPENSE_CATEGORIES } from "@/lib/categories";
import { todayIsoDate } from "@/lib/format";
import type { ExpenseInsert } from "@/lib/types";

type Props = {
  onAdd: (input: ExpenseInsert) => void | Promise<void>;
  disabled?: boolean;
};

const inputClassName =
  "rounded-lg border border-zinc-300 bg-zinc-50 px-3 py-2.5 text-zinc-900 outline-none ring-emerald-500 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50";

export function AddExpenseForm({ onAdd, disabled = false }: Props) {
  const [amount, setAmount] = useState("");
  const [categoryId, setCategoryId] = useState(EXPENSE_CATEGORIES[0].id);
  const [date, setDate] = useState(todayIsoDate);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    const parsed = Number(amount);
    if (!amount || Number.isNaN(parsed) || parsed <= 0) {
      setError("金額は1円以上の数値を入力してください");
      return;
    }
    if (!Number.isInteger(parsed)) {
      setError("金額は整数で入力してください");
      return;
    }
    if (!categoryId) {
      setError("カテゴリを選択してください");
      return;
    }
    if (!date) {
      setError("日付を選択してください");
      return;
    }

    setIsSubmitting(true);
    try {
      await onAdd({
        amount: parsed,
        category_id: categoryId,
        date,
        memo: null,
      });
      setAmount("");
      setDate(todayIsoDate());
    } catch {
      setError("保存に失敗しました。しばらくしてから再度お試しください。");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
    >
      <h2 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
        支出を追加
      </h2>

      <div className="flex flex-col gap-4">
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
            金額（円）
          </span>
          <input
            type="number"
            inputMode="numeric"
            min={1}
            step={1}
            placeholder="1200"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className={inputClassName}
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
            カテゴリ
          </span>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className={inputClassName}
          >
            {EXPENSE_CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
            日付
          </span>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={inputClassName}
          />
        </label>

        {error ? (
          <p className="text-sm text-red-600 dark:text-red-400" role="alert">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={disabled || isSubmitting}
          className="mt-1 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 active:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? "保存中…" : "追加する"}
        </button>
      </div>
    </form>
  );
}
