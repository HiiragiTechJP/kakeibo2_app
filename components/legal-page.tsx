type Props = {
  title: string;
  children: React.ReactNode;
};

export function LegalPage({ title, children }: Props) {
  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
        {title}
      </h1>
      <div className="mt-6 space-y-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300 [&_h2]:mt-6 [&_h2]:text-base [&_h2]:font-semibold [&_h2]:text-slate-900 [&_h2]:dark:text-slate-50 [&_a]:text-sky-700 [&_a]:underline [&_a]:dark:text-sky-300">
        {children}
      </div>
    </article>
  );
}
