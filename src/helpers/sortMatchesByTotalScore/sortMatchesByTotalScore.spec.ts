import { Match } from "../../types/scoreBoard.ts";
import { sortMatchesByTotalScore } from "./sortMatchesByTotalScore.ts";

describe('sortMatchesByTotalScore', () => {
  it('should handle an empty array', () => {
    expect(sortMatchesByTotalScore([])).toEqual([]);
  });

  it('should sort matches by total score', () => {
    const matches: Match[] = [
      {
        id: '1',
        homeTeam: 'Team 1',
        homeScore: 1,
        awayTeam: 'Team 2',
        awayScore: 2,
        createdAt: '2024-01-01T00:00:00.000Z',
      },
      {
        id: '2',
        homeTeam: 'Team 2',
        homeScore: 2,
        awayTeam: 'Team 2',
        awayScore: 1,
        createdAt: '2024-01-02T00:00:00.000Z',
      },
      {
        id: '3',
        homeTeam: 'Team 3',
        homeScore: 1,
        awayTeam: 'Team 3',
        awayScore: 1,
        createdAt: '2024-01-03T00:00:00.000Z',
      },
    ];

    const sortedMatches = sortMatchesByTotalScore(matches);

    expect(sortedMatches).toEqual([
      matches[1],
      matches[0],
      matches[2],
    ]);
  });
});