import { FrequencyType, OnWeekDay, UserAction, UserActionFrequency } from "@careminder/shared/types";
import { addDays, addMinutes, addMonths, addWeeks, addYears, differenceInMinutes, endOfMonth, getWeekOfMonth, isSameMonth, lastDayOfMonth, setDate, setDay, startOfDay, startOfMonth, startOfWeek } from "date-fns";

export function getReocurrences(userAction: UserAction): UserAction[] {

    const allReocurrences = [userAction];
    if (userAction.recurrence && userAction.frequency) {
       const minutesDiff = userAction.end_at ? differenceInMinutes(userAction.end_at, userAction.start_at) : 0; 
        let nextStart = getNextOcurrence(userAction.frequency, userAction.start_at);
        while(nextStart <= userAction.frequency.end_date) {
            const newDates = getOnNextDates(userAction.frequency, nextStart);
            newDates.forEach((newDate) => {
                if(newDate <= userAction.frequency!.end_date) {
                    allReocurrences.push({
                        ...userAction,
                        start_at: newDate,
                        ...(minutesDiff ? { end_at: addMinutes(newDate, minutesDiff) } : {})

                    })
                }
            })
            nextStart = getNextOcurrence(userAction.frequency, nextStart);
        }
    }


    return allReocurrences;
}

function getNextOcurrence(frequency: UserActionFrequency, currentDate: Date): Date {
    if (frequency.frequency_type === FrequencyType.DAY) {
        return addDays(currentDate, frequency.frequency);
    }
    if (frequency.frequency_type === FrequencyType.WEEK) {
        return addWeeks(currentDate, frequency.frequency);
    }
    if (frequency.frequency_type === FrequencyType.MONTH) {
        return addMonths(currentDate, frequency.frequency);
    }
    if (frequency.frequency_type === FrequencyType.YEAR) {
        return addYears(currentDate, frequency.frequency);
    }

    return currentDate;
}

function getOnNextDates(frequency: UserActionFrequency, initialDate: Date): Date[] {
    if (frequency.frequency_type === FrequencyType.YEAR) {
        return [initialDate];
    }
    if (frequency.frequency_type === FrequencyType.MONTH) {
        return [getMonthNextDate(frequency, initialDate)];
    }

    return [];
}

export function getMonthNextDate(frequency: UserActionFrequency, initialDate: Date) {
    const montlySettings = frequency.on_month;
    if (montlySettings?.day) {
        const day = montlySettings.day;
        const lastDay = lastDayOfMonth(initialDate).getDate();
        const safeDay = day > lastDay ? lastDay : day;
        return setDate(initialDate, safeDay);
    }
    if (montlySettings?.weekDay !== undefined && montlySettings.weekNumber) {
        const lastDayOfMonth = endOfMonth(initialDate);
        const firstDayOfMonth = startOfMonth(initialDate);

        let firstOccurrence = setDay(firstDayOfMonth, montlySettings.weekDay, { weekStartsOn: 0 });
        if (firstOccurrence < firstDayOfMonth) {
            firstOccurrence = addDays(firstOccurrence, 7);
        }

        const targetDate = addDays(firstOccurrence, (montlySettings.weekNumber - 1) * 7);
        if (targetDate > lastDayOfMonth) return addDays(targetDate, -7);
        return targetDate;
    }


    return initialDate;
}
