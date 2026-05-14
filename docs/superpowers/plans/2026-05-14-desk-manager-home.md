# Desk Manager Home — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the complete 12-scene Home manifesto for Desk Manager as a single Next.js 16 page in `desk2/app/`, matching the approved spec at `docs/superpowers/specs/2026-05-14-desk-manager-home-design.md`.

**Architecture:** Next.js 16 App Router with React Server Components by default; each scene is its own client component under `app/components/sections/`. Animations driven by Framer Motion (per-element) and GSAP ScrollTrigger (sticky-scroll scenes 4 and 8). Lenis provides global smooth scroll synchronized with ScrollTrigger. Tailwind v4 with `@theme` CSS tokens. Dark-majority palette with Desk blue `#1A4DFF` accent.

**Tech Stack:** Next.js 16.2.6, React 19, TypeScript 5, Tailwind v4, Framer Motion (`motion@12`), GSAP 3 + ScrollTrigger, Lenis 1.3, cobe 2, lucide-react. R3F/three installed but reserved for V2.

**Working directory for all commands:** `desk2/` — every path in this plan is relative to `desk2/` unless absolute.

**Testing approach:** This is a UI-heavy project with no unit-test framework installed. Each task ends with one of two checks:
- **Dev check:** `npm run dev` renders the page without console errors and the new section is visible/animates as described
- **Build check:** `npm run build` completes without errors (run at end of each major group of tasks)

**Commit convention:** `feat(home): <description>` per task.

---

## Task 0: Read Next 16 docs

Next 16 has breaking changes vs the AI's training data. Before writing any code, the engineer reads the local docs for the APIs we'll touch.

**Files:**
- Read: `node_modules/next/dist/docs/01-app/01-getting-started/03-layouts-and-pages.md`
- Read: `node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md`
- Read: `node_modules/next/dist/docs/01-app/01-getting-started/11-css.md`
- Read: `node_modules/next/dist/docs/01-app/01-getting-started/13-fonts.md`
- Read: `node_modules/next/dist/docs/01-app/01-getting-started/14-metadata-and-og-images.md`

- [ ] **Step 1: Read the 5 doc files above** and note any API differences from prior Next versions (e.g., `metadata` export shape, `next/font` import path, RSC defaults, CSS imports).

- [ ] **Step 2: No commit** — reading only.

---

## Task 1: Foundation — tokens, utils, layout, Lenis provider

Set up the global theme, the `cn()` helper, root layout metadata, and the smooth-scroll provider.

**Files:**
- Modify: `app/globals.css`
- Create: `app/lib/utils.ts`
- Modify: `app/layout.tsx`
- Create: `app/components/layout/LenisProvider.tsx`

- [ ] **Step 1: Rewrite `app/globals.css` with tokens and base styles**

```css
@import "tailwindcss";

@theme {
  --color-bg: #05060F;
  --color-surface: #0B0D1C;
  --color-surface-2: #131732;
  --color-border: #1E2240;
  --color-accent: #1A4DFF;
  --color-accent-2: #3B82F6;
  --color-accent-glow: #1A4DFF40;
  --color-text: #F5F6FF;
  --color-text-muted: #8B8FA8;
  --color-danger: #F43F5E;

  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

@layer base {
  html {
    background: var(--color-bg);
    color: var(--color-text);
    color-scheme: dark;
  }
  body {
    font-family: var(--font-sans);
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }
  ::selection {
    background: var(--color-accent);
    color: white;
  }
}

@keyframes orbit {
  from { transform: rotate(0deg) translateX(var(--orbit-r)) rotate(0deg); }
  to   { transform: rotate(360deg) translateX(var(--orbit-r)) rotate(-360deg); }
}

@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

@keyframes blink {
  50% { opacity: 0; }
}

@keyframes pulse-dot {
  0%, 100% { transform: scale(1); opacity: 0.8; }
  50%      { transform: scale(1.4); opacity: 0.3; }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 2: Create `app/lib/utils.ts`**

```ts
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
```

- [ ] **Step 3: Rewrite `app/layout.tsx` with metadata + Lenis wrapper**

```tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "./components/layout/LenisProvider";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

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
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="bg-bg text-text min-h-screen">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 4: Create `app/components/layout/LenisProvider.tsx`**

```tsx
"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";

export function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    let ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger | null = null;
    (async () => {
      const gsapMod = await import("gsap");
      const stMod = await import("gsap/ScrollTrigger");
      ScrollTrigger = stMod.ScrollTrigger;
      gsapMod.gsap.registerPlugin(ScrollTrigger);
      lenis.on("scroll", ScrollTrigger.update);
      gsapMod.gsap.ticker.add((t) => lenis.raf(t * 1000));
      gsapMod.gsap.ticker.lagSmoothing(0);
    })();

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      ScrollTrigger?.killAll();
    };
  }, []);

  return <>{children}</>;
}
```

- [ ] **Step 5: Verify dev server runs**

Run: `npm run dev`
Expected: starts on port 3000, no console errors, blank page renders (page.tsx is still empty).

- [ ] **Step 6: Commit**

```bash
git add app/globals.css app/lib/utils.ts app/layout.tsx app/components/layout/LenisProvider.tsx
git commit -m "feat(home): foundation tokens, layout, Lenis provider"
```

---

## Task 2: Static data files (`app/lib/`)

All textual/numeric content the scenes consume, in one place.

**Files:**
- Create: `app/lib/clients.ts`
- Create: `app/lib/pillars.ts`
- Create: `app/lib/timeline.ts`
- Create: `app/lib/countries.ts`
- Create: `app/lib/products.ts`
- Create: `app/lib/cases.ts`
- Create: `app/lib/maturity.ts`
- Create: `app/lib/seals.ts`

- [ ] **Step 1: Create `app/lib/clients.ts`** (logos órbita hero — texto)

```ts
export const HERO_CLIENTS = [
  "Porsche",
  "BYD",
  "Eurofarma",
  "Flamengo",
  "Petz",
  "Cobasi",
  "Convergint",
  "Acer",
] as const;
```

- [ ] **Step 2: Create `app/lib/pillars.ts`**

```ts
export type Pillar = { key: string; title: string; sub: string; tone: "blue" | "dark" | "accent" };

export const PILLARS: Pillar[] = [
  { key: "services", title: "Serviços", sub: "Atender uma necessidade ou desejo.", tone: "blue" },
  { key: "processes", title: "Processos", sub: "Garantir que o trabalho seja feito corretamente.", tone: "dark" },
  { key: "platform", title: "Plataforma de IA", sub: "Para serviços e processos.", tone: "accent" },
];
```

- [ ] **Step 3: Create `app/lib/timeline.ts`**

```ts
export type Milestone = { year: string; title: string; sub: string; tag: string };

export const TIMELINE: Milestone[] = [
  { year: "2009", title: "Service Desk", sub: "Desk Manager nasce.", tag: "Service Desk" },
  { year: "2011", title: "AWS Partner", sub: "Parceiro tecnológico Amazon.", tag: "ITSM" },
  { year: "2018", title: "ITSM + WhatsApp", sub: "Integração com WhatsApp.", tag: "ITSM" },
  { year: "2019", title: "Scale-Up Endeavor", sub: "Selecionada pela Endeavor. Eurofarma entra.", tag: "ITSM" },
  { year: "2023", title: "Enterprise Service Management", sub: "Evolução para ESM.", tag: "ESM" },
  { year: "2024", title: "Maestro & Tables", sub: "Hub de integrações e dados estruturados.", tag: "ESM" },
  { year: "2025", title: "AI Agents", sub: "Plataforma de IA nativa.", tag: "AI Platform" },
];
```

- [ ] **Step 4: Create `app/lib/countries.ts`** (subset com coordenadas para cobe)

