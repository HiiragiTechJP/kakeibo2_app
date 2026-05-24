"use client";

import { FormEvent, useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";

const inputClassName =
  "rounded-lg border border-zinc-300 bg-zinc-50 px-3 py-2.5 text-zinc-900 outline-none ring-emerald-500 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50";

export function AuthForm() {
  const { signInWithEmail } = useAuth();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("auth") === "error") {
      setError("ログインに失敗しました。もう一度お試しください。");
      window.history.replaceState({}, "", "/");
    }
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    const trimmed = email.trim();
    if (!trimmed) {
      setError("メールアドレスを入力してください");
      return;
    }

    setIsSubmitting(true);
    try {
      await signInWithEmail(trimmed);
      setSent(true);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "ログインリンクの送信に失敗しました";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (sent) {
    return (
      <section className="mx-auto w-full max-w-lg rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          メールを確認してください
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          <span className="font-medium text-zinc-900 dark:text-zinc-200">
            {email.trim()}
          </span>{" "}
          にログイン用のリンクを送りました。メール内のリンクをクリックすると家計簿が使えます。
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-5 text-sm font-medium text-emerald-700 hover:text-emerald-800 dark:text-emerald-400"
        >
          別のメールアドレスで試す
        </button>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-lg rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
        ログイン
      </h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        メールアドレスを入力すると、ログイン用のリンクが届きます。パスワードは不要です。
      </p>

      <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4">
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
            メールアドレス
          </span>
          <input
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          disabled={isSubmitting}
          className="rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? "送信中…" : "ログインリンクを送る"}
        </button>
      </form>
    </section>
  );
}
