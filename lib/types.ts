/** Supabase の expenses テーブルに合わせた型（user_id は auth.users の ID） */
export type ExpenseRecord = {
  id: string;
  user_id: string | null;
  amount: number;
  category_id: string;
  date: string;
  memo: string | null;
  created_at: string;
};

/** Supabase の categories テーブルに合わせた型 */
export type CategoryRecord = {
  id: string;
  name: string;
  type: "expense";
};

export type ExpenseInsert = Pick<
  ExpenseRecord,
  "amount" | "category_id" | "date" | "memo"
>;

export type ExpenseUpdate = ExpenseInsert;
