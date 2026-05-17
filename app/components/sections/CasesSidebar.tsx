"use client";

import { type MutableRefObject } from "react";
import { type CaseData, DISPLAY, MONO } from "@/lib/cases-sticky";

interface Props {
  cases: CaseData[];
  visualIdx: number;
  sidebarBarRefs: MutableRefObject<(HTMLDivElement | null)[]>;
  onScrollToCase: (i: number) => void;
}

export function CasesSidebar({ cases, visualIdx, sidebarBarRefs, onScrollToCase }: Props) {
  return (
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
      {cases.map((c, i) => {
        const on = i === visualIdx;
        return (
          <button
            key={c.id}
            onClick={() => onScrollToCase(i)}
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
                  color: on ? "rgba(255,255,255,.42)" : "rgba(255,255,255,.15)",
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
                  color: on ? "rgba(255,255,255,.92)" : "rgba(255,255,255,.2)",
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
                color: on ? "rgba(255,255,255,.28)" : "rgba(255,255,255,.09)",
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
  );
}
