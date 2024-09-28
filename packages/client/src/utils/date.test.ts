import { FrequencyType } from '@careminder/shared/types';
import { addYears, getDate, getDay } from 'date-fns';
import { describe, expect, it, vi } from 'vitest';

import { calcMaxEndDate,getWeekOfMonth, weekDayHasPassed } from './date';

vi.mock('date-fns', () => ({
    addYears: vi.fn(),
    getDate: vi.fn(),
    getDay: vi.fn(),
}));

describe('getWeekOfMonth', () => {
    it('should calculate the correct week of the month', () => {
        vi.mocked(getDate).mockReturnValue(10);

        const date = new Date(2024, 0, 10); // January 10, 2024
        const week = getWeekOfMonth(date);
        expect(week).toBe(2); // 10th of the month is in the 2nd week

        expect(getDate).toHaveBeenCalledWith(date);
    });

    it('should return the first week for dates in the first 7 days', () => {
        vi.mocked(getDate).mockReturnValue(5);

        const date = new Date(2024, 0, 5); // January 5, 2024
        const week = getWeekOfMonth(date);
        expect(week).toBe(1);

        expect(getDate).toHaveBeenCalledWith(date);
    });
});

describe('weekDayHasPassed', () => {
    it('should return true if the current day of the week is greater than or equal to the target day', () => {
        vi.mocked(getDay).mockReturnValue(5); // Friday

        const date = new Date(2024, 0, 12); // January 12, 2024 (Friday)
        const result = weekDayHasPassed(date, 3); // Wednesday
        expect(result).toBe(true); // Friday >= Wednesday

        expect(getDay).toHaveBeenCalledWith(date);
    });

    it('should return false if the current day of the week is less than the target day', () => {
        vi.mocked(getDay).mockReturnValue(2); // Tuesday

        const date = new Date(2024, 0, 9); // January 9, 2024 (Tuesday)
        const result = weekDayHasPassed(date, 4); // Thursday
        expect(result).toBe(false); // Tuesday < Thursday

        expect(getDay).toHaveBeenCalledWith(date);
    });
});

describe('calcMaxEndDate', () => {
    it('should add 100 years for YEAR frequency', () => {
        const date = new Date(2024, 0, 1); // January 1, 2024
        const expectedDate = new Date(2124, 0, 1); // January 1, 2124

        vi.mocked(addYears).mockReturnValue(expectedDate);

        const result = calcMaxEndDate(FrequencyType.YEAR, date);
        expect(result).toBe(expectedDate);

        expect(addYears).toHaveBeenCalledWith(date, 100);
    });

    it('should add 10 years for MONTH frequency', () => {
        const date = new Date(2024, 0, 1);
        const expectedDate = new Date(2034, 0, 1);

        vi.mocked(addYears).mockReturnValue(expectedDate);

        const result = calcMaxEndDate(FrequencyType.MONTH, date);
        expect(result).toBe(expectedDate);

        expect(addYears).toHaveBeenCalledWith(date, 10);
    });

    it('should add 2 years for WEEK frequency', () => {
        const date = new Date(2024, 0, 1);
        const expectedDate = new Date(2026, 0, 1);

        vi.mocked(addYears).mockReturnValue(expectedDate);

        const result = calcMaxEndDate(FrequencyType.WEEK, date);
        expect(result).toBe(expectedDate);

        expect(addYears).toHaveBeenCalledWith(date, 2);
    });

    it('should add 1 year for DAY frequency', () => {
        const date = new Date(2024, 0, 1);
        const expectedDate = new Date(2025, 0, 1);

        vi.mocked(addYears).mockReturnValue(expectedDate);

        const result = calcMaxEndDate(FrequencyType.DAY, date);
        expect(result).toBe(expectedDate);

        expect(addYears).toHaveBeenCalledWith(date, 1);
    });

    it('should return the original date if frequency type is unknown', () => {
        const date = new Date(2024, 0, 1);

        const result = calcMaxEndDate('UNKNOWN' as FrequencyType, date);
        expect(result).toBe(date);
    });
});
