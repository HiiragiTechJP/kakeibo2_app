import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#0f766e",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ポケット家計簿",
  description: "スマホでかんたんに使えるポケット家計簿アプリ",
  applicationName: "ポケット家計簿",
  appleWebApp: {
    capable: true,
    title: "ポケット家計簿",
    statusBarStyle: "default",
  },
  icons: {
    icon: [{ url: "/icons/icon.png", type: "image/png", sizes: "577x577" }],
    apple: [{ url: "/icons/icon.png", type: "image/png", sizes: "577x577" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50">
        <main className="flex flex-1 flex-col">{children}</main>
        <Analytics />
      </body>
    </html>
  );
}
