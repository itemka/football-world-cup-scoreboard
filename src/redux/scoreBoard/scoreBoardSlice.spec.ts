import scoreBoardReducer, { initialState, start } from './scoreBoardSlice.ts';

describe('scoreBoardSlice', () => {
  const mockDate = '2024-10-11T18:19:29.066Z';

  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(new Date(mockDate));
  });

  it('should return the initial state', () => {
    const result = scoreBoardReducer(initialState, { type: 'unknown' });

    expect(result).toEqual(initialState);
  });

  it('should add a new match', () => {
    const result = scoreBoardReducer(initialState, start({
      homeTeam: 'Home Team',
      awayTeam: 'Away Team',
    }));

    expect(result.matches).toHaveLength(1);
    expect(result.matches[0]).toEqual({
      id: expect.any(String),
      homeTeam: 'Home Team',
      homeScore: 0,
      awayTeam: 'Away Team',
      awayScore: 0,
      createdAt: mockDate,
    });
  });
});