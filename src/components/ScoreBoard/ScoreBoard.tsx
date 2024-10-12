import { InProgressGames } from "./components/InProgressGames/InProgressGames.tsx";
import { EnterNewGame } from "./components/EnterNewGame/EnterNewGame.tsx";
import { GamesSummary } from "./components/GamesSummary/GamesSummary.tsx";
import styles from "./styles.module.css";

export function ScoreBoard() {
  return (
    <div>
      <h1>Football World Cup Scoreboard</h1>
      <EnterNewGame />
      <div className={styles.scoreBoardProgress}>
        <InProgressGames />
        <GamesSummary />
      </div>
    </div>
  )
}