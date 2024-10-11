import { ChangeEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks.ts";
import { start } from "../../redux/scoreBoard/scoreBoardSlice.ts";
import { scoreBoardSelector } from "../../redux/scoreBoard/selectors.ts";
import styles from './styles.module.css';

export function ScoreBoard() {
  const dispatch = useAppDispatch();
  const [homeTeam, setHomeTeam] = useState<string>('');
  const [awayTeam, setAwayTeam] = useState<string>('');
  const { matches } = useAppSelector(scoreBoardSelector);

  const handleHomeTeamChange = (event: ChangeEvent<HTMLInputElement>) => {
    setHomeTeam(event.target.value);
  }

  const handleAwayTeamChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAwayTeam(event.target.value);
  }

  const handleStartGame = () => {
    if (homeTeam && awayTeam) {
      setHomeTeam('');
      setAwayTeam('');

      dispatch(start({ homeTeam, awayTeam }));
    }
  }

  return (
    <div>
      <h1>Football World Cup Scoreboard</h1>

      <div>
        <input
          className={styles.input}
          type="text"
          placeholder="Enter Home Team"
          value={homeTeam}
          onChange={handleHomeTeamChange}
        />

        <input
          className={styles.input}
          type="text"
          placeholder="Enter Away Team"
          value={awayTeam}
          onChange={handleAwayTeamChange}
        />

        <button
          className={styles.button}
          onClick={handleStartGame}
        >
          Start
        </button>

        {Boolean(matches.length) && (
          <ul role='list'>
            {matches.map((match) => (
              <li className={styles.li} key={match.id} role='listitem'>
                {match.homeTeam} - {match.awayTeam}: {match.homeScore} - {match.awayScore}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}