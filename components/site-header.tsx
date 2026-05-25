"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";

export function SiteHeader() {
  const { user, isLoading, signOut } = useAuth();
  const [isSigningOut, setIsSigningOut] = useState(false);

  async function handleSignOut() {
    setIsSigningOut(true);
    try {
      await signOut();
    } finally {
      setIsSigningOut(false);
    }
  }

  return (
    <header className="border-b border-slate-200/80 bg-white/85 px-4 py-4 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto flex max-w-lg items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-sky-500 to-teal-500 text-sm font-bold text-white shadow-sm shadow-sky-200 dark:shadow-slate-950/50">
            家
          </span>
          <h1 className="truncate text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-50">
            家計簿
          </h1>
        </div>

        {!isLoading && user ? (
          <div className="flex shrink-0 items-center gap-2">
            <span
              className="hidden max-w-[140px] truncate text-sm text-slate-500 sm:inline dark:text-slate-400"
              title={user.email}
            >
              {user.email}
            </span>
            <button
              type="button"
              onClick={handleSignOut}
              disabled={isSigningOut}
              className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              {isSigningOut ? "退出中…" : "ログアウト"}
            </button>
          </div>
        ) : null}
      </div>
    </header>
  );
}