```ts
export type Country = { name: string; lat: number; lng: number };

export const COUNTRIES: Country[] = [
  { name: "Brasil", lat: -14.235, lng: -51.925 },
  { name: "Argentina", lat: -38.4161, lng: -63.6167 },
  { name: "Chile", lat: -35.6751, lng: -71.543 },
  { name: "Peru", lat: -9.19, lng: -75.0152 },
  { name: "Colômbia", lat: 4.5709, lng: -74.2973 },
  { name: "Equador", lat: -1.8312, lng: -78.1834 },
  { name: "Bolívia", lat: -16.2902, lng: -63.5887 },
  { name: "Venezuela", lat: 6.4238, lng: -66.5897 },
  { name: "Paraguai", lat: -23.4425, lng: -58.4438 },
  { name: "Uruguai", lat: -32.5228, lng: -55.7658 },
  { name: "Guatemala", lat: 15.7835, lng: -90.2308 },
  { name: "México", lat: 23.6345, lng: -102.5528 },
  { name: "Nicarágua", lat: 12.8654, lng: -85.2072 },
  { name: "Panamá", lat: 8.5379, lng: -80.7821 },
  { name: "Costa Rica", lat: 9.7489, lng: -83.7534 },
  { name: "República Dominicana", lat: 18.7357, lng: -70.1627 },
  { name: "El Salvador", lat: 13.7942, lng: -88.8965 },
  { name: "Honduras", lat: 15.2, lng: -86.2419 },
  { name: "Bahamas", lat: 25.0343, lng: -77.3963 },
  { name: "EUA", lat: 37.0902, lng: -95.7129 },
  { name: "Canadá", lat: 56.1304, lng: -106.3468 },
  { name: "Espanha", lat: 40.4637, lng: -3.7492 },
  { name: "Portugal", lat: 39.3999, lng: -8.2245 },
  { name: "Angola", lat: -11.2027, lng: 17.8739 },
  { name: "Moçambique", lat: -18.6657, lng: 35.5296 },
  { name: "Austrália", lat: -25.2744, lng: 133.7751 },
  { name: "Nova Zelândia", lat: -40.9006, lng: 174.886 },
  { name: "Japão", lat: 36.2048, lng: 138.2529 },
];
```

- [ ] **Step 5: Create `app/lib/products.ts`**

```ts
export type Product = {
  key: "esm" | "itsm" | "bpm" | "maestro" | "agent";
  title: string;
  desc: string;
  size: "lg" | "md";
};

export const PRODUCTS: Product[] = [
  { key: "agent", title: "AI Agent", desc: "Agentes autônomos que decidem e executam tarefas pela operação.", size: "lg" },
  { key: "esm", title: "ESM", desc: "Orquestração da empresa além da TI: RH, Financeiro, Jurídico e outros.", size: "md" },
  { key: "itsm", title: "ITSM", desc: "Gestão de serviços de TI com aderência ao ITIL®, agora IA-native.", size: "md" },
  { key: "bpm", title: "BPM", desc: "Gestão e automação de processos de negócio com visão executiva.", size: "md" },
  { key: "maestro", title: "Maestro", desc: "Plataforma iPaaS para integração low-code de todo o ecossistema.", size: "md" },
];
```

- [ ] **Step 6: Create `app/lib/cases.ts`**

```ts
export type CaseKpi = { value: string; label: string };
export type Case = {
  slug: string;
  brand: string;
  headline: string;
  quote: string;
  kpis: [CaseKpi, CaseKpi, CaseKpi];
  hue: number; // 0-360, background tint
};

export const CASES: Case[] = [
  {
    slug: "eurofarma",
    brand: "Eurofarma",
    headline: "Otimizando a eficiência operacional global.",
    quote: "Governança de serviços virou operação de alta performance.",
    kpis: [
      { value: "+90", label: "departamentos de negócios no mundo" },
      { value: "+24", label: "países usando nossa plataforma ESM" },
      { value: "+13K", label: "colaboradores" },
    ],
    hue: 220,
  },
  {
    slug: "convergint",
    brand: "Convergint",
    headline: "Empresa global, vários idiomas, um só sistema nervoso.",
    quote: "Gestão por feeling deu lugar a indicadores em tempo real.",
    kpis: [
      { value: "+150", label: "países de operação" },
      { value: "Real time", label: "dados e indicadores ao vivo" },
      { value: "+13K", label: "colaboradores" },
    ],
    hue: 190,
  },
  {
    slug: "byd",
    brand: "BYD",
    headline: "Centralização e governança do suporte.",
    quote: "Ciclos que duravam meses agora fecham em dias.",
    kpis: [
      { value: "2-4h", label: "primeira resposta (era 15 dias)" },
      { value: "24-48h", label: "análise técnica (era 30 dias)" },
      { value: "48-72h", label: "ciclo completo (era 2 meses)" },
    ],
    hue: 145,
  },
  {
    slug: "petz-cobasi",
    brand: "Grupo Petz Cobasi",
    headline: "Orquestração e governança operacional.",
    quote: "TI, Manutenção, RH e +30 áreas em uma única plataforma de ESM.",
    kpis: [
      { value: "99%", label: "mais rápido no primeiro contato" },
      { value: "94%", label: "mais ágil no diagnóstico técnico" },
      { value: "100%", label: "eliminação de fluxos informais" },
    ],
    hue: 280,
  },
];
```

- [ ] **Step 7: Create `app/lib/maturity.ts`**

```ts
export type Stage = { key: string; title: string; sub: string };

export const MATURITY: Stage[] = [
  { key: "digital", title: "Digitalização Básica", sub: "Papel para tela." },
  { key: "governance", title: "Governança e Workflows", sub: "Processos estruturados com execução humana." },
  { key: "assisted", title: "Automação Assistida", sub: "IA como copiloto." },
  { key: "autonomous-flow", title: "Automação Autônoma", sub: "Sistemas integrados orquestrando IA." },
  { key: "autonomous-ops", title: "Operações Autônomas", sub: "Agentes inteligentes executando, orquestrando IA." },
  { key: "ai-native", title: "AI-Native", sub: "Arquitetura orientada à IA." },
];
```

- [ ] **Step 8: Create `app/lib/seals.ts`**

```ts
export const SEALS = [
  "ITIL® Accredited",
  "ISO 27001",
  "SOC 1 / SOC 2 / SOC 3",
  "PCI DSS Nível 1",
  "AWS Partner",
  "Amazon Bedrock",
  "Scale-Up Endeavor",
  "AES-256 + TLS 1.3",
] as const;
```

- [ ] **Step 9: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: no type errors.

- [ ] **Step 10: Commit**

```bash
git add app/lib/
git commit -m "feat(home): static data files for all 12 scenes"
```

---

## Task 3: UI primitives (Button, Badge)

**Files:**
- Create: `app/components/ui/Button.tsx`
- Create: `app/components/ui/Badge.tsx`

- [ ] **Step 1: Create `app/components/ui/Button.tsx`**

```tsx
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost";

export function Button({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; children: ReactNode }) {
  const base =
    "inline-flex items-center justify-center rounded-full px-7 py-3 text-base font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:opacity-50";
  const variants: Record<Variant, string> = {
    primary:
      "bg-accent text-white shadow-[0_0_40px_var(--color-accent-glow)] hover:shadow-[0_0_60px_var(--color-accent-glow)] hover:brightness-110",
    ghost: "border border-border text-text hover:bg-surface",
  };
  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}
```

- [ ] **Step 2: Create `app/components/ui/Badge.tsx`**

```tsx
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1 text-xs font-medium tracking-wide text-text-muted backdrop-blur-md",
        className
      )}
    >
      <span className="size-1.5 rounded-full bg-accent shadow-[0_0_10px_var(--color-accent)]" />
      {children}
    </span>
  );
}
```

- [ ] **Step 3: Configure path alias `@/*`**

Check `tsconfig.json` paths. If `@/*` doesn't map to `./app/*`, add it.

Modify `tsconfig.json` — ensure `compilerOptions.paths` includes:

```json
"paths": { "@/*": ["./app/*"] }
```

