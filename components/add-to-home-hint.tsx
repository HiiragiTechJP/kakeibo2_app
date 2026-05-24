"use client";

import { useEffect, useState } from "react";

function isIos(): boolean {
  if (typeof navigator === "undefined") return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
}

function isStandalone(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    // iOS Safari
    ("standalone" in navigator &&
      (navigator as Navigator & { standalone?: boolean }).standalone === true)
  );
}

export function AddToHomeHint() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isIos() && !isStandalone()) {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  return (
    <details className="mx-auto mb-4 w-full max-w-lg rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-100">
      <summary className="cursor-pointer font-medium">
        ホーム画面に追加してアプリのように使う
      </summary>
      <ol className="mt-2 list-decimal space-y-1 pl-5 text-emerald-800 dark:text-emerald-200">
        <li>Safari 下部の「共有」ボタン（□に↑）をタップ</li>
        <li>「ホーム画面に追加」を選ぶ</li>
        <li>「追加」をタップ</li>
      </ol>
      <p className="mt-2 text-xs text-emerald-700 dark:text-emerald-300">
        ログインはメールの6桁コードを入力するだけなので、Safari
        でもホーム画面のアイコンからでも同じように使えます。
      </p>
      <button
        type="button"
        onClick={() => setVisible(false)}
        className="mt-2 text-xs font-medium underline"
      >
        閉じる
      </button>
    </details>
  );
}
