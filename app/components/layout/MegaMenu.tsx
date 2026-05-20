"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import {
  PLATFORM,
  DEPARTMENTS,
  CLIENTS,
  type MegaMenuColumn,
} from "./megaMenuData";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";

// Full-width panels — chrome (border, bg, shadow, radius) lives on NavigationMenuViewport.
// Each panel uses w-full so it stretches to the nav's animated width (1280 / 960).

const COLUMN_TITLE =
  "font-mono text-[10px] uppercase tracking-[0.3em] text-text-muted/70";

const PANEL_PADDING = "px-10 py-10";

const ITEM_LINK =
  "group flex items-start gap-4 rounded-xl p-4 transition-colors hover:bg-white/[0.04]";

const ITEM_ICON_BOX =
  "flex size-11 shrink-0 items-center justify-center rounded-lg border border-white/[0.06] bg-surface/60 text-accent-2 transition-colors group-hover:border-accent/40 group-hover:bg-accent/10 group-hover:text-accent";

const ITEM_TITLE =
  "text-[15px] font-medium text-text transition-colors group-hover:text-white";

const ITEM_DESC = "mt-1 text-xs leading-relaxed text-text-muted";

const INTRO_TITLE =
  "mt-5 text-[1.75rem] font-extralight leading-[1.1] tracking-tight text-text";

const INTRO_DESC = "mt-4 max-w-[28ch] text-[15px] leading-relaxed text-text-muted";

const INTRO_LINK =
  "mt-7 inline-flex items-center gap-1.5 text-sm font-medium text-accent-2 transition-colors hover:text-accent";

// ─── Panels ────────────────────────────────────────────────────────────────────

export function PlatformPanel() {
  const items = PLATFORM.columns[0].items;
  return (
    <div className={`w-full ${PANEL_PADDING}`}>
      <div className="grid grid-cols-12 gap-8">
        {/* Intro */}
        <div className="col-span-3">
          <p className={COLUMN_TITLE}>Plataforma</p>
          <h3 className={INTRO_TITLE}>
            Cinco superfícies, uma plataforma.
          </h3>
          <p className={INTRO_DESC}>
            ITSM, ESM, BPM, iPaaS e agentes de IA em uma só camada.
          </p>
          <NavigationMenuLink asChild>
            <Link
              href="#scene-pillars"
              className={INTRO_LINK}
            >
              Ver toda a plataforma
              <ArrowRight size={14} strokeWidth={2} />
            </Link>
          </NavigationMenuLink>
        </div>

        {/* Items — 2 columns × variable rows */}
        <ul className="col-span-6 grid grid-cols-2 gap-1 self-start">
          {items.map((item) => (
            <ItemEntry key={item.label} item={item} iconSize={18} />
          ))}
        </ul>

        {/* Featured promo */}
        <div className="col-span-3">
          <FeaturedCard
            kicker="Demo"
            title="Veja a plataforma em ação"
            description="Sessão guiada de 30 minutos com um especialista de produto."
            ctaLabel="Agendar demo"
            ctaHref="#scene-cta"
          />
        </div>
      </div>
    </div>
  );
}

