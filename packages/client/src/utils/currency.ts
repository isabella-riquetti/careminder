export function formatToCurrency(value: number, locale: string = 'en-US', currency: string = 'USD'): string {
    return new Intl.NumberFormat(locale, { 
        style: 'currency', 
        currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(value);
}


export function rangeCurrency(start?: number, end?: number) {
    if (!start && !end) return "Free";
    if (!start && end) return `Free - ${formatToCurrency(end)}`;

    return `${formatToCurrency(start!)} to ${formatToCurrency(end!)}`;
}