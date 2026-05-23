import type { Metadata } from "next";
import Reveal from "@/components/fx/Reveal";
import { FooterFull } from "@/components/layout/FooterFull";

import Hero from "./components/Hero";
import Metrics from "./components/Metrics";
import Stakeholders from "./components/Stakeholders";
import About from "./components/About";
import DomainsGrid from "./components/DomainsGrid";
import Implementation from "./components/Implementation";
import WhyDesk from "./components/WhyDesk";
import Faq from "./components/Faq";

import { PAGE_CONFIG } from "./lib/data";

export const metadata: Metadata = {
  title: "ESM · Desk Manager",
  description:
    "Enterprise Service Management para a empresa inteira. RH, Jurídico, Financeiro, Facilities e TI no mesmo motor: catálogo único, audit trail unificado e IA nativa. Plataforma de orquestração corporativa da Desk Manager.",
};

export default function ESMPage() {
  return (
    <>
      <Reveal />
      <main>
        <Hero />
        <Metrics />
        <Stakeholders />
        <About />
        <DomainsGrid />
        <Implementation />
        {PAGE_CONFIG.showWhy && <WhyDesk />}
        <Faq />
      </main>
      <FooterFull />
    </>
  );
}
