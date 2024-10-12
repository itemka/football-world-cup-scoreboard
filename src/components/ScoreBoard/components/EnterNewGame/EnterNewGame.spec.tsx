import { fireEvent, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../../../redux/store.ts";
import { start } from "../../../../redux/scoreBoard/scoreBoardSlice.ts";
import { mockMatch } from "../../../../mocks/match.ts";
import { EnterNewGame } from "./EnterNewGame.tsx";

const mockDispatch = jest.fn();

jest.mock('../../../../hooks/storeHooks.ts', () => ({
  ...jest.requireActual('../../../../hooks/storeHooks.ts'),
  useAppDispatch: () => mockDispatch,
}));

const Component = () => (
  <Provider store={store}>
    <EnterNewGame />
  </Provider>
);

describe('EnterNewGame', () => {
  it('should render component', () => {
    const { getByPlaceholderText, getByText } = render(<Component />);

    const homeTeamElement = getByPlaceholderText('Enter Home Team');
    const awayTeamElement = getByPlaceholderText('Enter Away Team');
    const buttonElement = getByText('Start');

    expect(homeTeamElement).toBeInTheDocument();
    expect(awayTeamElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  it('should update input fields correctly and clear when click on the start button', () => {
    const { getByPlaceholderText, getByText } = render(<Component />);

    const homeTeamElement = getByPlaceholderText('Enter Home Team');
    const awayTeamElement = getByPlaceholderText('Enter Away Team');
    const buttonElement = getByText('Start');

    fireEvent.change(homeTeamElement, { target: { value: mockMatch.homeTeam } });
    fireEvent.change(awayTeamElement, { target: { value: mockMatch.awayTeam } });

    expect(homeTeamElement).toHaveValue(mockMatch.homeTeam);
    expect(awayTeamElement).toHaveValue(mockMatch.awayTeam);
    expect(buttonElement).toBeEnabled();

    fireEvent.click(buttonElement);

    expect(homeTeamElement).toHaveValue('');
    expect(awayTeamElement).toHaveValue('');
    expect(mockDispatch).toHaveBeenCalledWith(
      start({
        homeTeam: mockMatch.homeTeam,
        awayTeam: mockMatch.awayTeam,
      })
    );
  });

  it('should disable start button when at least one input field is empty', () => {
    const { getByPlaceholderText, getByText } = render(<Component />);

    const homeTeamElement = getByPlaceholderText('Enter Home Team');
    const awayTeamElement = getByPlaceholderText('Enter Away Team');
    const buttonElement = getByText('Start');

    fireEvent.change(homeTeamElement, { target: { value: '   ' } });
    fireEvent.change(awayTeamElement, { target: { value: mockMatch.awayTeam } });

    expect(buttonElement).toBeDisabled();

    fireEvent.click(buttonElement);

    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it('should not start a game if the home and away team names are the same', () => {
    const { getByPlaceholderText, getByText } = render(<Component />);

    const homeTeamInput = getByPlaceholderText('Enter Home Team');
    const awayTeamInput = getByPlaceholderText('Enter Away Team');
    const buttonElement = getByText('Start');

    fireEvent.change(homeTeamInput, { target: { value: 'The same team name' } });
    fireEvent.change(awayTeamInput, { target: { value: 'The same team name' } });

    fireEvent.click(buttonElement);

    expect(buttonElement).toBeDisabled();
    expect(mockDispatch).not.toHaveBeenCalled();
  });
});