import { WHY } from "@/itsm/lib/data";

export default function WhyDesk() {
  return (
    <section id="por-que" aria-label="Por que Desk Manager" className="relative px-6 py-20 md:py-32">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
          <div className="reveal lg:self-center">
            <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-extralight leading-[1.05] tracking-tight">
              ITSM como{" "}
              <em className="not-italic text-accent-2">camada</em>,<br />
              não como módulo
            </h2>
            <p className="mt-7 max-w-[520px] text-[1.05rem] leading-relaxed text-text-muted">
              Plataformas tradicionais oferecem ITSM como módulo. A Desk
              Manager entrega ITSM como{" "}
              <strong className="font-medium text-text">camada</strong> de uma
              plataforma de orquestração mais ampla — onde o mesmo motor que
              cuida do chamado de TI cuida do onboarding do RH, da gestão
              contratual do jurídico e da manutenção do facilities.
            </p>
            <p className="mt-6 max-w-[520px] text-[1.05rem] leading-relaxed text-text-muted">
              Você não compra uma ferramenta de service desk e amarra
              integrações por fora.{" "}
              <strong className="font-medium text-text">
                Compra a operação inteira já conectada.
              </strong>
            </p>
          </div>

          <ul className="flex flex-col">
            {WHY.map((it, i) => (
              <li
                key={it.title}
                className={[
                  "reveal why-item border-t border-border py-7",
                  i === WHY.length - 1 ? "border-b" : "",
                ].join(" ")}
                style={{ "--delay": `${120 + i * 60}ms` } as React.CSSProperties}
              >
                <h4 className="flex items-center gap-3 text-[1.15rem] font-normal tracking-[-0.015em] text-text">
                  <span aria-hidden="true" className="block h-px w-[18px] shrink-0 bg-accent" />
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
