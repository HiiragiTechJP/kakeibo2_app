import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "スマート家計簿",
    short_name: "スマート家計簿",
    description: "毎日使いやすいスマート家計簿アプリ",
    start_url: "/",
    display: "standalone",
    background_color: "#e0f2fe",
    theme_color: "#38bdf8",
    lang: "ja",
    orientation: "portrait",
    icons: [
      {
        src: "/icons/icon.png",
        sizes: "577x577",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
