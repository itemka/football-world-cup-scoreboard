import { render } from "@testing-library/react";
import { ScoreBoard } from "./ScoreBoard";

const mockedInProgressGames = 'InProgressGames';
const mockedEnterNewGame = 'EnterNewGame';
const mockedGamesSummary = 'GamesSummary';

jest.mock('./components/InProgressGames/InProgressGames.tsx', () => ({
  InProgressGames: () => <div>{mockedInProgressGames}</div>,
}));

jest.mock('./components/EnterNewGame/EnterNewGame.tsx', () => ({
  EnterNewGame: () => <div>{mockedEnterNewGame}</div>,
}));

jest.mock('./components/GamesSummary/GamesSummary.tsx', () => ({
  GamesSummary: () => <div>{mockedGamesSummary}</div>,
}));

describe('ScoreBoard', () => {
  it('should render component', () => {
    const { getByText } = render(<ScoreBoard />);

    const titleElement = getByText('Football World Cup Scoreboard');
    const InProgressGamesComponent = getByText(mockedInProgressGames);
    const EnterNewGameComponent = getByText(mockedEnterNewGame);
    const GamesSummaryComponent = getByText(mockedGamesSummary);

    expect(titleElement).toBeVisible();
    expect(InProgressGamesComponent).toBeVisible();
    expect(EnterNewGameComponent).toBeVisible();
    expect(GamesSummaryComponent).toBeVisible();
  });
});