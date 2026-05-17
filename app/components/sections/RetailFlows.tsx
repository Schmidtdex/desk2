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
      className="relative min-h-screen px-6 py-16 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 max-w-3xl md:mb-16">
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
              <motion.circle
                cx="170"
                cy="280"
                r="20"
                fill="none"
                stroke="var(--color-accent)"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: [0, 1, 0] }}
                viewport={{ once: true }}
                transition={{ duration: 2, repeat: Infinity }}
              />
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
