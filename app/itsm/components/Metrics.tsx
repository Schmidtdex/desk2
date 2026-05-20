import { HERO_METRICS } from "@/itsm/lib/data";

export default function Metrics() {
  return (
    <section
      aria-label="Resultados"
      className="
        border-y border-border px-6 py-14
        bg-[radial-gradient(ellipse_50%_100%_at_50%_50%,rgba(26,77,255,0.08),transparent_70%)]
      "
    >
      <div className="mx-auto max-w-[1280px]">
        <p className="mb-8 font-mono text-[0.65rem] uppercase tracking-[0.28em] text-text-muted">
          Escala em produção
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4">
          {HERO_METRICS.map((m, i) => (
            <div
              key={i}
              className={[
                "reveal px-6 py-6",
                "border-border",
                i !== HERO_METRICS.length - 1 ? "md:border-r" : "",
                i % 2 === 0 ? "border-r" : "",
                i < 2 ? "border-b md:border-b-0" : "",
              ].join(" ")}
              style={{ "--delay": `${i * 80}ms` } as React.CSSProperties}
            >
              <div className="text-[clamp(2.5rem,5vw,3.75rem)] font-extralight leading-none tracking-[-0.04em]">
                {m.value}
              </div>
              <div className="
                mt-3 max-w-[220px] font-mono text-[0.7rem]
                uppercase leading-relaxed tracking-[0.18em] text-text-muted
              ">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
