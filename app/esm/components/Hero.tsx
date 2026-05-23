"use client";

import { useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { buttonClasses } from "@/components/ui/Button";

/**
 * ESM Hero — Network Hub.
 * Desk Manager logo sits at the center; six department cards float at
 * fixed positions around it. Curved SVG paths connect each card to the
 * hub with animated data packets traveling along them. Pulsing rings
 * emanate from the hub. Cards bob gently with a phase-shifted float.
 *
 * Layout adapted to Ring 1 tokens (accent #1A4DFF / accent-2 #3B82F6,
 * bg #05060F, surface, border). All decorative motion respects
 * prefers-reduced-motion via globals.css media query.
 */

type Dept = {
  id: string;
  label: string;
  /** Position in the artifact viewBox, percent. */
  x: number;
  y: number;
};

const HUB = { x: 50, y: 50 } as const;

const DEPARTMENTS: readonly Dept[] = [
  { id: "rh",  label: "RH",         x: 22, y: 18 },
  { id: "jur", label: "Jurídico",   x: 78, y: 18 },
  { id: "tec", label: "Tecnologia", x: 14, y: 50 },
  { id: "mkt", label: "Marketing",  x: 86, y: 50 },
  { id: "fac", label: "Facilities", x: 22, y: 82 },
  { id: "fin", label: "Financeiro", x: 78, y: 82 },
] as const;

type Spoke = Dept & { path: string };

/**
 * Pre-compute the curved Bézier path from each department to the hub.
 * Used both for the visible <path> stroke and as the offset-path of
 * the animated data packet that travels along it.
 */
function buildSpokes(): Spoke[] {
  return DEPARTMENTS.map((d, i) => {
    const mx = (d.x + HUB.x) / 2;
    const my = (d.y + HUB.y) / 2;
    const dx = HUB.x - d.x;
    const dy = HUB.y - d.y;
    const len = Math.hypot(dx, dy);
    const nx = -dy / len;
    const ny = dx / len;
    const bow = (i % 2 === 0 ? 1 : -1) * 6;
    const cx = mx + nx * bow;
    const cy = my + ny * bow;
    return {
      ...d,
      path: `M ${d.x} ${d.y} Q ${cx} ${cy} ${HUB.x} ${HUB.y}`,
    };
  });
}

export default function Hero() {
  const artifactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = artifactRef.current;
    if (!el) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let cleanup = () => {};
    (async () => {
      const { gsap } = await import("gsap");

      if (prefersReduced) {
        gsap.set(el, { opacity: 1 });
        gsap.set(el.querySelectorAll("[data-nh-card]"), { opacity: 1 });
        return;
      }

      const ctx = gsap.context(() => {
        // Container entrance
        gsap.fromTo(
          el,
          { opacity: 0, y: 24, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out", delay: 0.2 },
        );

        // Paths draw in from card to hub via real path length
        const paths = el.querySelectorAll<SVGPathElement>("[data-nh-path]");
        paths.forEach((p) => {
          const len = p.getTotalLength();
          gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
        });
        gsap.to(paths, {
          strokeDashoffset: 0,
          duration: 1.1,
          ease: "power3.out",
          stagger: 0.07,
          delay: 0.55,
        });

        // Hub appears slightly before the cards land
        gsap.fromTo(
          el.querySelector("[data-nh-hub]"),
          { opacity: 0, scale: 0.7 },
          { opacity: 1, scale: 1, duration: 0.9, ease: "power3.out", delay: 0.35 },
        );

        // Department cards reveal from edges to center
        gsap.fromTo(
          el.querySelectorAll<HTMLElement>("[data-nh-card]"),
          { opacity: 0, scale: 0.85 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.7,
            ease: "power3.out",
            stagger: { each: 0.08, from: "edges" },
            delay: 0.95,
          },
        );
      }, el);

      cleanup = () => ctx.revert();
    })();

    return () => cleanup();
  }, []);

  return (
    <section
      id="top"
      className="
        relative isolate flex min-h-screen items-center overflow-hidden
        px-6 pt-32 pb-20
      "
    >
      {/* Drenched background — Ring 2 template */}
      <div
        aria-hidden="true"
        className="
          absolute inset-0 -z-10
          bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(26,77,255,0.25),transparent_60%),radial-gradient(ellipse_80%_60%_at_50%_100%,rgba(26,77,255,0.08),transparent_70%)]
        "
      />
      <div aria-hidden="true" className="hero-grid-bg absolute inset-0 -z-10" />
      <div
        aria-hidden="true"
        className="
          absolute bottom-0 inset-x-0 -z-10 h-[180px]
          bg-[linear-gradient(to_bottom,transparent,var(--color-bg))]
        "
      />

      <div className="mx-auto w-full max-w-[1280px]">
        <div className="grid items-center gap-16 lg:grid-cols-[1fr_1.05fr] lg:gap-12">
          {/* Left — copy */}
          <div>
            <h1
              className="reveal mt-5 text-[clamp(2.25rem,4.5vw,4rem)] font-extralight leading-[1.1] tracking-[-0.035em]"
              style={{ "--delay": "80ms" } as React.CSSProperties}
            >
              A empresa inteira{" "}
              <em className="not-italic text-accent-2">orquestrada</em>{" "}
              num só motor
            </h1>

            <p
              className="reveal mt-6 max-w-[540px] text-[1.05rem] leading-relaxed text-text-muted"
              style={{ "--delay": "160ms" } as React.CSSProperties}
            >
              Enterprise Service Management é parar de operar oito SaaS
              desconectados e desenhar a empresa como uma plataforma única:
              RH, Jurídico, Facilities, Financeiro e TI no mesmo catálogo,
              mesmo workflow, mesma trilha de auditoria.
            </p>

            <div
              className="reveal mt-8 flex flex-col items-start gap-4"
              style={{ "--delay": "240ms" } as React.CSSProperties}
            >
              <Link
                href="/contato"
                className={buttonClasses({ variant: "primary", className: "group" })}
              >
                Fale com um especialista
                <span
                  aria-hidden="true"
                  className="ml-2 inline-block transition-transform duration-200 ease-out group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </div>
          </div>

          {/* Right — Network Hub artifact */}
          <div
            ref={artifactRef}
            role="img"
            aria-label="Diagrama: seis departamentos corporativos (RH, Jurídico, Tecnologia, Marketing, Facilities, Financeiro) conectados a um hub central da Desk Manager."
            className="relative mx-auto aspect-square w-full max-w-[560px] opacity-0"
          >
            <NetworkHub />
          </div>
        </div>
      </div>
    </section>
  );
}

