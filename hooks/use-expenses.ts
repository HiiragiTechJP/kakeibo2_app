"use client";

import { useCallback, useEffect, useState } from "react";
import { loadExpenses, saveExpenses } from "@/lib/expense-storage";
import type { ExpenseInsert, ExpenseRecord } from "@/lib/types";

function sortExpenses(expenses: ExpenseRecord[]): ExpenseRecord[] {
  return [...expenses].sort((a, b) => {
    const byDate = b.date.localeCompare(a.date);
    if (byDate !== 0) return byDate;
    return b.created_at.localeCompare(a.created_at);
  });
}

export function useExpenses() {
  const [expenses, setExpenses] = useState<ExpenseRecord[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setExpenses(sortExpenses(loadExpenses()));
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) return;
    saveExpenses(expenses);
  }, [expenses, isReady]);

  const addExpense = useCallback((input: ExpenseInsert) => {
    const record: ExpenseRecord = {
      id: crypto.randomUUID(),
      user_id: null,
      amount: input.amount,
      category_id: input.category_id,
      date: input.date,
      memo: input.memo,
      created_at: new Date().toISOString(),
    };
    setExpenses((prev) => sortExpenses([record, ...prev]));
  }, []);

  const totalAmount = expenses.reduce((sum, e) => sum + e.amount, 0);

  return { expenses, addExpense, isReady, totalAmount };
}
