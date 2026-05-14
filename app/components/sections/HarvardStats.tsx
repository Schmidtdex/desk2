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
