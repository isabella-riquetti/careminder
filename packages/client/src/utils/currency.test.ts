import { formatToCurrency } from './currency';
import { describe, it, expect } from 'vitest';

describe('formatToCurrency', () => {
    it('should format a number to USD currency by default', () => {
        const result = formatToCurrency(1234.56);
        expect(result).toBe('$1,235');
    });

    it('should format a number to USD currency with en-US locale', () => {
        const result = formatToCurrency(1234.56, 'en-US', 'USD');
        expect(result).toBe('$1,235');
    });

    it('should format a number to JPY currency with ja-JP locale', () => {
        const result = formatToCurrency(1234, 'ja-JP', 'JPY');
        expect(result).toBe('￥1,234');
    });

    it('should format a negative number correctly', () => {
        const result = formatToCurrency(-1234.56, 'en-US', 'USD');
        expect(result).toBe('-$1,235');
    });

    it('should format zero correctly', () => {
        const result = formatToCurrency(0, 'en-US', 'USD');
        expect(result).toBe('$0');
    });

    it('should format a large number correctly', () => {
        const result = formatToCurrency(1234567890.12, 'en-US', 'USD');
        expect(result).toBe('$1,234,567,890');
    });
    it('should format a number with a custom currency symbol', () => {
        const result = formatToCurrency(1234.56, 'en-GB', 'GBP');
        expect(result).toBe('£1,235');
    });
});
