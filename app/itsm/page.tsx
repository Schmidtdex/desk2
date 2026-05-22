import type { Metadata } from "next";
import Reveal from "@/components/fx/Reveal";
import { FooterFull } from "@/components/layout/FooterFull";

import Hero from "./components/Hero";
import Metrics from "./components/Metrics";
import Personas from "./components/Personas";
import About from "./components/About";
import AnchorSection from "./components/AnchorSection";
import Implementation from "./components/Implementation";
import WhyDesk from "./components/WhyDesk";
import Faq from "./components/Faq";

import { PAGE_CONFIG } from "./lib/data";

export const metadata: Metadata = {
  title: "ITSM — Desk Manager",
  description:
    "ITSM estratégico, certificado pela ITIL® com IA nativa. A operação de TI deixa de ser reativa e passa a ser orientada por dados, governança estruturada e inteligência contínua.",
};

export default function ITSMPage() {
  return (
    <>
      <Reveal />
      <main>
        <Hero />
        <Metrics />
        <Personas />
        <About />
        <AnchorSection />
        <Implementation />
        {PAGE_CONFIG.showWhy && <WhyDesk />}
        <Faq />
      </main>
      <FooterFull />
    </>
  );
}
