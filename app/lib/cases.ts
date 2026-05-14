export type CaseKpi = { value: string; label: string };
export type Case = {
  slug: string;
  brand: string;
  headline: string;
  quote: string;
  kpis: [CaseKpi, CaseKpi, CaseKpi];
  hue: number;
};

export const CASES: Case[] = [
  {
    slug: "eurofarma",
    brand: "Eurofarma",
    headline: "Otimizando a eficiência operacional global.",
    quote: "Governança de serviços virou operação de alta performance.",
    kpis: [
      { value: "+90", label: "departamentos de negócios no mundo" },
      { value: "+24", label: "países usando nossa plataforma ESM" },
      { value: "+13K", label: "colaboradores" },
    ],
    hue: 220,
  },
  {
    slug: "convergint",
    brand: "Convergint",
    headline: "Empresa global, vários idiomas, um só sistema nervoso.",
    quote: "Gestão por feeling deu lugar a indicadores em tempo real.",
    kpis: [
      { value: "+150", label: "países de operação" },
      { value: "Real time", label: "dados e indicadores ao vivo" },
      { value: "+13K", label: "colaboradores" },
    ],
    hue: 190,
  },
  {
    slug: "byd",
    brand: "BYD",
    headline: "Centralização e governança do suporte.",
    quote: "Ciclos que duravam meses agora fecham em dias.",
    kpis: [
      { value: "2-4h", label: "primeira resposta (era 15 dias)" },
      { value: "24-48h", label: "análise técnica (era 30 dias)" },
      { value: "48-72h", label: "ciclo completo (era 2 meses)" },
    ],
    hue: 145,
  },
  {
    slug: "petz-cobasi",
    brand: "Grupo Petz Cobasi",
    headline: "Orquestração e governança operacional.",
    quote: "TI, Manutenção, RH e +30 áreas em uma única plataforma de ESM.",
    kpis: [
      { value: "99%", label: "mais rápido no primeiro contato" },
      { value: "94%", label: "mais ágil no diagnóstico técnico" },
      { value: "100%", label: "eliminação de fluxos informais" },
    ],
    hue: 280,
  },
];
