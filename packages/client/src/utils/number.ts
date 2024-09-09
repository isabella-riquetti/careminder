export function numberToOrdinal(num: number) {
    const ordinals = ['first', 'second', 'third'];

    if (num <= 3) {
        return ordinals[num - 1];
    }

    return `${num}th`;
}