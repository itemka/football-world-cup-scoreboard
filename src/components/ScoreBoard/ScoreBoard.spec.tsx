import { render, fireEvent, within, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import scoreBoardReducer, { start } from "../../redux/scoreBoard/scoreBoardSlice.ts";
import { Match } from "../../types/scoreBoard.ts";
import { ScoreBoard } from "./ScoreBoard";

const mockDispatch = jest.fn();
const mockSelector = jest.fn();

jest.mock('../../hooks/storeHooks.ts', () => ({
  ...jest.requireActual('../../hooks/storeHooks.ts'),
  useAppDispatch: () => mockDispatch,
  useAppSelector: () => mockSelector(),
}));

const Component = ({ mockedStore }: { mockedStore: ReturnType<typeof configureStore> }) => (
  <Provider store={mockedStore}>
    <ScoreBoard />
  </Provider>
);

describe('ScoreBoard', () => {
  beforeEach(() => {
    mockSelector.mockReturnValue({ matches: [] });
  });

  it('should render component', () => {
    const mockedStore = configureStore({
      reducer: scoreBoardReducer,
    });

    const { getByText, getByPlaceholderText } = render(<Component mockedStore={mockedStore} />);

    const titleElement = getByText('Football World Cup Scoreboard');
    const homeTeamElement = getByPlaceholderText('Enter Home Team');
    const awayTeamElement = getByPlaceholderText('Enter Away Team');
    const buttonElement = getByText('Start');

    expect(titleElement).toBeInTheDocument();
    expect(homeTeamElement).toBeInTheDocument();
    expect(awayTeamElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  it('should update input fields correctly, clear when click start button, and display list of matches', async () => {
    const mockMatch: Match = {
      id: '1',
      homeTeam: 'Poland',
      homeScore: 0,
      awayTeam: 'Brazil',
      awayScore: 0,
      createdAt: new Date().toISOString(),
    }

    const mockedStore = configureStore({
      reducer: scoreBoardReducer,
    });

    const { getByPlaceholderText, getByText, getByRole, rerender } = render(<Component mockedStore={mockedStore} />);

    const homeTeamElement = getByPlaceholderText('Enter Home Team');
    const awayTeamElement = getByPlaceholderText('Enter Away Team');
    const buttonElement = getByText('Start');

    fireEvent.change(homeTeamElement, { target: { value: mockMatch.homeTeam } });
    fireEvent.change(awayTeamElement, { target: { value: mockMatch.awayTeam } });

    expect(homeTeamElement).toHaveValue(mockMatch.homeTeam);
    expect(awayTeamElement).toHaveValue(mockMatch.awayTeam);

    fireEvent.click(buttonElement);

    expect(homeTeamElement).toHaveValue('');
    expect(awayTeamElement).toHaveValue('');
    expect(mockDispatch).toHaveBeenCalledWith(
      start({
        homeTeam: mockMatch.homeTeam,
        awayTeam: mockMatch.awayTeam,
      })
    );

    mockSelector.mockReturnValue({ matches: [mockMatch] });

    rerender(<Component mockedStore={mockedStore} />);

    await waitFor(() => {
      const ulElement = getByRole('list');

      expect(ulElement).toBeInTheDocument();
      expect(ulElement.children).toHaveLength(1);

      const { getByRole: getByRoleWithinUl  } = within(ulElement);

      const liElement = getByRoleWithinUl('listitem');

      expect(liElement).toBeVisible();
    });
  });
});