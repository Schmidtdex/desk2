import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});
const jetBrainsMono = JetBrains_Mono({
  variable: "--font-code",
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

/**
 * Root layout — applies to ALL routes including /studio.
 * Only contains the bare HTML shell.
 * NavBar and LenisProvider are in app/(site)/layout.tsx (site routes only).
 * The Studio at /studio gets its own clean layout via app/studio/layout.tsx.
 */
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${plusJakarta.variable} ${jetBrainsMono.variable}`} style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}>
      <body className="bg-bg text-text min-h-screen">
        {children}
      </body>
    </html>
  );
}
