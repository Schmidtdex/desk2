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
