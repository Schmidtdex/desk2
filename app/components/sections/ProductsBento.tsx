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
            <span className="text-accent">agent:</span> chamado #4821 aberto, técnico designado para 14h<span className="ml-0.5 inline-block w-[0.5ch] animate-[blink_1s_steps(2,start)_infinite]">|</span>
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
                <span
                  key={d}
                  className="absolute left-1/2 top-1/2 size-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-border bg-surface-2 text-center text-xs leading-10"
                  style={{
                    animation: `orbit 14s linear infinite`,
                    animationDelay: `${-(14 / 5) * i}s`,
                    ["--orbit-r" as string]: "44px",
                  }}
                >
                  {d}
                </span>
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
              <motion.path
                d="M 10 40 Q 60 10, 100 40 T 190 40"
                stroke="var(--color-accent)"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5 }}
              />
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
                  <span
                    key={n}
                    className="absolute left-1/2 top-1/2 size-8 rounded-full border border-border bg-surface-2 text-center text-[10px] leading-8"
                    style={{ transform: `translate(${x}px, ${y}px) translate(-50%, -50%)` }}
                  >
                    {n}
                  </span>
                );
              })}
            </div>
          </SmallCard>
        </div>
      </div>
    </section>
  );
}
