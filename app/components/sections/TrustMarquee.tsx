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
        {SEALS.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
    </section>
  );
}
