import { EscortCard } from "@/components/escorts/escort-card";
import { FilterSection } from "@/components/escorts/filter-section";

const MOCK_ESCORTS = [
  {
    id: 1,
    name: "Julia Silva",
    age: 28,
    location: "São Paulo, SP",
    price: 500,
    imageUrl: "https://source.unsplash.com/random/400x500?model&sig=1",
    whatsapp: "5511999999999"
  },
  {
    id: 2,
    name: "Amanda Santos",
    age: 25,
    location: "Rio de Janeiro, RJ",
    price: 600,
    imageUrl: "https://source.unsplash.com/random/400x500?model&sig=2",
    whatsapp: "5511999999999"
  },
  {
    id: 3,
    name: "Carolina Lima",
    age: 27,
    location: "São Paulo, SP",
    price: 450,
    imageUrl: "https://source.unsplash.com/random/400x500?model&sig=3",
    whatsapp: "5511999999999"
  }
];

export default function EscortsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <FilterSection />
      
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {MOCK_ESCORTS.map((escort) => (
          <EscortCard key={escort.id} {...escort} />
        ))}
      </section>
    </div>
  );
}