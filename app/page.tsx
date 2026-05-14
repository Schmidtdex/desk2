import { Hero } from "./components/sections/Hero";
import { HarvardStats } from "./components/sections/HarvardStats";
import { ThreePillars } from "./components/sections/ThreePillars";

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <HarvardStats />
      <ThreePillars />
    </main>
  );
}