export function DepartmentsPanel() {
  return (
    <div className={`w-full ${PANEL_PADDING}`}>
      <div className="grid grid-cols-12 gap-8">
        {/* Intro */}
        <div className="col-span-3">
          <p className={COLUMN_TITLE}>Departamentos</p>
          <h3 className={INTRO_TITLE}>
            Cada área no seu ritmo, na mesma camada.
          </h3>
          <p className={INTRO_DESC}>
            Operação, pessoas e governança orquestrados num lugar só.
          </p>
        </div>

        {/* 3 category columns of items */}
        <div className="col-span-9 grid grid-cols-3 gap-x-6 gap-y-2">
          {DEPARTMENTS.columns.map((col) => (
            <div key={col.title}>
              <p className={`${COLUMN_TITLE} mb-3`}>{col.title}</p>
              <ul className="grid grid-cols-1 gap-1">
                {col.items.map((item) => (
                  <ItemEntry key={item.label} item={item} iconSize={14} compact />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ClientsPanel() {
  return (
    <div className={`w-full ${PANEL_PADDING}`}>
      <div className="grid grid-cols-12 gap-8">
        {/* Intro */}
        <div className="col-span-3">
          <p className={COLUMN_TITLE}>Clientes</p>
          <h3 className={INTRO_TITLE}>
            +600 clientes orquestrados.
          </h3>
          <p className={INTRO_DESC}>
            Em +40 países. Da Eurofarma à Petz, manufatura a saúde, varejo a serviços.
          </p>
          <NavigationMenuLink asChild>
            <Link
              href="#scene-cases"
              className={INTRO_LINK}
            >
              Ver todos os cases
              <ArrowRight size={14} strokeWidth={2} />
            </Link>
          </NavigationMenuLink>
        </div>

        {/* Case cards — stretch vertically to fill the intro's height */}
        <div className="col-span-9 grid h-full grid-cols-4 gap-3">
          {CLIENTS.cases.map((c) => (
            <NavigationMenuLink key={c.title} asChild>
              <Link
                href={c.href}
                className="group flex h-full flex-col overflow-hidden rounded-xl border border-white/[0.06] bg-surface/40 transition-all hover:border-accent/40 hover:bg-surface/80"
              >
                <div className="relative min-h-[140px] flex-1 overflow-hidden bg-surface-2">
                  {c.image ? (
                    <Image
                      src={c.image}
                      alt={c.title}
                      fill
                      sizes="240px"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  ) : (
                    <CasePlaceholder title={c.title} />
                  )}
                </div>
                <div className="p-3">
                  <p className={ITEM_TITLE}>{c.title}</p>
                  <p className="mt-1 line-clamp-2 text-xs leading-snug text-text-muted">
                    {c.description}
                  </p>
                </div>
              </Link>
            </NavigationMenuLink>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Building blocks ──────────────────────────────────────────────────────────

function ItemEntry({
  item,
  iconSize,
  compact = false,
}: {
  item: MegaMenuColumn["items"][number];
  iconSize: number;
  compact?: boolean;
}) {
  const Icon = item.icon;
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link href={item.href} className={ITEM_LINK}>
          <div className={compact ? `${ITEM_ICON_BOX} !size-8 !rounded-md` : ITEM_ICON_BOX}>
            {item.image ? (
              <Image
                src={item.image}
                alt={item.label}
                width={iconSize + 12}
                height={iconSize + 12}
                className="rounded"
              />
            ) : Icon ? (
              <Icon size={iconSize} strokeWidth={1.5} />
            ) : null}
          </div>
          <div className="min-w-0">
            <p className={ITEM_TITLE}>{item.label}</p>
            {item.description && <p className={ITEM_DESC}>{item.description}</p>}
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

function FeaturedCard({
  kicker,
  title,
  description,
  ctaLabel,
  ctaHref,
}: {
  kicker: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
}) {
  return (
    <NavigationMenuLink asChild>
      <Link
        href={ctaHref}
        className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-white/[0.06] bg-gradient-to-br from-surface to-surface-2 p-5 transition-all hover:border-accent/40"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(26,77,255,0.22),transparent_60%)] opacity-80 transition-opacity group-hover:opacity-100" />
        <div className="relative flex h-full flex-col">
          <p className={COLUMN_TITLE}>{kicker}</p>
          <h4 className="mt-3 text-base font-medium leading-tight text-text">{title}</h4>
          <p className="mt-2 text-xs leading-relaxed text-text-muted">{description}</p>
          <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-medium text-accent-2 transition-colors group-hover:text-accent">
            {ctaLabel}
            <ArrowRight size={14} strokeWidth={2} className="transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </Link>
    </NavigationMenuLink>
  );
}

function CasePlaceholder({ title }: { title: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-surface to-surface-2">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(26,77,255,0.25),transparent_60%)]" />
      <p className="relative font-mono text-[10px] uppercase tracking-[0.3em] text-text-muted/60">
        {title}
      </p>
    </div>
  );
}
