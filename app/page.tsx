import { Hero } from "./components/sections/Hero";
import { HarvardStats } from "./components/sections/HarvardStats";

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <HarvardStats />
    </main>
  );
}
