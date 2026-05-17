"use client";

import {
  ArrowLeft,
  ArrowRight,
  Wheat,
  ShoppingBag,
  GraduationCap,
  Factory,
  Truck,
  Activity,
  Briefcase,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { TextEffect } from "@/components/fx/TextEffect";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";

const DISPLAY = "var(--font-display,system-ui,sans-serif)";
const CARD_W = 320;
const GAP = 20;

const DESK_BLUE = "#3B82F6";
const DESK_BLUE_GLOW = "rgba(26,77,255,0.22)";
const DESK_ICON_BG = "rgba(26,77,255,0.14)";
const DESK_ICON_BDR = "rgba(59,130,246,0.28)";

interface Segment {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  image: string;
}

const SEGMENTS: Segment[] = [
  {
    id: "agro",
    title: "Agro e Alimentos",
    description:
      "Gestão de chamados, manutenção preventiva e suporte a campo para cooperativas e agroindústrias.",
    icon: Wheat,
    image: "/agro.png",
  },
  {
    id: "varejo",
    title: "Varejo",
    description:
      "Atendimento omnichannel, triagem automatizada e SLA por loja para redes com centenas de unidades.",
    icon: ShoppingBag,
    image: "/varejo.png",
  },
  {
    id: "educacao",
    title: "Educação",
    description:
      "Portal de serviços unificado para alunos, docentes e administrativo com workflows por campus.",
    icon: GraduationCap,
    image: "/educacao.png",
  },
  {
    id: "industria",
    title: "Indústria",
    description:
      "CMDB industrial, ordens de manutenção, gestão de ativos e integração nativa com o chão de fábrica.",
    icon: Factory,
    image: "/industria.png",
  },
  {
    id: "logistica",
    title: "Logística",
    description:
      "Rastreamento de ocorrências, SLA por entregador e visibilidade em tempo real de toda a operação.",
    icon: Truck,
    image: "/logistica.png",
  },
  {
    id: "saude",
    title: "Saúde e Diagnóstico",
    description:
      "Chamados clínicos, gestão de equipamentos e SLA adaptado a criticidade hospitalar e laboratorial.",
    icon: Activity,
    image: "/saude.png",
  },
  {
    id: "servicos",
    title: "Serviços e Outsourcing",
    description:
      "Gestão de contratos, prazos e equipes em campo com visibilidade por cliente e SLA terceirizado.",
    icon: Briefcase,
    image: "/servicos.png",
  },
];

function SegmentCard({ seg, delay }: { seg: Segment; delay: number }) {
  const Icon = seg.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      style={{
        scrollSnapAlign: "start",
        flexShrink: 0,
        width: `${CARD_W}px`,
        height: "500px",
        borderRadius: 18,
        overflow: "hidden",
        position: "relative",
        border: "1px solid rgba(59,130,246,0.12)",
      }}
    >
      <Image
        src={seg.image}
        alt={seg.title}
        fill
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
        }}
      />

      {/* Gradient scrim */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(4,5,14,0.05) 0%, rgba(4,5,14,0.38) 42%, rgba(4,5,14,0.94) 100%)",
        }}
      />

      {/* Top glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse 85% 45% at 50% 0%, ${DESK_BLUE_GLOW} 0%, transparent 62%)`,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "0 26px 26px",
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            border: `1px solid ${DESK_ICON_BDR}`,
            background: DESK_ICON_BG,
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 14,
          }}
        >
          <Icon size={17} style={{ color: DESK_BLUE }} strokeWidth={1.5} />
        </div>

        <h3
          style={{
            fontFamily: DISPLAY,
            fontSize: "21px",
            fontWeight: 600,
            color: "#ffffff",
            letterSpacing: "-.018em",
            lineHeight: 1.2,
            marginBottom: 8,
          }}
        >
          {seg.title}
        </h3>

        <p
          style={{
            fontFamily: DISPLAY,
            fontSize: "13px",
            fontWeight: 300,
            lineHeight: 1.68,
            color: "rgba(255,255,255,.65)",
            marginBottom: 18,
          }}
        >
          {seg.description}
        </p>

        <button
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 7,
            padding: "8px 16px",
            borderRadius: 100,
            border: `1px solid rgba(59,130,246,0.38)`,
            background: "rgba(26,77,255,0.18)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            color: "rgba(255,255,255,0.88)",
            fontSize: "12px",
            fontFamily: DISPLAY,
            fontWeight: 500,
            letterSpacing: ".02em",
            cursor: "pointer",
            transition: "background 0.2s ease, border-color 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(26,77,255,0.35)";
            e.currentTarget.style.borderColor = "rgba(59,130,246,0.65)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(26,77,255,0.18)";
            e.currentTarget.style.borderColor = "rgba(59,130,246,0.38)";
          }}
        >
          Saiba mais
          <ArrowRight size={13} />
        </button>
      </div>
    </motion.div>
  );
}

export function SegmentsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headerRef, { once: true, margin: "-80px" });

  const [currentIdx, setCurrentIdx] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const sync = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    const atEnd = el.scrollLeft >= maxScroll - 8;

    setCanPrev(el.scrollLeft > 8);
    setCanNext(!atEnd);

    if (atEnd) {
      setCurrentIdx(SEGMENTS.length - 1);
      return;
    }

    // Last index whose ideal snap position fits within maxScroll
    const maxNaturalIdx = Math.floor(maxScroll / (CARD_W + GAP));
    const lastNaturalSnap = maxNaturalIdx * (CARD_W + GAP);

    if (el.scrollLeft <= lastNaturalSnap) {
      setCurrentIdx(Math.round(el.scrollLeft / (CARD_W + GAP)));
    } else {
      // Overflow zone: smoothly walk through the remaining dots
      // while the snap animation carries scrollLeft from lastNaturalSnap → maxScroll
      const t = (el.scrollLeft - lastNaturalSnap) / (maxScroll - lastNaturalSnap);
      const remaining = SEGMENTS.length - 1 - maxNaturalIdx;
      setCurrentIdx(maxNaturalIdx + Math.round(t * remaining));
    }
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", sync, { passive: true });
    sync();
    return () => el.removeEventListener("scroll", sync);
  }, [sync]);

  const scrollTo = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    const ideal = i * (CARD_W + GAP);
    // When the desired position exceeds maxScroll and we're already at the end,
    // step back to the last distinct snap point instead of staying put.
    const atEnd = el.scrollLeft >= maxScroll - 8;
    const target =
      ideal >= maxScroll && atEnd
        ? Math.floor((maxScroll - 1) / (CARD_W + GAP)) * (CARD_W + GAP)
        : Math.min(ideal, maxScroll);
    el.scrollTo({ left: target, behavior: "smooth" });
  };

  return (
    <section
      id="scene-segments"
      aria-label="Segmentos atendidos"
      className="relative overflow-hidden bg-transparent py-28 text-text"
    >
      {/* Header */}
      <div ref={headerRef} className="mx-auto mb-14 max-w-7xl px-8">
        <div className="flex items-end justify-between gap-8">
          <div className="max-w-lg">
            <TextEffect
              as="p"
              preset="blur"
              per="word"
              trigger={isInView}
              className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-accent-2"
            >
              Segmentos
            </TextEffect>
            <h2 className="text-[clamp(36px,4vw,56px)] font-light leading-[1.08] tracking-[-0.03em]">
              <TextEffect
                as="span"
                preset="blur"
                per="word"
                trigger={isInView}
                className="block"
              >
                A plataforma que
              </TextEffect>
              <TextEffect
                as="span"
                preset="blur"
                per="word"
                trigger={isInView}
                delay={0.22}
                className="block font-normal text-accent-2"
              >
                cada setor merece.
              </TextEffect>
            </h2>
            <TextEffect
              as="p"
              preset="blur"
              per="word"
              trigger={isInView}
              delay={0.38}
              className="mt-5 text-[15px] leading-relaxed text-text-muted"
            >
              Sete verticais. Um ecossistema. A Desk Manager opera com entregas
              específicas para cada realidade operacional.
            </TextEffect>
          </div>

          <div className="hidden shrink-0 gap-2 md:flex">
            <button
              onClick={() => scrollTo(Math.max(currentIdx - 1, 0))}
              disabled={!canPrev}
              aria-label="Anterior"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-text-muted transition-colors hover:border-accent/40 hover:text-text disabled:cursor-default disabled:opacity-30"
            >
              <ArrowLeft size={17} />
            </button>
            <button
              onClick={() =>
                scrollTo(Math.min(currentIdx + 1, SEGMENTS.length - 1))
              }
              disabled={!canNext}
              aria-label="Proximo"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-text-muted transition-colors hover:border-accent/40 hover:text-text disabled:cursor-default disabled:opacity-30"
            >
              <ArrowRight size={17} />
            </button>
          </div>
        </div>
      </div>

      {/* Carousel track */}
      <div
        ref={trackRef}
        className="flex pb-5"
        style={{
          gap: `${GAP}px`,
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          paddingLeft: "max(2rem, calc((100vw - 1280px) / 2 + 2rem))",
          paddingRight: "max(2rem, calc((100vw - 1280px) / 2 + 2rem))",
        }}
      >
        {SEGMENTS.map((seg, i) => (
          <SegmentCard key={seg.id} seg={seg} delay={i * 0.055} />
        ))}
      </div>

      {/* Dot navigation */}
      <div className="mt-8 flex items-center justify-center gap-2">
        {SEGMENTS.map((seg, i) => (
          <button
            key={seg.id}
            onClick={() => scrollTo(i)}
            aria-label={`Ir para ${seg.title}`}
            className={`rounded-full transition-all duration-300 ${
              currentIdx === i
                ? "h-1.5 w-5 bg-accent-2"
                : "h-1.5 w-1.5 bg-border hover:bg-text-muted"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
