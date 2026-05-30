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
        <a href="mailto:pocketkakeibo@gmail.com">pocketkakeibo@gmail.com</a>
      </p>
    </LegalPage>
  );
}
