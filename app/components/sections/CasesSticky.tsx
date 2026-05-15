"use client";

import { memo, useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";

// -- Types -------------------------------------------------------------------
interface LabelPart {
  text: string;
  bold?: boolean;
}
interface Metric {
  value: string;
  labelParts: LabelPart[];
}
interface HeadingPart {
  text: string;
  accent?: boolean;
}
interface Tag {
  label: string;
  tone: "primary" | "ink" | "ghost";
}
interface CaseData {
  id: string;
  index: string;
  company: string;
  sector: string;
  region: string;
  headingParts: HeadingPart[];
  lead: string;
  metrics: [Metric, Metric, Metric];
  tags: [Tag, Tag, Tag];
  photo: string;
}

// -- Data --------------------------------------------------------------------
const CASES: CaseData[] = [
  {
    id: "eurofarma",
    index: "01",
    company: "Eurofarma",
    sector: "Farmacêutica",
    region: "LATAM",
    headingParts: [
      { text: "Otimizando a " },
      { text: "eficiência", accent: true },
      { text: " operacional em escala global." },
    ],
    lead: "A Desk Manager foi implementada na Eurofarma para estruturar a governança de serviços, transformando o suporte interno em uma operação de alta performance em 14 países.",
    metrics: [
      {
        value: "+90",
        labelParts: [
          { text: "departamentos", bold: true },
          { text: " de negócios atendidos globalmente." },
        ],
      },
      {
        value: "+24",
        labelParts: [
          { text: "países", bold: true },
          { text: " utilizam ativamente nossa plataforma ESM." },
        ],
      },
      {
        value: "+13K",
        labelParts: [
          { text: "colaboradores apoiados em " },
          { text: "tickets diários", bold: true },
          { text: "." },
        ],
      },
    ],
    tags: [
      { label: "14 países", tone: "primary" },
      { label: "Farmacêutica", tone: "ink" },
      { label: "ITSM + ESM", tone: "ghost" },
    ],
    photo: "/eurofarma.jpg",
  },
  {
    id: "convergint",
    index: "02",
    company: "Convergint",
    sector: "Seg. Eletrônica",
    region: "Global",
    headingParts: [
      { text: "Operação " },
      { text: "global", accent: true },
      { text: " sem fronteiras" },
    ],
    lead: "A Convergint unificou 270 filiais em 150+ países numa plataforma única com SLA por fuso horário, idioma e especialidade, sem perder velocidade.",
    metrics: [
      {
        value: "+150",
        labelParts: [
          { text: "países", bold: true },
          { text: " atendidos em operação 24/7." },
        ],
      },
      {
        value: "Real time",
        labelParts: [
          { text: "gestão com " },
          { text: "dados em tempo real", bold: true },
          { text: "." },
        ],
      },
      {
        value: "+13K",
        labelParts: [
          { text: "colaboradores apoiados em " },
          { text: "tickets diários", bold: true },
          { text: "." },
        ],
      },
    ],
    tags: [
      { label: "150+ países", tone: "primary" },
      { label: "23 idiomas", tone: "ink" },
      { label: "Operação global", tone: "ghost" },
    ],
    photo: "/convergint.png",
  },
  {
    id: "petz",
    index: "03",
    company: "Petz Cobasi",
    sector: "Varejo",
    region: "Brasil",
    headingParts: [
      { text: "Zero " },
      { text: "backlog", accent: true },
      { text: " em 400 lojas" },
    ],
    lead: "A automação de triagem da Petz Cobasi eliminou o backlog de chamados e reduziu o tempo de atendimento em 99%, devolvendo horas às equipes de cada loja.",
    metrics: [
      {
        value: "99%",
        labelParts: [
          { text: "mais rápido no " },
          { text: "primeiro contato", bold: true },
          { text: " com o suporte." },
        ],
      },
      {
        value: "94%",
        labelParts: [
          { text: "mais agilidade no " },
          { text: "diagnóstico técnico", bold: true },
          { text: " de problemas." },
        ],
      },
      {
        value: "100%",
        labelParts: [
          { text: "eliminação de " },
          { text: "fluxos informais", bold: true },
          { text: " para chamados." },
        ],
      },
    ],
    tags: [
      { label: "400+ lojas", tone: "primary" },
      { label: "Varejo Pet", tone: "ink" },
      { label: "Triagem automatizada", tone: "ghost" },
    ],
    photo: "/cobasi.png",
  },
  {
    id: "byd",
    index: "04",
    company: "BYD",
    sector: "Mobilidade Elétrica",
    region: "Brasil",
    headingParts: [
      { text: "Aprovação em " },
      { text: "horas", accent: true },
      { text: ", não semanas" },
    ],
    lead: "A BYD Brasil encurtou o ciclo de aprovação de processos de 15 dias úteis para 2-4 horas, eliminando completamente o uso de e-mail e planilha na operação.",
    metrics: [
      {
        value: "2-4h",
        labelParts: [
          { text: "tempo de " },
          { text: "primeira resposta", bold: true },
          { text: " (era 15 dias)." },
        ],
      },
      {
        value: "24-48h",
        labelParts: [
          { text: "análise técnica " },
          { text: "reduzida", bold: true },
          { text: " (era 30 dias)." },
        ],
      },
      {
        value: "48-72h",
        labelParts: [
          { text: "ciclo completo " },
          { text: "do chamado", bold: true },
          { text: "." },
        ],
      },
    ],
    tags: [
      { label: "BYD Brasil", tone: "primary" },
      { label: "Mobilidade Elétrica", tone: "ink" },
      { label: "Zero planilha", tone: "ghost" },
    ],
    photo: "/byd-energia.png",
  },
];

// -- Tokens (matches reference CSS vars) ------------------------------------
const DISPLAY = "var(--font-display,system-ui,sans-serif)";
const MONO = 'var(--font-code,"JetBrains Mono",monospace)';
const SERIF = "'Instrument Serif',Georgia,serif";
const SLOT_VH = 1;

const BLUE = "#1f3dff";
const BLUE_2 = "#4b62ff"; // lighter blue for + prefix
const INK = "#0a0e2c";
const INK_2 = "#3b3f55";
const MUTED = "#8a8d9f";
const HAIR = "#e4e0d2";
const HAIR_2 = "#efece0";
const BG_FRAME = "#f6f4ee";
const BG_CARD = "#fbfaf4";

// -- Count-up ----------------------------------------------------------------
function parseAnimatable(
  v: string,
): { prefix: string; n: number; suffix: string } | null {
  const m = v.match(/^([+\-~]?)(\d+)(K|%|)$/);
  if (!m) return null;
  return { prefix: m[1], n: parseInt(m[2]), suffix: m[3] };
}

function useCountUp(target: number, enabled: boolean, duration = 950): number {
  const [val, setVal] = useState(0);
  const raf = useRef<number>(0);
  useEffect(() => {
    if (!enabled) return;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      setVal(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, enabled]);
  return val;
}

// -- StatRow - mirrors .stat from the reference CSS module ------------------
function StatRow({
  metric,
  isLast,
  delay,
}: {
  metric: Metric;
  isLast: boolean;
  delay: number;
}) {
  const parsed = parseAnimatable(metric.value);
  const count = useCountUp(parsed?.n ?? 0, parsed !== null);

  const valueNode = parsed ? (
    <>
      {parsed.prefix && (
        // .plus: smaller, lighter blue, raised via translateY
        <span
          style={{
            fontSize: "0.5em",
            fontWeight: 400,
            color: BLUE_2,
            marginRight: 2,
            transform: "translateY(-0.33em)",
            display: "inline-block",
            lineHeight: 1,
          }}
        >
          {parsed.prefix}
        </span>
      )}
      {count}
      {parsed.suffix && (
        // .suffix: ~44/72 ≈ 0.61em of the stat number
        <span style={{ fontSize: "0.61em", color: BLUE, marginLeft: 2 }}>
          {parsed.suffix}
        </span>
      )}
    </>
  ) : (
    // Non-numeric value (Real time, 2-4h…) - smaller so it fits, no wrap
    <span
      style={{
        fontSize: "0.80em",
        letterSpacing: "-.01em",
        whiteSpace: "nowrap",
      }}
    >
      {metric.value}
    </span>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.48, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 180px",
        alignItems: "center",
        gap: 20,
        padding: "clamp(5px,0.8vh,10px) 20px",
        borderBottom: isLast ? "none" : `1px solid ${HAIR_2}`,
        minHeight: 0,
        overflow: "hidden",
      }}
    >
      {/* .statNum - large number */}
      <span
        style={{
          fontFamily: DISPLAY,
          fontWeight: 500,
          fontSize: "clamp(50px,6vh,56px)",
          lineHeight: 0.95,
          letterSpacing: "-0.04em",
          color: BLUE,
          display: "inline-flex",
          alignItems: "baseline",
          gap: 2,
          minWidth: 0,
          overflow: "hidden",
        }}
      >
        {valueNode}
      </span>

      {/* .desc - label */}
      <span
        style={{
          fontFamily: DISPLAY,
          fontSize: 13,
          lineHeight: 1.42,
          color: INK_2,
        }}
      >
        {metric.labelParts.map((p, i) =>
          p.bold ? (
            <b key={i} style={{ color: INK, fontWeight: 500 }}>
              {p.text}
            </b>
          ) : (
            <span key={i}>{p.text}</span>
          ),
        )}
      </span>
    </motion.div>
  );
}

