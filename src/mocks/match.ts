import { Match } from "../types/scoreBoard.ts";

export const mockMatch: Match = {
  id: '1',
  homeTeam: 'Poland',
  homeScore: 0,
  awayTeam: 'Brazil',
  awayScore: 0,
  createdAt: new Date().toISOString(),
}