function NetworkHub() {
  const spokes = useMemo(() => buildSpokes(), []);

  return (
    <>
      {/* Curved paths + animated data packets */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full overflow-visible"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <radialGradient id="esm-nh-hub-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="rgba(26,77,255,0.6)" />
            <stop offset="60%"  stopColor="rgba(26,77,255,0.08)" />
            <stop offset="100%" stopColor="rgba(26,77,255,0)" />
          </radialGradient>
          <radialGradient id="esm-nh-packet-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#F5F6FF" stopOpacity="1" />
            <stop offset="60%"  stopColor="#3B82F6" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx={HUB.x} cy={HUB.y} r="22" fill="url(#esm-nh-hub-glow)" />

        {spokes.map((s, i) => (
          <g key={s.id}>
            <path
              data-nh-path
              d={s.path}
              stroke="rgba(59,130,246,0.28)"
              strokeWidth="0.2"
              fill="none"
              vectorEffect="non-scaling-stroke"
            />
            <circle
              r="0.7"
              fill="url(#esm-nh-packet-glow)"
              className="esm-nh-packet"
              style={
                {
                  offsetPath: `path('${s.path}')`,
                  WebkitOffsetPath: `path('${s.path}')`,
                  animationDelay: `${i * 0.4}s`,
                } as React.CSSProperties
              }
            />
          </g>
        ))}
      </svg>

      {/* Hub: Desk Manager symbol with pulsing rings */}
      <div
        data-nh-hub
        className="
          absolute left-1/2 top-1/2 z-10 grid size-[120px] -translate-x-1/2 -translate-y-1/2
          place-items-center rounded-full
          border border-accent-2/30
          bg-[radial-gradient(circle_at_50%_50%,rgba(26,77,255,0.55)_0%,rgba(11,13,28,0.95)_55%,rgba(5,6,15,1)_100%)]
          shadow-[0_0_70px_rgba(26,77,255,0.5),inset_0_0_28px_rgba(59,130,246,0.18)]
        "
      >
        <Image
          src="/simbolo - branco.png"
          alt="Desk Manager"
          width={120}
          height={120}
          priority
          className="relative z-10 h-[58%] w-auto drop-shadow-[0_0_12px_rgba(0,0,0,0.6)]"
        />

        <span aria-hidden="true" className="esm-nh-ring" />
        <span aria-hidden="true" className="esm-nh-ring esm-nh-ring--2" />
      </div>

      {/* Department cards — positioned by percent, glide via CSS float */}
      {spokes.map((s, i) => (
        <div
          key={s.id}
          data-nh-card
          title={s.label}
          aria-label={s.label}
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            opacity: 0,
            animationDelay: i % 2 === 0 ? "-2.2s" : "-3.6s",
          }}
          className="
            esm-nh-card-anim
            group absolute z-20 flex h-[88px] w-[136px] -translate-x-1/2 -translate-y-1/2
            items-center justify-center rounded-2xl
            border border-accent-2/15
            bg-[linear-gradient(180deg,rgba(19,23,50,0.88)_0%,rgba(11,13,28,0.92)_100%)]
            shadow-[inset_0_1px_0_rgba(160,180,255,0.07),0_18px_40px_rgba(0,0,10,0.5)]
            backdrop-blur-md
            transition-[border-color,box-shadow] duration-300 ease-out
            hover:border-accent-2/55
            hover:shadow-[inset_0_1px_0_rgba(160,180,255,0.1),0_18px_40px_rgba(0,0,10,0.5),0_0_28px_rgba(26,77,255,0.35)]
          "
        >
          <span
            aria-hidden="true"
            className="
              pointer-events-none absolute inset-0 rounded-2xl
              bg-[radial-gradient(120%_80%_at_50%_0%,rgba(59,130,246,0.12),transparent_60%)]
            "
          />
          <span
            className="
              relative text-center text-[0.95rem] font-medium leading-none tracking-[-0.015em]
              text-text transition-colors duration-300 ease-out
              group-hover:text-accent-2
            "
          >
            {s.label}
          </span>
        </div>
      ))}
    </>
  );
}
