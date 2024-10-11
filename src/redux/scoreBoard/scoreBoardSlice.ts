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
    }
  }
})

export const { start } = scoreBoardSlice.actions;

export default scoreBoardSlice.reducer;