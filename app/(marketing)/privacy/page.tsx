import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "プライバシーポリシー | ポケット家計簿",
};

export default function PrivacyPage() {
  return (
    <LegalPage title="プライバシーポリシー">
      <p>最終更新日: 2026年5月31日</p>

      <h2>1. 収集する情報</h2>
      <p>
        本アプリでは、ログインのためにメールアドレスを利用します。
        また、ユーザーが入力した支出データ（金額、カテゴリ、日付、メモ）を保存します。
      </p>

      <h2>2. 情報の利用目的</h2>
      <p>
        収集した情報は、家計簿機能の提供、ユーザー認証、サービス改善のために利用します。
      </p>

      <h2>3. 情報の保存</h2>
      <p>
        データは Supabase（クラウドデータベース）上に保存されます。
      </p>

      <h2>4. 第三者提供</h2>
      <p>
        法令に基づく場合を除き、ユーザーの同意なく個人情報を第三者に提供しません。
      </p>

      <h2>5. お問い合わせ</h2>
      <p>
        本ポリシーに関するお問い合わせは、
        <a href="/contact">お問い合わせページ</a>
        よりご連絡ください。
      </p>
    </LegalPage>
  );
}
