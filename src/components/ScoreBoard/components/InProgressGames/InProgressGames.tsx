import { useAppSelector } from "../../../../hooks/storeHooks.ts";
import { scoreBoardSelector } from "../../../../redux/scoreBoard/selectors.ts";
import { Game } from "../Game/Game.tsx";

export function InProgressGames() {
  const { matches: games } = useAppSelector(scoreBoardSelector);

  return (
    <div>
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
  );
}