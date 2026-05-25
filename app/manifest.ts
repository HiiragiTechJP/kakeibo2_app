import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "家計簿",
    short_name: "家計簿",
    description: "シンプルな家計簿アプリ",
    start_url: "/",
    display: "standalone",
    background_color: "#e0f2fe",
    theme_color: "#38bdf8",
    lang: "ja",
    orientation: "portrait",
    icons: [
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/app-icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
