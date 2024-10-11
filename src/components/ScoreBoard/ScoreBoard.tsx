import { ChangeEvent, useState } from "react";

export function ScoreBoard() {
  const [homeTeam, setHomeTeam] = useState<string>('');
  const [awayTeam, setAwayTeam] = useState<string>('');

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
    }
  }

  return (
    <div>
      <h1>Football World Cup Scoreboard</h1>

      <div>
        <input
          type="text"
          placeholder="Home Team"
          value={homeTeam}
          onChange={handleHomeTeamChange}
        />

        <input
          type="text"
          placeholder="Away Team"
          value={awayTeam}
          onChange={handleAwayTeamChange}
        />

        <button onClick={handleStartGame}>Start</button>
      </div>
    </div>
  )
}