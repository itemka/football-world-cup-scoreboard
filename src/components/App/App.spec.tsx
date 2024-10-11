import { render } from "@testing-library/react";
import App from './App.tsx';

const mockedScoreBoard = 'ScoreBoard';

jest.mock('../ScoreBoard/ScoreBoard.tsx', () => ({
  ScoreBoard: () => <div>{mockedScoreBoard}</div>,
}));

describe('App', () => {
  it('should render component', () => {
    const { getByText } = render(<App />);

    expect(getByText(mockedScoreBoard)).toBeVisible();
  });
});