import { DIFFERENTIATORS } from "@/esm/lib/data";

export default function WhyDesk() {
  return (
    <section
      id="por-que"
      aria-label="Por que Desk Manager para ESM"
      className="relative px-6 py-20 md:py-32"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
          <div className="reveal lg:self-center">
            <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-extralight leading-[1.05] tracking-tight">
              ESM como{" "}
              <em className="not-italic text-accent-2">plataforma</em>,<br />
              não como suíte
            </h2>

            <p className="mt-7 max-w-[520px] text-[1.05rem] leading-relaxed text-text-muted">
              A indústria vende ESM como pacote de módulos. Cada área recebe um
              produto separado, com integrações por fora e licença por
              departamento. A Desk Manager entrega ESM como{" "}
              <strong className="font-medium text-text">um motor único</strong>
              : mesmo catálogo, mesmo workflow, mesmo audit trail.
            </p>

            <p className="mt-6 max-w-[520px] text-[1.05rem] leading-relaxed text-text-muted">
              A operação inteira da empresa cabe numa plataforma de IA nativa.{" "}
              <strong className="font-medium text-text">
                Não é integração. É desenho.
              </strong>
            </p>
          </div>

          <ul className="flex flex-col">
            {DIFFERENTIATORS.map((it, i) => (
              <li
                key={it.title}
                className={[
                  "reveal why-item relative border-t border-border py-7",
                  i === DIFFERENTIATORS.length - 1 ? "border-b" : "",
                  it.featured ? "why-featured" : "",
                ].join(" ")}
                style={{ "--delay": `${120 + i * 60}ms` } as React.CSSProperties}
              >
                <h4
                  className={[
                    "flex items-center gap-3 tracking-[-0.015em]",
                    it.featured
                      ? "text-[1.25rem] font-medium text-text"
                      : "text-[1.15rem] font-normal text-text",
                  ].join(" ")}
                >
                  <span
                    aria-hidden="true"
                    className={[
                      "block shrink-0",
                      it.featured
                        ? "h-[3px] w-[28px] rounded-full bg-accent shadow-[0_0_12px_var(--color-accent-glow)]"
                        : "h-px w-[18px] bg-accent",
                    ].join(" ")}
                  />
                  {it.title}
                </h4>
                <p className="mt-2 pl-[calc(18px+0.75rem)] text-[0.92rem] leading-relaxed text-text-muted">
                  {it.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
