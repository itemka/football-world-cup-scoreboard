import scoreBoardReducer, { finish, initialState, start, updateScore } from './scoreBoardSlice.ts';

const addMatch = () => {
  return scoreBoardReducer(initialState, start({
    homeTeam: 'Home Team',
    awayTeam: 'Away Team',
  }));
}

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
    const result = addMatch();

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

  it('should update the score of a match', () => {
    const state = addMatch();

    const result = scoreBoardReducer(state, updateScore({
      id: state.matches[0].id,
      homeScore: 2,
      awayScore: 3,
    }));

    expect(result.matches).toHaveLength(1);
    expect(result.matches[0]).toEqual({
      id: expect.any(String),
      homeTeam: 'Home Team',
      homeScore: 2,
      awayTeam: 'Away Team',
      awayScore: 3,
      createdAt: mockDate,
    });
  });

  it('should remove a match', () => {
    const state = addMatch();

    const result = scoreBoardReducer(state, finish({
      id: state.matches[0].id,
    }));

    expect(result.matches).toHaveLength(0);
  });
});