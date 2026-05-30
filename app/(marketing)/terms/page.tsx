import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "利用規約 | ポケット家計簿",
};

export default function TermsPage() {
  return (
    <LegalPage title="利用規約">
      <p>最終更新日: 2026年5月31日</p>

      <h2>1. 適用</h2>
      <p>
        本規約は、ポケット家計簿（以下「本サービス」）の利用条件を定めるものです。
      </p>

      <h2>2. 利用</h2>
      <p>
        ユーザーは、自己の責任において本サービスを利用するものとします。
      </p>

      <h2>3. 禁止事項</h2>
      <p>
        法令違反、不正アクセス、他者の権利侵害、サービス運営を妨害する行為を禁止します。
      </p>

      <h2>4. 免責</h2>
      <p>
        本サービスの利用により生じた損害について、運営者は故意または重過失がある場合を除き責任を負いません。
      </p>

      <h2>5. サービス変更・停止</h2>
      <p>
        運営者は、事前通知なく本サービスの内容変更や停止を行う場合があります。
      </p>
    </LegalPage>
  );
}
