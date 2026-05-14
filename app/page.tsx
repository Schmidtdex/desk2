import { Hero } from "./components/sections/Hero";
import { HarvardStats } from "./components/sections/HarvardStats";
import { ThreePillars } from "./components/sections/ThreePillars";
import { Timeline } from "./components/sections/Timeline";
import { WorldGlobe } from "./components/sections/WorldGlobe";
import { ProductsBento } from "./components/sections/ProductsBento";
import { RetailFlows } from "./components/sections/RetailFlows";
import { CasesSticky } from "./components/sections/CasesSticky";
import { AiAnatomy } from "./components/sections/AiAnatomy";
import { MaturityJourney } from "./components/sections/MaturityJourney";
import { TrustMarquee } from "./components/sections/TrustMarquee";
import { FinalCta } from "./components/sections/FinalCta";
import { ScrollDots } from "./components/fx/ScrollDots";

const SECTION_IDS = [
  "scene-hero",
  "scene-harvard",
  "scene-pillars",
  "scene-timeline",
  "scene-globe",
  "scene-products",
  "scene-flows",
  "scene-cases",
  "scene-anatomy",
  "scene-maturity",
  "scene-trust",
  "scene-cta",
];

export default function Home() {
  return (
    <main className="relative">
      <ScrollDots ids={SECTION_IDS} />
      <Hero />
      <HarvardStats />
      <ThreePillars />
      <Timeline />
      <WorldGlobe />
      <ProductsBento />
      <RetailFlows />
      <CasesSticky />
      <AiAnatomy />
      <MaturityJourney />
      <TrustMarquee />
      <FinalCta />
      <footer className="border-t border-border bg-bg py-12 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-text-muted">deskmanager.com</p>
      </footer>
    </main>
  );
}
