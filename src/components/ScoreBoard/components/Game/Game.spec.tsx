import { render, fireEvent } from "@testing-library/react";
import { mockMatch } from "../../../../mocks/match.ts";
import { updateScore } from "../../../../redux/scoreBoard/scoreBoardSlice.ts";
import { Game } from "./Game.tsx";

const mockDispatch = jest.fn();

jest.mock('../../../../hooks/storeHooks.ts', () => ({
  ...jest.requireActual('../../../../hooks/storeHooks.ts'),
  useAppDispatch: () => mockDispatch,
}));

describe('Game', () => {
  it('should render component', () => {
    const { getByText, getByTestId } = render(<Game game={mockMatch} />);

    const currentMatchScore = getByText(`${mockMatch.homeTeam} - ${mockMatch.awayTeam}: ${mockMatch.homeScore} - ${mockMatch.awayScore}`);
    const homeScoreInput = getByTestId('home-score-input');
    const awayScoreInput = getByTestId('away-score-input');

    expect(currentMatchScore).toBeVisible();
    expect(homeScoreInput).toBeInTheDocument();
    expect(awayScoreInput).toBeInTheDocument();
  });

  it('should handle updating of input fields correctly', () => {
    const { getByTestId } = render(<Game game={mockMatch} />);

    const homeScoreInput = getByTestId('home-score-input');
    const awayScoreInput = getByTestId('away-score-input');

    fireEvent.change(homeScoreInput, { target: { value: '1' } });
    fireEvent.change(awayScoreInput, { target: { value: '3' } });

    expect(homeScoreInput).toHaveValue(1);
    expect(awayScoreInput).toHaveValue(3);

    fireEvent.change(homeScoreInput, { target: { value: '' } });
    fireEvent.change(awayScoreInput, { target: { value: '' } });

    expect(homeScoreInput).toHaveValue(null);
    expect(awayScoreInput).toHaveValue(null);
  });

  it('should handle execution of updating of score when click on Update Score button', async () => {
    const { getByTestId, getByText } = render(<Game game={mockMatch} />);

    const homeScoreInput = getByTestId('home-score-input');
    const awayScoreInput = getByTestId('away-score-input');
    const updateScoreButton = getByText('Update Score');

    fireEvent.change(homeScoreInput, { target: { value: '1' } });
    fireEvent.change(awayScoreInput, { target: { value: '3' } });

    fireEvent.click(updateScoreButton);

    expect(mockDispatch).toHaveBeenCalledWith(
      updateScore({
        id: mockMatch.id,
        homeScore: 1,
        awayScore: 3,
      })
    );
  });
});