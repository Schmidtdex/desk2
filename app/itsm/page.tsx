import type { Metadata } from "next";
import Reveal from "@/components/fx/Reveal";
import { FooterFull } from "@/components/layout/FooterFull";

import Hero from "./components/Hero";
import About from "./components/About";
import ItilSpotlight from "./components/ItilSpotlight";
import PracticesGrid from "./components/PracticesGrid";
import Personas from "./components/Personas";
import Capabilities from "./components/Capabilities";
import Implementation from "./components/Implementation";
import CtaBand from "./components/CtaBand";
import Faq from "./components/Faq";

export const metadata: Metadata = {
  title: "ITSM — Desk Manager",
  description:
    "ITSM estratégico, certificado pela ITIL® com IA nativa. Operação de TI orientada por dados, governança estruturada e inteligência contínua.",
};

export default function ITSMPage() {
  return (
    <>
      <Reveal />
      <main>
        <Hero />
        <About />
        <ItilSpotlight />
        <PracticesGrid />
        <Personas />
        <Capabilities />
        <Implementation />
        <CtaBand />
        <Faq />
      </main>
      <FooterFull />
    </>
  );
}
