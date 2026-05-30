"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

function isStandalonePwa(): boolean {
  if (typeof window === "undefined") return false;

  const nav = window.navigator as Navigator & { standalone?: boolean };

  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    window.matchMedia("(display-mode: fullscreen)").matches ||
    nav.standalone === true
  );
}

/** ホーム画面（PWA）から LP を開いた場合、家計簿本体へ自動遷移する */
export function PwaHomeRedirect() {
  const router = useRouter();

  useEffect(() => {
    if (isStandalonePwa()) {
      router.replace("/app");
    }
  }, [router]);

  return null;
}
