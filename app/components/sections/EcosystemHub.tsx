"use client";

import { useState, useRef, useEffect, useLayoutEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "motion/react";
import { Layers, Server, GitBranch, Wand2, Bot } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { TextEffect } from "@/components/fx/TextEffect";

const R = 350;
const SNAP_DURATION = 700; // ms

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function shortestAngleDiff(from: number, to: number): number {
  return ((to - from) % 360 + 540) % 360 - 180;
}

interface Pillar {
  id: string;
  label: string;
  name: string;
  icon: LucideIcon;
  description: string;
  angle: number;
}

const pillars: Pillar[] = [
  {
    id: "esm",
    label: "ESM",
    name: "Enterprise Service Management",
    icon: Layers,
    description:
      "Centralize portais de autoatendimento, SLAs e catálogos de serviço em um hub único, com visibilidade total para gestores e usuários finais.",
    angle: -90,
  },
  {
    id: "itsm",
    label: "ITSM",
    name: "IT Service Management",
    icon: Server,
    description:
      "Gerencie incidentes, problemas, mudanças e ativos de TI com CMDB integrado e alinhamento nativo ao ITIL.",
    angle: -18,
  },
  {
    id: "bpm",
    label: "BPM",
    name: "Business Process Management",
    icon: GitBranch,
    description:
      "Gestão e automação de processos de negócio com visão executiva.",
    angle: 54,
  },
  {
    id: "maestro",
    label: "Maestro",
    name: "Orquestração Inteligente",
    icon: Wand2,
    description:
      "Plataforma iPaaS para integração low-code de todo o ecossistema.",
    angle: 126,
  },
  {
    id: "agent",
    label: "AI Agent",
    name: "Agentes de IA Autônomos",
    icon: Bot,
    description:
      "Agentes autônomos que decidem e executam tarefas pela operação.",
    angle: 198,
  },
];

function coords(angleDeg: number, radius = R) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: Math.round(radius * Math.cos(rad)),
    y: Math.round(radius * Math.sin(rad)),
  };
}

