"use client";

import { DottedSurface } from "@/components/fx/DottedSurface";
import { TextEffect } from "@/components/fx/TextEffect";
import { motion } from "motion/react";

const DEFAULT_PILLS = [
  "#1 EM ITSM",
  "#1 EM AUTOMAÇÃO",
  "+600 CLIENTES",
] as const;

const DEFAULT_HEADLINE_1 = "Não somos um software";
const DEFAULT_HEADLINE_2 = "Somos a sinfonia da sua operação";

interface HeroData {
  headlineLine1?: string | null;
  headlineLine2?: string | null;
  pills?: string[] | null;
}

interface HeroProps {
  data?: HeroData | null;
}

export function Hero({ data }: HeroProps) {
  const line1 = data?.headlineLine1 ?? DEFAULT_HEADLINE_1;
  const line2 = data?.headlineLine2 ?? DEFAULT_HEADLINE_2;
  const pills = data?.pills ?? DEFAULT_PILLS;

  return (
    <section
      id="scene-hero"
      aria-label="Hero"
      className="relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 sm:px-10"
    >
      <DottedSurface />

      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center gap-10 pb-32 pt-20 text-center">

        {/* Headline */}
        <div className="flex flex-col gap-0">
          <TextEffect
            as="h1"
            preset="blur"
            per="word"
            delay={0.2}
            className="enable-ligatures block font-serif font-light text-[2.75rem] leading-[1.05] tracking-[-0.04em] text-pretty text-center text-white md:text-[4.5rem] xl:text-[6.5rem]"
          >
            {line1}
          </TextEffect>
          <TextEffect
            as="span"
            preset="blur"
            per="word"
            delay={0.5}
            className="enable-ligatures block font-serif font-light text-[2.75rem] leading-[1.05] tracking-[-0.04em] text-pretty text-center text-[oklch(68%_0.18_260)] md:text-[4.5rem] xl:text-[6.5rem]"
          >
            {line2}
          </TextEffect>
        </div>

        {/* Social proof pills */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9, ease: [0.2, 0, 0, 1] }}
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
        >
          {pills.map((label) => (
            <span
              key={label}
              className="gap-5 font-mono text-xs font-light tracking-[0.2em] text-text-muted uppercase"
            >
              {label}
            </span>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1, ease: [0.2, 0, 0, 1] }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
        </motion.div>

      </div>

      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-72"
        aria-hidden="true"
        style={{ background: "linear-gradient(to bottom, transparent 0%, #05060F 80%)" }}
      />
    </section>
  );
}
