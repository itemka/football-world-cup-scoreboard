# Football World Cup Scoreboard

This is a React application for managing a live Football World Cup Scoreboard. The app allows users to start new football matches, update their scores, finish games, and view a summary of all ongoing games. The scoreboard provides key features such as sorting matches by their total score and presenting a list of games in progress.

Contents:
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
  - [Example Test Using Jest](#example-test-using-jest)
  - [Example Test Using React Testing Library](#example-test-using-react-testing-library)

## Features

- **Start a Game:** Add a new match between two teams with an initial score of `0-0`.
- **Finish a Game:** Remove a match from the scoreboard once it's over.
- **Update Score:** Update the score of an ongoing match.
- **View a Summary:** Get a summary of ongoing games, ordered by the total score. Matches with the same total score are sorted by their time of addition (most recent first).
- **Redux Toolkit:** State management is done with Redux Toolkit to keep the application state predictable and scalable.
- **Test Coverage:** The application logic and components are covered with tests using Jest and React Testing Library.

## Technologies

- **[TypeScript](https://www.typescriptlang.org/):** Ensures type safety and improves code maintainability across the application.
- **[Vite](https://vite.dev/):** A fast development build tool that provides a smooth development experience with lightning-fast `HMR` (Hot Module Replacement).
- **[React](https://react.dev/):** The front-end UI is built with React and TypeScript to ensure type safety and scalability.
- **[Redux Toolkit](https://redux-toolkit.js.org/):** Used for global state management of games and scores, providing a predictable and scalable structure for handling the app's state.
- **[Jest](https://jestjs.io/):** For unit tests to ensure the correctness of the application's logic and functions.
- **[React Testing Library](https://testing-library.com/):** For testing user interactions and rendering components, ensuring the UI behaves as expected.
- **CSS Modules:** Enables scoped and modular CSS styling, preventing class name conflicts and improving maintainability.

## Installation

1. Clone the repository:

```bash
  git clone https://github.com/itemka/football-world-cup-scoreboard.git
```

2. Install the dependencies:

```bash
  cd football-world-cup-scoreboard
  yarn install
```
3. Start the development server:

```bash
  yarn dev
```

4. Open the application in your browser at by clicking on the link provided in the terminal.

## Usage

1. **Starting a Game:**
    - Enter the home and away team names in the input fields and click the "Start" button.
    - The game will appear in the list of ongoing matches with an initial score of `0-0`.

2. **Updating Scores:**
    - You can update the scores for a game using the input fields next to each game.
    - After entering the new scores, click `Update Score` to reflect the changes.

3. **Finishing a Game:**
    - Click the `Finish Game` button next to a match to remove it from the scoreboard.

4. **Viewing Game Summary:**
    - The `Games Summary` section shows a sorted list of ongoing games by total score.
    - Games with the same total score are sorted by the time they were added to the scoreboard (most recent first).

## Testing

This project includes tests for the components and logic using Jest and React Testing Library.

To run the tests use the following command:

```bash
  yarn test
```

### Example Test Using Jest

The following is a unit test for the `sortMatchesByTotalScore` function using Jest. The test ensures that the function correctly handles an empty array and sorts matches by total score.

```typescript
describe('sortMatchesByTotalScore', () => {
  it('should handle an empty array', () => {
    expect(sortMatchesByTotalScore([])).toEqual([]);
  });

  it('should sort matches by total score', () => {
    const matches: Match[] = [
      {
        id: '1',
        homeTeam: 'Team 1',
        homeScore: 1,
        awayTeam: 'Team 2',
        awayScore: 2,
        createdAt: '2024-01-01T00:00:00.000Z',
      },
      {
        id: '2',
        homeTeam: 'Team 2',
        homeScore: 2,
        awayTeam: 'Team 2',
        awayScore: 1,
        createdAt: '2024-01-02T00:00:00.000Z',
      },
      {
        id: '3',
        homeTeam: 'Team 3',
        homeScore: 1,
        awayTeam: 'Team 3',
        awayScore: 1,
        createdAt: '2024-01-03T00:00:00.000Z',
      },
    ];

    const sortedMatches = sortMatchesByTotalScore(matches);

    expect(sortedMatches).toEqual([
      matches[1],
      matches[0],
      matches[2],
    ]);
  });
});
```

### Example Test Using React Testing Library

The following is a test for the `EnterNewGame` component using **React Testing Library**. It checks whether the component renders correctly, allows the user to input team names, and handles the "Start" button click correctly by dispatching the appropriate action.

```tsx
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
});
```