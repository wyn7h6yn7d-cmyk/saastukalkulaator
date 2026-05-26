import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Säästukorv",
    template: "%s | Säästukorv",
  },
  description:
    "Võrdle ostukorvi hindu ja leia soodsam plaan — pakkumised ja hinnad ühes vaates.",
  icons: {
    icon: [{ url: "/icons/icon.svg", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2f7d4a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="et">
      <body className="min-h-dvh font-sans antialiased">{children}</body>
    </html>
  );
}
