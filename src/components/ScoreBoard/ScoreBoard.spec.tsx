import { render, fireEvent } from "@testing-library/react";
import { ScoreBoard } from "./ScoreBoard";

describe('ScoreBoard', () => {
  it('should render component', () => {
    const { getByText, getByPlaceholderText } = render(<ScoreBoard />);

    const titleElement = getByText('Football World Cup Scoreboard');
    const homeTeamElement = getByPlaceholderText('Home Team');
    const awayTeamElement = getByPlaceholderText('Away Team');
    const buttonElement = getByText('Start');

    expect(titleElement).toBeInTheDocument();
    expect(homeTeamElement).toBeInTheDocument();
    expect(awayTeamElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  it('should update input fields correctly and clear when click start button', () => {
    const { getByPlaceholderText, getByText } = render(<ScoreBoard />);

    const homeTeamElement = getByPlaceholderText('Home Team');
    const awayTeamElement = getByPlaceholderText('Away Team');
    const buttonElement = getByText('Start');

    fireEvent.change(homeTeamElement, { target: { value: 'Poland' } });
    fireEvent.change(awayTeamElement, { target: { value: 'Brazil' } });

    expect(homeTeamElement).toHaveValue('Poland');
    expect(awayTeamElement).toHaveValue('Brazil');

    fireEvent.click(buttonElement);

    expect(homeTeamElement).toHaveValue('');
    expect(awayTeamElement).toHaveValue('');
  });
});