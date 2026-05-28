"use client";

import { memo, useMemo } from "react";
import Image from "next/image";
import { useIsMobile } from "@/hooks/useIsMobile";
import {
  type Metric,
  type CaseData,
  DISPLAY,
  MONO,
  SERIF,
  BLUE,
  BLUE_2,
  INK,
  INK_2,
  HAIR,
  HAIR_2,
  BG_CARD,
} from "@/lib/cases-sticky";
import { parseAnimatable } from "@/hooks/useCountUp";

function StatRow({
  metric,
  isLast,
  isMobile,
}: {
  metric: Metric;
  isLast: boolean;
  isMobile: boolean;
}) {
  const parsed = useMemo(() => parseAnimatable(metric.value), [metric.value]);

  const valueNode = parsed ? (
    <>
      {parsed.prefix && (
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
      <span>{parsed.n}</span>
      {parsed.suffix && (
        <span style={{ fontSize: "0.61em", color: BLUE, marginLeft: 2 }}>
          {parsed.suffix}
        </span>
      )}
    </>
  ) : (
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
    <div
      style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr 120px" : "1fr 180px",
        alignItems: "center",
        gap: 20,
        padding: "clamp(5px,0.8vh,10px) 20px",
        borderBottom: isLast ? "none" : `1px solid ${HAIR_2}`,
        minHeight: 0,
        overflow: "hidden",
      }}
    >
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
    </div>
  );
}

export const CaseCard = memo(function CaseCard({ data }: { data: CaseData }) {
  const isMobile = useIsMobile();
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
        gridTemplateRows: isMobile ? "1fr auto" : undefined,
        width: "100%",
        height: "100%",
        minHeight: 0,
        overflow: "hidden",
      }}
    >
      {/* LEFT */}
      <div
        style={{
          padding: "clamp(16px,3vh,40px) 44px clamp(14px,2.5vh,36px) 48px",
          position: "relative",
          height: "100%",
          minHeight: 0,
          overflow: "hidden",
        }}
      >
        {/* Inner rounded card */}
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
          {/* .head — empty spacer row */}
          <div
            style={{
              padding: "clamp(10px,1.4vh,16px) 20px clamp(8px,1.2vh,14px) 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          />

          {/* .hero */}
          <div
            style={{
              padding: "clamp(12px,1.8vh,20px) 20px clamp(10px,1.4vh,18px) 20px",
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

          {/* .stats */}
          <div
            style={{
              display: "grid",
              gridTemplateRows: "minmax(0,1fr) minmax(0,1fr) minmax(0,1fr)",
              minHeight: 0,
              overflow: "hidden",
            }}
          >
            {data.metrics.map((m, mi) => (
              <StatRow
                key={mi}
                metric={m}
                isLast={mi === 2}
                isMobile={isMobile}
              />
            ))}
          </div>

          {/* .foot */}
          <div
            style={{
              padding: "clamp(8px,1.1vh,12px) 20px clamp(10px,1.4vh,16px) 20px",
              borderTop: `1px solid ${HAIR_2}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
            }}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "baseline",
                gap: "0 10px",
                fontFamily: DISPLAY,
                fontSize: 12,
                lineHeight: 1.3,
                color: INK_2,
              }}
            >
              {data.tags.map((t, i) => (
                <span key={i} style={{ display: "inline-flex", alignItems: "baseline", gap: 10 }}>
                  {i > 0 && (
                    <span aria-hidden style={{ color: HAIR, fontWeight: 300 }}>·</span>
                  )}
                  <span style={{ color: t.tone === "primary" ? INK : INK_2 }}>
                    {t.label}
                  </span>
                </span>
              ))}
            </div>

            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "9px 18px",
                fontFamily: DISPLAY,
                fontSize: 13,
                fontWeight: 500,
                color: "#fff",
                background: BLUE,
                borderRadius: 999,
                lineHeight: 1,
                flexShrink: 0,
                cursor: "pointer",
                boxShadow: "0 1px 0 rgba(0,0,0,0.04), 0 6px 16px -6px rgba(31,61,255,0.45)",
              }}
            >
              Leia o case
              <span aria-hidden style={{ fontSize: 14 }}>→</span>
            </span>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div
        style={{
          padding: isMobile ? "0 8px 8px 8px" : "clamp(16px,3vh,40px) 48px clamp(14px,2.5vh,36px) 14px",
          height: isMobile ? "200px" : "100%",
          minHeight: 0,
          overflow: "hidden",
          order: isMobile ? -1 : undefined,
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
