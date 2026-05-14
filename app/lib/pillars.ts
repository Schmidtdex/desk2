export type Pillar = { key: string; title: string; sub: string; tone: "blue" | "dark" | "accent" };

export const PILLARS: Pillar[] = [
  { key: "services", title: "Serviços", sub: "Atender uma necessidade ou desejo.", tone: "blue" },
  { key: "processes", title: "Processos", sub: "Garantir que o trabalho seja feito corretamente.", tone: "dark" },
  { key: "platform", title: "Plataforma de IA", sub: "Para serviços e processos.", tone: "accent" },
];
