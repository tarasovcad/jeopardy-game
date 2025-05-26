import { create } from 'zustand';

interface GameStore {
  numberOfTeams: number;
  selectedTeams: number[];
  teamScores: Record<number, number>; // teamId -> score
  setNumberOfTeams: (count: number) => void;
  setSelectedTeams: (teams: number[]) => void;
  updateTeamScore: (teamId: number, points: number) => void;
  resetGame: () => void;
}

export const useGameStore = create<GameStore>((set) => ({
  numberOfTeams: 1,
  selectedTeams: [],
  teamScores: {},
  setNumberOfTeams: (count) => set({ numberOfTeams: count }),
  setSelectedTeams: (teams) =>
    set((state) => {
      // Initialize scores for new teams
      const newScores = { ...state.teamScores };
      teams.forEach((teamId) => {
        if (!(teamId in newScores)) {
          newScores[teamId] = 0;
        }
      });
      return { selectedTeams: teams, teamScores: newScores };
    }),
  updateTeamScore: (teamId, points) =>
    set((state) => ({
      teamScores: {
        ...state.teamScores,
        [teamId]: (state.teamScores[teamId] || 0) + points,
      },
    })),
  resetGame: () => set({ numberOfTeams: 1, selectedTeams: [], teamScores: {} }),
}));
