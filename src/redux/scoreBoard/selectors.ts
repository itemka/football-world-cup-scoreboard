import { createSelector } from "@reduxjs/toolkit";
import { sortMatchesByTotalScore } from "../../helpers/sortMatchesByTotalScore/sortMatchesByTotalScore.ts";
import { RootState } from "../store.ts";

export const scoreBoardSelector = (state: RootState) => state.scoreBoard;

export const sortedMatchesSelector = createSelector(
  scoreBoardSelector,
  ({ matches }) => sortMatchesByTotalScore(matches),
);