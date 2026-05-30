import type { Metadata } from "next";
import { LandingPage } from "@/components/landing-page";
import { PwaHomeRedirect } from "@/components/pwa-home-redirect";

export const metadata: Metadata = {
  title: "ポケット家計簿 | スマホでかんたんに使える無料家計簿アプリ",
  description:
    "毎日の支出をスマホからシンプルに記録できる無料の家計簿アプリ。月別表示・カテゴリ集計・メモ入力に対応。",
};

export default function HomePage() {
  return (
    <>
      <PwaHomeRedirect />
      <LandingPage />
    </>
  );
}
