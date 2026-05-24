"use client";

import { AuthForm } from "@/components/auth-form";
import { KakeiboApp } from "@/components/kakeibo-app";
import { useAuth } from "@/hooks/use-auth";

export function AppGate() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <p className="py-16 text-center text-sm text-zinc-500">読み込み中…</p>
    );
  }

  if (!user) {
    return <AuthForm />;
  }

  return <KakeiboApp />;
}
