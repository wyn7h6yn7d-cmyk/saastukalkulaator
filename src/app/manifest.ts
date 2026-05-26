import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Säästukorv",
    short_name: "Säästukorv",
    description: "Tark ostunimekiri, mis leiab odavaima ostuplaani.",
    start_url: "/",
    display: "browser",
    background_color: "#f4f7f5",
    theme_color: "#059669",
    lang: "et",
    icons: [
      {
        src: "/icons/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
