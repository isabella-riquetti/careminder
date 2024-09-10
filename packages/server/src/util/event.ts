import { UserActionType, Category, FrequencyType, OnWeekDay, UserAction, Frequency, UserActionFrequency } from "@careminder/shared/types";
import { addDays, addMonths, addWeeks, addYears, lastDayOfMonth, setDate, startOfMonth } from "date-fns";

export function getReocurrences(userAction: UserAction): UserAction[] {

    const allReocurrences = [userAction];
    if (userAction.recurrence && userAction.frequency) {
        let currentDate = userAction.start_at;
        const next = getNextOcurrence(userAction.frequency, currentDate);
        // while(next) {
        //     const nextDates = 
        // }
    }


    return allReocurrences;
}

function getNextOcurrence(frequency: UserActionFrequency, currentDate: Date): Date | undefined {
    if (frequency.frequency_type === FrequencyType.DAY) {
        return addDays(currentDate, frequency.frequency);
    }
    if (frequency.frequency_type === FrequencyType.WEEK) {
        return addWeeks(currentDate, frequency.frequency);
    }
    if (frequency.frequency_type === FrequencyType.MONTH) {
        return addMonths(startOfMonth(currentDate), frequency.frequency);
    }
    if (frequency.frequency_type === FrequencyType.YEAR) {
        return addYears(currentDate, frequency.frequency);
    }
}

// function getOnNextDates(frequency: UserActionFrequency, initialDate: Date): Date | undefined {
//     if (frequency.frequency_type === FrequencyType.MONTH) {
//         return addDays(currentDate, frequency.frequency);
//     }
// }

export function getMonthNextDate(frequency: UserActionFrequency, initialDate: Date) {
    if(frequency.on_month?.day) {
        const day = frequency.on_month.day;
        const lastDay = lastDayOfMonth(initialDate).getDate();
        const safeDay = day > lastDay ? lastDay : day;
        return setDate(initialDate, safeDay);
    }
    return frequency;
}