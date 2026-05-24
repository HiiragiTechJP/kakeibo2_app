import { createClient } from "@/lib/supabase/client";
import type { ExpenseInsert, ExpenseRecord } from "@/lib/types";

async function getRequiredUserId(): Promise<string> {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error("ログインが必要です");
  }

  return user.id;
}

type ExpenseRow = {
  id: string;
  user_id: string | null;
  amount: number;
  category_id: string;
  date: string;
  memo: string | null;
  created_at: string;
};

function toExpenseRecord(row: ExpenseRow): ExpenseRecord {
  return {
    id: row.id,
    user_id: row.user_id,
    amount: row.amount,
    category_id: row.category_id,
    date: row.date.slice(0, 10),
    memo: row.memo,
    created_at: row.created_at,
  };
}

export async function fetchExpenses(): Promise<ExpenseRecord[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("expenses")
    .select("*")
    .order("date", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []).map((row) => toExpenseRecord(row as ExpenseRow));
}

export async function createExpense(input: ExpenseInsert): Promise<ExpenseRecord> {
  const supabase = createClient();
  const userId = await getRequiredUserId();
  const { data, error } = await supabase
    .from("expenses")
    .insert({
      user_id: userId,
      amount: input.amount,
      category_id: input.category_id,
      date: input.date,
      memo: input.memo,
    })
    .select()
    .single();

  if (error) throw error;
  return toExpenseRecord(data as ExpenseRow);
}

export async function deleteExpense(id: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.from("expenses").delete().eq("id", id);

  if (error) throw error;
}
