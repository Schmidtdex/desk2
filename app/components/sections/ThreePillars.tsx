"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { SparklesText } from "@/components/fx/SparklesText";

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: "easeOut" as const, delay: i * 0.14 },
  }),
};

const DEFAULT_HEADLINE_LINES = [
  "Transforme a experiência",
  "de serviços e processos",
  "com uma plataforma de",
];
const DEFAULT_DESCRIPTION =
  "Integramos operação e gestão em uma camada única, para que seu time foque no que realmente importa: resultados e eficiência.";
const DEFAULT_HUB_LABEL = "Plataforma de IA para serviços e processos";
const DEFAULT_PILLARS = [
  { name: "Serviços", description: "Atender uma necessidade ou desejo do usuário com agilidade" },
  { name: "Processos", description: "Garantir que o trabalho seja feito corretamente, sempre" },
];

interface PillarItem {
  _key?: string;
  name?: string | null;
  description?: string | null;
}

interface ThreePillarsData {
  headlineLines?: string[] | null;
  description?: string | null;
  hubLabel?: string | null;
  pillars?: PillarItem[] | null;
}

interface ThreePillarsProps {
  data?: ThreePillarsData | null;
}

export function ThreePillars({ data }: ThreePillarsProps) {
  const headlineLines = data?.headlineLines ?? DEFAULT_HEADLINE_LINES;
  const description = data?.description ?? DEFAULT_DESCRIPTION;
  const hubLabel = data?.hubLabel ?? DEFAULT_HUB_LABEL;
  const pillars = data?.pillars ?? DEFAULT_PILLARS;

  const [leftPillar, rightPillar] = [pillars[0], pillars[1]];

  return (
    <section
      id="scene-pillars"
      aria-label="Plataforma de IA"
      className="relative overflow-hidden bg-transparent pt-20 pb-16 text-text md:pt-[140px] md:pb-24"
    >
      <div className="relative mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-12 px-5 sm:px-8 md:grid-cols-[1.05fr_1fr]">
        {/* ── Left copy ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          custom={0}
          variants={fadeUp}
          className="flex flex-col gap-7"
        >
          <h1 className="text-[clamp(36px,4.5vw,56px)] font-light leading-[1.2] tracking-[-0.035em] text-text">
            {headlineLines.map((line, i) => (
              <span key={i} className="block">{line}</span>
            ))}
            <span className="block font-normal">
              <SparklesText
                text="IA"
                className="text-blue-500"
                colors={{ first: "#3B82F6", second: "#60A5FA" }}
                sparklesCount={4}
              />{" "}
              de verdade.
            </span>
          </h1>

          <p className="max-w-[58ch] text-lg leading-[1.55] text-text-muted">
            {description}
          </p>
        </motion.div>

        {/* ── Right: hub diagram ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          custom={1}
          variants={fadeUp}
          className="relative mx-auto aspect-square w-full max-w-[480px] md:ml-auto"
        >
          {/* Connecting lines behind all nodes */}
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden
          >
            {/* Hub → Serviços */}
            <line
              x1="50"
              y1="24"
              x2="22"
              y2="73"
              stroke="rgba(59,130,246,0.22)"
              strokeWidth="0.45"
              strokeDasharray="1.8 1.4"
            />
            {/* Hub → Processos */}
            <line
              x1="50"
              y1="24"
              x2="78"
              y2="73"
              stroke="rgba(59,130,246,0.18)"
              strokeWidth="0.45"
              strokeDasharray="1.8 1.4"
            />
            {/* Node dots at satellite centers */}
            <circle cx="22" cy="73" r="0.9" fill="rgba(59,130,246,0.45)" />
            <circle cx="78" cy="73" r="0.9" fill="rgba(59,130,246,0.35)" />
          </svg>

          {/* TOP — desk manager / IA Core (hub) */}
          <div
            className="absolute left-[26%] top-0 h-[48%] w-[48%] cursor-pointer rounded-full transition-all duration-300 ease-out hover:scale-[1.04] hover:brightness-110 flex flex-col items-center justify-center p-[7%] text-center text-white shadow-[0_28px_56px_-14px_rgba(26,77,255,0.6),0_0_72px_rgba(26,77,255,0.22)]"
            style={{
              background:
                "radial-gradient(circle at 50% 30%, #5b85ff 0%, #1A4DFF 55%, #0e27b3 100%)",
            }}
          >
            <div className="relative mb-3 h-18 w-36">
              <Image
                src="/Logotipo principal - branco.png"
                alt="Desk Manager"
                fill
                sizes="144px"
                className="object-contain object-center"
              />
            </div>
            <p className="max-w-[82%] text-[16px] leading-[1.35] opacity-90">
              {hubLabel}
            </p>
          </div>

          {/* BOTTOM-LEFT */}
          {leftPillar && (
            <div
              className="absolute left-[2%] top-[53%] h-[40%] w-[40%] cursor-pointer rounded-full transition-all duration-300 ease-out hover:scale-[1.04] hover:brightness-110 flex flex-col items-center justify-center p-[8%] text-center text-white shadow-[0_20px_40px_-10px_rgba(59,130,246,0.5),0_0_48px_rgba(59,130,246,0.12)]"
              style={{
                background:
                  "radial-gradient(circle at 40% 30%, #7ba8ff 0%, #3B82F6 55%, #1E5BD6 100%)",
              }}
            >
              <h3 className="mb-1 text-[20px] font-semibold tracking-[-0.02em]">
                {leftPillar.name}
              </h3>
              <p className="max-w-[95%] text-[14px] leading-[1.10] opacity-90">
                {leftPillar.description}
              </p>
            </div>
          )}

          {/* BOTTOM-RIGHT */}
          {rightPillar && (
            <div
              className="absolute right-[2%] top-[53%] h-[40%] w-[40%] cursor-pointer rounded-full transition-all duration-300 ease-out hover:scale-[1.04] hover:brightness-110 flex flex-col items-center justify-center p-[8%] text-center text-white shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)] ring-1 ring-inset ring-white/8"
              style={{
                background:
                  "radial-gradient(circle at 60% 30%, #2a3260 0%, #131732 60%, #0B0D1C 100%)",
              }}
            >
              <h3 className="mb-1 text-[20px] font-semibold tracking-[-0.02em]">
                {rightPillar.name}
              </h3>
              <p className="max-w-full text-[14px] leading-[1.10] opacity-90">
                {rightPillar.description}
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
