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
      className="relative min-h-screen overflow-hidden px-6 py-16 md:py-32"
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

        <div
          className="flex flex-col items-center justify-center gap-4 perspective-distant"
          style={{ transformStyle: "preserve-3d" }}
        >
          {LAYERS.map((l, i) => (
            <PyramidLayer key={l.key} layer={l} index={i} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}
