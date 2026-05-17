import dynamic from "next/dynamic";
import { Hero } from "./components/sections/Hero";
import { HarvardStats } from "./components/sections/HarvardStats";
import { ThreePillars } from "./components/sections/ThreePillars";
import { EcosystemHub } from "./components/sections/EcosystemHub";
import { FooterFull } from "./components/layout/FooterFull";

// Heavy below-fold sections — split into separate JS chunks, loaded lazily
const WorldGlobe       = dynamic(() => import("./components/sections/WorldGlobe").then(m => ({ default: m.WorldGlobe })));
const SegmentsCarousel = dynamic(() => import("./components/sections/SegmentsCarousel").then(m => ({ default: m.SegmentsCarousel })));
const CasesSticky      = dynamic(() => import("./components/sections/CasesSticky").then(m => ({ default: m.CasesSticky })));
const DeskExperience   = dynamic(() => import("./components/sections/DeskExperience").then(m => ({ default: m.DeskExperience })));
const PartnersMarquee  = dynamic(() => import("./components/sections/PartnersMarquee").then(m => ({ default: m.PartnersMarquee })));

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <HarvardStats />
      <ThreePillars />
      <EcosystemHub />
      <WorldGlobe />
      <SegmentsCarousel />
      <CasesSticky />
      <DeskExperience />
      <PartnersMarquee />
      <FooterFull />
    </main>
  );
}
