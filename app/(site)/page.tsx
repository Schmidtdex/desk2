import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";
import { HarvardStats } from "@/components/sections/HarvardStats";
import { ThreePillars } from "@/components/sections/ThreePillars";
import { AiAnatomy } from "@/components/sections/AiAnatomy";
import { EcosystemHub } from "@/components/sections/EcosystemHub";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { LANDING_PAGE_QUERY } from "@/sanity/queries/landingPage";
import type { LandingPageData } from "@/sanity/types/landingPage";

// Heavy below-fold sections — split into separate JS chunks, loaded lazily
const WorldGlobe       = dynamic(() => import("@/components/sections/WorldGlobe").then(m => ({ default: m.WorldGlobe })));
const SegmentsCarousel = dynamic(() => import("@/components/sections/SegmentsCarousel").then(m => ({ default: m.SegmentsCarousel })));
const CasesSticky      = dynamic(() => import("@/components/sections/CasesSticky").then(m => ({ default: m.CasesSticky })));
const DeskExperience   = dynamic(() => import("@/components/sections/DeskExperience").then(m => ({ default: m.DeskExperience })));
const PartnersMarquee  = dynamic(() => import("@/components/sections/PartnersMarquee").then(m => ({ default: m.PartnersMarquee })));
const FinalCta         = dynamic(() => import("@/components/sections/FinalCta").then(m => ({ default: m.FinalCta })));

export default async function Home() {
  // Fetch CMS data — gracefully falls back to static content if Sanity is not configured yet
  let cmsData: LandingPageData | null = null;
  try {
    const { data } = await sanityFetch({ query: LANDING_PAGE_QUERY });
    cmsData = data as LandingPageData;
  } catch {
    // Sanity not configured yet — components will use their static defaults
  }

  return (
    <main className="relative">
      <Hero            data={cmsData?.hero} />
      <HarvardStats    data={cmsData?.harvardStats} />
      <ThreePillars    data={cmsData?.threePillars} />
      <AiAnatomy       data={cmsData?.aiAnatomy} />
      <EcosystemHub    data={cmsData?.ecosystemHub} />
      <WorldGlobe      data={cmsData?.worldGlobe} />
      <SegmentsCarousel data={cmsData?.segmentsCarousel} />
      <CasesSticky     data={cmsData?.casesSection} />
      <DeskExperience  data={cmsData?.deskExperience} />
      <PartnersMarquee data={cmsData?.partnersMarquee} />
      <FinalCta        data={cmsData?.finalCta} />
      <SanityLive />
    </main>
  );
}
