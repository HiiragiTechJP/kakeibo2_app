import Image from "next/image";
import Link from "next/link";

export function MarketingHeader() {
  return (
    <header className="border-b border-slate-200/80 bg-white/85 px-4 py-4 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-3">
        <Link href="/" className="flex min-w-0 items-center gap-2">
          <span className="relative h-8 w-8 shrink-0 overflow-hidden rounded-lg shadow-sm shadow-sky-200 dark:shadow-slate-950/50">
            <Image
              src="/icons/icon.png"
              alt="ポケット家計簿アイコン"
              fill
              sizes="32px"
              className="object-cover"
            />
          </span>
          <span className="truncate text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-50">
            ポケット家計簿
          </span>
        </Link>

        <Link
          href="/app"
          className="shrink-0 rounded-lg bg-sky-600 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-sky-700"
        >
          アプリを開く
        </Link>
      </div>
    </header>
  );
}
