"use client";

import Link from "next/link";
import { ShaderBackground } from "@/components/fx/ShaderBackground";
import { TextReveal } from "@/components/fx/TextReveal";
import { MagneticButton } from "@/components/fx/MagneticButton";
import { motion } from "motion/react";

export function Hero() {
  return (
    <section
      id="scene-hero"
      aria-label="Hero"
      className="relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden px-6"
    >
      <ShaderBackground />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center pt-24 pb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.2, 0, 0, 1] }}
        >
        </motion.div>

        <div className="mt-10 space-y-2">
          <TextReveal
            as="h1"
            text="Não somos um software."
            delay={0.3}
            stagger={0.035}
            className="block font-sans text-[clamp(2.75rem,8vw,7.5rem)] font-extralight leading-[0.95] tracking-[-0.03em] text-white"
          />
          <TextReveal
            as="h2"
            text="Somos a sinfonia da sua operação."
            delay={0.55}
            stagger={0.03}
            className="block font-sans text-[clamp(2.75rem,8vw,7.5rem)] font-extralight leading-[0.95] tracking-[-0.03em] text-[oklch(68%_0.18_260)]"
          />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1, ease: [0.2, 0, 0, 1] }}
          className="mt-10 max-w-xl font-sans text-base leading-relaxed text-white/45 md:text-lg"
        >
          Transforme serviços e processos em eficiência operacional e governança ativa.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.3, ease: [0.2, 0, 0, 1] }}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
        >
          <MagneticButton>Falar com especialista</MagneticButton>
          <Link
            href="#scene-products"
            className="inline-flex items-center gap-2 px-6 py-4 font-sans text-base text-white/50 transition-colors duration-150 hover:text-white"
          >
            Ver plataforma
            <span aria-hidden="true" className="text-lg leading-none">→</span>
          </Link>
        </motion.div>
      </div>

      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-40"
        aria-hidden="true"
        style={{
          background: "linear-gradient(to bottom, transparent, #05060F)",
        }}
      />
    </section>
  );
}
