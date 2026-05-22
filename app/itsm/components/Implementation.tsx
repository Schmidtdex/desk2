import Section from "./Section";
import StepsGrid from "./StepsGrid";

export default function Implementation() {
  return (
    <Section
      id="implementacao"
      title={
        <>
          Maturidade de ITSM<br />
          em <em className="not-italic text-accent-2">quatro etapas</em>, não em projeto
        </>
      }
      lead="A implementação não é projeto de TI, é jornada de maturidade. A Desk Manager acompanha sua operação em cada fase, do diagnóstico ao ITSM totalmente automatizado."
    >
      <StepsGrid />
    </Section>
  );
}
