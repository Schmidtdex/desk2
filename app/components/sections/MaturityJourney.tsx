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
                  isActive
                    ? "bg-accent shadow-[0_0_60px_var(--color-accent-glow)]"
                    : isPassed
                    ? "bg-accent/40"
                    : "bg-surface-2"
                )}
                style={{ height: `${height}%` }}
                aria-label={s.title}
              >
                <span className="absolute -bottom-8 font-mono text-[10px] uppercase tracking-wider text-text-muted">
                  {i + 1}
                </span>
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
