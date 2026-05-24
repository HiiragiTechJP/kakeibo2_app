"use client";

import type { Session, User } from "@supabase/supabase-js";
import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setIsLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  /** メールに確認コードを送る（マジックリンクは使わない） */
  const sendEmailOtp = useCallback(async (email: string) => {
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true,
      },
    });
    if (error) throw error;
  }, []);

  /** メールのコードでログイン */
  const verifyEmailOtp = useCallback(async (email: string, token: string) => {
    const supabase = createClient();
    const { error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: "email",
    });
    if (error) throw error;
  }, []);

  const signOut = useCallback(async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }, []);

  const user: User | null = session?.user ?? null;

  return {
    session,
    user,
    isLoading,
    sendEmailOtp,
    verifyEmailOtp,
    signOut,
  };
}
