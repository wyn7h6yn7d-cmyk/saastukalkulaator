import type { Metadata, Viewport } from "next";
import { DM_Sans, Outfit } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin", "latin-ext"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: {
    default: "Säästukorv",
    template: "%s | Säästukorv",
  },
  description: "Tark ostunimekiri, mis leiab odavaima ostuplaani.",
  icons: {
    icon: [{ url: "/icons/icon.svg", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#060b08",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="et"
      className={`${dmSans.variable} ${outfit.variable} h-full`}
    >
      <body className="min-h-dvh font-sans antialiased">{children}</body>
    </html>
  );
}
