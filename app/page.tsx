import { Hero } from "./components/sections/Hero";
import { HarvardStats } from "./components/sections/HarvardStats";
import { ThreePillars } from "./components/sections/ThreePillars";
import { Timeline } from "./components/sections/Timeline";
import { WorldGlobe } from "./components/sections/WorldGlobe";
import { ProductsBento } from "./components/sections/ProductsBento";
import { RetailFlows } from "./components/sections/RetailFlows";
import { CasesSticky } from "./components/sections/CasesSticky";
import { AiAnatomy } from "./components/sections/AiAnatomy";

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <HarvardStats />
      <ThreePillars />
      <Timeline />
      <WorldGlobe />
      <ProductsBento />
      <RetailFlows />
      <CasesSticky />
      <AiAnatomy />
    </main>
  );
}
