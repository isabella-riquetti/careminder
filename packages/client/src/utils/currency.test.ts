import { formatToCurrency } from './currency';

describe('formatToCurrency', () => {
    it('should format a number to USD currency by default', () => {
        const result = formatToCurrency(1234.56);
        expect(result).toBe('$1,234.56');
    });

    it('should format a number to USD currency with en-US locale', () => {
        const result = formatToCurrency(1234.56, 'en-US', 'USD');
        expect(result).toBe('$1,234.56');
    });

    it('should format a number to EUR currency with de-DE locale', () => {
        const result = formatToCurrency(1234.56, 'de-DE', 'EUR');
        expect(result).toBe('1.234,56 €');
    });

    it('should format a number to JPY currency with ja-JP locale', () => {
        const result = formatToCurrency(1234, 'ja-JP', 'JPY');
        expect(result).toBe('￥1,234');
    });

    it('should format a negative number correctly', () => {
        const result = formatToCurrency(-1234.56, 'en-US', 'USD');
        expect(result).toBe('-$1,234.56');
    });

    it('should format zero correctly', () => {
        const result = formatToCurrency(0, 'en-US', 'USD');
        expect(result).toBe('$0.00');
    });

    it('should format a large number correctly', () => {
        const result = formatToCurrency(1234567890.12, 'en-US', 'USD');
        expect(result).toBe('$1,234,567,890.12');
    });

    it('should handle different locales with default currency', () => {
        const result = formatToCurrency(1234.56, 'fr-FR');
        expect(result).toBe('1 234,56 $US'); // The exact format may vary based on the environment's locale data
    });

    it('should format a number with a custom currency symbol', () => {
        const result = formatToCurrency(1234.56, 'en-GB', 'GBP');
        expect(result).toBe('£1,234.56');
    });
});