- [ ] **Step 4: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add app/components/ui/ tsconfig.json
git commit -m "feat(home): Button and Badge primitives"
```

---

## Task 4: FX — Spotlight (adapted from 21st.dev reference)

**Files:**
- Create: `app/components/fx/Spotlight.tsx`

- [ ] **Step 1: Create the component**

```tsx
import { cn } from "@/lib/utils";

export function Spotlight({ className, fill = "white" }: { className?: string; fill?: string }) {
  return (
    <svg
      className={cn("pointer-events-none absolute z-0 h-[169%] w-[138%] opacity-30 lg:w-[84%]", className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 3787 2842"
      fill="none"
      aria-hidden="true"
    >
      <g filter="url(#spotlight-filter)">
        <ellipse
          cx="1924.71"
          cy="273.501"
          rx="1924.71"
          ry="273.501"
          transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
          fill={fill}
          fillOpacity="0.21"
        />
      </g>
      <defs>
        <filter id="spotlight-filter" x="0.86" y="0.84" width="3785.16" height="2840.26" filterUnits="userSpaceOnUse">
          <feGaussianBlur stdDeviation="151" />
        </filter>
      </defs>
    </svg>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/components/fx/Spotlight.tsx
git commit -m "feat(home): Spotlight fx component"
```

---

## Task 5: FX — AuroraBackground

**Files:**
- Create: `app/components/fx/AuroraBackground.tsx`
- Modify: `app/globals.css` (add aurora keyframes)

- [ ] **Step 1: Append aurora keyframes to `app/globals.css`**

Add at the end:

```css
@keyframes aurora {
  0%   { background-position: 50% 50%, 50% 50%; }
  100% { background-position: 350% 50%, 350% 50%; }
}
```

- [ ] **Step 2: Create `app/components/fx/AuroraBackground.tsx`**

```tsx
"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function AuroraBackground({
  children,
  className,
  showRadialGradient = true,
}: {
  children: ReactNode;
  className?: string;
  showRadialGradient?: boolean;
}) {
  return (
    <div className={cn("relative flex w-full flex-col overflow-hidden", className)}>
      <div className="absolute inset-0 overflow-hidden">
        <div
          aria-hidden="true"
          className={cn(
            `pointer-events-none absolute -inset-[10px] opacity-50 will-change-transform
             [--aurora:repeating-linear-gradient(100deg,#1A4DFF_10%,#3B82F6_15%,#60A5FA_20%,#A78BFA_25%,#1A4DFF_30%)]
             [--dark-gradient:repeating-linear-gradient(100deg,#05060F_0%,#05060F_7%,transparent_10%,transparent_12%,#05060F_16%)]
             [background-image:var(--dark-gradient),var(--aurora)]
             [background-size:300%,200%]
             [background-position:50%_50%,50%_50%]
             blur-[10px]
             after:absolute after:inset-0 after:content-[""]
             after:[background-image:var(--dark-gradient),var(--aurora)]
             after:[background-size:200%,100%]
             after:mix-blend-difference after:[background-attachment:fixed]
             after:animate-[aurora_20s_linear_infinite]`,
            showRadialGradient &&
              "[mask-image:radial-gradient(ellipse_at_50%_30%,black_10%,transparent_70%)]"
          )}
        />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add app/components/fx/AuroraBackground.tsx app/globals.css
git commit -m "feat(home): AuroraBackground fx component"
```

---

## Task 6: FX — NumberTicker

**Files:**
- Create: `app/components/fx/NumberTicker.tsx`

- [ ] **Step 1: Create the component**

```tsx
"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  value: number;
  durationMs?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
};

export function NumberTicker({ value, durationMs = 1800, suffix = "", prefix = "", className }: Props) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setDisplay(value);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        if (started.current) return;
        if (entries.some((e) => e.isIntersecting)) {
          started.current = true;
          const start = performance.now();
          function tick(now: number) {
            const t = Math.min(1, (now - start) / durationMs);
            const eased = 1 - Math.pow(1 - t, 3);
            setDisplay(Math.round(value * eased));
            if (t < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [value, durationMs]);

  return (
    <span ref={ref} className={className} aria-live="polite">
      {prefix}
      {display.toLocaleString("pt-BR")}
      {suffix}
    </span>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/components/fx/NumberTicker.tsx
git commit -m "feat(home): NumberTicker fx component"
```

---

## Task 7: FX — TextReveal

**Files:**
- Create: `app/components/fx/TextReveal.tsx`

- [ ] **Step 1: Create the component**

```tsx
"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type Props = {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
  delay?: number;
  stagger?: number;
};

export function TextReveal({ text, className, as = "h1", delay = 0, stagger = 0.04 }: Props) {
  const Tag = motion[as];
  const words = text.split(" ");
  return (
    <Tag
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {words.map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap">
          {word.split("").map((char, ci) => (
            <motion.span
              key={ci}
              className="inline-block"
              variants={{
                hidden: { opacity: 0, y: "0.4em" },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.2, 0.65, 0.3, 0.9] } },
              }}
            >
              {char}
            </motion.span>
          ))}
          {wi < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </Tag>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/components/fx/TextReveal.tsx
git commit -m "feat(home): TextReveal fx component"
```

---

## Task 8: FX — MagneticButton

**Files:**
- Create: `app/components/fx/MagneticButton.tsx`

- [ ] **Step 1: Create the component**

```tsx
"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  strength?: number;
};

export function MagneticButton({ children, className, onClick, strength = 0.35 }: Props) {
  const ref = useRef<HTMLButtonElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 200, damping: 20 });
  const sy = useSpring(my, { stiffness: 200, damping: 20 });

  function handleMove(e: MouseEvent<HTMLButtonElement>) {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    mx.set(dx * strength);
    my.set(dy * strength);
  }
  function handleLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onClick}
      style={{ x: sx, y: sy }}
      className={cn(
        "relative inline-flex items-center justify-center rounded-full bg-accent px-10 py-5 text-lg font-semibold text-white shadow-[0_0_80px_var(--color-accent-glow)] transition-shadow hover:shadow-[0_0_120px_var(--color-accent-glow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
        className
      )}
    >
      <span className="absolute inset-0 -z-10 rounded-full bg-accent blur-2xl opacity-50" />
      {children}
    </motion.button>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/components/fx/MagneticButton.tsx
git commit -m "feat(home): MagneticButton fx component"
```

---

## Task 9: FX — AnimatedBeam (SVG connectors)

**Files:**
- Create: `app/components/fx/AnimatedBeam.tsx`

- [ ] **Step 1: Create the component**

```tsx
"use client";

import { motion } from "motion/react";

type Point = { x: number; y: number };

export function AnimatedBeam({
  from,
  to,
  delay = 0,
  duration = 1.2,
  color = "var(--color-accent)",
}: {
  from: Point;
  to: Point;
  delay?: number;
  duration?: number;
  color?: string;
}) {
  const midX = (from.x + to.x) / 2;
  const d = `M ${from.x} ${from.y} Q ${midX} ${from.y - 40}, ${to.x} ${to.y}`;
  return (
    <motion.path
      d={d}
      stroke={color}
      strokeWidth={1.5}
      fill="none"
      strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 0.6 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration, delay, ease: "easeOut" }}
    />
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/components/fx/AnimatedBeam.tsx
git commit -m "feat(home): AnimatedBeam fx component"
```

---

## Task 10: FX — ScrollDots (12-point side indicator)

**Files:**
- Create: `app/components/fx/ScrollDots.tsx`

- [ ] **Step 1: Create the component**

```tsx
"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Props = { ids: string[] };

export function ScrollDots({ ids }: Props) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    ids.forEach((id, idx) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(idx);
        },
        { threshold: 0.5 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [ids]);

  return (
    <nav
      aria-label="Navegação de seção"
      className="fixed right-6 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-2.5 lg:flex"
    >
      {ids.map((id, idx) => (
        <a
          key={id}
          href={`#${id}`}
          aria-label={`Seção ${idx + 1}`}
          className={cn(
            "block size-2 rounded-full transition-all",
            active === idx ? "h-6 bg-accent" : "bg-text-muted/30 hover:bg-text-muted/60"
          )}
        />
      ))}
    </nav>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/components/fx/ScrollDots.tsx
git commit -m "feat(home): ScrollDots side indicator"
```

---

## Task 11: Scene 1 — Hero

**Files:**
- Create: `app/components/sections/Hero.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `app/components/sections/Hero.tsx`**

```tsx
"use client";

import { Spotlight } from "@/components/fx/Spotlight";
import { AuroraBackground } from "@/components/fx/AuroraBackground";
import { TextReveal } from "@/components/fx/TextReveal";
import { Badge } from "@/components/ui/Badge";
import { HERO_CLIENTS } from "@/lib/clients";

export function Hero() {
  return (
    <section
      id="scene-hero"
      aria-label="Hero"
      className="relative isolate flex min-h-screen items-center justify-center overflow-hidden"
    >
      <AuroraBackground className="absolute inset-0">
        <div className="h-full w-full" />
      </AuroraBackground>
      <Spotlight className="-top-40 left-0" fill="#1A4DFF" />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-6 text-center">
        <Badge className="mb-8">Plataforma</Badge>

        <TextReveal
          as="h1"
          text="Não somos um software."
          className="font-sans text-[clamp(2.5rem,9vw,8rem)] font-extralight leading-[0.95] tracking-[-0.03em]"
        />
        <TextReveal
          as="h1"
          delay={0.3}
          text="Somos a sinfonia da sua operação."
          className="bg-gradient-to-br from-white via-white to-accent-2 bg-clip-text font-sans text-[clamp(2.5rem,9vw,8rem)] font-extralight leading-[0.95] tracking-[-0.03em] text-transparent"
        />

        <p className="mt-10 max-w-2xl text-lg text-text-muted md:text-xl">
          Orquestramos serviços. Inteligência em movimento.
        </p>

        <div
          className="relative mt-20 hidden h-72 w-72 md:block"
          style={{ ["--orbit-r" as string]: "180px" }}
          aria-hidden="true"
        >
          {HERO_CLIENTS.map((name, i) => (
            <span
              key={name}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-sm text-text-muted/70"
              style={{
                animation: `orbit 60s linear infinite`,
                animationDelay: `${-(60 / HERO_CLIENTS.length) * i}s`,
              }}
            >
              {name}
            </span>
          ))}
        </div>

        <div className="mt-20 flex flex-wrap items-center justify-center gap-3 md:hidden">
          {HERO_CLIENTS.map((name) => (
            <span key={name} className="rounded-full border border-border bg-surface/40 px-3 py-1 font-mono text-xs text-text-muted">
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Wire into `app/page.tsx`**

```tsx
import { Hero } from "./components/sections/Hero";

export default function Home() {
  return (
    <main className="relative">
      <Hero />
    </main>
  );
}
```

- [ ] **Step 3: Dev check**

Run: `npm run dev`
Open: http://localhost:3000
Expected: Hero renders. Aurora gradient pulsing in bg. Two-line title reveals letter-by-letter. Badge "Plataforma" at top. 8 client names orbiting in a circle on desktop, chips on mobile.

- [ ] **Step 4: Commit**

```bash
git add app/components/sections/Hero.tsx app/page.tsx
git commit -m "feat(home): scene 1 Hero with text reveal and orbiting clients"
```

---

## Task 12: Scene 2 — Harvard stats

**Files:**
- Create: `app/components/sections/HarvardStats.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create the section**

```tsx
"use client";

import { NumberTicker } from "@/components/fx/NumberTicker";
import { TextReveal } from "@/components/fx/TextReveal";

const STATS = [
  { value: 90, label: "das empresas falham em executar suas estratégias com sucesso." },
  { value: 95, label: "dos funcionários em grandes organizações não entendem a estratégia da própria empresa." },
  { value: 85, label: "das equipes executivas gastam menos de uma hora por mês discutindo estratégia." },
];

export function HarvardStats() {
  return (
    <section
      id="scene-harvard"
      aria-label="Estudo da Harvard Business Review"
      className="relative flex min-h-screen items-center justify-center bg-black px-6 py-32"
    >
      <div className="mx-auto max-w-6xl">
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-text-muted">Harvard Business Review</p>
        <TextReveal
          as="h2"
          text="95% das empresas falham em executar suas estratégias."
          className="mb-20 max-w-4xl font-sans text-[clamp(2rem,5vw,4.5rem)] font-extralight leading-[1.05] tracking-tight"
        />

        <div className="grid gap-12 md:grid-cols-3">
          {STATS.map((s) => (
            <div key={s.value} className="border-t border-border pt-8">
              <div className="text-[clamp(4rem,10vw,8rem)] font-extralight leading-none tracking-tight text-accent">
                <NumberTicker value={s.value} suffix="%" />
              </div>
              <p className="mt-6 max-w-xs text-base leading-relaxed text-text-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Wire into `page.tsx`**

```tsx
import { Hero } from "./components/sections/Hero";
import { HarvardStats } from "./components/sections/HarvardStats";

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <HarvardStats />
    </main>
  );
}
```

- [ ] **Step 3: Dev check**

Expected: scroll past Hero → black section appears. 3 huge percentage numbers count from 0 to 90/95/85 once they enter viewport. Mobile stacks vertically.

- [ ] **Step 4: Commit**

```bash
git add app/components/sections/HarvardStats.tsx app/page.tsx
git commit -m "feat(home): scene 2 Harvard stats with NumberTicker"
```

---

## Task 13: Scene 3 — ThreePillars

**Files:**
- Create: `app/components/sections/ThreePillars.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create the section**

```tsx
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { PILLARS } from "@/lib/pillars";

export function ThreePillars() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const xLeft = useTransform(scrollYProgress, [0.2, 0.7], [-200, 0]);
  const xRight = useTransform(scrollYProgress, [0.2, 0.7], [200, 0]);
  const scaleSide = useTransform(scrollYProgress, [0.2, 0.7], [1, 0.7]);
  const opacitySide = useTransform(scrollYProgress, [0.6, 0.8], [1, 0]);
  const opacityLogo = useTransform(scrollYProgress, [0.65, 0.85], [0, 1]);
  const scaleLogo = useTransform(scrollYProgress, [0.65, 0.85], [0.6, 1]);

  return (
    <section
      id="scene-pillars"
      aria-label="Três pilares"
      ref={ref}
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-32"
    >
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="mb-20 mx-auto max-w-3xl text-[clamp(2rem,4vw,3.5rem)] font-extralight leading-tight tracking-tight">
          Plataforma de IA para serviços e processos.
        </h2>

        <div className="relative mx-auto flex h-80 w-full max-w-3xl items-center justify-center">
          <motion.div
            style={{ x: xLeft, scale: scaleSide, opacity: opacitySide }}
            className="absolute left-0 size-56 rounded-full bg-gradient-to-br from-blue-400/40 to-blue-600/20 shadow-[0_0_80px_rgba(59,130,246,0.35)]"
          >
            <div className="flex h-full flex-col items-center justify-center px-4">
              <p className="text-2xl font-light">{PILLARS[0].title}</p>
              <p className="mt-2 px-2 text-center text-xs text-text-muted">{PILLARS[0].sub}</p>
            </div>
          </motion.div>

          <motion.div
            style={{ x: xRight, scale: scaleSide, opacity: opacitySide }}
            className="absolute right-0 size-56 rounded-full bg-gradient-to-br from-surface-2 to-black shadow-[0_0_60px_rgba(0,0,0,0.6)] border border-border"
          >
            <div className="flex h-full flex-col items-center justify-center px-4">
              <p className="text-2xl font-light">{PILLARS[1].title}</p>
              <p className="mt-2 px-2 text-center text-xs text-text-muted">{PILLARS[1].sub}</p>
            </div>
          </motion.div>

          <motion.div
            style={{ scale: scaleLogo, opacity: opacityLogo }}
            className="absolute size-72 rounded-full bg-gradient-to-br from-accent to-accent-2 shadow-[0_0_120px_var(--color-accent-glow)]"
          >
            <div className="flex h-full flex-col items-center justify-center px-6 text-center">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/80">Desk Manager</p>
              <p className="mt-3 text-2xl font-light text-white">{PILLARS[2].title}</p>
              <p className="mt-2 text-xs text-white/70">{PILLARS[2].sub}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Wire into `page.tsx`** (add `<ThreePillars />` after `<HarvardStats />`)

- [ ] **Step 3: Dev check**

Expected: scrolling reveals 3 circles. The 2 side circles drift in from the sides, then fade out as the central Desk Manager circle grows and brightens.

- [ ] **Step 4: Commit**

```bash
git add app/components/sections/ThreePillars.tsx app/page.tsx
git commit -m "feat(home): scene 3 Three Pillars with scroll-linked fusion"
```

---

## Task 14: Scene 4 — Timeline (horizontal sticky GSAP)

**Files:**
- Create: `app/components/sections/Timeline.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create the section**

```tsx
"use client";

import { useEffect, useRef } from "react";
import { TIMELINE } from "@/lib/timeline";

export function Timeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    let cleanup = () => {};
    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const totalScroll = track.scrollWidth - window.innerWidth;
      const tween = gsap.to(track, {
        x: -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${totalScroll}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      cleanup = () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    })();

    return () => cleanup();
  }, []);

  return (
    <section
      id="scene-timeline"
      aria-label="Linha do tempo Desk Manager"
      ref={sectionRef}
      className="relative h-screen overflow-hidden bg-bg"
    >
      <div className="absolute inset-x-0 top-12 z-10 px-6 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-text-muted">Nossa história</p>
        <h2 className="mt-3 text-[clamp(1.75rem,3.5vw,3rem)] font-extralight tracking-tight">
          Evolução dos produtos · 2009 → 2025
        </h2>
      </div>

      <div ref={trackRef} className="absolute inset-y-0 left-0 flex items-center gap-12 pl-[10vw] pr-[10vw] will-change-transform">
        {TIMELINE.map((m) => (
          <article key={m.year} className="flex w-[420px] shrink-0 flex-col gap-6">
            <div className="relative h-56 w-full overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-accent/30 via-surface to-black">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(26,77,255,0.4),transparent_60%)]" />
              <div className="absolute bottom-4 left-4 font-mono text-xs uppercase tracking-widest text-white/70">
                {m.tag}
              </div>
            </div>
            <div>
              <p className="font-mono text-5xl font-light text-accent">{m.year}</p>
              <p className="mt-3 text-xl font-light">{m.title}</p>
              <p className="mt-2 text-sm text-text-muted">{m.sub}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Wire into `page.tsx`**

- [ ] **Step 3: Dev check**

Expected: scrolling pins the timeline section. Horizontal track scrolls left as user scrolls down. Each milestone card has a gradient placeholder + year + title.

- [ ] **Step 4: Commit**

```bash
git add app/components/sections/Timeline.tsx app/page.tsx
git commit -m "feat(home): scene 4 Timeline with GSAP horizontal pin"
```

---

## Task 15: Scene 5 — WorldGlobe

**Files:**
- Create: `app/components/sections/WorldGlobe.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create the section**

```tsx
"use client";

import { useEffect, useRef } from "react";
import createGlobe from "cobe";
import { COUNTRIES } from "@/lib/countries";

export function WorldGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let phi = 0;
    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: 600 * 2,
      height: 600 * 2,
      phi: 0,
      theta: 0.25,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.07, 0.08, 0.15],
      markerColor: [0.1, 0.3, 1],
      glowColor: [0.1, 0.3, 1],
      markers: COUNTRIES.map((c) => ({ location: [c.lat, c.lng], size: 0.06 })),
      onRender: (state) => {
        state.phi = phi;
        phi += 0.003;
      },
    });
    return () => globe.destroy();
  }, []);

  return (
    <section
      id="scene-globe"
      aria-label="Presença global"
      className="relative flex min-h-screen items-center overflow-hidden px-6 py-32"
    >
      <div className="mx-auto grid w-full max-w-7xl gap-16 lg:grid-cols-2">
        <div className="flex flex-col justify-center">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-text-muted">Do Brasil para o mundo</p>
          <h2 className="mt-4 text-[clamp(2.5rem,6vw,5rem)] font-extralight leading-[1.05] tracking-tight">
            <span className="text-accent">+40</span> países
          </h2>
          <p className="mt-6 max-w-md text-text-muted">
            Suporte multilíngue e governança adaptada a padrões internacionais.
          </p>
          <ul className="mt-8 grid max-w-md grid-cols-2 gap-x-6 gap-y-2 font-mono text-xs text-text-muted">
            {COUNTRIES.slice(0, 18).map((c) => (
              <li key={c.name}>{c.name}</li>
            ))}
          </ul>
        </div>
        <div className="relative mx-auto aspect-square w-full max-w-[600px]">
          <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Wire into `page.tsx`**

- [ ] **Step 3: Dev check**

Expected: globe renders with dots in country positions. Auto-rotates slowly. Country list visible on left in mono font.

- [ ] **Step 4: Commit**

```bash
git add app/components/sections/WorldGlobe.tsx app/page.tsx
git commit -m "feat(home): scene 5 WorldGlobe with cobe.js"
```

---

## Task 16: Scene 6 — ProductsBento

**Files:**
- Create: `app/components/sections/ProductsBento.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create the section**

```tsx
"use client";

import { motion } from "motion/react";

function AgentCard() {
  return (
    <motion.div whileHover={{ scale: 1.01 }} className="relative col-span-2 row-span-2 overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-accent/20 via-surface to-bg p-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(26,77,255,0.25),transparent_60%)]" />
      <div className="relative flex h-full flex-col">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">AI Agent</p>
          <h3 className="mt-3 text-4xl font-extralight">Agentes autônomos</h3>
          <p className="mt-3 max-w-md text-text-muted">Decidem e executam tarefas pela operação, conectados ao seu ecossistema.</p>
        </div>
        <div className="mt-auto space-y-2 font-mono text-sm">
          <div className="rounded-xl border border-border bg-surface/60 p-3">
            <span className="text-text-muted">user:</span> abrir chamado de impressora 3º andar
          </div>
          <div className="rounded-xl border border-border bg-accent/10 p-3">
            <span className="text-accent">agent:</span> chamado #4821 aberto, técnico designado para 14h<span className="inline-block animate-[blink_1s_steps(2,start)_infinite]">|</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function SmallCard({ tag, title, desc, children }: { tag: string; title: string; desc: string; children: React.ReactNode }) {
  return (
    <motion.div whileHover={{ scale: 1.02 }} className="relative overflow-hidden rounded-3xl border border-border bg-surface/60 p-6 backdrop-blur-md">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-text-muted">{tag}</p>
      <h3 className="mt-2 text-2xl font-light">{title}</h3>
      <p className="mt-2 text-sm text-text-muted">{desc}</p>
      <div className="mt-6 h-28">{children}</div>
    </motion.div>
  );
}

export function ProductsBento() {
  return (
    <section
      id="scene-products"
      aria-label="Cinco produtos da plataforma"
      className="relative min-h-screen px-6 py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-text-muted">Produtos</p>
          <h2 className="mt-3 text-[clamp(2rem,4.5vw,3.75rem)] font-extralight leading-tight tracking-tight">
            Orqueste a operação da sua empresa em um só lugar.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:grid-rows-2 md:[grid-auto-flow:dense]">
          <AgentCard />
          <SmallCard tag="ESM" title="Empresa toda" desc="RH, Financeiro, Jurídico, Marketing.">
            <div className="relative h-full">
              {["RH", "TI", "JUR", "FIN", "MKT"].map((d, i) => (
                <span key={d} className="absolute left-1/2 top-1/2 size-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-border bg-surface-2 text-center text-xs leading-10" style={{ animation: `orbit 14s linear infinite`, animationDelay: `${-(14/5)*i}s`, ["--orbit-r" as string]: "44px" }}>{d}</span>
              ))}
            </div>
          </SmallCard>
          <SmallCard tag="ITSM" title="Gestão de TI" desc="ITIL® IA-native.">
            <div className="grid h-full grid-cols-3 gap-2">
              {[0, 1, 2].map((col) => (
                <div key={col} className="rounded-lg border border-border bg-surface-2/60 p-1.5">
                  <div className="h-2 w-full rounded bg-accent/30" />
                  <div className="mt-1 h-2 w-2/3 rounded bg-text-muted/30" />
                </div>
              ))}
            </div>
          </SmallCard>
          <SmallCard tag="BPM" title="Processos" desc="Workflows com visão executiva.">
            <svg viewBox="0 0 200 80" className="h-full w-full">
              <motion.path d="M 10 40 Q 60 10, 100 40 T 190 40" stroke="var(--color-accent)" strokeWidth="2" fill="none" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.5 }} />
              <circle cx="10" cy="40" r="4" fill="var(--color-accent)" />
              <circle cx="190" cy="40" r="4" fill="var(--color-accent)" />
            </svg>
          </SmallCard>
          <SmallCard tag="Maestro" title="Integrações" desc="iPaaS low-code.">
            <div className="relative h-full">
              <div className="absolute left-1/2 top-1/2 size-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/80 text-center text-[10px] leading-10 text-white">HUB</div>
              {["ERP", "CRM", "API", "AI"].map((n, i) => {
                const angle = (i / 4) * Math.PI * 2;
                const x = Math.cos(angle) * 50;
                const y = Math.sin(angle) * 30;
                return (
                  <span key={n} className="absolute left-1/2 top-1/2 size-8 rounded-full border border-border bg-surface-2 text-center text-[10px] leading-8" style={{ transform: `translate(${x}px, ${y}px) translate(-50%, -50%)` }}>{n}</span>
                );
              })}
            </div>
          </SmallCard>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Wire into `page.tsx`**

- [ ] **Step 3: Dev check**

Expected: bento grid renders with AI Agent in 2×2, four smaller cards around it. Each card has its own micro-animation.

- [ ] **Step 4: Commit**

```bash
git add app/components/sections/ProductsBento.tsx app/page.tsx
git commit -m "feat(home): scene 6 ProductsBento with micro-animated cards"
```

---

## Task 17: Scene 7 — RetailFlows

**Files:**
- Create: `app/components/sections/RetailFlows.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create the section**

```tsx
"use client";

import { motion } from "motion/react";

const ROLES = [
  { tag: "Agente de Estoque", desc: "Gerencia dados em tempo real, coordena fornecedores e agenda logística." },
  { tag: "Agente de Recomendação", desc: "Analisa orçamentos e objetivos para gerar engajamento e recomendações." },
  { tag: "Humano (Gerente de Loja)", desc: "Lidera relacionamento e fornece conselhos personalizados." },
  { tag: "Robô Humanoide", desc: "Recupera itens e transporta materiais pesados com segurança." },
];

export function RetailFlows() {
  return (
    <section
      id="scene-flows"
      aria-label="Fluxos de varejo reimaginados"
      className="relative min-h-screen px-6 py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-text-muted">Reimaginando fluxos de trabalho</p>
          <h2 className="mt-3 text-[clamp(2rem,4.5vw,3.75rem)] font-extralight leading-tight tracking-tight">
            Varejo. Humanos e agentes operando juntos.
          </h2>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr_1fr]">
          <div className="flex flex-col gap-6">
            {ROLES.slice(0, 2).map((r, i) => (
              <motion.div
                key={r.tag}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ delay: i * 0.2 }}
                className="rounded-2xl border border-border bg-surface/60 p-6 backdrop-blur-md"
              >
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{r.tag}</p>
                <p className="mt-3 text-sm text-text-muted">{r.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="relative flex items-center justify-center">
            <svg viewBox="0 0 400 400" className="w-full max-w-md" aria-hidden="true">
              <defs>
                <linearGradient id="floor" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0%" stopColor="#1A4DFF" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#1A4DFF" stopOpacity="0" />
                </linearGradient>
              </defs>
              <polygon points="50,250 200,180 350,250 200,320" fill="url(#floor)" stroke="var(--color-border)" />
              <rect x="120" y="160" width="40" height="60" fill="var(--color-surface-2)" stroke="var(--color-border)" />
              <rect x="200" y="140" width="60" height="80" fill="var(--color-surface-2)" stroke="var(--color-border)" />
              <circle cx="170" cy="280" r="10" fill="var(--color-accent)" />
              <circle cx="240" cy="260" r="10" fill="var(--color-accent-2)" />
              <motion.circle cx="170" cy="280" r="20" fill="none" stroke="var(--color-accent)" initial={{ opacity: 0 }} whileInView={{ opacity: [0, 1, 0] }} viewport={{ once: true }} transition={{ duration: 2, repeat: Infinity }} />
            </svg>
          </div>

          <div className="flex flex-col gap-6">
            {ROLES.slice(2).map((r, i) => (
              <motion.div
                key={r.tag}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ delay: 0.4 + i * 0.2 }}
                className="rounded-2xl border border-border bg-surface/60 p-6 backdrop-blur-md"
              >
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{r.tag}</p>
                <p className="mt-3 text-sm text-text-muted">{r.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Wire into `page.tsx`**

- [ ] **Step 3: Dev check**

Expected: 4 role cards on sides + isometric SVG store scene in center with pulsing agents.

- [ ] **Step 4: Commit**

```bash
git add app/components/sections/RetailFlows.tsx app/page.tsx
git commit -m "feat(home): scene 7 RetailFlows with SVG illustration"
```

---

## Task 18: Scene 8 — CasesSticky (GSAP pin per case)

**Files:**
- Create: `app/components/sections/CasesSticky.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create the section**

```tsx
"use client";

import { useEffect, useRef } from "react";
import { CASES } from "@/lib/cases";

export function CasesSticky() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    let cleanup = () => {};
    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const cards = section.querySelectorAll<HTMLElement>("[data-case]");
      const triggers: ReturnType<typeof ScrollTrigger.create>[] = [];
      cards.forEach((card) => {
        const t = ScrollTrigger.create({
          trigger: card,
          start: "top top",
          end: "bottom top",
          pin: true,
          pinSpacing: false,
        });
        triggers.push(t);
      });

      cleanup = () => triggers.forEach((t) => t.kill());
    })();

    return () => cleanup();
  }, []);

  return (
    <section
      id="scene-cases"
      aria-label="Casos de sucesso"
      ref={sectionRef}
      className="relative"
    >
      {CASES.map((c) => (
        <div
          key={c.slug}
          data-case
          className="relative flex h-screen w-full items-center overflow-hidden px-6 py-12"
          style={{ background: `linear-gradient(135deg, hsl(${c.hue} 50% 8%) 0%, var(--color-bg) 60%)` }}
        >
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
            <div className="flex flex-col justify-center">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-text-muted">Caso de uso · {c.brand}</p>
              <h3 className="mt-4 text-[clamp(2.25rem,5vw,4rem)] font-extralight leading-[1.05] tracking-tight">
                {c.headline}
              </h3>
              <p className="mt-6 max-w-md text-lg text-text-muted">{c.quote}</p>
            </div>
            <div className="grid content-center gap-6">
              {c.kpis.map((k) => (
                <div key={k.label} className="border-l-2 border-accent pl-6">
                  <p className="text-[clamp(2.5rem,6vw,5rem)] font-extralight leading-none tracking-tight text-accent">
                    {k.value}
                  </p>
                  <p className="mt-2 text-sm text-text-muted">{k.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
```

- [ ] **Step 2: Wire into `page.tsx`**

- [ ] **Step 3: Dev check**

Expected: each case pins to viewport as you scroll, then is overlaid by the next. 4 cases total. Background hue shifts per case.

- [ ] **Step 4: Commit**

```bash
git add app/components/sections/CasesSticky.tsx app/page.tsx
git commit -m "feat(home): scene 8 CasesSticky with GSAP per-card pin"
```

---

## Task 19: Scene 9 — AiAnatomy (pyramid)

**Files:**
- Create: `app/components/sections/AiAnatomy.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create the section**

```tsx
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

type Layer = { key: string; title: string; sub: string; width: string };

const LAYERS: Layer[] = [
  { key: "data", title: "Dados", sub: "Vetoriais e estruturados.", width: "w-[90%]" },
  { key: "depts", title: "Departamentos", sub: "Pessoas e serviços estruturados.", width: "w-[75%]" },
  { key: "processes", title: "Processos", sub: "Sinergia do negócio.", width: "w-[60%]" },
  { key: "agent", title: "Desk Manager AI Agent", sub: "Inferência + ação.", width: "w-[45%]" },
];

function PyramidLayer({ layer, index, progress }: { layer: Layer; index: number; progress: MotionValue<number> }) {
  const start = 0.15 + index * 0.12;
  const opacity = useTransform(progress, [start, start + 0.1], [0, 1]);
  const y = useTransform(progress, [start, start + 0.15], [40, 0]);
  const rotateX = useTransform(progress, [start, start + 0.15], [25, 0]);
  return (
    <motion.div
      style={{ opacity, y, rotateX }}
      className={`${layer.width} rounded-2xl border border-border bg-surface/80 p-5 backdrop-blur-md`}
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent">Camada {index + 1}</p>
      <p className="mt-1 text-xl font-light">{layer.title}</p>
      <p className="text-sm text-text-muted">{layer.sub}</p>
    </motion.div>
  );
}

export function AiAnatomy() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  return (
    <section
      id="scene-anatomy"
      aria-label="Anatomia da IA"
      ref={ref}
      className="relative min-h-screen overflow-hidden px-6 py-32"
    >
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2">
        <div className="flex flex-col justify-center">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-text-muted">Anatomia</p>
          <h2 className="mt-4 text-[clamp(2.25rem,5vw,4rem)] font-extralight leading-tight tracking-tight">
            IA não é mágica. É estatística e infraestrutura.
          </h2>
          <p className="mt-6 max-w-md text-text-muted">
            Cada camada importa: dados limpos, departamentos modelados, processos automatizáveis e, no topo, agentes que decidem.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 perspective-distant" style={{ transformStyle: "preserve-3d" }}>
          {LAYERS.map((l, i) => (
            <PyramidLayer key={l.key} layer={l} index={i} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Wire into `page.tsx`**

- [ ] **Step 3: Dev check**

Expected: 4 trapezoidal layers stack like a pyramid (each narrower than the last). They fade and rotate into place sequentially as scroll progresses.

- [ ] **Step 4: Commit**

```bash
git add app/components/sections/AiAnatomy.tsx app/page.tsx
git commit -m "feat(home): scene 9 AiAnatomy pyramid scroll-linked"
```

---

## Task 20: Scene 10 — MaturityJourney (slider)

**Files:**
- Create: `app/components/sections/MaturityJourney.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create the section**

```tsx
"use client";

import { useState } from "react";
import { MATURITY } from "@/lib/maturity";
import { cn } from "@/lib/utils";

export function MaturityJourney() {
  const [stage, setStage] = useState(1);

  return (
    <section
      id="scene-maturity"
      aria-label="Jornada de maturidade com IA"
      className="relative min-h-screen px-6 py-32"
    >
      <div className="mx-auto max-w-6xl text-center">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-text-muted">Jornada do Humano com IA</p>
        <h2 className="mt-4 text-[clamp(2.25rem,5vw,4rem)] font-extralight leading-tight tracking-tight">
          Aumento de maturidade com naturalidade.
        </h2>

        <div className="mt-20 flex h-72 items-end justify-center gap-3">
          {MATURITY.map((s, i) => {
            const isActive = i === stage;
            const isPassed = i < stage;
            const height = 30 + i * 12 + (isActive ? 16 : 0);
            return (
              <div
                key={s.key}
                className={cn(
                  "relative flex w-20 flex-col items-center justify-end rounded-t-xl border border-b-0 border-border transition-all duration-300",
                  isActive ? "bg-accent shadow-[0_0_60px_var(--color-accent-glow)]" : isPassed ? "bg-accent/40" : "bg-surface-2"
                )}
                style={{ height: `${height}%` }}
                aria-label={s.title}
              >
                <span className="absolute -bottom-8 font-mono text-[10px] uppercase tracking-wider text-text-muted">{i + 1}</span>
              </div>
            );
          })}
        </div>

        <div className="mt-16 mx-auto max-w-xl">
          <input
            type="range"
            min={0}
            max={MATURITY.length - 1}
            value={stage}
            onChange={(e) => setStage(parseInt(e.target.value))}
            className="w-full accent-[var(--color-accent)]"
            aria-label="Estágio de maturidade"
          />
        </div>

        <div className="mt-10 mx-auto max-w-2xl">
          <p className="text-2xl font-light">{MATURITY[stage].title}</p>
          <p className="mt-2 text-text-muted">{MATURITY[stage].sub}</p>
          <p className="mt-8 text-sm text-accent">
            Está em <strong>{MATURITY[stage].title}</strong>? Veja como pulamos para o próximo estágio em 90 dias →
          </p>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Wire into `page.tsx`**

- [ ] **Step 3: Dev check**

Expected: 6 bars ascending in height (Digitalização → AI-Native). Range slider below drags the highlight; current stage glows blue. Text below updates with current stage.

- [ ] **Step 4: Commit**

```bash
git add app/components/sections/MaturityJourney.tsx app/page.tsx
git commit -m "feat(home): scene 10 MaturityJourney with slider"
```

---

## Task 21: Scene 11 — TrustMarquee

**Files:**
- Create: `app/components/sections/TrustMarquee.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create the section**

```tsx
"use client";

import { motion } from "motion/react";
import { SEALS } from "@/lib/seals";

export function TrustMarquee() {
  const items = [...SEALS, ...SEALS];
  return (
    <section
      id="scene-trust"
      aria-label="Selos de confiança"
      className="relative overflow-hidden border-y border-border py-20"
    >
      <div className="mx-auto max-w-7xl px-6">
        <p className="mb-12 text-center font-mono text-xs uppercase tracking-[0.3em] text-text-muted">
          Segurança & governança da informação
        </p>
      </div>

      <div className="relative flex overflow-hidden">
        <div className="flex shrink-0 animate-[marquee_40s_linear_infinite] items-center gap-12 pr-12" aria-hidden="true">
          {items.map((s, i) => (
            <motion.div
              key={`${s}-${i}`}
              whileHover={{ rotateZ: 1.5, scale: 1.05 }}
              className="flex h-20 w-56 shrink-0 items-center justify-center rounded-2xl border border-border bg-surface/60 px-6 text-center font-mono text-xs uppercase tracking-wider text-text-muted backdrop-blur-md"
            >
              {s}
            </motion.div>
          ))}
        </div>
      </div>

      <ul className="sr-only">
        {SEALS.map((s) => <li key={s}>{s}</li>)}
      </ul>
    </section>
  );
}
```

- [ ] **Step 2: Wire into `page.tsx`**

- [ ] **Step 3: Dev check**

Expected: marquee scrolling left infinitely with 8 seals. Hover pauses individual tile and tilts it slightly.

- [ ] **Step 4: Commit**

```bash
git add app/components/sections/TrustMarquee.tsx app/page.tsx
git commit -m "feat(home): scene 11 TrustMarquee with infinite scroll"
```

---

## Task 22: Scene 12 — FinalCta

**Files:**
- Create: `app/components/sections/FinalCta.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create the section**

```tsx
"use client";

import { useEffect, useState } from "react";
import { MagneticButton } from "@/components/fx/MagneticButton";

const Q1 = "Quantas das nossas tarefas poderiam ser operadas por agentes de IA hoje?";
const Q2 = "Qual é o custo de oportunidade de cada mês sem agentes em produção?";

function Typewriter({ text, delay = 0 }: { text: string; delay?: number }) {
  const [chars, setChars] = useState(0);

  useEffect(() => {
    let id: number;
    const start = () => {
      let i = 0;
      const step = () => {
        i += 1;
        setChars(i);
        if (i < text.length) id = window.setTimeout(step, 40);
      };
      step();
    };
    const t = window.setTimeout(start, delay);
    return () => {
      window.clearTimeout(t);
      if (id) window.clearTimeout(id);
    };
  }, [text, delay]);

  return (
    <span>
      {text.slice(0, chars)}
      <span className="ml-0.5 inline-block w-[0.5ch] animate-[blink_1s_steps(2,start)_infinite]">|</span>
    </span>
  );
}

export function FinalCta() {
  return (
    <section
      id="scene-cta"
      aria-label="Convite final"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-6 py-32"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(26,77,255,0.15),transparent_60%)]" />
      <div className="absolute inset-0" aria-hidden="true">
        {Array.from({ length: 14 }).map((_, i) => (
          <span
            key={i}
            className="absolute size-1 rounded-full bg-white/30"
            style={{ left: `${(i * 47) % 100}%`, top: `${(i * 29) % 100}%`, animation: `pulse-dot ${3 + (i % 4)}s ease-in-out ${i * 0.2}s infinite` }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-5xl text-center">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-text-muted">Provocação final</p>
        <h2 className="mt-8 text-[clamp(2rem,5vw,4rem)] font-extralight leading-[1.15] tracking-tight">
          <Typewriter text={Q1} />
        </h2>
        <h2 className="mt-12 text-[clamp(2rem,5vw,4rem)] font-extralight leading-[1.15] tracking-tight text-accent-2">
          <Typewriter text={Q2} delay={2500} />
        </h2>

        <div className="mt-20">
          <MagneticButton>Vamos colocar sua operação em movimento.</MagneticButton>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Wire into `page.tsx`**

- [ ] **Step 3: Dev check**

Expected: typed-out questions with blinking cursor. Magnetic CTA button below with blue glow. Subtle particle field in background.

- [ ] **Step 4: Commit**

```bash
git add app/components/sections/FinalCta.tsx app/page.tsx
git commit -m "feat(home): scene 12 FinalCta with typewriter and magnetic CTA"
```

---

## Task 23: Wire ScrollDots + Footer + final `page.tsx`

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Rewrite `app/page.tsx` to wire all 12 sections + ScrollDots + footer**

```tsx
import { Hero } from "./components/sections/Hero";
import { HarvardStats } from "./components/sections/HarvardStats";
import { ThreePillars } from "./components/sections/ThreePillars";
import { Timeline } from "./components/sections/Timeline";
import { WorldGlobe } from "./components/sections/WorldGlobe";
import { ProductsBento } from "./components/sections/ProductsBento";
import { RetailFlows } from "./components/sections/RetailFlows";
import { CasesSticky } from "./components/sections/CasesSticky";
import { AiAnatomy } from "./components/sections/AiAnatomy";
import { MaturityJourney } from "./components/sections/MaturityJourney";
import { TrustMarquee } from "./components/sections/TrustMarquee";
import { FinalCta } from "./components/sections/FinalCta";
import { ScrollDots } from "./components/fx/ScrollDots";

const SECTION_IDS = [
  "scene-hero",
  "scene-harvard",
  "scene-pillars",
  "scene-timeline",
  "scene-globe",
  "scene-products",
  "scene-flows",
  "scene-cases",
  "scene-anatomy",
  "scene-maturity",
  "scene-trust",
  "scene-cta",
];

export default function Home() {
  return (
    <main className="relative">
      <ScrollDots ids={SECTION_IDS} />
      <Hero />
      <HarvardStats />
      <ThreePillars />
      <Timeline />
      <WorldGlobe />
      <ProductsBento />
      <RetailFlows />
      <CasesSticky />
      <AiAnatomy />
      <MaturityJourney />
      <TrustMarquee />
      <FinalCta />
      <footer className="border-t border-border bg-bg py-12 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-text-muted">deskmanager.com</p>
      </footer>
    </main>
  );
}
```

- [ ] **Step 2: Dev check — full page**

Run: `npm run dev`
Scroll the entire page top to bottom.
Expected: all 12 sections visible in order, smooth scroll, ScrollDots indicator on right (desktop only) highlights current section. No console errors.

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat(home): wire all 12 sections, ScrollDots and footer"
```

---

## Task 24: Build, polish, and final verification

- [ ] **Step 1: Production build**

Run: `npm run build`
Expected: build succeeds. Note any warnings; fix only blockers.

- [ ] **Step 2: Lint**

Run: `npm run lint`
Expected: no errors. Fix any that surface (most likely missing keys, unused imports).

- [ ] **Step 3: Manual responsive check**

Run: `npm run dev`
In browser DevTools, test viewports: 375px (mobile), 768px (tablet), 1280px (desktop), 1920px (wide).
Expected:
- Hero: orbit hidden on mobile, chips visible
- Harvard: stats stack on mobile
- Pillars: circles legible at all sizes
- Timeline: horizontal pin on desktop, vertical on mobile (if implemented; otherwise document as known limitation in V1)
- Globe: globe canvas renders at all sizes
- Bento: stacks vertically on mobile
- Flows: stacks; SVG scales
- Cases: pin works
- Anatomy: pyramid stacks
- Maturity: bars + slider work
- Marquee: continues looping
- CTA: button full-width on mobile

- [ ] **Step 4: prefers-reduced-motion test**

In DevTools → Rendering → Emulate CSS media feature `prefers-reduced-motion: reduce`. Reload.
Expected: animations are near-instant; Lenis disabled; GSAP triggers not active. Page still readable.

- [ ] **Step 5: Lighthouse**

In Chrome DevTools → Lighthouse → Performance + Accessibility, Desktop.
Expected: Performance ≥ 80, Accessibility ≥ 90.
If Performance < 80: check large LCP (likely Hero AuroraBackground or globe canvas). Defer non-critical with `next/dynamic`.

- [ ] **Step 6: Commit any fixes**

```bash
git add -A
git commit -m "chore(home): build, lint, responsive and a11y polish"
```

- [ ] **Step 7: Tag the v1**

```bash
git tag -a home-v1 -m "Desk Manager Home v1 — 12-scene manifesto skeleton"
```

---

## Notes for the implementing engineer

- **Don't import from `21st.dev/*.txt`** — those are reference snippets only. The Spotlight and Aurora components in `app/components/fx/` are the adapted, project-ready versions.
- **Don't pull in shadcn/ui** — not installed. Use the `Button` and `Badge` primitives in `app/components/ui/`.
- **Three.js / R3F** is installed but unused in v1. Don't import — keeps bundle clean.
- **Tailwind v4** uses `@theme` in CSS for tokens. No `tailwind.config.js` needed.
- **GSAP imports**: always dynamic inside `useEffect` to avoid SSR window access. Pattern shown in `Timeline.tsx` and `CasesSticky.tsx`.
- **Path alias `@/*`** must resolve to `./app/*` (set in Task 3 Step 3). All FX/UI/lib imports rely on this.
- **Mobile layout shifts:** if Timeline horizontal pin is too rough on mobile, add a `lg:` breakpoint check in the GSAP setup that bails on small screens — falls back to plain horizontal overflow. This is a V1 acceptable limitation if time-constrained.
