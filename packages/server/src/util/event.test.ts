import { getMonthNextDate } from "./event";
import { FrequencyType } from "@careminder/shared/types";

describe('getMonthNextDate', () => {
    const baseMonthly = {
        frequency: 1,
        frequency_type: FrequencyType.MONTH,
        endDate: new Date(2024, 11, 31),
    };

    test('first day', () => {

        const result = getMonthNextDate({
            ...baseMonthly,
            on_month: { title: '', day: 1 },

        }, new Date(2024, 0, 1));
        expect(result).toStrictEqual(new Date(2024,0,1));
    });

    test('random day', () => {
        const result = getMonthNextDate({
            ...baseMonthly,
            on_month: { title: '', day: 16 },

        }, new Date(2024, 0, 1));
        expect(result).toStrictEqual(new Date(2024,0,16));
    });

    test('last day day', () => {
        const result = getMonthNextDate({
            ...baseMonthly,
            on_month: { title: '', day: 28 },

        }, new Date(2024, 1, 1));
        expect(result).toStrictEqual(new Date(2024,1,28));
    });

    test('over last day day', () => {
        const result = getMonthNextDate({
            ...baseMonthly,
            on_month: { title: '', day: 31 },

        }, new Date(2024, 1, 1));
        expect(result).toStrictEqual(new Date(2024,1,29));
    });
});