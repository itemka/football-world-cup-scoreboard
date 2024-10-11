import { ChangeEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks.ts";
import { start } from "../../redux/scoreBoard/scoreBoardSlice.ts";
import { scoreBoardSelector } from "../../redux/scoreBoard/selectors.ts";
import { Match } from "../../types/scoreBoard.ts";
import { Game } from "../Game/Game.tsx";
import styles from './styles.module.css';

export function ScoreBoard() {
  const dispatch = useAppDispatch();
  const [homeTeam, setHomeTeam] = useState<string>('');
  const [awayTeam, setAwayTeam] = useState<string>('');
  const { matches: games } = useAppSelector(scoreBoardSelector);

  const handleInputTeamChange = (key: Extract<keyof Match, 'homeTeam' | 'awayTeam'>) => {
    const team = {
      homeTeam: setHomeTeam,
      awayTeam: setAwayTeam,
    } as const;

    const setTeam = team[key];

    return (event: ChangeEvent<HTMLInputElement>) => {
      setTeam(event.target.value);
    }
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
          onChange={handleInputTeamChange('homeTeam')}
        />

        <input
          className={styles.input}
          type="text"
          placeholder="Enter Away Team"
          value={awayTeam}
          onChange={handleInputTeamChange('awayTeam')}
        />

        <button
          className={styles.button}
          onClick={handleStartGame}
        >
          Start
        </button>

        <h2>Games in Progress</h2>

        {!games.length && <p>No games in progress</p>}

        {Boolean(games.length) && (
          <ul role='list'>
            {games.map((game) => (
              <Game key={game.id} game={game} />
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}