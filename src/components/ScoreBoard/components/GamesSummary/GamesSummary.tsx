import { useAppSelector } from "../../../../hooks/storeHooks.ts";
import { sortedMatchesSelector } from "../../../../redux/scoreBoard/selectors.ts";
import styles from "../../styles.module.css";

export function GamesSummary() {
  const sortedGames = useAppSelector(sortedMatchesSelector);

  return (
    <div>
      <h2>Games Summary</h2>

      {!sortedGames.length && <p>No games</p>}

      {Boolean(sortedGames.length) && (
        <ul role='list'>
          {sortedGames.map((game) => (
            <li className={styles.li} key={game.id}>
              {game.homeTeam} {game.homeScore} - {game.awayTeam} {game.awayScore}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}