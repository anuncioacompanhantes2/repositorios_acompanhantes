"use client";

import { create } from "zustand";

interface FilterState {
  state: string;
  city: string;
  priceRange: [number, number];
  characteristics: string[];
  services: string[];
  searchTerm: string;
  setFilter: (filter: Partial<Omit<FilterState, "setFilter" | "clearFilters">>) => void;
  clearFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  state: "",
  city: "",
  priceRange: [300, 1000],
  characteristics: [],
  services: [],
  searchTerm: "",
  setFilter: (filter) => set((state) => ({ ...state, ...filter })),
  clearFilters: () => set({
    state: "",
    city: "",
    priceRange: [300, 1000],
    characteristics: [],
    services: [],
    searchTerm: "",
  }),
}));