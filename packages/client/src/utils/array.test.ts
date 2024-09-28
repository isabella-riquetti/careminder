import { describe, expect,it } from 'vitest';

import { joinWithCommaAnd } from './array';

describe('joinWithCommaAnd', () => {
    it('should return an empty string when the array is empty', () => {
        const result = joinWithCommaAnd([]);
        expect(result).toBe('');
    });

    it('should return the single element when the array has one element', () => {
        const result = joinWithCommaAnd(['apple']);
        expect(result).toBe('apple');
    });

    it('should join two elements with "and"', () => {
        const result = joinWithCommaAnd(['apple', 'banana']);
        expect(result).toBe('apple and banana');
    });

    it('should join three elements with commas and "and" before the last element', () => {
        const result = joinWithCommaAnd(['apple', 'banana', 'cherry']);
        expect(result).toBe('apple, banana, and cherry');
    });

    it('should join multiple elements with commas and "and" before the last element', () => {
        const result = joinWithCommaAnd(['apple', 'banana', 'cherry', 'date']);
        expect(result).toBe('apple, banana, cherry, and date');
    });

    it('should handle elements with empty strings properly', () => {
        const result = joinWithCommaAnd(['apple', '', 'cherry']);
        expect(result).toBe('apple, , and cherry');
    });
});
