import Section from "./Section";
import StepsGrid from "./StepsGrid";

export default function Implementation() {
  return (
    <Section
      id="implementacao"
      className="band-soft"
      title={
        <>
          ESM em <em className="not-italic text-accent-2">quatro fases</em>,<br />
          não em programa de transformação
        </>
      }
      lead="A adoção é por departamento, não por big-bang. Cada área entra com seu catálogo e seus fluxos. A plataforma cresce em vez de explodir."
    >
      <StepsGrid />
    </Section>
  );
}
