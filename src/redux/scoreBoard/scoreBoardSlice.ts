import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Match } from "../../types/scoreBoard.ts";
import { generateUniqueId } from "../../helpers/generateUniqueId/generateUniqueId.ts";

interface ScoreBoardState {
  matches: Match[];
}

export const initialState: ScoreBoardState = {
  matches: [],
};

const scoreBoardSlice = createSlice({
  name: 'scoreBoard',
  initialState,
  reducers: {
    start: (state, action: PayloadAction<{ homeTeam: string, awayTeam: string }>) => {
      const newMatch: Match = {
        id: generateUniqueId(),
        homeTeam: action.payload.homeTeam,
        homeScore: 0,
        awayTeam: action.payload.awayTeam,
        awayScore: 0,
        createdAt: new Date().toISOString(),
      }

      // can use push due to immer library used under the hood by redux toolkit
      state.matches.push(newMatch);
    },
    updateScore: (state, action: PayloadAction<Pick<Match, 'id' | 'homeScore' | 'awayScore'>>) => {
      return {
        ...state,
        matches: state.matches.map(match => {
          if (match.id === action.payload.id) {
            return {
              ...match,
              homeScore: action.payload.homeScore,
              awayScore: action.payload.awayScore,
            }
          }

          return match;
        })
      }
    }
  }
})

export const { start, updateScore } = scoreBoardSlice.actions;

export default scoreBoardSlice.reducer;