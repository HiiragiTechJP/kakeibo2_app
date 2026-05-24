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
    <header className="border-b border-zinc-200 bg-white px-4 py-4 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mx-auto flex max-w-lg items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-600 text-sm font-bold text-white">
            家
          </span>
          <h1 className="truncate text-lg font-semibold tracking-tight">家計簿</h1>
        </div>

        {!isLoading && user ? (
          <div className="flex shrink-0 items-center gap-2">
            <span
              className="hidden max-w-[140px] truncate text-sm text-zinc-500 sm:inline dark:text-zinc-400"
              title={user.email}
            >
              {user.email}
            </span>
            <button
              type="button"
              onClick={handleSignOut}
              disabled={isSigningOut}
              className="rounded-lg border border-zinc-300 px-2.5 py-1.5 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-50 disabled:opacity-50 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              {isSigningOut ? "退出中…" : "ログアウト"}
            </button>
          </div>
        ) : null}
      </div>
    </header>
  );
}
