"use client";

import { useState } from "react";
import { ANCHOR_ITSM } from "@/itsm/lib/data";

const A = ANCHOR_ITSM;

export default function AnchorSection() {
  const [openGroup, setOpenGroup] = useState<number>(0);

  return (
    <section
      id="anchor"
      aria-label="Práticas ITIL 5 certificadas"
      data-anchor-slot
      data-anchor-label="Anchor slot · ITSM"
      className="relative px-6 py-20 md:py-32"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[280px_1fr] lg:items-start lg:gap-16">
          {/* Aside sticky */}
          <aside aria-label="12 práticas ITIL 5" className="reveal relative lg:sticky lg:top-[100px]">
            <span className="
              inline-flex rounded-full border border-[rgba(26,77,255,0.4)]
              bg-[rgba(26,77,255,0.1)] px-4 py-2
              font-mono text-[0.65rem] uppercase tracking-[0.25em] text-accent-ice
            ">
              {A.kicker}
            </span>
            <h2 className="mt-6 text-[clamp(2rem,3.5vw,2.75rem)] font-extralight leading-[1.05] tracking-tight">
              {A.asideTitle}
            </h2>
            <p className="mt-6 text-[0.95rem] leading-relaxed text-text-muted">
              {A.asideBody}
            </p>
            <div className="mt-8 flex items-baseline gap-3">
              <span className="text-[5rem] font-extralight leading-[0.95] tracking-[-0.05em]">
                {A.bigNumber}
              </span>
              <span className="font-mono text-[0.75rem] uppercase tracking-[0.2em] text-text-muted">
                {A.bigSubLine1}<br />{A.bigSubLine2}
              </span>
            </div>
          </aside>

          {/* Accordion de grupos */}
          <div
            className="anchor-groups reveal"
            style={{ "--delay": "120ms" } as React.CSSProperties}
          >
            {A.groups.map((g, i) => {
              const isOpen = openGroup === i;
              const btnId = `anchor-btn-${i}`;
              const panelId = `anchor-panel-${i}`;
              return (
                <div
                  key={g.cat}
                  className={`anchor-group ${isOpen ? "open" : ""}`}
                >
                  <button
                    id={btnId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenGroup(isOpen ? -1 : i)}
                    className="group-head"
                  >
                    <span className="cat-label">{g.cat}</span>
                    <span className="group-title">{g.title}</span>
                    <span className="group-count">
                      {String(g.practices.length).padStart(2, "0")} práticas
                    </span>
                    <span className="group-chevron" aria-hidden="true">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M3 4.5L6 7.5L9 4.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </button>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={btnId}
                    aria-hidden={!isOpen}
                    className="group-body"
                  >
                    <div>
                      <div className="practices">
                        {g.practices.map((p) => (
                          <div className="practice" key={p.title}>
                            <span className="dot" aria-hidden="true" />
                            <div>
                              <h4>{p.title}</h4>
                              <p>{p.body}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
