import DepartmentList from "./DepartmentList";

/**
 * "What is ESM" section. Same template anatomy as ITSM's About,
 * but the right-side artifact lists corporate domains (RH, Jurídico,
 * Financeiro, Facilities, Marketing, TI) instead of ITIL stages.
 * The narrative explicitly contrasts ESM against ITSM.
 */
export default function About() {
  return (
    <section
      id="produto"
      aria-label="O que é ESM na prática"
      className="relative px-6 py-20 md:py-32"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div className="reveal lg:self-center">
            <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-extralight leading-[1.05] tracking-tight">
              ITSM organiza uma área<br />
              ESM <em className="not-italic text-accent-2">orquestra a empresa</em>
            </h2>

            <p className="mt-5 text-[1.05rem] leading-relaxed text-text-muted">
              Enterprise Service Management aplica o mesmo desenho do ITSM
              (catálogo, fluxo, SLA, audit trail) a qualquer área da empresa.
              RH, Jurídico, Financeiro, Facilities e Marketing herdam o
              framework que a TI já opera, sem reinventar plataforma para cada
              departamento.
            </p>

            <p className="mt-5 text-[1.05rem] leading-relaxed text-text-muted">
              O resultado é uma plataforma única para a operação inteira da
              companhia. Onboarding deixa de morar em e-mail, contrato deixa
              de morar em planilha, manutenção deixa de morar em papel.{" "}
              <strong className="font-medium text-text">
                Um motor, uma porta de entrada, uma trilha de auditoria.
              </strong>
            </p>
          </div>

          <DepartmentList />
        </div>
      </div>
    </section>
  );
}
