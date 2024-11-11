"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useFilterStore } from "@/hooks/use-filter-store";
import { useToast } from "@/components/ui/use-toast";

const LOCATIONS = [
  { value: "sp", label: "São Paulo", cities: ["São Paulo", "Campinas", "Santos"] },
  { value: "rj", label: "Rio de Janeiro", cities: ["Rio de Janeiro", "Niterói", "Angra dos Reis"] },
  { value: "mg", label: "Minas Gerais", cities: ["Belo Horizonte", "Uberlândia", "Juiz de Fora"] },
];

const CHARACTERISTICS = [
  { id: "loira", label: "Loira" },
  { id: "morena", label: "Morena" },
  { id: "ruiva", label: "Ruiva" },
  { id: "alta", label: "Alta" },
  { id: "baixa", label: "Baixa" },
  { id: "magra", label: "Magra" },
  { id: "curvy", label: "Curvilínea" },
  { id: "tatuada", label: "Tatuada" },
];

const SERVICES = [
  { id: "jantar", label: "Jantar" },
  { id: "eventos", label: "Eventos" },
  { id: "viagens", label: "Viagens" },
  { id: "pernoite", label: "Pernoite" },
  { id: "massagem", label: "Massagem" },
  { id: "fetiche", label: "Fetiches" },
];

export function FilterSection() {
  const { toast } = useToast();
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [priceRange, setPriceRange] = useState([300, 1000]);
  const [selectedCharacteristics, setSelectedCharacteristics] = useState<string[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const setFilter = useFilterStore((state) => state.setFilter);
  const clearAllFilters = useFilterStore((state) => state.clearFilters);

  const handleStateChange = (value: string) => {
    setState(value);
    setCity("");
  };

  const handleCharacteristicToggle = (id: string) => {
    setSelectedCharacteristics(prev =>
      prev.includes(id)
        ? prev.filter(c => c !== id)
        : [...prev, id]
    );
  };

  const handleServiceToggle = (id: string) => {
    setSelectedServices(prev =>
      prev.includes(id)
        ? prev.filter(s => s !== id)
        : [...prev, id]
    );
  };

  const clearFilters = () => {
    setState("");
    setCity("");
    setPriceRange([300, 1000]);
    setSelectedCharacteristics([]);
    setSelectedServices([]);
    setSearchTerm("");
    clearAllFilters();
  };

  const applyFilters = () => {
    setFilter({
      state,
      city,
      priceRange: priceRange as [number, number],
      characteristics: selectedCharacteristics,
      services: selectedServices,
      searchTerm,
    });

    toast({
      title: "Filtros aplicados",
      description: "Os resultados foram atualizados com base nos filtros selecionados.",
    });
  };

  return (
    <section className="mb-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-4">Encontre sua companhia perfeita</h1>
          <p className="text-muted-foreground">
            Explore nosso diretório exclusivo de acompanhantes
          </p>
        </div>
        {(state || city || selectedCharacteristics.length > 0 || selectedServices.length > 0 || searchTerm) && (
          <Button variant="outline" onClick={clearFilters}>
            Limpar filtros
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Localização */}
        <Card className="p-6">
          <Label className="text-base font-semibold mb-4 block">Localização</Label>
          <div className="space-y-4">
            <Select value={state} onValueChange={handleStateChange}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Estados</SelectLabel>
                  {LOCATIONS.map((location) => (
                    <SelectItem key={location.value} value={location.value}>
                      {location.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select value={city} onValueChange={setCity} disabled={!state}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a cidade" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Cidades</SelectLabel>
                  {LOCATIONS.find(l => l.value === state)?.cities.map((cityName) => (
                    <SelectItem key={cityName} value={cityName}>
                      {cityName}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Faixa de Preço */}
        <Card className="p-6">
          <Label className="text-base font-semibold mb-4 block">Faixa de Preço</Label>
          <div className="space-y-6">
            <Slider
              value={priceRange}
              min={100}
              max={2000}
              step={50}
              onValueChange={setPriceRange}
            />
            <div className="flex justify-between text-sm">
              <span>R$ {priceRange[0]}</span>
              <span>R$ {priceRange[1]}</span>
            </div>
          </div>
        </Card>

        {/* Características */}
        <Card className="p-6">
          <Label className="text-base font-semibold mb-4 block">Características</Label>
          <div className="space-y-3">
            <Input
              type="search"
              placeholder="Buscar características..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mb-4"
            />
            <div className="grid grid-cols-2 gap-2">
              {CHARACTERISTICS.filter(c => 
                c.label.toLowerCase().includes(searchTerm.toLowerCase())
              ).map((characteristic) => (
                <div key={characteristic.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={characteristic.id}
                    checked={selectedCharacteristics.includes(characteristic.id)}
                    onCheckedChange={() => handleCharacteristicToggle(characteristic.id)}
                  />
                  <label
                    htmlFor={characteristic.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {characteristic.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Serviços */}
        <Card className="p-6">
          <Label className="text-base font-semibold mb-4 block">Serviços</Label>
          <div className="grid grid-cols-2 gap-2">
            {SERVICES.map((service) => (
              <div key={service.id} className="flex items-center space-x-2">
                <Checkbox
                  id={service.id}
                  checked={selectedServices.includes(service.id)}
                  onCheckedChange={() => handleServiceToggle(service.id)}
                />
                <label
                  htmlFor={service.id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {service.label}
                </label>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Filtros Selecionados */}
      {(selectedCharacteristics.length > 0 || selectedServices.length > 0) && (
        <div className="flex flex-wrap gap-2 mb-6">
          {selectedCharacteristics.map((id) => (
            <Badge
              key={id}
              variant="secondary"
              className="flex items-center gap-1 cursor-pointer"
              onClick={() => handleCharacteristicToggle(id)}
            >
              {CHARACTERISTICS.find(c => c.id === id)?.label}
              <X className="h-3 w-3" />
            </Badge>
          ))}
          {selectedServices.map((id) => (
            <Badge
              key={id}
              variant="secondary"
              className="flex items-center gap-1 cursor-pointer"
              onClick={() => handleServiceToggle(id)}
            >
              {SERVICES.find(s => s.id === id)?.label}
              <X className="h-3 w-3" />
            </Badge>
          ))}
        </div>
      )}

      <Button 
        size="lg" 
        className="w-full md:w-auto"
        onClick={applyFilters}
      >
        Aplicar Filtros
      </Button>
    </section>
  );
}