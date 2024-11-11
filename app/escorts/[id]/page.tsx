import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Heart, MapPin, Phone, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const MOCK_ESCORTS = [
  {
    id: 1,
    name: "Julia Silva",
    age: 28,
    location: "São Paulo, SP",
    price: 500,
    imageUrl: "https://source.unsplash.com/random/800x1000?model&sig=1",
    whatsapp: "5511999999999",
    description: "Olá! Sou a Julia, uma acompanhante sofisticada e discreta. Ofereço momentos únicos e inesquecíveis.",
    services: ["Jantar", "Eventos", "Viagens", "Pernoite"],
    gallery: [
      "https://source.unsplash.com/random/600x800?model&sig=11",
      "https://source.unsplash.com/random/600x800?model&sig=12",
      "https://source.unsplash.com/random/600x800?model&sig=13",
      "https://source.unsplash.com/random/600x800?model&sig=14"
    ]
  },
  {
    id: 2,
    name: "Amanda Santos",
    age: 25,
    location: "Rio de Janeiro, RJ",
    price: 600,
    imageUrl: "https://source.unsplash.com/random/800x1000?model&sig=2",
    whatsapp: "5511999999999",
    description: "Olá! Sou a Amanda, uma acompanhante elegante e carismática. Proporciono experiências memoráveis.",
    services: ["Jantar", "Eventos", "Viagens"],
    gallery: [
      "https://source.unsplash.com/random/600x800?model&sig=21",
      "https://source.unsplash.com/random/600x800?model&sig=22",
      "https://source.unsplash.com/random/600x800?model&sig=23",
      "https://source.unsplash.com/random/600x800?model&sig=24"
    ]
  },
  {
    id: 3,
    name: "Carolina Lima",
    age: 27,
    location: "São Paulo, SP",
    price: 450,
    imageUrl: "https://source.unsplash.com/random/800x1000?model&sig=3",
    whatsapp: "5511999999999",
    description: "Olá! Sou a Carolina, uma acompanhante versátil e divertida. Garanto momentos de puro prazer.",
    services: ["Massagem", "Eventos", "Pernoite"],
    gallery: [
      "https://source.unsplash.com/random/600x800?model&sig=31",
      "https://source.unsplash.com/random/600x800?model&sig=32",
      "https://source.unsplash.com/random/600x800?model&sig=33",
      "https://source.unsplash.com/random/600x800?model&sig=34"
    ]
  }
];

export function generateStaticParams() {
  return MOCK_ESCORTS.map((escort) => ({
    id: escort.id.toString(),
  }));
}

export default function EscortProfilePage({ params }: { params: { id: string } }) {
  const escort = MOCK_ESCORTS.find(e => e.id === parseInt(params.id));
  
  if (!escort) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/escorts"
        className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Voltar para lista
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg">
            <Image
              src={escort.imageUrl}
              alt={escort.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {escort.gallery.map((img, index) => (
              <div key={index} className="relative aspect-[3/4] w-full overflow-hidden rounded-lg">
                <Image
                  src={img}
                  alt={`${escort.name} - Foto ${index + 2}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">{escort.name}</h1>
            <div className="flex items-center text-muted-foreground mb-4">
              <MapPin className="h-4 w-4 mr-2" />
              {escort.location} • {escort.age} anos
            </div>
            <p className="text-lg mb-4">{escort.description}</p>
            <div className="flex items-center space-x-4">
              <span className="text-2xl font-bold">R$ {escort.price}/hora</span>
              <Button variant="outline" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">Serviços</h2>
            <div className="flex flex-wrap gap-2">
              {escort.services.map((service) => (
                <span
                  key={service}
                  className="px-3 py-1 bg-secondary rounded-full text-sm"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>

          <div className="flex space-x-4">
            <Button className="flex-1" asChild>
              <a 
                href={`https://wa.me/${escort.whatsapp}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center"
              >
                <Phone className="h-4 w-4 mr-2" />
                Contatar via WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}