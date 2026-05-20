import { VALUE_CHAIN, PAGE_CONFIG } from "@/itsm/lib/data";

export default function About() {
  return (
    <section id="produto" className="relative px-6 py-20 md:py-32">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div className="reveal">
            <span className="kicker">O que é {PAGE_CONFIG.productLabel}, na prática</span>
            <h2 className="mt-4 text-[clamp(2rem,4vw,3.25rem)] font-extralight leading-[1.05] tracking-tight">
              TI deixa de ser função<br />
              e vira <em className="not-italic text-accent-2">serviço estruturado</em>.
            </h2>

            <p className="mt-5 text-[1.05rem] leading-relaxed text-text-muted">
              IT Service Management é como a área de TI projeta, entrega, opera
              e melhora os serviços que sustentam o negócio. Mais do que abrir
              e fechar chamado, ITSM é a disciplina que transforma TI em{" "}
              <strong className="font-medium text-text">serviço estruturado</strong>,
              com fluxos definidos, papéis claros, indicadores monitorados e
              melhoria contínua.
            </p>
            <p className="mt-5 text-[1.05rem] leading-relaxed text-text-muted">
              A ITIL 5, mantida pela AXELOS e atualizada para 2026 com
              inteligência artificial aplicada, organiza essa disciplina em
              práticas. A Desk Manager é a{" "}
              <strong className="font-medium text-text">primeira plataforma brasileira</strong>{" "}
              a operar 12 dessas práticas de forma certificada e nativa em IA.
            </p>
          </div>

          <div
            className="reveal flex min-h-[380px] flex-col gap-3 rounded-3xl border border-border bg-surface p-8"
            style={{ "--delay": "120ms" } as React.CSSProperties}
          >
            <span className="kicker">Cadeia de valor do serviço</span>
            {VALUE_CHAIN.map((it) => (
              <div
                key={it.i}
                className="
                  flex items-center gap-3 rounded-2xl border border-border
                  bg-bg/60 px-4 py-3.5
                "
              >
                <div className="
                  flex size-8 items-center justify-center rounded-lg
                  border border-[rgba(26,77,255,0.25)] bg-[rgba(26,77,255,0.08)]
                  font-mono text-[0.7rem] font-medium tracking-wide text-accent-2
                ">
                  {it.letter}
                </div>
                <div>
                  <div className="text-[0.95rem] font-medium">{it.i}</div>
                  <div className="mt-[2px] font-mono text-[0.75rem] tracking-wider text-text-muted">
                    {it.desc}
                  </div>
                </div>
                <div className="
                  ml-auto font-mono text-[0.7rem] uppercase
                  tracking-[0.18em] text-text-muted
                ">
                  {PAGE_CONFIG.productLabel}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
