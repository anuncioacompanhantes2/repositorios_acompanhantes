"use client";

import { useState } from "react";
import { EscortCard } from "@/components/escorts/escort-card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

export default function FavoritesPage() {
  const [favorites] = useState([
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
    }
  ]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Meus Favoritos</h1>
        <p className="text-muted-foreground">
          Acompanhantes que você marcou como favoritos
        </p>
      </div>

      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favorites.map((escort) => (
            <EscortCard key={escort.id} {...escort} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <Heart className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-semibold mb-2">Nenhum favorito ainda</h2>
          <p className="text-muted-foreground mb-6">
            Você ainda não adicionou nenhuma acompanhante aos favoritos
          </p>
          <Button asChild>
            <a href="/escorts">Explorar Acompanhantes</a>
          </Button>
        </div>
      )}
    </div>
  );
}