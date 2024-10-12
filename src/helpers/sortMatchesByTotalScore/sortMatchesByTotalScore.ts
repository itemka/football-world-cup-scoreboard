import { Match } from "../../types/scoreBoard.ts";

export function sortMatchesByTotalScore(matches: Match[]): Match[] {
  return matches.slice().sort((a, b) => {
    const totalScoreA = a.homeScore + a.awayScore;
    const totalScoreB = b.homeScore + b.awayScore;

    if (totalScoreA === totalScoreB) {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }

    return totalScoreB - totalScoreA;
  });
}