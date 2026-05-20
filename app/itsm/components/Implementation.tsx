import Section from "./Section";
import { STEPS } from "@/itsm/lib/data";

export default function Implementation() {
  return (
    <Section
      id="implementacao"
      kicker="Como implementar"
      title={
        <>
          Quatro etapas pra estruturar<br />
          a maturidade de ITSM.
        </>
      }
      lead="A implementação não é projeto de TI, é jornada de maturidade. A Desk Manager acompanha sua operação em cada fase, do diagnóstico ao ITSM totalmente automatizado."
    >
      <div className="
        reveal grid grid-cols-1 gap-px overflow-hidden rounded-3xl
        border border-border bg-border md:grid-cols-2 xl:grid-cols-4
      ">
        {STEPS.map((s) => (
          <article
            key={s.num}
            className="
              relative flex min-h-[320px] flex-col bg-bg
              px-7 pt-8 pb-10 transition-colors duration-300 hover:bg-surface
            "
          >
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-text-muted">
              {s.phase}
            </span>
            <div className="relative mt-4 text-[3.5rem] font-extralight leading-none tracking-[-0.05em]">
              {s.num}
              <span
                aria-hidden="true"
                className="mt-3.5 block h-[2px] w-6 bg-accent shadow-[0_0_8px_var(--color-accent)]"
              />
            </div>
            <h3 className="mt-5 text-[1.35rem] tracking-[-0.02em]">{s.title}</h3>
            <p className="mt-4 text-[0.88rem] leading-relaxed text-text-muted">
              {s.body}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}
