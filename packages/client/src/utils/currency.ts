export function formatToCurrency(value: number, locale: string = 'en-US', currency: string = 'USD'): string {
    if(value === 0) return "Free";
    return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value);
}