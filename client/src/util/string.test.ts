import { describe, it, expect } from 'vitest';
import { checkIfEmpty } from './string';

describe('TEMP - heckIfEmpty', () => {
  it('should return true for an empty string', () => {
    const result = checkIfEmpty('');
    expect(result).toBe(true);
  });
});
