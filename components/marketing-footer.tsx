import Link from "next/link";

export function MarketingFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white px-4 py-8 dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto flex max-w-4xl flex-col gap-4 text-sm text-slate-500 dark:text-slate-400">
        <nav className="flex flex-wrap gap-x-4 gap-y-2">
          <Link href="/privacy" className="hover:text-slate-700 dark:hover:text-slate-200">
            プライバシーポリシー
          </Link>
          <Link href="/terms" className="hover:text-slate-700 dark:hover:text-slate-200">
            利用規約
          </Link>
          <Link href="/contact" className="hover:text-slate-700 dark:hover:text-slate-200">
            お問い合わせ
          </Link>
        </nav>
        <p>© {new Date().getFullYear()} ポケット家計簿</p>
      </div>
    </footer>
  );
}
