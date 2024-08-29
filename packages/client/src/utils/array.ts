export function joinWithCommaAnd(array: string[]) {
    if (array.length < 2) return array.join(', ');
    if (array.length === 2) return array.join(' and ');

    return array.slice(0, -1).join(', ') + ', and ' + array[array.length - 1];
}