import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../../../redux/store.ts";
import * as scoreBoardSelectors from "../../../../redux/scoreBoard/selectors.ts";
import { mockMatch } from "../../../../mocks/match.ts";
import { GamesSummary } from "./GamesSummary.tsx";

const Component = () => (
  <Provider store={store}>
    <GamesSummary />
  </Provider>
);

describe('GamesSummary', () => {
  const mockedSortedMatchesSelector = jest.spyOn(scoreBoardSelectors, 'sortedMatchesSelector');

  beforeEach(() => {
    mockedSortedMatchesSelector.mockReturnValue([]);
  });

  it('should render an empty state of component', () => {
    const { getByText } = render(<Component />);

    const title = getByText('Games Summary');
    const emptyMessageElement = getByText('No games');

    expect(title).toBeVisible();
    expect(emptyMessageElement).toBeVisible();
  });

  it('should render a summary list', () => {
    mockedSortedMatchesSelector.mockReturnValue([mockMatch]);

    const { getByRole, queryByRole } = render(<Component />);

    const ulElement = getByRole('list');
    const emptyMessageElement = queryByRole('No games');

    expect(ulElement).toBeVisible();
    expect(emptyMessageElement).not.toBeInTheDocument();
    expect(ulElement.children).toHaveLength(1);
  });
});