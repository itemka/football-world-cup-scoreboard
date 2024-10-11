import { ChangeEvent, useState } from "react";
import { Match } from "../../types/scoreBoard.ts";
import styles from "./styles.module.css";

interface GameProps {
  game: Match;
}

export function Game({ game }: GameProps) {
  const [homeScore, setHomeScore] = useState<number | ''>(game.homeScore);
  const [awayScore, setAwayScore] = useState<number | ''>(game.awayScore);

  const handleInputScoreChange = (key: Extract<keyof Match, 'homeScore' | 'awayScore'>) => {
    const score = {
      homeScore: setHomeScore,
      awayScore: setAwayScore,
    } as const;

    const setScore = score[key];

    return (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;

      if (value === '') {
        setScore('');
        return;
      }

      const currentValue = +value;

      if (currentValue >= 0) {
        setScore(currentValue);
      }
    }
  }

  return (
    <li className={styles.li} role='listitem'>
      <div>
        {game.homeTeam} - {game.awayTeam}: {game.homeScore} - {game.awayScore}
      </div>

      <input
        data-testid="home-score-input"
        className={styles.input}
        type="number"
        placeholder="Enter Home Team Score"
        value={homeScore}
        onChange={handleInputScoreChange('homeScore')}
        min="0"
      />

      <input
        data-testid="away-score-input"
        className={styles.input}
        type="number"
        placeholder="Enter Away Team Score"
        value={awayScore}
        onChange={handleInputScoreChange('awayScore')}
        min="0"
      />
    </li>
  );
}