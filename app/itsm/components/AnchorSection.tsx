"use client";

import { useState } from "react";
import { ANCHOR_ITSM } from "@/itsm/lib/data";

const A = ANCHOR_ITSM;

export default function AnchorSection() {
  const [openGroup, setOpenGroup] = useState<number>(0);

  return (
    <section
      id="anchor"
      aria-label="Práticas ITIL® certificadas"
      data-anchor-slot
      className="relative px-6 py-20 md:py-32"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[280px_1fr] lg:items-start lg:gap-16">
          {/* Aside sticky */}
          <aside aria-label="12 práticas ITIL®" className="reveal relative lg:sticky lg:top-[100px]">
            <div className="flex items-baseline gap-3">
              <span className="text-[clamp(4.5rem,7vw,6.5rem)] font-extralight leading-none tracking-[-0.06em]">
                12
              </span>
              <span className="text-[0.95rem] leading-snug text-text-muted">
                práticas<br />
                ITIL® certificadas
              </span>
            </div>

            <h2 className="mt-8 text-[clamp(1.6rem,2.6vw,2.1rem)] font-extralight leading-[1.15] tracking-[-0.018em]">
              IA nativa aplicada<br />
              <em className="not-italic text-accent-2">na execução</em>, não em teoria
            </h2>

            <p className="mt-6 max-w-[28ch] text-[0.95rem] leading-relaxed text-text-muted">
              {A.asideBody}
            </p>
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
                    <span className="group-title">{g.title}</span>
                    <span className="group-count">
                      {g.practices.length} {g.practices.length === 1 ? "prática" : "práticas"}
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
