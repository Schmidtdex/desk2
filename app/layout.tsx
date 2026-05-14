import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "./components/layout/LenisProvider";
import { NavBar } from "./components/layout/NavBar";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});
const jetBrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["200", "300", "400"],
});

export const metadata: Metadata = {
  title: "Desk Manager — Orquestramos serviços. Inteligência em movimento.",
  description:
    "Plataforma de IA para serviços e processos. ESM + ITSM + BPM + Maestro + AI Agents. +600 grandes clientes em +40 países.",
  openGraph: {
    title: "Desk Manager",
    description: "Plataforma de IA para serviços e processos.",
    url: "https://deskmanager.com",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${plusJakarta.variable} ${jetBrainsMono.variable}`}>
      <body className="bg-bg text-text min-h-screen">
        <LenisProvider>
          <NavBar />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
