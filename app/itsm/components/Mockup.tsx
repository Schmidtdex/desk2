"use client";

import { useId } from "react";

export default function Mockup() {
  const gradientId = useId();
  return (
    <div
      aria-hidden="true"
      className="
        mockup-border relative overflow-hidden rounded-3xl border border-border
        bg-[linear-gradient(180deg,rgba(19,23,50,0.7),rgba(11,13,28,0.95))]
        p-5
        shadow-[0_30px_80px_rgba(0,0,0,0.6),0_0_100px_rgba(26,77,255,0.18),inset_0_1px_0_rgba(255,255,255,0.04)]
      "
    >
      {/* Chrome */}
      <div className="mb-4 flex items-center gap-2">
        <span className="size-2.5 rounded-full bg-[#3a3f5a]" />
        <span className="size-2.5 rounded-full bg-[#2a2f48]" />
        <span className="size-2.5 rounded-full bg-[#1f243d]" />
        <div className="
          ml-2 flex h-[22px] flex-1 items-center rounded-md border border-border
          bg-bg px-2.5 font-mono text-[0.65rem] tracking-[0.1em] text-text-muted
        ">
          desk.manager / service-desk / overview
        </div>
      </div>

      <div className="grid grid-cols-[100px_1fr] gap-2 sm:grid-cols-[130px_1fr] sm:gap-3">
        {/* Sidebar */}
        <div className="flex flex-col gap-1.5 rounded-2xl border border-border bg-bg/50 px-2 py-3 sm:gap-2 sm:px-2.5 sm:py-3.5">
          {[
            { label: "Overview", active: true },
            { label: "Incidentes" },
            { label: "Requisições" },
            { label: "Mudanças" },
            { label: "Ativos" },
            { label: "SLAs" },
            { label: "Catálogo" },
            { label: "Agentes IA" },
          ].map((n) => (
            <div
              key={n.label}
              className={[
                "flex items-center gap-2 rounded-md px-2 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.1em]",
                n.active
                  ? "bg-[rgba(26,77,255,0.12)] text-text"
                  : "text-text-muted",
              ].join(" ")}
            >
              <span className="size-3 rounded-sm border border-current opacity-70" />
              {n.label}
            </div>
          ))}
        </div>

        {/* Main */}
        <div className="flex flex-col gap-3 rounded-2xl border border-border bg-bg/50 p-4">
          {/* KPIs */}
          <div className="grid grid-cols-3 gap-2.5">
            <Kpi label="SLA Cumprido" value="98.7%" accent />
            <Kpi label="Tickets abertos" value="1,284" />
            <Kpi label="MTTR" value="3h 12" />
          </div>

          {/* Chart */}
          <div className="
            relative h-[120px] overflow-hidden rounded-lg border border-border
            bg-[linear-gradient(180deg,rgba(26,77,255,0.18),transparent_75%),repeating-linear-gradient(90deg,transparent_0_24px,rgba(30,34,64,0.5)_24px_25px)]
          ">
            <svg className="absolute inset-0 size-full" viewBox="0 0 400 120" preserveAspectRatio="none">
              <defs>
                <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stopColor="#1A4DFF" stopOpacity="0.55" />
                  <stop offset="1" stopColor="#1A4DFF" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0,90 C40,70 60,40 100,55 C140,70 160,30 200,40 C240,50 260,80 300,60 C340,40 360,55 400,30 L400,120 L0,120 Z"
                fill={`url(#${gradientId})`}
              />
              <path
                d="M0,90 C40,70 60,40 100,55 C140,70 160,30 200,40 C240,50 260,80 300,60 C340,40 360,55 400,30"
                stroke="#3B82F6"
                strokeWidth="1.5"
                fill="none"
              />
            </svg>
          </div>

          {/* Tickets */}
          <div className="flex flex-col gap-1.5">
            <Ticket id="INC-4821" title="VPN intermitente · DC-SP" sla="SLA 02:14" status="Em andamento" pri="hi" />
            <Ticket id="REQ-9133" title="Acesso a CRM · Onboarding" sla="SLA 06:00" status="Aguardando" pri="warn" />
            <Ticket id="CHG-2207" title="Patch crítico · Cluster prod" sla="SLA 24:00" status="Aprovado" pri="ok" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Kpi({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div
      className={[
        "flex flex-col gap-1 rounded-lg border border-border bg-bg px-2.5 py-2.5",
        accent
          ? "shadow-[inset_0_0_0_1px_rgba(26,77,255,0.4),0_0_24px_rgba(26,77,255,0.15)]"
          : "",
      ].join(" ")}
    >
      <span className="font-mono text-[0.55rem] uppercase tracking-[0.18em] text-text-muted">
        {label}
      </span>
      <span className={["text-[1.15rem] font-extralight tracking-[-0.03em]", accent ? "text-accent-ice" : ""].join(" ")}>
        {value}
      </span>
    </div>
  );
}

function Ticket({
  id,
  title,
  sla,
  status,
  pri,
}: {
  id: string;
  title: string;
  sla: string;
  status: string;
  pri: "hi" | "warn" | "ok";
}) {
  const dotCls =
    pri === "hi"
      ? "bg-accent shadow-[0_0_8px_var(--color-accent-glow)]"
      : pri === "warn"
        ? "bg-warn shadow-[0_0_8px_rgba(240,161,66,0.4)]"
        : "bg-success shadow-[0_0_8px_rgba(52,199,124,0.3)]";

  return (
    <div className="
      grid grid-cols-[16px_1fr_auto_auto] items-center gap-2.5
      rounded-md border border-border bg-bg px-2.5 py-2 text-[0.7rem]
    ">
      <span className={`size-2.5 rounded-full ${dotCls}`} />
      <span>
        <span className="font-mono text-[0.6rem] tracking-[0.1em] text-text-muted">
          {id} ·{" "}
        </span>
        {title}
      </span>
      <span className="font-mono text-[0.6rem] tracking-[0.1em] text-text-muted">
        {sla}
      </span>
      <span className="
        rounded-full border border-border px-2 py-[2px]
        font-mono text-[0.55rem] uppercase tracking-[0.18em] text-text-muted
      ">
        {status}
      </span>
    </div>
  );
}
