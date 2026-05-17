"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Users, Lightbulb, TrendingUp, CircleCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";

// -- Design tokens -----------------------------------------------------------
const DISPLAY = "var(--font-display,system-ui,sans-serif)";
const MONO    = 'var(--font-code,"JetBrains Mono",monospace)';

// -- Content -----------------------------------------------------------------
const LINE_1 = "Mais que um escritório";
const LINE_2 = "Desk experience";

interface Feature { icon: LucideIcon; title: string; desc: string; }

const FEATURES: Feature[] = [
  { icon: Users,       title: "Conexões Relevantes",   desc: "Networking estratégico com clientes, parceiros e lideranças de mercado." },
  { icon: Lightbulb,   title: "Geração de Insights",   desc: "Ambiente pensado para estimular criatividade e inovação." },
  { icon: TrendingUp,  title: "Resultados Concretos",  desc: "Transforme oportunidades em negócios com agilidade." },
  { icon: CircleCheck, title: "Infraestrutura Completa", desc: "Cada detalhe planejado para potencializar experiências." },
];

// -- Component ---------------------------------------------------------------
export function DeskExperience() {
  const wrapperRef  = useRef<HTMLDivElement>(null);
  const bgRef       = useRef<HTMLDivElement>(null);
  const mediaRef    = useRef<HTMLDivElement>(null);
  const overlayRef  = useRef<HTMLDivElement>(null);
  const hintRef     = useRef<HTMLParagraphElement>(null);
  const line1Ref    = useRef<HTMLHeadingElement>(null);
  const line2Ref    = useRef<HTMLHeadingElement>(null);
  const isMobRef    = useRef(false);

  // Track mobile breakpoint in a ref — no state, no re-render
  useEffect(() => {
    const check = () => { isMobRef.current = window.innerWidth < 768; };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Fully imperative scroll handler — zero React re-renders on scroll
  useEffect(() => {
    let rafId = 0;

    const apply = () => {
      rafId = 0;
      if (!wrapperRef.current) return;

      const rect        = wrapperRef.current.getBoundingClientRect();
      const totalScroll = wrapperRef.current.offsetHeight - window.innerHeight;
      const scrolled    = Math.max(0, -rect.top);
      const prog        = totalScroll > 0 ? Math.min(1, scrolled / totalScroll) : 0;
      const mob         = isMobRef.current;

      const w  = 300 + prog * (mob ? 650 : 1250);
      const h  = 400 + prog * (mob ? 200 : 400);
      const tx = prog * (mob ? 180 : 150);

      if (bgRef.current)      bgRef.current.style.opacity      = String(1 - prog);
      if (mediaRef.current)  { mediaRef.current.style.width    = `${w}px`;
                               mediaRef.current.style.height   = `${h}px`; }
      if (overlayRef.current)  overlayRef.current.style.opacity = String(Math.max(0, 0.7 - prog * 0.45));
      if (hintRef.current)     hintRef.current.style.transform  = `translateX(${tx}vw)`;
      if (line1Ref.current)    line1Ref.current.style.transform = `translateX(-${tx}vw)`;
      if (line2Ref.current)    line2Ref.current.style.transform = `translateX(${tx}vw)`;
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

  return (
    <>
      {/* ── Sticky image-expansion stage ──────────────────────────────────── */}
      <div
        ref={wrapperRef}
        id="scene-experience"
        style={{ height: "220vh", position: "relative", marginTop: "180px" }}
      >
        <div style={{ position: "sticky", top: 0, height: "100dvh", overflow: "hidden" }}>
          <section className="relative flex flex-col items-center justify-center min-h-dvh">

            {/* Background — imperative opacity, no motion re-renders */}
            <div ref={bgRef} className="absolute inset-0 z-0" style={{ opacity: 1 }}>
              <Image
                src="/desk-experience-azul.png"
                alt="Background"
                fill
                className="object-cover object-center"
                priority
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">

              {/* Expanding image — width/height set imperatively */}
              <div
                ref={mediaRef}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl"
                style={{
                  width: "300px",
                  height: "400px",
                  maxWidth: "95vw",
                  maxHeight: "85vh",
                  boxShadow: "0 0 60px rgba(0,0,0,0.4)",
                  willChange: "width, height",
                }}
              >
                <div className="relative w-full h-full">
                  <Image
                    src="/desk-experience.png"
                    alt="Desk Manager Experience"
                    fill
                    sizes="(max-width: 768px) 95vw, 85vw"
                    className="object-cover rounded-2xl"
                  />
                  <div
                    ref={overlayRef}
                    className="absolute inset-0 rounded-2xl bg-black/50"
                    style={{ opacity: 0.7, willChange: "opacity" }}
                  />
                </div>


              </div>

              {/* Title lines — imperative translateX, no React state */}
              <div className="flex flex-col items-center gap-2 mix-blend-difference relative z-10 pointer-events-none">
                <h2
                  ref={line1Ref}
                  className="text-5xl md:text-6xl lg:text-[5.5rem] font-bold text-blue-200 tracking-tight"
                  style={{ willChange: "transform" }}
                >
                  {LINE_1}
                </h2>
                <h2
                  ref={line2Ref}
                  className="text-5xl md:text-6xl lg:text-[5.5rem] font-bold text-blue-200 text-center tracking-tight"
                  style={{ willChange: "transform" }}
                >
                  {LINE_2}
                </h2>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* ── Editorial content ─────────────────────────────────────────────── */}
      <section style={{ background: "#05060F", paddingTop: "96px", paddingBottom: "112px" }}>
        <div style={{ maxWidth: 1152, margin: "0 auto", padding: "0 48px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 3fr",
              gap: "clamp(40px,5vw,96px)",
              alignItems: "start",
            }}
          >
            {/* LEFT — editorial text */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ position: "sticky", top: 96 }}
            >
              <p style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "#3B82F6", marginBottom: 28 }}>
                Desk Manager Experience
              </p>
              <h3 style={{ fontFamily: DISPLAY, fontSize: "clamp(32px,3.5vw,48px)", fontWeight: 300, lineHeight: 1.08, letterSpacing: "-0.03em", color: "#ffffff", marginBottom: 28 }}>
                Hub estratégico<br />
                <em style={{ fontStyle: "normal", color: "rgba(255,255,255,0.4)", fontWeight: 200 }}>
                  de inovação e<br />cocriação.
                </em>
              </h3>
              <p style={{ fontFamily: DISPLAY, fontSize: 15, lineHeight: 1.75, color: "rgba(255,255,255,0.55)", marginBottom: 20 }}>
                O Desk Manager Experience nasce como nosso hub estratégico de inovação e
                cocriação. Um ambiente estruturado para promover conexões relevantes,
                estimular a geração de insights e transformar oportunidades em resultados
                concretos.
              </p>
              <p style={{ fontFamily: DISPLAY, fontSize: 15, lineHeight: 1.75, color: "rgba(255,255,255,0.55)", marginBottom: 36 }}>
                Mais do que um endereço, é um ponto de encontro para clientes, parceiros
                e lideranças de mercado que buscam colaboração, agilidade e performance.
              </p>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "8px 16px", border: "1px solid rgba(59,130,246,0.2)", borderRadius: 999, background: "rgba(26,77,255,0.08)" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#3B82F6", boxShadow: "0 0 6px rgba(59,130,246,0.8)", flexShrink: 0 }} />
                <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)" }}>
                  Vila Olímpia · São Paulo
                </span>
              </div>
            </motion.div>

            {/* RIGHT — 2×2 feature cards */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {FEATURES.map((f, i) => {
                const Icon = f.icon;
                return (
                  <motion.div
                    key={f.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ borderColor: "rgba(59,130,246,0.38)", boxShadow: "0 0 40px rgba(26,77,255,0.1)" }}
                    style={{ background: "linear-gradient(135deg,rgba(255,255,255,0.05) 0%,rgba(255,255,255,0.018) 100%)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: "32px 28px", display: "flex", flexDirection: "column", gap: 24, transition: "border-color 0.25s ease,box-shadow 0.25s ease" }}
                  >
                    <div style={{ width: 48, height: 48, borderRadius: 13, background: "rgba(26,77,255,0.14)", border: "1px solid rgba(59,130,246,0.22)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon size={20} color="#3B82F6" strokeWidth={1.5} />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      <h4 style={{ fontFamily: DISPLAY, fontSize: 15, fontWeight: 600, color: "#ffffff", letterSpacing: "-0.015em", lineHeight: 1.3 }}>{f.title}</h4>
                      <p style={{ fontFamily: DISPLAY, fontSize: 13, lineHeight: 1.65, color: "rgba(255,255,255,0.45)" }}>{f.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
