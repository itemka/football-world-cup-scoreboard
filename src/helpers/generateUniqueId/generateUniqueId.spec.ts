import { generateUniqueId } from "./generateUniqueId.ts";

describe('generateUniqueId', () => {
  it('should generate a unique ids on subsequent calls', () => {
    const id1 = generateUniqueId();
    const id2 = generateUniqueId();

    expect(id1).not.toBe(id2);
  });
});