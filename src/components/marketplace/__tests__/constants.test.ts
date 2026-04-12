import { AVATAR_DEFAULT, CONDITIONS, PAGE_SIZE } from '../constants';

describe('marketplace constants', () => {
  it('PAGE_SIZE is 12', () => {
    expect(PAGE_SIZE).toBe(12);
  });

  it('CONDITIONS has 4 entries', () => {
    expect(CONDITIONS).toHaveLength(4);
  });

  it('CONDITIONS includes New, Like New, Good, Used', () => {
    const labels = CONDITIONS.map((c) => c.label);
    expect(labels).toEqual(['New', 'Like New', 'Good', 'Used']);
  });

  it('CONDITIONS values match expected enum values', () => {
    const values = CONDITIONS.map((c) => c.value);
    expect(values).toEqual(['New', 'Like_new', 'Good', 'Used']);
  });

  it('AVATAR_DEFAULT is a valid URL', () => {
    expect(AVATAR_DEFAULT).toMatch(/^https:\/\//);
  });
});
