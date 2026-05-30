import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "お問い合わせ | ポケット家計簿",
};

export default function ContactPage() {
  return (
    <LegalPage title="お問い合わせ">
      <p>
        ポケット家計簿に関する不具合報告・ご意見は、以下のメールアドレスまでご連絡ください。
      </p>
      <p>
        <a href="mailto:contact@example.com">contact@example.com</a>
      </p>
      <p className="text-xs text-slate-500 dark:text-slate-400">
        ※ 公開前に運営者の連絡先メールアドレスへ差し替えてください。
      </p>
    </LegalPage>
  );
}
