export interface LabelPart {
  text: string;
  bold?: boolean;
}

export interface Metric {
  value: string;
  labelParts: LabelPart[];
}

export interface HeadingPart {
  text: string;
  accent?: boolean;
}

export interface Tag {
  label: string;
  tone: "primary" | "ink" | "ghost";
}

export interface CaseData {
  id: string;
  index: string;
  company: string;
  sector: string;
  region: string;
  headingParts: HeadingPart[];
  lead: string;
  metrics: [Metric, Metric, Metric];
  tags: [Tag, Tag, Tag];
  photo: string;
}

export const DISPLAY = "var(--font-display,system-ui,sans-serif)";
export const MONO = 'var(--font-code,"JetBrains Mono",monospace)';
export const SERIF = "'Instrument Serif',Georgia,serif";
export const SLOT_VH = 1;

export const BLUE    = "#1f3dff";
export const BLUE_2  = "#4b62ff";
export const INK     = "#0a0e2c";
export const INK_2   = "#3b3f55";
export const HAIR    = "#e4e0d2";
export const HAIR_2  = "#efece0";
export const BG_FRAME = "#f6f4ee";
export const BG_CARD  = "#fbfaf4";

export const CASES: CaseData[] = [
  {
    id: "eurofarma",
    index: "01",
    company: "Eurofarma",
    sector: "Farmacêutica",
    region: "LATAM",
    headingParts: [
      { text: "Otimizando a " },
      { text: "eficiência", accent: true },
      { text: " operacional em escala global." },
    ],
    lead: "A Desk Manager foi implementada na Eurofarma para estruturar a governança de serviços, transformando o suporte interno em uma operação de alta performance em 14 países.",
    metrics: [
      {
        value: "+90",
        labelParts: [
          { text: "departamentos", bold: true },
          { text: " de negócios atendidos globalmente." },
        ],
      },
      {
        value: "+24",
        labelParts: [
          { text: "países", bold: true },
          { text: " utilizam ativamente nossa plataforma ESM." },
        ],
      },
      {
        value: "+13K",
        labelParts: [
          { text: "colaboradores apoiados em " },
          { text: "tickets diários", bold: true },
          { text: "." },
        ],
      },
    ],
    tags: [
      { label: "14 países", tone: "primary" },
      { label: "Farmacêutica", tone: "ink" },
      { label: "ITSM + ESM", tone: "ghost" },
    ],
    photo: "/eurofarma.jpg",
  },
  {
    id: "convergint",
    index: "02",
    company: "Convergint",
    sector: "Seg. Eletrônica",
    region: "Global",
    headingParts: [
      { text: "Operação " },
      { text: "global", accent: true },
      { text: " sem fronteiras" },
    ],
    lead: "A Convergint unificou 270 filiais em 150+ países numa plataforma única com SLA por fuso horário, idioma e especialidade, sem perder velocidade.",
    metrics: [
      {
        value: "+150",
        labelParts: [
          { text: "países", bold: true },
          { text: " atendidos em operação 24/7." },
        ],
      },
      {
        value: "Real time",
        labelParts: [
          { text: "gestão com " },
          { text: "dados em tempo real", bold: true },
          { text: "." },
        ],
      },
      {
        value: "+13K",
        labelParts: [
          { text: "colaboradores apoiados em " },
          { text: "tickets diários", bold: true },
          { text: "." },
        ],
      },
    ],
    tags: [
      { label: "150+ países", tone: "primary" },
      { label: "23 idiomas", tone: "ink" },
      { label: "Operação global", tone: "ghost" },
    ],
    photo: "/convergint.png",
  },
  {
    id: "petz",
    index: "03",
    company: "Petz Cobasi",
    sector: "Varejo",
    region: "Brasil",
    headingParts: [
      { text: "Zero " },
      { text: "backlog", accent: true },
      { text: " em 400 lojas" },
    ],
    lead: "A automação de triagem da Petz Cobasi eliminou o backlog de chamados e reduziu o tempo de atendimento em 99%, devolvendo horas às equipes de cada loja.",
    metrics: [
      {
        value: "99%",
        labelParts: [
          { text: "mais rápido no " },
          { text: "primeiro contato", bold: true },
          { text: " com o suporte." },
        ],
      },
      {
        value: "94%",
        labelParts: [
          { text: "mais agilidade no " },
          { text: "diagnóstico técnico", bold: true },
          { text: " de problemas." },
        ],
      },
      {
        value: "100%",
        labelParts: [
          { text: "eliminação de " },
          { text: "fluxos informais", bold: true },
          { text: " para chamados." },
        ],
      },
    ],
    tags: [
      { label: "400+ lojas", tone: "primary" },
      { label: "Varejo Pet", tone: "ink" },
      { label: "Triagem automatizada", tone: "ghost" },
    ],
    photo: "/cobasi.png",
  },
  {
    id: "byd",
    index: "04",
    company: "BYD",
    sector: "Mobilidade Elétrica",
    region: "Brasil",
    headingParts: [
      { text: "Aprovação em " },
      { text: "horas", accent: true },
      { text: ", não semanas" },
    ],
    lead: "A BYD Brasil encurtou o ciclo de aprovação de processos de 15 dias úteis para 2-4 horas, eliminando completamente o uso de e-mail e planilha na operação.",
    metrics: [
      {
        value: "2-4h",
        labelParts: [
          { text: "tempo de " },
          { text: "primeira resposta", bold: true },
          { text: " (era 15 dias)." },
        ],
      },
      {
        value: "24-48h",
        labelParts: [
          { text: "análise técnica " },
          { text: "reduzida", bold: true },
          { text: " (era 30 dias)." },
        ],
      },
      {
        value: "48-72h",
        labelParts: [
          { text: "ciclo completo " },
          { text: "do chamado", bold: true },
          { text: "." },
        ],
      },
    ],
    tags: [
      { label: "BYD Brasil", tone: "primary" },
      { label: "Mobilidade Elétrica", tone: "ink" },
      { label: "Zero planilha", tone: "ghost" },
    ],
    photo: "/byd-energia.png",
  },
];
