import { getMonthNextDate, getReocurrences } from "./event";
import { FrequencyType, OnWeekDay, UserActionType } from "@careminder/shared/types";
import { last } from "lodash";

describe('getMonthNextDate', () => {
    const baseMonthly = {
        frequency: 1,
        frequency_type: FrequencyType.MONTH,
        end_date: new Date(2024, 11, 31),
    };

    const firstOfFeb = new Date(2024, 1, 1);
    const firstOfSep = new Date(2024, 8, 1);

    describe('weekly-based', () => {
        test('first day', () => {

            const result = getMonthNextDate({
                ...baseMonthly,
                on_month: { title: '', day: 1 },

            }, new Date(2024, 0, 1));
            expect(result).toStrictEqual(new Date(2024, 0, 1));
        });

        test('mid month', () => {
            const result = getMonthNextDate({
                ...baseMonthly,
                on_month: { title: '', day: 16 },

            }, new Date(2024, 0, 1));
            expect(result).toStrictEqual(new Date(2024, 0, 16));
        });

        test('match last day', () => {
            const result = getMonthNextDate({
                ...baseMonthly,
                on_month: { title: '', day: 29 },

            }, firstOfFeb);
            expect(result).toStrictEqual(new Date(2024, 1, 29));
        });

        test('over last day day', () => {
            const result = getMonthNextDate({
                ...baseMonthly,
                on_month: { title: '', day: 31 },

            }, firstOfFeb);
            expect(result).toStrictEqual(new Date(2024, 1, 29));
        });
    });

    describe('weekly-based', () => {
        describe('first week', () => {
            test('on first day', () => {
                const result = getMonthNextDate({
                    ...baseMonthly,
                    on_month: { title: '', weekDay: OnWeekDay.THURSDAY, weekNumber: 1 },

                }, firstOfFeb);
                expect(result).toStrictEqual(firstOfFeb);
            });

            test('after, same next week', () => {
                const result = getMonthNextDate({
                    ...baseMonthly,
                    on_month: { title: '', weekDay: OnWeekDay.SATURDAY, weekNumber: 1 },

                }, firstOfFeb);
                expect(result).toStrictEqual(new Date(2024, 1, 3));
            });

            test('after, on next week', () => {
                const result = getMonthNextDate({
                    ...baseMonthly,
                    on_month: { title: '', weekDay: OnWeekDay.TUESDAY, weekNumber: 1 },

                }, firstOfFeb);
                expect(result).toStrictEqual(new Date(2024, 1, 6));
            });
        })

        describe('mid week', () => {
            test('same weekday', () => {
                const result = getMonthNextDate({
                    ...baseMonthly,
                    on_month: { title: '', weekDay: OnWeekDay.THURSDAY, weekNumber: 2 },

                }, firstOfFeb);
                expect(result).toStrictEqual(new Date(2024, 1, 8));
            });

            test('after first weekday', () => {
                const result = getMonthNextDate({
                    ...baseMonthly,
                    on_month: { title: '', weekDay: OnWeekDay.THURSDAY, weekNumber: 3 },

                }, firstOfFeb);
                expect(result).toStrictEqual(new Date(2024, 1, 15));
            });

            test('before first weekday', () => {
                const result = getMonthNextDate({
                    ...baseMonthly,
                    on_month: { title: '', weekDay: OnWeekDay.TUESDAY, weekNumber: 4 },

                }, firstOfFeb);
                expect(result).toStrictEqual(new Date(2024, 1, 27));
            });
        })

        describe('last week', () => {
            test('same weekday', () => {
                const result = getMonthNextDate({
                    ...baseMonthly,
                    on_month: { title: '', weekDay: OnWeekDay.SUNDAY, weekNumber: 5 },

                }, firstOfSep);
                expect(result).toStrictEqual(new Date(2024, 8, 29));
            });

            test('after initial weekday', () => {
                const result = getMonthNextDate({
                    ...baseMonthly,
                    on_month: { title: '', weekDay: OnWeekDay.MONDAY, weekNumber: 5 },

                }, firstOfSep);
                expect(result).toStrictEqual(new Date(2024, 8, 30));
            });

            test('before initial weekday', () => {
                const result = getMonthNextDate({
                    ...baseMonthly,
                    on_month: { title: '', weekDay: OnWeekDay.TUESDAY, weekNumber: 5 },

                }, new Date(2024,8,27));
                expect(result).toStrictEqual(new Date(2024, 8, 24));
            });
        })
    })
});

describe("getReocurrences", () => {
    test('yearly', () => {
        const result = getReocurrences({
            action_id: 1,
            type: UserActionType.REMINDER,
            all_day: false,
            recurrence: true,
            start_at: new Date(2024,2,28,12,10),
            end_at: new Date(2024,2,28,12,20),
            frequency: {
                frequency: 1,
                frequency_type: FrequencyType.YEAR,
                end_date: new Date(2033,2,28,12,10),
            }
        });
        expect(result.length).toBe(10);
        expect(result[1]?.start_at).toStrictEqual(new Date(2025,2,28,12,10));
        expect(last(result)?.start_at).toStrictEqual(new Date(2033,2,28,12,10));
    });

    test('montly', () => {
        const result = getReocurrences({
            action_id: 1,
            type: UserActionType.REMINDER,
            all_day: false,
            recurrence: true,
            start_at: new Date(2024,7,27,12,10),
            end_at: new Date(2024,7,27,12,20),
            frequency: {
                frequency: 1,
                frequency_type: FrequencyType.MONTH,
                on_month: { title: '', weekNumber: 6, weekDay: OnWeekDay.TUESDAY },
                end_date: new Date(2025,12,31),
            }
        });
        expect(result.length).toBe(18);
        const expectedDate = [
            new Date(2024,7,27,12,10),
            new Date(2024,8,24,12,10),
            new Date(2024,9,29,12,10),
            new Date(2024,10,26,12,10),
            new Date(2024,11,31,12,10),
            new Date(2025,0,28,12,10),
            new Date(2025,1,25,12,10),
            new Date(2025,2,25,12,10),
            new Date(2025,3,29,12,10),
            new Date(2025,4,27,12,10),
            new Date(2025,5,24,12,10),
            new Date(2025,6,29,12,10),
            new Date(2025,7,26,12,10),
            new Date(2025,8,30,12,10),
            new Date(2025,9,28,12,10),
            new Date(2025,10,25,12,10),
            new Date(2025,11,30,12,10),
        ];
        expectedDate.forEach((item, i) => {
            expect(result[i]?.start_at).toStrictEqual(item);

        })
    });
})