export function EcosystemHub() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headerRef, { once: true, margin: "-80px" });

  const orbitLinesRef = useRef<HTMLDivElement>(null);
  const nodePositionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const angleRef = useRef(0);
  const activeIdRef = useRef<string | null>(null);

  // Snap animation state — driven entirely inside the RAF loop
  const isSnappingRef = useRef(false);
  const snapStartRef = useRef(0);
  const snapFromRef = useRef(0);
  const snapToRef = useRef(0);

  useEffect(() => {
    activeIdRef.current = activeId;
  }, [activeId]);

  useLayoutEffect(() => {
    pillars.forEach((p, i) => {
      const { x, y } = coords(p.angle);
      const el = nodePositionRefs.current[i];
      if (el) el.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
    });
  }, []);

  useEffect(() => {
    let rafId = 0;
    let lastTs = 0;
    const AUTO_INTERVAL = 1000 / 30;

    const applyAngle = (angle: number) => {
      if (orbitLinesRef.current) {
        orbitLinesRef.current.style.transform = `rotate(${angle}deg)`;
      }
      pillars.forEach((p, i) => {
        const { x, y } = coords(p.angle + angle);
        const el = nodePositionRefs.current[i];
        if (el) el.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
      });
    };

    const tick = (ts: number) => {
      rafId = requestAnimationFrame(tick);

      if (isSnappingRef.current) {
        // Full 60fps during snap so the eased movement is silky smooth
        const elapsed = ts - snapStartRef.current;
        const progress = Math.min(elapsed / SNAP_DURATION, 1);
        const eased = easeInOutCubic(progress);
        const diff = snapToRef.current - snapFromRef.current;
        angleRef.current = snapFromRef.current + diff * eased;

        if (progress >= 1) {
          isSnappingRef.current = false;
          angleRef.current = snapToRef.current;
        }

        applyAngle(angleRef.current);
        return;
      }

      // Auto-rotation throttled to 30 fps — decorative, no need for more
      if (ts - lastTs < AUTO_INTERVAL) return;
      lastTs = ts;

      if (activeIdRef.current === null) {
        angleRef.current = (angleRef.current + 0.16) % 360;
      }

      applyAngle(angleRef.current);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  function toggle(id: string) {
    setActiveId((prev) => {
      if (prev === id) {
        isSnappingRef.current = false;
        return null;
      }

      const pillar = pillars.find((p) => p.id === id)!;
      // Find the rotation delta that places pillar at top (-90°) via shortest arc
      const rawTarget = -90 - pillar.angle;
      const currentMod = ((angleRef.current % 360) + 360) % 360;
      const targetMod = ((rawTarget % 360) + 360) % 360;
      const diff = shortestAngleDiff(currentMod, targetMod);

      snapFromRef.current = angleRef.current;
      snapToRef.current = angleRef.current + diff;
      snapStartRef.current = performance.now();
      isSnappingRef.current = true;

      return id;
    });
  }

  return (
    <section
      id="scene-ecosystem"
      aria-label="Ecossistema Desk"
      className="relative overflow-hidden bg-transparent py-28 text-text"
    >
      <div className="mx-auto max-w-7xl px-8">
        {/* Section header */}
        <div ref={headerRef} className="mb-16 text-center">
          <TextEffect
            as="p"
            preset="blur"
            per="word"
            trigger={isInView}
            className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-accent-2"
          >
            O Ecossistema
          </TextEffect>
          <h2 className="text-[clamp(45px,4vw,100px)] font-light leading-[1.08] tracking-[-0.03em]">
            <TextEffect
              as="span"
              preset="blur"
              per="word"
              trigger={isInView}
              className="block"
            >
              Uma plataforma.
            </TextEffect>
            <TextEffect
              as="span"
              preset="blur"
              per="word"
              trigger={isInView}
              delay={0.28}
              className="block font-normal text-accent-2"
            >
              Cinco pilares.
            </TextEffect>
          </h2>
        </div>

        {/* ── Desktop: radial hub ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: [0.2, 0, 0, 1] as const }}
          className="hidden md:flex md:justify-center"
        >
          <div className="relative h-[750px] w-[750px]">
            {/* Static orbit ring */}
            <svg
              viewBox="-375 -375 750 750"
              className="pointer-events-none absolute inset-0 h-full w-full"
              aria-hidden
            >
              <circle
                cx="0"
                cy="0"
                r={R}
                fill="none"
                stroke="rgba(59,130,246,0.08)"
                strokeWidth="1"
                strokeDasharray="3 7"
              />
            </svg>

            {/* Lines wrapper — rotated by RAF */}
            <div ref={orbitLinesRef} className="pointer-events-none absolute inset-0">
              <svg
                viewBox="-375 -375 750 750"
                className="absolute inset-0 h-full w-full"
                aria-hidden
              >
                {pillars.map((p) => {
                  const { x, y } = coords(p.angle);
                  const isActive = activeId === p.id;
                  return (
                    <line
                      key={p.id}
                      x1="0"
                      y1="0"
                      x2={x}
                      y2={y}
                      style={{
                        stroke: isActive
                          ? "rgba(26,77,255,0.85)"
                          : "rgba(59,130,246,0.13)",
                        strokeWidth: isActive ? 1.5 : 1,
                        strokeDasharray: isActive ? "0" : "4 4",
                        filter: isActive
                          ? "drop-shadow(0 0 5px rgba(26,77,255,0.5))"
                          : "none",
                        transition:
                          "stroke 0.35s ease, stroke-width 0.35s ease, filter 0.35s ease",
                      }}
                    />
                  );
                })}
              </svg>
            </div>

            {/* Nodes — translated by RAF, always upright */}
            {pillars.map((p, i) => {
              const Icon = p.icon;
              const isActive = activeId === p.id;
              return (
                <div
                  key={p.id}
                  ref={(el) => { nodePositionRefs.current[i] = el; }}
                  className="absolute left-1/2 top-1/2"
                  style={{ zIndex: isActive ? 200 : undefined }}
                >
                  <motion.button
                    whileHover={{ scale: 1.07 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => toggle(p.id)}
                    className="flex flex-col items-center gap-2 outline-none"
                    aria-pressed={isActive}
                  >
                    <div
                      className={[
                        "flex h-17 w-17 items-center justify-center rounded-2xl border transition-colors duration-300",
                        isActive
                          ? "border-accent bg-accent text-white shadow-[0_0_32px_rgba(26,77,255,0.5)]"
                          : "border-border bg-surface text-text-muted hover:border-accent/40 hover:text-accent-2",
                      ].join(" ")}
                    >
                      <Icon size={30} strokeWidth={1.5} />
                    </div>
                    <span
                      className={[
                        "text-[11px] font-semibold uppercase tracking-widest transition-colors duration-200",
                        isActive ? "text-accent-2" : "text-text-muted",
                      ].join(" ")}
                    >
                      {p.label}
                    </span>
                  </motion.button>

                  {/* Card rendered below the node; travels with it as the orbit snaps to top */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: -6, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.97 }}
                        transition={{ duration: 0.28, ease: [0.2, 0, 0, 1] as const }}
                        className="absolute top-24 left-1/2 -translate-x-1/2 w-64 rounded-2xl border border-border bg-surface p-6"
                        style={{ zIndex: 300 }}
                      >
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 h-3 w-px bg-accent/30" />
                        <div className="mb-3 flex items-center gap-2">
                          <Icon size={14} className="text-accent-2" strokeWidth={1.5} />
                          <span className="text-[11px] font-semibold uppercase tracking-widest text-accent-2">
                            {p.label}
                          </span>
                        </div>
                        <h3 className="mb-2 text-lg font-semibold leading-snug text-text">
                          {p.name}
                        </h3>
                        <p className="text-sm leading-relaxed text-text-muted">
                          {p.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}

            {/* Center logo — always on top */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <motion.div
                animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.2, 1] }}
                transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
                className="absolute -inset-10 rounded-full bg-accent/20 blur-2xl"
              />
              <motion.div
                animate={
                  activeId
                    ? { scale: 1.08, boxShadow: "0 0 60px rgba(26,77,255,0.5)" }
                    : { scale: 1, boxShadow: "0 0 36px rgba(26,77,255,0.28)" }
                }
                transition={{ duration: 0.4, ease: [0.2, 0, 0, 1] as const }}
                className="relative flex h-40 w-40 items-center justify-center rounded-full border border-accent/25 bg-surface"
              >
                <div className="relative h-14 w-25">
                  <Image
                    src="/Logotipo principal - branco.png"
                    alt="Desk Manager"
                    fill
                    sizes="100px"
                    className="object-contain"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* ── Mobile: vertical accordion ── */}
        <div className="grid grid-cols-1 gap-3 md:hidden">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            const isActive = activeId === p.id;
            return (
              <motion.button
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07, ease: [0.2, 0, 0, 1] as const }}
                onClick={() => toggle(p.id)}
                className={[
                  "w-full rounded-2xl border p-4 text-left transition-colors duration-200",
                  isActive ? "border-accent/50 bg-surface" : "border-border bg-surface",
                ].join(" ")}
                aria-pressed={isActive}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={[
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-colors duration-200",
                      isActive
                        ? "border-accent bg-accent text-white"
                        : "border-border bg-surface-2 text-text-muted",
                    ].join(" ")}
                  >
                    <Icon size={17} strokeWidth={1.5} />
                  </div>
                  <div>
                    <span className="block text-[10px] font-semibold uppercase tracking-widest text-accent-2">
                      {p.label}
                    </span>
                    <span className="text-sm font-medium text-text">{p.name}</span>
                  </div>
                </div>
                <AnimatePresence>
                  {isActive && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="mt-10 overflow-hidden text-xs leading-relaxed text-text-muted"
                    >
                      {p.description}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
