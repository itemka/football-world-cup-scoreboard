import { render, within } from "@testing-library/react";
import { Provider } from "react-redux";
import * as scoreBoardSelectors from "../../../../redux/scoreBoard/selectors.ts";
import { store } from "../../../../redux/store.ts";
import { mockMatch } from "../../../../mocks/match.ts";
import { InProgressGames } from "./InProgressGames.tsx";

const Component = () => (
  <Provider store={store}>
    <InProgressGames />
  </Provider>
);

describe('InProgressGames', () => {
  const mockedScoreBoardSelector = jest.spyOn(scoreBoardSelectors, 'scoreBoardSelector');

  beforeEach(() => {
    mockedScoreBoardSelector.mockReturnValue({ matches: [] });
  });

  it('should render an empty state of component', () => {
    const { getByText } = render(<Component />);

    const titleElement = getByText('Games in Progress');
    const emptyMessageElement = getByText('No games in progress');

    expect(titleElement).toBeVisible();
    expect(emptyMessageElement).toBeVisible();
  });

  it('should render a list of games', () => {
    mockedScoreBoardSelector.mockReturnValue({ matches: [mockMatch] });

    const { getByRole } = render(<Component />);

    const ulElement = getByRole('list');

    expect(ulElement).toBeInTheDocument();
    expect(ulElement.children).toHaveLength(1);

    const { getAllByRole  } = within(ulElement);

    const liElements = getAllByRole('listitem');

    expect(liElements).toHaveLength(1);
    expect(liElements[0]).toBeVisible();
  });
});