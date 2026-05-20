import {
  Bot,
  Layers,
  Server,
  GitBranch,
  Wand2,
  Users,
  Megaphone,
  Scale,
  DollarSign,
  Building2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type MegaMenuItem = {
  label: string;
  description?: string;
  href: string;
  icon?: LucideIcon;
  // Para usar imagem ao invés do ícone: defina `image: "/menu/seu-arquivo.png"`
  // (coloque o arquivo em desk2/public/menu/). Recomendado 80x80 ou maior, formato quadrado.
  image?: string;
};

export type MegaMenuColumn = {
  title?: string;
  description?: string;
  items: MegaMenuItem[];
};

export type ClientCase = {
  title: string;
  description: string;
  // Caminho da imagem do case. Coloque em desk2/public/cases/.
  // Se ficar string vazia "" um placeholder em gradiente aparece no lugar.
  // Aspecto recomendado 16:10 (ex. 640x400). O componente faz crop center automático.
  image: string;
  // Link de destino. Pode ser interno (#scene-cases, /cases/eurofarma) ou externo (https://...).
  href: string;
};

export type MenuKey = "plataforma" | "departamentos" | "clientes";

// ─── PLATAFORMA ────────────────────────────────────────────────────────────────
// 5 produtos. Cada item suporta `icon` (default, lucide-react) ou `image` (custom).
// Para trocar por imagem: substitua `icon: Bot` por `image: "/menu/ai-agent.png"`.

export const PLATFORM: { columns: MegaMenuColumn[] } = {
  columns: [
    {
      title: "Produtos",
      description: "Cinco superfícies, uma plataforma.",
      items: [
        { label: "AI Agent", description: "Agentes autônomos que executam tarefas pela operação.", href: "#scene-products", icon: Bot },
        { label: "ESM",      description: "Enterprise Service Management — empresa toda.",        href: "#scene-products", icon: Layers },
        { label: "ITSM",     description: "IT Service Management ITIL-native.",                    href: "#scene-products", icon: Server },
        { label: "BPM",      description: "Business Process Management com visão executiva.",      href: "#scene-products", icon: GitBranch },
        { label: "Maestro",  description: "iPaaS low-code para integrar todo o ecossistema.",      href: "#scene-products", icon: Wand2 },
      ],
    },
  ],
};

// ─── DEPARTAMENTOS ─────────────────────────────────────────────────────────────
// 6 áreas, agrupadas em 3 colunas temáticas para evitar lista monótona.

export const DEPARTMENTS: { columns: MegaMenuColumn[] } = {
  columns: [
    {
      title: "Operações",
      items: [
        { label: "IT",         description: "Suporte, ativos e infraestrutura.", href: "#",  icon: Server },
        { label: "Facilities", description: "Manutenção predial e gestão de espaços.", href: "#",  icon: Building2 },
      ],
    },
    {
      title: "Pessoas",
      items: [
        { label: "RH",         description: "Onboarding, chamados internos, jornada do colaborador.", href: "#", icon: Users },
        { label: "Marketing",  description: "Demandas, briefings e workflows criativos.",             href: "#", icon: Megaphone },
      ],
    },
    {
      title: "Governança",
      items: [
        { label: "Jurídico",   description: "Contratos, NDAs e fluxos de compliance.",   href: "#", icon: Scale },
        { label: "Financeiro", description: "Aprovações, centros de custo e auditoria.", href: "#", icon: DollarSign },
      ],
    },
  ],
};

// ─── CLIENTES ──────────────────────────────────────────────────────────────────
// COMO ADICIONAR UM CASE:
//   1. Coloque a imagem em: desk2/public/cases/<nome>.jpg (ou .png/.webp)
//      Aspecto 16:10 (ex. 640x400). O componente faz crop center automático.
//   2. No `href`, escolha:
//        • Link interno → "#scene-cases" (rola até a seção de cases na home)
//        • Página dedicada → "/cases/eurofarma"
//        • Link externo → "https://..."
//   3. Adicione/edite um objeto no array `cases` abaixo.
//   4. Se você ainda não tem a imagem, deixe `image: ""` — um placeholder em
//      gradiente aparece no lugar até você dropar o arquivo.

export const CLIENTS: { cases: ClientCase[] } = {
  cases: [
    {
      title: "Eurofarma",
      description: "Como a Eurofarma centralizou 12 mil chamados/mês em uma plataforma única.",
      image: "",                  // ← troque por "/cases/eurofarma.jpg" quando tiver a imagem
      href: "#scene-cases",       // ← troque pelo link real do case
    },
    {
      title: "Convergint",
      description: "+40% de produtividade no service desk global.",
      image: "",
      href: "#scene-cases",
    },
    {
      title: "BYD",
      description: "Onboarding de fábrica em uma plataforma única.",
      image: "",
      href: "#scene-cases",
    },
    {
      title: "Petz Cobasi",
      description: "Atendimento omnichannel para mais de 600 lojas.",
      image: "",
      href: "#scene-cases",
    },
  ],
};
