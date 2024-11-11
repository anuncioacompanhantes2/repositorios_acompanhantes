"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface EscortCardProps {
  id: number;
  name: string;
  age: number;
  location: string;
  price: number;
  imageUrl: string;
  whatsapp: string;
}

export function EscortCard({
  id,
  name,
  age,
  location,
  price,
  imageUrl,
  whatsapp,
}: EscortCardProps) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/escorts/${id}`);
  };

  return (
    <Card 
      className="overflow-hidden cursor-pointer group"
      onClick={handleCardClick}
    >
      <div className="relative aspect-[3/4] w-full">
        <Image
          src={imageUrl}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-200 group-hover:scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold">{name}</h3>
          <span className="text-sm text-muted-foreground">{age} anos</span>
        </div>
        <p className="text-sm text-muted-foreground mb-4">{location}</p>
        <div className="flex justify-between items-center">
          <span className="font-semibold">R$ {price}/hora</span>
          <div className="space-x-2">
            <Button 
              variant="outline" 
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                // Implement favorite toggle logic
              }}
            >
              <Heart className="h-4 w-4" />
            </Button>
            <Button 
              size="sm" 
              onClick={(e) => {
                e.stopPropagation();
                window.open(`https://wa.me/${whatsapp}`, '_blank');
              }}
            >
              WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}