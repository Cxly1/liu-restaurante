import type { Metadata, Viewport } from "next";
import {
  Bricolage_Grotesque,
  Schibsted_Grotesk,
  Noto_Serif_SC,
} from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
});

const body = Schibsted_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
});

const hanzi = Noto_Serif_SC({
  variable: "--font-hanzi",
  weight: "900",
  preload: false,
});

export const metadata: Metadata = {
  title: "LIÚ 流 · Cocina china de fuego",
  description:
    "Pato laqueado, dumplings hechos a mano y el wok más vivo de la Roma. Reserva tu mesa en LIÚ.",
};

export const viewport: Viewport = {
  themeColor: "#0f0c0a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${display.variable} ${body.variable} ${hanzi.variable} h-full antialiased`}
    >
      <body className="grain min-h-full">{children}</body>
    </html>
  );
}