// -- CaseCard - memoised: only re-renders when data prop changes (activeIdx),
//    not on every visualIdx/sidebar change during scroll.
const CaseCard = memo(function CaseCard({ data }: { data: CaseData }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        width: "100%",
        height: "100%",
        minHeight: 0,
        overflow: "hidden",
      }}
    >
      {/* -- LEFT - mirrors .left -- */}
      <div
        style={{
          padding: "clamp(16px,3vh,40px) 44px clamp(14px,2.5vh,36px) 48px",
          position: "relative",
          height: "100%",
          minHeight: 0,
          overflow: "hidden",
        }}
      >
        {/* Inner rounded card - mirrors .left::before */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: "clamp(10px,1.8vh,18px) 12px clamp(10px,1.8vh,18px) 20px",
            background: BG_CARD,
            border: `1px solid ${HAIR}`,
            borderRadius: 16,
            boxShadow:
              "0 1px 0 rgba(0,0,0,0.02),0 30px 60px -40px rgba(20,20,40,0.15)",
            pointerEvents: "none",
          }}
        />

        {/* Content grid - mirrors .left > * (z-index 1) */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            height: "100%",
            display: "grid",
            gridTemplateRows: "auto auto minmax(0,1fr) auto",
            minHeight: 0,
            overflow: "hidden",
          }}
        >
          {/* .head */}
          <div
            style={{
              padding:
                "clamp(10px,1.4vh,16px) 20px clamp(8px,1.2vh,14px) 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          />

          {/* .hero */}
          <div
            style={{
              padding:
                "clamp(12px,1.8vh,20px) 20px clamp(10px,1.4vh,18px) 20px",
              borderBottom: `1px solid ${HAIR_2}`,
            }}
          >
            <h3
              style={{
                fontFamily: DISPLAY,
                fontWeight: 500,
                fontSize: "clamp(18px,2.2vw,34px)",
                lineHeight: 1.05,
                letterSpacing: "-0.025em",
                color: INK,
                margin: "0 0 clamp(6px,1vh,12px) 0",
              }}
            >
              {data.headingParts.map((p, pi) =>
                p.accent ? (
                  <em
                    key={pi}
                    style={{
                      fontFamily: SERIF,
                      fontStyle: "italic",
                      fontWeight: 400,
                      color: BLUE,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {p.text}
                  </em>
                ) : (
                  <span key={pi}>{p.text}</span>
                ),
              )}
            </h3>
            <p
              style={{
                fontFamily: DISPLAY,
                fontSize: 13,
                lineHeight: 1.5,
                color: INK_2,
                margin: 0,
              }}
            >
              {data.lead}
            </p>
          </div>

          {/* .stats - 3 equal rows, shrinkable */}
          <div
            style={{
              display: "grid",
              gridTemplateRows:
                "minmax(0,1fr) minmax(0,1fr) minmax(0,1fr)",
              minHeight: 0,
              overflow: "hidden",
            }}
          >
            {data.metrics.map((m, mi) => (
              <StatRow
                key={mi}
                metric={m}
                isLast={mi === 2}
                delay={0.09 + mi * 0.09}
              />
            ))}
          </div>

          {/* .foot */}
          <div
            style={{
              padding:
                "clamp(8px,1.1vh,12px) 20px clamp(10px,1.4vh,16px) 20px",
              borderTop: `1px solid ${HAIR_2}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
            }}
          >
            {/* .tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {data.tags.map((t, i) => (
                <span
                  key={i}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 7,
                    padding: "7px 13px 7px 11px",
                    border: `1px solid ${HAIR}`,
                    borderRadius: 999,
                    fontSize: 12,
                    fontFamily: DISPLAY,
                    color: INK_2,
                    background: "#fff",
                    lineHeight: 1,
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      flexShrink: 0,
                      background:
                        t.tone === "primary"
                          ? BLUE
                          : t.tone === "ink"
                            ? INK
                            : "#cfd3e8",
                    }}
                  />
                  {t.label}
                </span>
              ))}
            </div>

            {/* .read + .arrow */}
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                fontFamily: MONO,
                fontSize: 10,
                letterSpacing: ".2em",
                color: INK,
                textTransform: "uppercase",
                flexShrink: 0,
                cursor: "default",
              }}
            >
              Leia o case
              <span
                style={{
                  position: "relative",
                  display: "inline-block",
                  width: 26,
                  height: 1,
                  background: INK,
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    right: 0,
                    top: -3,
                    width: 7,
                    height: 7,
                    borderTop: `1px solid ${INK}`,
                    borderRight: `1px solid ${INK}`,
                    transform: "rotate(45deg)",
                    display: "block",
                  }}
                />
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* -- RIGHT - mirrors .right + .photo -- */}
      <div
        style={{
          padding: "clamp(16px,3vh,40px) 48px clamp(14px,2.5vh,36px) 14px",
          height: "100%",
          minHeight: 0,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "relative",
            borderRadius: 16,
            overflow: "hidden",
            background: "#eef0ff",
            border: "1px solid #dde1ff",
            height: "100%",
            // Own GPU layer: border-radius clipping + image compositing
            // happens entirely on GPU during parent translate3d transition.
            transform: "translateZ(0)",
            willChange: "transform",
          }}
        >
          <Image
            src={data.photo}
            alt={data.company}
            fill
            sizes="(max-width: 1280px) 50vw, 640px"
            className="object-cover object-center"
          />
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
            }}
          >
            <span
              style={{
                fontFamily: MONO,
                fontSize: 11,
                letterSpacing: ".16em",
                textTransform: "uppercase",
                color: "rgba(26,77,255,0.18)",
              }}
            >
              {data.company}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});

// -- CasesSticky -------------------------------------------------------------
export function CasesSticky() {
  // React state only for content changes (rare) — not for scroll progress.
  const [activeIdx, setActiveIdx]   = useState(0);
  const [visualIdx, setVisualIdx]   = useState(0);

  // Pre-fetch AND pre-decode all case photos before any transition happens.
  // decode() offloads JPEG/PNG decompression to a worker thread so the first
  // animated frame is never blocked by image decoding.
  useEffect(() => {
    CASES.forEach(c => {
      const img = new window.Image();
      img.src = c.photo;
      if ("decode" in img) img.decode().catch(() => {});
    });
  }, []);

  const wrapperRef     = useRef<HTMLDivElement>(null);
  const curSlotRef     = useRef<HTMLDivElement>(null);
  const nextSlotRef    = useRef<HTMLDivElement>(null);
  const sidebarBarRefs = useRef<(HTMLDivElement | null)[]>([]);
  const idxRef         = useRef(0);
  const progRef        = useRef(0);
  const visualIdxRef   = useRef(0);

  useEffect(() => {
    let rafId = 0;

    const apply = () => {
      rafId = 0;
      if (!wrapperRef.current) return;

      const vh    = window.innerHeight;
      const wr    = wrapperRef.current.getBoundingClientRect();
      const scrollIn = Math.max(0, -wr.top);
      const slotH    = SLOT_VH * vh;
      const raw      = scrollIn / slotH;
      const idx      = Math.min(Math.floor(raw), CASES.length - 1);
      const prog     = Math.min(Math.max(raw - idx, 0), 1);
      const cRaw     = idx + prog;

      progRef.current = prog;

      const hasNext = idx < CASES.length - 1;
      if (curSlotRef.current) {
        curSlotRef.current.style.transform =
          `translate3d(0,${-100 * (hasNext ? prog : 0)}%,0)`;
        curSlotRef.current.style.pointerEvents = prog < 0.5 ? "auto" : "none";
      }
      if (nextSlotRef.current) {
        nextSlotRef.current.style.transform =
          `translate3d(0,${100 * (1 - prog)}%,0)`;
        nextSlotRef.current.style.pointerEvents = prog >= 0.5 ? "auto" : "none";
      }

      sidebarBarRefs.current.forEach((bar, i) => {
        if (!bar) return;
        const fill =
          i === 0
            ? Math.min(cRaw * 2, 1)
            : Math.min(Math.max(cRaw - i + 0.5, 0), 1);
        bar.style.width = `${fill * 100}%`;
        const pastColor = i < CASES.length - 1 && fill >= 1;
        bar.style.background =
          fill <= 0
            ? "transparent"
            : pastColor
              ? "rgba(255,255,255,.22)"
              : "#3B82F6";
      });

      const newVisualIdx = Math.min(Math.round(cRaw), CASES.length - 1);
      if (idx !== idxRef.current) {
        idxRef.current = idx;
        setActiveIdx(idx);
      }
      if (newVisualIdx !== visualIdxRef.current) {
        visualIdxRef.current = newVisualIdx;
        setVisualIdx(newVisualIdx);
      }
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(apply);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    apply();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const scrollToCase = (i: number) => {
    if (!wrapperRef.current) return;
    const top = wrapperRef.current.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + i * SLOT_VH * window.innerHeight, behavior: "smooth" });
  };

  const cur  = CASES[activeIdx];
  const next = CASES[activeIdx + 1];

  const WRAPPER_VH = (CASES.length - 1) * SLOT_VH * 100 + 105;

  const setCurRef = useCallback(
    (el: HTMLDivElement | null) => {
      curSlotRef.current = el;
      if (!el) return;
      const hasNext = activeIdx < CASES.length - 1;
      el.style.transform = `translate3d(0,${-100 * (hasNext ? progRef.current : 0)}%,0)`;
      el.style.pointerEvents = progRef.current < 0.5 ? "auto" : "none";
    },
    [activeIdx],
  );

  const setNextRef = useCallback(
    (el: HTMLDivElement | null) => {
      nextSlotRef.current = el;
      if (!el) return;
      el.style.transform = `translate3d(0,${100 * (1 - progRef.current)}%,0)`;
      el.style.pointerEvents = progRef.current >= 0.5 ? "auto" : "none";
    },
    [activeIdx],
  );

  return (
    <div id="scene-cases" className="relative -mt-24 bg-bg text-text">
      {/* -- Intro -- */}
      <section className="relative flex min-h-screen items-center justify-center px-12 text-center">
        <div>
          <p className="mb-6 font-mono text-[11px] uppercase tracking-[.26em] text-text-muted">
            Cases de sucesso
          </p>
          <h2
            style={{
              fontFamily: DISPLAY,
              fontSize: "clamp(52px,7vw,96px)",
              fontWeight: 200,
              lineHeight: 1.02,
              letterSpacing: "-.04em",
              maxWidth: 760,
            }}
          >
            Resultados que
            <br />
            falam por si.
          </h2>
        </div>
      </section>

      {/* -- Sticky block -- */}
      <div
        ref={wrapperRef}
        style={{
          height: `${WRAPPER_VH}vh`,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "sticky",
            top: "96px",
            height: "calc(100vh - 96px)",
            display: "flex",
          }}
        >
          {/* LEFT SIDEBAR - progress lines (dark, unchanged) */}
          <div
            style={{
              width: 210,
              flexShrink: 0,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "0 0 0 48px",
            }}
          >
            {CASES.map((c, i) => {
              const on = i === visualIdx;
              return (
                <button
                  key={c.id}
                  onClick={() => scrollToCase(i)}
                  style={{
                    display: "block",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    textAlign: "left",
                    width: "100%",
                  }}
                  aria-label={`Ir para ${c.company}`}
                >
                  <div
                    style={{
                      position: "relative",
                      height: 1,
                      background: "rgba(255,255,255,.07)",
                      marginBottom: 16,
                    }}
                  >
                    <div
                      ref={(el) => { sidebarBarRefs.current[i] = el; }}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        bottom: 0,
                        width: "0%",
                        background: "transparent",
                        transition: "background .35s ease",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: 10,
                      marginBottom: 3,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: MONO,
                        fontSize: 10,
                        color: on
                          ? "rgba(255,255,255,.42)"
                          : "rgba(255,255,255,.15)",
                        transition: "color .35s",
                      }}
                    >
                      {c.index}
                    </span>
                    <span
                      style={{
                        fontFamily: DISPLAY,
                        fontSize: 13,
                        fontWeight: on ? 600 : 400,
                        color: on
                          ? "rgba(255,255,255,.92)"
                          : "rgba(255,255,255,.2)",
                        transition: "all .35s",
                      }}
                    >
                      {c.company}
                    </span>
                  </div>
                  <div
                    style={{
                      fontFamily: MONO,
                      fontSize: 9,
                      letterSpacing: ".1em",
                      textTransform: "uppercase",
                      color: on
                        ? "rgba(255,255,255,.28)"
                        : "rgba(255,255,255,.09)",
                      paddingLeft: 20,
                      marginBottom: 28,
                      transition: "color .35s",
                    }}
                  >
                    {c.sector}
                  </div>
                </button>
              );
            })}
          </div>

          {/* CARD FRAME - bg matches reference .frame background */}
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              padding: "16px 44px 24px 28px",
              minHeight: 0,
            }}
          >
            <div
              style={{
                width: "100%",
                height: "calc(100vh - 96px - 40px)",
                background: BG_FRAME,
                border: `1px solid ${HAIR}`,
                borderRadius: 18,
                overflow: "clip",
                position: "relative",
              }}
            >
              <div style={{ position: "relative", width: "100%", height: "100%" }}>
                {/* CURRENT — transform driven imperatively via setCurRef */}
                <div
                  ref={setCurRef}
                  key={cur.id}
                  style={{
                    position: "absolute", inset: 0,
                    willChange: "transform",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                >
                  <CaseCard data={cur} />
                </div>

                {/* NEXT — transform driven imperatively via setNextRef */}
                {next && (
                  <div
                    ref={setNextRef}
                    key={next.id}
                    style={{
                      position: "absolute", inset: 0,
                      willChange: "transform",
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                    }}
                  >
                    <CaseCard data={next} />
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
