"use client";

import { FormEvent, useState } from "react";
import { useAuth } from "@/hooks/use-auth";

const inputClassName =
  "rounded-lg border border-zinc-300 bg-zinc-50 px-3 py-2.5 text-zinc-900 outline-none ring-emerald-500 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50";

function toAuthErrorMessage(error: unknown, fallback: string): string {
  if (error && typeof error === "object" && "message" in error) {
    const message = (error as { message: unknown }).message;
    if (typeof message === "string" && message.length > 0) {
      if (message.includes("expired") || message.includes("invalid")) {
        return "コードの有効期限が切れたか、間違っています。もう一度送信して新しいコードを入力してください。";
      }
      return message;
    }
  }
  return fallback;
}

export function AuthForm() {
  const { sendEmailOtp, verifyEmailOtp } = useAuth();
  const [step, setStep] = useState<"email" | "code">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSendEmail(e: FormEvent) {
    e.preventDefault();
    setError(null);

    const trimmed = email.trim();
    if (!trimmed) {
      setError("メールアドレスを入力してください");
      return;
    }

    setIsSubmitting(true);
    try {
      await sendEmailOtp(trimmed);
      setCode("");
      setStep("code");
    } catch (err) {
      setError(toAuthErrorMessage(err, "確認コードの送信に失敗しました"));
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleVerifyCode(e: FormEvent) {
    e.preventDefault();
    setError(null);

    const token = code.replace(/\D/g, "");
    if (token.length < 6) {
      setError("6桁の確認コードを入力してください");
      return;
    }

    setIsSubmitting(true);
    try {
      await verifyEmailOtp(email.trim(), token);
    } catch (err) {
      setError(toAuthErrorMessage(err, "ログインに失敗しました"));
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleResend() {
    setError(null);
    setIsSubmitting(true);
    try {
      await sendEmailOtp(email.trim());
      setCode("");
    } catch (err) {
      setError(toAuthErrorMessage(err, "確認コードの再送信に失敗しました"));
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleChangeEmail() {
    setStep("email");
    setCode("");
    setError(null);
  }

  if (step === "code") {
    return (
      <section className="mx-auto w-full max-w-lg rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          確認コードを入力
        </h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          <span className="font-medium text-zinc-900 dark:text-zinc-200">
            {email.trim()}
          </span>{" "}
          に送った6桁のコードを入力してください。
        </p>

        <form onSubmit={handleVerifyCode} className="mt-5 flex flex-col gap-4">
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
              確認コード
            </span>
            <input
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              placeholder="123456"
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
              className={`${inputClassName} text-center text-lg tracking-[0.3em] tabular-nums`}
            />
          </label>

          {error ? (
            <p className="text-sm text-red-600 dark:text-red-400" role="alert">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting || code.length < 6}
            className="rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "確認中…" : "ログインする"}
          </button>
        </form>

        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          <button
            type="button"
            onClick={handleResend}
            disabled={isSubmitting}
            className="font-medium text-emerald-700 hover:text-emerald-800 disabled:opacity-50 dark:text-emerald-400"
          >
            コードを再送信
          </button>
          <button
            type="button"
            onClick={handleChangeEmail}
            disabled={isSubmitting}
            className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
          >
            メールアドレスを変更
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-lg rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
        ログイン
      </h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        メールアドレスを入力すると、6桁の確認コードが届きます。パスワードは不要です。
      </p>

      <form onSubmit={handleSendEmail} className="mt-5 flex flex-col gap-4">
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
          {isSubmitting ? "送信中…" : "確認コードを送る"}
        </button>
      </form>
    </section>
  );
}
