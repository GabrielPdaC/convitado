import type { Metadata } from "next";
import { Cormorant_Garamond, Dancing_Script, Lato } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-heading",
});

const dancing = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-script",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Vanessa | 15 Anos — Jardim Encantado",
  description: "Convite digital para os 15 anos de Vanessa. 06 de Setembro de 2026.",
  openGraph: {
    title: "Vanessa | 15 Anos — Jardim Encantado",
    description: "Você está convidado(a) para celebrar os 15 anos de Vanessa! ✨",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${cormorant.variable} ${dancing.variable} ${lato.variable}`}>
      <body>{children}</body>
    </html>
  );
}
