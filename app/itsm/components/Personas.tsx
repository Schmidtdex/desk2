import Section from "./Section";
import { PERSONAS } from "@/itsm/lib/data";

export default function Personas() {
  return (
    <Section
      id="personas"
      centered
      className="band-soft"
      title={
        <>
          A operação moderna de TI<br />
          não cabe mais em <em className="not-italic text-accent-2">planilha</em>
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
              transition-[background,border-color,box-shadow] duration-200 ease-out
              hover:border-accent-2/40
              hover:shadow-[0_0_0_1px_rgba(59,130,246,0.18)]
            "
            style={{ "--delay": `${i * 80}ms` } as React.CSSProperties}
          >
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
