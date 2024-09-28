import { inRange } from "lodash";

export function numberToOrdinal(num: number): string {
    const ordinals = ['first', 'second', 'third'];

    if (num <= 3) return ordinals[num - 1];

    const lastTwoDigits = num % 100;
    const lastDigit = num % 10;

    if (inRange(lastTwoDigits, 11, 14)) {
        return `${num}th`;
    }

    switch (lastDigit) {
        case 1:
            return `${num}st`;
        case 2:
            return `${num}nd`;
        case 3:
            return `${num}rd`;
        default:
            return `${num}th`;
    }
}
