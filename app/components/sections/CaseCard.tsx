"use client";

import { memo } from "react";
import { motion } from "motion/react";
import Image from "next/image";
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
import { parseAnimatable, useCountUp } from "@/hooks/useCountUp";

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
    </motion.div>
  );
}

export const CaseCard = memo(function CaseCard({ data }: { data: CaseData }) {
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
                delay={0.09 + mi * 0.09}
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

      {/* RIGHT */}
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
            // GPU layer: border-radius clipping + image compositing on GPU during parent translate3d
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
