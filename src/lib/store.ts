import { create } from 'zustand';

interface GameStore {
  numberOfTeams: number;
  selectedTeams: number[];
  setNumberOfTeams: (count: number) => void;
  setSelectedTeams: (teams: number[]) => void;
  resetGame: () => void;
}

export const useGameStore = create<GameStore>((set) => ({
  numberOfTeams: 1,
  selectedTeams: [],
  setNumberOfTeams: (count) => set({ numberOfTeams: count }),
  setSelectedTeams: (teams) => set({ selectedTeams: teams }),
  resetGame: () => set({ numberOfTeams: 1, selectedTeams: [] }),
}));
