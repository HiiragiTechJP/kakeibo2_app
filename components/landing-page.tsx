import Image from "next/image";
import Link from "next/link";

const features = [
  {
    title: "スマホでサッと入力",
    description: "金額・カテゴリ・日付を素早く記録。毎日の支出管理に使いやすいシンプルな画面です。",
  },
  {
    title: "月別で支出を確認",
    description: "月ごとの合計とカテゴリ別の内訳を確認できます。今月の使いすぎも見えやすくなります。",
  },
  {
    title: "メモ付きで記録",
    description: "「ランチ」「スーパー」など、後から見返したい内容をメモとして残せます。",
  },
  {
    title: "ログインでデータを保存",
    description: "メール確認コードでログイン。あなたの支出データを安全にクラウド保存します。",
  },
];

export function LandingPage() {
  return (
    <div className="bg-gradient-to-b from-sky-100 via-slate-50 to-white dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
      <section className="mx-auto max-w-4xl px-4 py-12 sm:py-16">
        <div className="flex flex-col items-center text-center">
          <span className="relative mb-6 h-20 w-20 overflow-hidden rounded-2xl shadow-lg shadow-sky-200 dark:shadow-slate-950/50">
            <Image
              src="/icons/icon.png"
              alt="ポケット家計簿"
              fill
              sizes="80px"
              className="object-cover"
              priority
            />
          </span>

          <p className="text-sm font-medium text-sky-700 dark:text-sky-300">
            スマホでかんたん家計簿
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-50">
            ポケット家計簿
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300">
            毎日の支出を、スマホからシンプルに記録できる無料の家計簿アプリです。
            月別表示・カテゴリ集計・メモ入力に対応しています。
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/app"
              className="rounded-xl bg-sky-600 px-6 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-sky-700"
            >
              無料で使ってみる
            </Link>
            <a
              href="#features"
              className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-center text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              機能を見る
            </a>
          </div>

          <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
            ブラウザからそのまま使えます。スマホならホーム画面に追加も可能です。
          </p>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-4xl px-4 pb-16">
        <h2 className="mb-6 text-center text-xl font-semibold text-slate-900 dark:text-slate-50">
          主な機能
        </h2>
        <ul className="grid gap-4 sm:grid-cols-2">
          {features.map((feature) => (
            <li
              key={feature.title}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <h3 className="font-semibold text-slate-900 dark:text-slate-50">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {feature.description}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-16">
        <div className="rounded-2xl bg-gradient-to-br from-sky-700 via-cyan-700 to-teal-600 px-6 py-8 text-center text-white shadow-lg">
          <h2 className="text-xl font-semibold">今すぐ始められます</h2>
          <p className="mt-2 text-sm text-white/85">
            登録はメールアドレスだけ。パスワードは不要です。
          </p>
          <Link
            href="/app"
            className="mt-5 inline-block rounded-xl bg-white px-6 py-3 text-sm font-semibold text-sky-700 transition-colors hover:bg-sky-50"
          >
            アプリを開く
          </Link>
        </div>
      </section>
    </div>
  );
}
