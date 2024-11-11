import { EscortGrid } from "@/components/escorts/escort-grid";
import { FilterSection } from "@/components/escorts/filter-section";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <FilterSection />
      <EscortGrid />
    </div>
  );
}