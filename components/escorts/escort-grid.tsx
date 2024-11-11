"use client";

import { EscortCard } from "./escort-card";
import { useFilterStore } from "@/hooks/use-filter-store";

const MOCK_ESCORTS = [
  {
    id: 1,
    name: "Julia Silva",
    age: 28,
    location: "São Paulo, SP",
    price: 500,
    imageUrl: "https://source.unsplash.com/random/400x500?model&sig=1",
    whatsapp: "5511999999999",
    characteristics: ["loira", "alta"],
    services: ["jantar", "eventos"]
  },
  {
    id: 2,
    name: "Amanda Santos",
    age: 25,
    location: "Rio de Janeiro, RJ",
    price: 600,
    imageUrl: "https://source.unsplash.com/random/400x500?model&sig=2",
    whatsapp: "5511999999999",
    characteristics: ["morena", "curvy"],
    services: ["viagens", "pernoite"]
  },
  {
    id: 3,
    name: "Carolina Lima",
    age: 27,
    location: "São Paulo, SP",
    price: 450,
    imageUrl: "https://source.unsplash.com/random/400x500?model&sig=3",
    whatsapp: "5511999999999",
    characteristics: ["ruiva", "tatuada"],
    services: ["massagem", "fetiche"]
  },
  {
    id: 4,
    name: "Beatriz Costa",
    age: 29,
    location: "Rio de Janeiro, RJ",
    price: 550,
    imageUrl: "https://source.unsplash.com/random/400x500?model&sig=4",
    whatsapp: "5511999999999",
    characteristics: ["morena", "alta"],
    services: ["jantar", "eventos", "viagens"]
  },
  {
    id: 5,
    name: "Larissa Oliveira",
    age: 26,
    location: "São Paulo, SP",
    price: 700,
    imageUrl: "https://source.unsplash.com/random/400x500?model&sig=5",
    whatsapp: "5511999999999",
    characteristics: ["loira", "magra"],
    services: ["eventos", "pernoite"]
  },
  {
    id: 6,
    name: "Fernanda Costa",
    age: 24,
    location: "Rio de Janeiro, RJ",
    price: 650,
    imageUrl: "https://source.unsplash.com/random/400x500?model&sig=6",
    whatsapp: "5511999999999",
    characteristics: ["morena", "curvy"],
    services: ["massagem", "jantar"]
  },
  {
    id: 7,
    name: "Gabriela Santos",
    age: 28,
    location: "São Paulo, SP",
    price: 550,
    imageUrl: "https://source.unsplash.com/random/400x500?model&sig=7",
    whatsapp: "5511999999999",
    characteristics: ["ruiva", "alta"],
    services: ["viagens", "fetiche"]
  },
  {
    id: 8,
    name: "Isabella Lima",
    age: 27,
    location: "Rio de Janeiro, RJ",
    price: 600,
    imageUrl: "https://source.unsplash.com/random/400x500?model&sig=8",
    whatsapp: "5511999999999",
    characteristics: ["loira", "tatuada"],
    services: ["eventos", "pernoite"]
  }
];

export function EscortGrid() {
  const filters = useFilterStore();

  const filteredEscorts = MOCK_ESCORTS.filter(escort => {
    // Filtro de localização
    if (filters.state && !escort.location.includes(filters.state === "sp" ? "São Paulo" : filters.state === "rj" ? "Rio de Janeiro" : "")) {
      return false;
    }
    if (filters.city && !escort.location.includes(filters.city)) {
      return false;
    }

    // Filtro de preço
    if (escort.price < filters.priceRange[0] || escort.price > filters.priceRange[1]) {
      return false;
    }

    // Filtro de características
    if (filters.characteristics.length > 0 && 
        !filters.characteristics.every(c => escort.characteristics.includes(c))) {
      return false;
    }

    // Filtro de serviços
    if (filters.services.length > 0 && 
        !filters.services.every(s => escort.services.includes(s))) {
      return false;
    }

    return true;
  });

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredEscorts.map((escort) => (
        <EscortCard key={escort.id} {...escort} />
      ))}
      {filteredEscorts.length === 0 && (
        <div className="col-span-full text-center py-12">
          <h3 className="text-xl font-semibold mb-2">Nenhum resultado encontrado</h3>
          <p className="text-muted-foreground">
            Tente ajustar os filtros para ver mais resultados
          </p>
        </div>
      )}
    </section>
  );
}