"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CASES, SLOT_VH, BG_FRAME, HAIR, DISPLAY } from "@/lib/cases-sticky";
import { CaseCard } from "./CaseCard";
import { CasesSidebar } from "./CasesSidebar";

export function CasesSticky() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [visualIdx, setVisualIdx] = useState(0);

  // Pre-fetch and pre-decode all case photos before any transition.
  // decode() offloads JPEG/PNG decompression to a worker so the first
  // animated frame is never blocked by image decoding.
  // The ref keeps the Image objects alive until decode() resolves — without it,
  // GC can drop them mid-decode and cancel the worker task.
  const preloadRef = useRef<HTMLImageElement[]>([]);
  useEffect(() => {
    preloadRef.current = CASES.map(c => {
      const img = new window.Image();
      img.src = c.photo;
      if ("decode" in img) img.decode().catch(() => {});
      return img;
    });
  }, []);

  const wrapperRef     = useRef<HTMLDivElement>(null);
  const curSlotRef     = useRef<HTMLDivElement>(null);
  const nextSlotRef    = useRef<HTMLDivElement>(null);
  const sidebarBarRefs = useRef<(HTMLDivElement | null)[]>([]);
  const idxRef         = useRef(0);
  const progRef        = useRef(0);
  const visualIdxRef   = useRef(0);

  // Fully imperative scroll handler — zero React re-renders on scroll.
  useEffect(() => {
    let rafId = 0;

    const apply = () => {
      rafId = 0;
      if (!wrapperRef.current) return;

      const vh       = window.innerHeight;
      const wr       = wrapperRef.current.getBoundingClientRect();
      const scrollIn = Math.max(0, -wr.top);
      const slotH    = SLOT_VH * vh;
      const raw      = scrollIn / slotH;
      const idx      = Math.min(Math.floor(raw), CASES.length - 1);
      const prog     = Math.min(Math.max(raw - idx, 0), 1);
      const cRaw     = idx + prog;

      progRef.current = prog;

      // Guard: when idx changes, curSlotRef/nextSlotRef still point to OLD elements.
      // Applying new-idx math to old refs jumps them ~98% in the wrong direction
      // for one frame, causing a visible glitch. Skip transforms this frame —
      // setCurRef/setNextRef will set correct initial positions after React commits.
      const idxChanged = idx !== idxRef.current;
      if (!idxChanged) {
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
      }

      // Sidebar uses pure math (no DOM ref dependency) — always safe to update.
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

      if (idxChanged) {
        idxRef.current = idx;
        setActiveIdx(idx);
      }
      const newVisualIdx = Math.min(Math.round(cRaw), CASES.length - 1);
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

  const scrollToCase = useCallback((i: number) => {
    if (!wrapperRef.current) return;
    const top = wrapperRef.current.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + i * SLOT_VH * window.innerHeight, behavior: "smooth" });
  }, []);

  const cur  = CASES[activeIdx];
  const next = CASES[activeIdx + 1];
  const WRAPPER_VH = (CASES.length - 1) * SLOT_VH * 100 + 105;

  // Sync imperative transform state when activeIdx triggers a new card mount.
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
      {/* Intro */}
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

      {/* Sticky block */}
      <div
        ref={wrapperRef}
        style={{ height: `${WRAPPER_VH}vh`, position: "relative" }}
      >
        <div
          style={{
            position: "sticky",
            top: "96px",
            height: "calc(100vh - 96px)",
            display: "flex",
          }}
        >
          <CasesSidebar
            cases={CASES}
            visualIdx={visualIdx}
            sidebarBarRefs={sidebarBarRefs}
            onScrollToCase={scrollToCase}
          />

          {/* Card frame */}
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
