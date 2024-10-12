import { render } from "@testing-library/react";
import { GamesSummary } from "./GamesSummary.tsx";

describe('GamesSummary', () => {
  it('should render the component', () => {
    const { getByText } = render(<GamesSummary />);

    const title = getByText('Games Summary');

    expect(title).toBeVisible();
  });
});