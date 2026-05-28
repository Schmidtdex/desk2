export default function About() {
  return (
    <section
      id="produto"
      aria-label="ITSM como disciplina"
      className="relative px-6 pt-2 pb-24 md:pt-6 md:pb-32"
    >
      <div className="mx-auto w-full max-w-[1280px]">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-12">
          <div className="reveal">
            <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-extralight leading-[1.05] tracking-tight">
              TI deixa de ser função<br />
              e vira <em className="not-italic text-accent-2">serviço estruturado</em>
            </h2>
          </div>

          <div
            className="reveal lg:pt-3"
            style={{ "--delay": "120ms" } as React.CSSProperties}
          >
            <p className="max-w-[58ch] text-[1.05rem] leading-relaxed text-text-muted">
              IT Service Management é a disciplina de desenhar, entregar, operar
              e melhorar os serviços que sustentam o negócio. Mais que abrir e
              fechar chamado, ITSM transforma TI em{" "}
              <strong className="font-medium text-text">serviço estruturado</strong>{" "}
              — com fluxos definidos, papéis claros, indicadores monitorados e
              melhoria contínua.
            </p>
            <p className="mt-5 max-w-[58ch] text-[1.05rem] leading-relaxed text-text-muted">
              A ITIL®, atualizada para 2026 com inteligência artificial aplicada,
              organiza essa disciplina em práticas. A Desk Manager é a{" "}
              <strong className="font-medium text-text">primeira plataforma brasileira</strong>{" "}
              a operar 12 dessas práticas de forma certificada e nativa em IA.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
