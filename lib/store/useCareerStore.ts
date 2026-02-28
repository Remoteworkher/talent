import { create } from "zustand";

interface CareerResult {
  payload: any; // Entire data object from API {tool, inputs, output}
  timestamp: string;
}

interface CareerState {
  resultsBySlug: Record<string, CareerResult[]>;
  addResult: (slug: string, payload: any) => void;
  clearResults: (slug: string) => void;
}

export const useCareerStore = create<CareerState>((set) => ({
  resultsBySlug: {},
  addResult: (slug, payload) =>
    set((state) => {
      const current = state.resultsBySlug[slug] || [];
      return {
        resultsBySlug: {
          ...state.resultsBySlug,
          [slug]: [{ payload, timestamp: new Date().toISOString() }, ...current],
        },
      };
    }),
  clearResults: (slug) =>
    set((state) => ({
      resultsBySlug: { ...state.resultsBySlug, [slug]: [] },
    })),
}));
