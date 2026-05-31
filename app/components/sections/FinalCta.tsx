"use client";

import { useEffect, useState } from "react";
import { MagneticButton } from "@/components/fx/MagneticButton";

const DEFAULT_EYEBROW = "Provocação final";
const DEFAULT_Q1 = "Quantas das nossas tarefas poderiam ser operadas por agentes de IA hoje?";
const DEFAULT_Q2 = "Qual é o custo de oportunidade de cada mês sem agentes em produção?";
const DEFAULT_CTA = "Vamos colocar sua operação em movimento.";

interface FinalCtaData {
  eyebrow?: string | null;
  question1?: string | null;
  question2?: string | null;
  ctaLabel?: string | null;
  ctaHref?: string | null;
}

interface FinalCtaProps {
  data?: FinalCtaData | null;
}

function Typewriter({ text, delay = 0 }: { text: string; delay?: number }) {
  const [chars, setChars] = useState(0);

  useEffect(() => {
    let stepId = 0;
    let i = 0;
    const step = () => {
      i += 1;
      setChars(i);
      if (i < text.length) stepId = window.setTimeout(step, 40);
    };
    const startId = window.setTimeout(step, delay);
    return () => {
      window.clearTimeout(startId);
      if (stepId) window.clearTimeout(stepId);
    };
  }, [text, delay]);

  return (
    <span>
      {text.slice(0, chars)}
      <span className="ml-0.5 inline-block w-[0.5ch] animate-[blink_1s_steps(2,start)_infinite]">|</span>
    </span>
  );
}

export function FinalCta({ data }: FinalCtaProps) {
  const eyebrow = data?.eyebrow ?? DEFAULT_EYEBROW;
  const q1      = data?.question1 ?? DEFAULT_Q1;
  const q2      = data?.question2 ?? DEFAULT_Q2;
  const ctaLabel = data?.ctaLabel ?? DEFAULT_CTA;
  const ctaHref  = data?.ctaHref ?? undefined;

  return (
    <section
      id="scene-cta"
      aria-label="Convite final"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-6 py-16 md:py-32"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(26,77,255,0.15),transparent_60%)]" />
      <div className="absolute inset-0" aria-hidden="true">
        {Array.from({ length: 14 }).map((_, i) => (
          <span
            key={i}
            className="absolute size-1 rounded-full bg-white/30"
            style={{
              left: `${(i * 47) % 100}%`,
              top: `${(i * 29) % 100}%`,
              animation: `pulse-dot ${3 + (i % 4)}s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-5xl text-center">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-text-muted">{eyebrow}</p>
        <h2 className="mt-8 text-[clamp(2rem,5vw,4rem)] font-extralight leading-[1.15] tracking-tight">
          <Typewriter text={q1} />
        </h2>
        <h2 className="mt-12 text-[clamp(2rem,5vw,4rem)] font-extralight leading-[1.15] tracking-tight text-accent-2">
          <Typewriter text={q2} delay={2500} />
        </h2>

        <div className="mt-10 md:mt-20">
          <MagneticButton
            onClick={ctaHref ? () => {
              const el = document.querySelector(ctaHref);
              el?.scrollIntoView({ behavior: "smooth" });
            } : undefined}
          >
            {ctaLabel}
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
