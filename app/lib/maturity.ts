export type Stage = { key: string; title: string; sub: string };

export const MATURITY: Stage[] = [
  { key: "digital", title: "Digitalização Básica", sub: "Papel para tela." },
  { key: "governance", title: "Governança e Workflows", sub: "Processos estruturados com execução humana." },
  { key: "assisted", title: "Automação Assistida", sub: "IA como copiloto." },
  { key: "autonomous-flow", title: "Automação Autônoma", sub: "Sistemas integrados orquestrando IA." },
  { key: "autonomous-ops", title: "Operações Autônomas", sub: "Agentes inteligentes executando, orquestrando IA." },
  { key: "ai-native", title: "AI-Native", sub: "Arquitetura orientada à IA." },
];
