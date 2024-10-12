import { RootState } from "../store.ts";
import { initialState as initialScoreBoardState } from "./scoreBoardSlice.ts";
import { scoreBoardSelector, sortedMatchesSelector } from "./selectors.ts";

describe('scoreBoard selectors', () => {
  const mockStore: RootState = {
    scoreBoard: initialScoreBoardState,
  };

  it('should return scoreBoard state ', () => {
    const result = scoreBoardSelector(mockStore);

    expect(result).toEqual(initialScoreBoardState);
  });

  it('should return sorted matches', () => {
    const result = sortedMatchesSelector(mockStore);

    expect(result).toEqual([]);
  });
});