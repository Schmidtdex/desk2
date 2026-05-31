"use client";

import { TextReveal } from "@/components/fx/TextReveal";
import { animate, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

const DEFAULT_EYEBROW = "Harvard Business Review";
const DEFAULT_HEADLINE = "95% das empresas falham em executar suas estratégias.";
const DEFAULT_STATS = [
  { value: 90, suffix: "%", label: "das empresas falham em executar suas estratégias com sucesso." },
  { value: 95, suffix: "%", label: "dos funcionários em grandes organizações não entendem a estratégia da própria empresa." },
  { value: 85, suffix: "%", label: "das equipes executivas gastam menos de uma hora por mês discutindo estratégia." },
];

interface StatItem {
  _key?: string;
  value: number;
  suffix?: string | null;
  label?: string | null;
}

interface HarvardStatsData {
  eyebrow?: string | null;
  headline?: string | null;
  stats?: StatItem[] | null;
}

interface HarvardStatsProps {
  data?: HarvardStatsData | null;
}

function StatCounter({ value, suffix }: { value: number; suffix: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, value, {
      duration: 2.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {display}{suffix}
    </span>
  );
}

export function HarvardStats({ data }: HarvardStatsProps) {
  const eyebrow = data?.eyebrow ?? DEFAULT_EYEBROW;
  const headline = data?.headline ?? DEFAULT_HEADLINE;
  const stats = data?.stats ?? DEFAULT_STATS;

  return (
    <section
      id="scene-harvard"
      aria-label="Estudo da Harvard Business Review"
      className="relative flex min-h-screen items-center justify-center bg-black px-6 py-16 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-text-muted">{eyebrow}</p>
        <h2
          className="mb-10 max-w-4xl font-sans text-[clamp(2rem,5vw,4.5rem)] font-extralight leading-[1.05] tracking-tight md:mb-20"
        >{headline}</h2>

        <div className="grid gap-12 md:grid-cols-3">
          {stats.map((s, i) => (
            <div key={"_key" in s ? s._key : i} className="border-t border-border pt-8">
              <div className="text-[clamp(3rem,10vw,8rem)] font-extralight leading-none tracking-tight text-accent">
                <StatCounter value={s.value} suffix={s.suffix ?? "%"} />
              </div>
              <p className="mt-6 max-w-xs text-base leading-relaxed text-text-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
