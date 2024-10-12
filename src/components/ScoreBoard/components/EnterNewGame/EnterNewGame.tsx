import { ChangeEvent, useState } from "react";
import { useAppDispatch } from "../../../../hooks/storeHooks.ts";
import { Match } from "../../../../types/scoreBoard.ts";
import { start } from "../../../../redux/scoreBoard/scoreBoardSlice.ts";
import styles from "../../styles.module.css";

export function EnterNewGame() {
  const dispatch = useAppDispatch();
  const [homeTeam, setHomeTeam] = useState<string>('');
  const [awayTeam, setAwayTeam] = useState<string>('');

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
    if (homeTeam.trim() && awayTeam.trim()) {
      setHomeTeam('');
      setAwayTeam('');

      dispatch(start({ homeTeam, awayTeam }));
    }
  }

  return (
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
        disabled={!homeTeam.trim() || !awayTeam.trim()}
      >
        Start
      </button>
    </div>
  )
}