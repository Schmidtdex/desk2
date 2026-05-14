export type Product = {
  key: "esm" | "itsm" | "bpm" | "maestro" | "agent";
  title: string;
  desc: string;
  size: "lg" | "md";
};

export const PRODUCTS: Product[] = [
  { key: "agent", title: "AI Agent", desc: "Agentes autônomos que decidem e executam tarefas pela operação.", size: "lg" },
  { key: "esm", title: "ESM", desc: "Orquestração da empresa além da TI: RH, Financeiro, Jurídico e outros.", size: "md" },
  { key: "itsm", title: "ITSM", desc: "Gestão de serviços de TI com aderência ao ITIL®, agora IA-native.", size: "md" },
  { key: "bpm", title: "BPM", desc: "Gestão e automação de processos de negócio com visão executiva.", size: "md" },
  { key: "maestro", title: "Maestro", desc: "Plataforma iPaaS para integração low-code de todo o ecossistema.", size: "md" },
];
