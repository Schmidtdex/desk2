import ValueChain from "./ValueChain";

export default function About() {
  return (
    <section id="produto" aria-label="O que é ITSM na prática" className="relative px-6 py-20 md:py-32">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div className="reveal">
            <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-extralight leading-[1.05] tracking-tight">
              TI deixa de ser função<br />
              e vira <em className="not-italic text-accent-2">serviço estruturado</em>
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
              A ITIL®, mantida pela AXELOS e atualizada para 2026 com
              inteligência artificial aplicada, organiza essa disciplina em
              práticas. A Desk Manager é a{" "}
              <strong className="font-medium text-text">primeira plataforma brasileira</strong>{" "}
              a operar 12 dessas práticas de forma certificada e nativa em IA.
            </p>
          </div>

          <ValueChain />
        </div>
      </div>
    </section>
  );
}
