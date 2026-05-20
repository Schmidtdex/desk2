import Section from "./Section";
import { PERSONAS } from "@/itsm/lib/data";

export default function Personas() {
  return (
    <Section
      id="personas"
      kicker="Para quem é"
      title={
        <>
          A operação moderna de TI<br />
          não cabe mais em planilha.
        </>
      }
      lead="ITSM estruturado é o que separa quem responde a incidente de quem opera serviço com governança. Conheça os perfis que tiram o máximo da plataforma."
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {PERSONAS.map((p, i) => (
          <article
            key={p.role}
            className="
              reveal relative overflow-hidden rounded-2xl border border-border
              bg-surface p-7
              transition-[background,transform,border-color] duration-300
              hover:-translate-y-0.5 hover:border-[#2a3060] hover:bg-surface-2
            "
            style={{ "--delay": `${i * 80}ms` } as React.CSSProperties}
          >
            <div aria-hidden="true" className="mb-6 h-px w-6 bg-accent" />
            <span className="
              mb-2.5 block font-mono text-[0.65rem] uppercase
              tracking-[0.25em] text-text-muted
            ">
              {p.roleLabel}
            </span>
            <h3 className="text-[1.35rem] leading-tight tracking-[-0.02em]">
              {p.role}
            </h3>
            <p className="mt-4 text-[0.92rem] leading-relaxed text-text-muted">
              {p.body}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}
