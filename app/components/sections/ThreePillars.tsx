"use client";

import { useEffect, useRef } from "react";

export function ThreePillars() {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    let raf = 0;
    let tx = 0, ty = 0, cx = 0, cy = 0;

    const onMove = (e: MouseEvent) => {
      const r = stage.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width - 0.5;
      ty = (e.clientY - r.top) / r.height - 0.5;
    };
    const onLeave = () => { tx = 0; ty = 0; };

    const tick = () => {
      cx += (tx - cx) * 0.07;
      cy += (ty - cy) * 0.07;
      // data-blob has NO css animation — style.translate is uncontested
      stage.querySelectorAll<HTMLElement>("[data-blob]").forEach((b, i) => {
        const f = [20, -14, 12][i] ?? 8;
        b.style.translate = `${cx * f}px ${cy * f}px`;
      });
      raf = requestAnimationFrame(tick);
    };

    stage.addEventListener("mousemove", onMove);
    stage.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(tick);
    return () => {
      stage.removeEventListener("mousemove", onMove);
      stage.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      id="scene-pillars"
      aria-label="Plataforma de IA"
      className="relative overflow-hidden bg-transparent pt-[140px] pb-24 text-text"
    >
      <div
        className="pointer-events-none absolute inset-0 mask-radial-fade"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(96,165,250,0.10) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-12 px-8 md:grid-cols-[1.05fr_1fr]">

        {/* ── Left copy ── */}
        <div className="flex flex-col gap-7">
          <h1
            className="animate-rise text-[clamp(40px,5.2vw,68px)] font-light leading-[1.02] tracking-[-0.035em] text-text"
            style={{ animationDelay: "0.1s" }}
          >
            Transforme a experiência de serviços e processos com uma{" "}
            <span className="relative inline-block text-accent-2 font-normal">
              plataforma de IA
              <span aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
                <span
                  className="absolute inset-0 animate-shimmer"
                  style={{
                    background:
                      "linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.28) 50%, transparent 80%)",
                  }}
                />
              </span>
              <span className="absolute inset-x-0 bottom-[0.05em] -z-10 h-[0.18em] rounded bg-gradient-to-r from-accent/40 to-transparent" />
            </span>{" "}
            de verdade.
          </h1>

          <p
            className="animate-rise max-w-[58ch] text-lg leading-[1.55] text-text-muted"
            style={{ animationDelay: "0.3s" }}
          >
            Integramos{" "}
            <strong className="font-semibold text-text">operação</strong> e{" "}
            <strong className="font-semibold text-text">gestão</strong> em uma
            camada única, para que seu time foque no que realmente importa:{" "}
            <span className="font-semibold text-text">resultados e eficiência</span>.
          </p>
        </div>

        {/* ── Right Venn stage ── */}
        <div ref={stageRef} className="relative ml-auto aspect-square w-full max-w-[560px]">

          {/* Ambient glow */}
          <div
            className="pointer-events-none absolute inset-[-15%] animate-glow-pulse rounded-full"
            style={{
              background:
                "radial-gradient(circle at center, rgba(26,77,255,0.35) 0%, rgba(59,130,246,0.12) 45%, transparent 70%)",
              filter: "blur(48px)",
            }}
          />

          {/* Outer orbit — clockwise */}
          <div className="pointer-events-none absolute -inset-[4%] animate-spin-slow">
            <i className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_0_4px_rgba(26,77,255,0.18),0_0_12px_rgba(26,77,255,0.6)]" />
            <i className="absolute right-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-accent-2 shadow-[0_0_0_4px_rgba(59,130,246,0.18),0_0_12px_rgba(59,130,246,0.5)]" />
            <i className="absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-accent-2 shadow-[0_0_0_4px_rgba(59,130,246,0.2)]" />
            <i className="absolute left-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_0_4px_rgba(26,77,255,0.18),0_0_12px_rgba(26,77,255,0.6)]" />
          </div>

          {/* Inner orbit — counter-clockwise */}
          <div className="pointer-events-none absolute -inset-[10%] animate-spin-rev">
            <i className="absolute left-1/2 top-[8%] h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-accent-2/50 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
            <i className="absolute right-[8%] top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-accent/40 shadow-[0_0_8px_rgba(26,77,255,0.4)]" />
            <i className="absolute bottom-[8%] left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-accent-2/50 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
            <i className="absolute left-[8%] top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-accent/40 shadow-[0_0_8px_rgba(26,77,255,0.4)]" />
          </div>

          <div className="absolute inset-0">
            {/*
              4-layer blob — concerns fully separated:
              L1  entry wrapper  animate-blob-in (transform+opacity, runs once)
              L2  data-blob      parallax only — NO css animation, style.translate uncontested
              L3  drift+visual   animate-drift-a/b/c (transform), hover filter
              L4  content        animate-breathe (transform on a child — separate element)
            */}

            {/* TOP — IA Core */}
            <div
              className="animate-blob-in absolute left-[21%] top-0 z-30 h-[58%] w-[58%] hover:z-50"
              style={{ animationDelay: "0s" }}
            >
              {/* L2: parallax target — zero animation */}
              <div data-blob className="h-full w-full">
                {/* L3: drift + visual */}
                <div
                  className="animate-drift-a h-full w-full cursor-pointer overflow-hidden rounded-full transition-[filter] duration-300 ease-out hover:brightness-110 flex flex-col items-center justify-center shadow-[0_30px_60px_-20px_rgba(26,77,255,0.65),0_0_80px_rgba(26,77,255,0.25)]"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 30%, #5b85ff 0%, #1A4DFF 55%, #0e27b3 100%)",
                  }}
                >
                  {/* L4: breathe + content */}
                  <div className="animate-breathe flex flex-col items-center p-[6%] text-center text-white">
                    {/* logo placeholder — substitua pelo <Image> da Desk */}
                    <div className="mb-3 h-14 w-14 rounded-2xl border border-dashed border-white/30 bg-white/6" />
                    <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.14em] opacity-70">
                      IA · Core
                    </div>
                    <p className="max-w-[80%] text-[13px] leading-[1.35] opacity-90">
                      Plataforma de IA para serviços e processos.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* LEFT — Serviços */}
            <div
              className="animate-blob-in absolute left-0 top-[38%] z-10 h-[58%] w-[58%] hover:z-50"
              style={{ animationDelay: "0.3s" }}
            >
              <div data-blob className="h-full w-full">
                <div
                  className="animate-drift-b h-full w-full cursor-pointer overflow-hidden rounded-full transition-[filter] duration-300 ease-out hover:brightness-110 flex flex-col items-center justify-center shadow-[0_30px_60px_-20px_rgba(59,130,246,0.5),0_0_60px_rgba(59,130,246,0.15)]"
                  style={{
                    background:
                      "radial-gradient(circle at 40% 30%, #7ba8ff 0%, #3B82F6 55%, #1E5BD6 100%)",
                  }}
                >
                  <div
                    className="animate-breathe flex flex-col items-center p-[6%] text-center text-white"
                    style={{ animationDelay: "2s" }}
                  >
                    <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.14em] opacity-70">
                      Front · Atendimento
                    </div>
                    <h3 className="mb-1.5 text-[22px] font-semibold tracking-[-0.02em]">
                      Serviços
                    </h3>
                    <p className="max-w-[80%] text-[13px] leading-[1.35] opacity-90">
                      Atender uma necessidade ou desejo do usuário com agilidade.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT — Processos */}
            <div
              className="animate-blob-in absolute right-0 top-[38%] z-20 h-[58%] w-[58%] hover:z-50"
              style={{ animationDelay: "0.6s" }}
            >
              <div data-blob className="h-full w-full">
                <div
                  className="animate-drift-c h-full w-full cursor-pointer overflow-hidden rounded-full transition-[filter] duration-300 ease-out hover:brightness-110 flex flex-col items-center justify-center shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.05)] ring-1 ring-inset ring-white/8"
                  style={{
                    background:
                      "radial-gradient(circle at 60% 30%, #2a3260 0%, #131732 60%, #0B0D1C 100%)",
                  }}
                >
                  <div
                    className="animate-breathe flex flex-col items-center p-[6%] text-center text-white"
                    style={{ animationDelay: "4s" }}
                  >
                    <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.14em] text-accent-2/70">
                      Back · Operação
                    </div>
                    <h3 className="mb-1.5 text-[22px] font-semibold tracking-[-0.02em]">
                      Processos
                    </h3>
                    <p className="max-w-[80%] text-[13px] leading-[1.35] opacity-90">
                      Garantir que o trabalho seja feito corretamente, sempre.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
