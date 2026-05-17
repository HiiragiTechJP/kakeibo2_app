"use client";

import { useCallback, useEffect, useState } from "react";
import { createExpense, fetchExpenses } from "@/lib/expenses-api";
import type { ExpenseInsert, ExpenseRecord } from "@/lib/types";

function sortExpenses(expenses: ExpenseRecord[]): ExpenseRecord[] {
  return [...expenses].sort((a, b) => {
    const byDate = b.date.localeCompare(a.date);
    if (byDate !== 0) return byDate;
    return b.created_at.localeCompare(a.created_at);
  });
}

function toErrorMessage(error: unknown, fallback: string): string {
  if (error && typeof error === "object" && "message" in error) {
    const message = (error as { message: unknown }).message;
    if (typeof message === "string" && message.length > 0) return message;
  }
  return fallback;
}

export function useExpenses() {
  const [expenses, setExpenses] = useState<ExpenseRecord[]>([]);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const data = await fetchExpenses();
        if (!cancelled) setExpenses(sortExpenses(data));
      } catch (err) {
        if (!cancelled) {
          setError(toErrorMessage(err, "支出の読み込みに失敗しました"));
        }
      } finally {
        if (!cancelled) setIsReady(true);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const addExpense = useCallback(async (input: ExpenseInsert) => {
    setError(null);
    try {
      const record = await createExpense(input);
      setExpenses((prev) => sortExpenses([record, ...prev]));
    } catch (err) {
      const message = toErrorMessage(err, "支出の追加に失敗しました");
      setError(message);
      throw new Error(message);
    }
  }, []);

  const totalAmount = expenses.reduce((sum, e) => sum + e.amount, 0);

  return { expenses, addExpense, isReady, totalAmount, error };
}
