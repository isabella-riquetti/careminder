import { CreateUserAction, FrequencyType, UserActionFrequency } from "@careminder/shared/types";
import { add, addDays, addMinutes, addMonths, addWeeks, addYears, differenceInMinutes, endOfDay, endOfMonth, lastDayOfMonth, setDate, setDay, startOfDay, startOfMonth } from "date-fns";

export function getReocurrences(userAction: CreateUserAction): CreateUserAction[] {
    const allReocurrences: CreateUserAction[] = [];

    if (!userAction.recurrence || !userAction.frequency) return [userAction];

    const minutesDiff = userAction.end_at ? differenceInMinutes(userAction.end_at, userAction.start_at) : 0;
    let nextStart = userAction.start_at;
    const end = endOfDay(userAction.frequency.end_date);
    while (nextStart <= end) {
        const newDates = getOnNextDates(userAction, nextStart);
        newDates.forEach((newDate) => {
            if (newDate <= end) {
                allReocurrences.push({
                    ...userAction,
                    start_at: newDate,
                    ...(minutesDiff ? { end_at: addMinutes(newDate, minutesDiff) } : {})
                })
            }
        })
        nextStart = getNextStart(userAction.frequency, nextStart);
    }


    return allReocurrences;
}

function getNextStart(frequency: UserActionFrequency, currentDate: Date): Date {
    if (frequency.frequency_type === FrequencyType.DAY) {
        return addDays(startOfDay(currentDate), frequency.frequency);
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

function getOnNextDates(userAction: CreateUserAction, initialDate: Date): Date[] {
    const { frequency } = userAction;
    if (frequency?.frequency_type === FrequencyType.YEAR) {
        return [initialDate];
    }
    if (frequency?.frequency_type === FrequencyType.MONTH) {
        const nextDate = getNextDayOfTheMonth(frequency, initialDate);
        return [nextDate];
    }
    if (frequency?.frequency_type === FrequencyType.WEEK) {
        return getNextDaysOfTheWeek(frequency, initialDate);
    }

    if (frequency?.frequency_type === FrequencyType.DAY) {
        return getNextDayTimes(frequency, initialDate);
    }

    return [];
}

export function getNextDayOfTheMonth(frequency: UserActionFrequency, initialDate: Date): Date {
    const time = differenceInMinutes(initialDate, startOfDay(initialDate));
    const montlySettings = frequency.on_month;
    if (montlySettings?.day) {
        const day = montlySettings.day;
        const lastDay = lastDayOfMonth(initialDate).getDate();
        const safeDay = day > lastDay ? lastDay : day;
        return setDate(initialDate, safeDay);
    }
    if (montlySettings?.weekDay !== undefined && montlySettings.weekNumber) {
        const firstDayOfMonth = startOfMonth(initialDate);
        const lastDayOfMonth = startOfDay(endOfMonth(initialDate));
        let weeks = montlySettings.weekNumber - 1;

        let firstOccurrence = setDay(firstDayOfMonth, montlySettings.weekDay, { weekStartsOn: 0 });
        if (firstOccurrence < firstDayOfMonth) firstOccurrence = addDays(firstOccurrence, 7);

        let lastOcurrence = setDay(lastDayOfMonth, montlySettings.weekDay, { weekStartsOn: 0 });
        if (lastOcurrence > lastDayOfMonth) lastOcurrence = addDays(lastOcurrence, -7);

        const targetDate = addWeeks(firstOccurrence, weeks);
        if (targetDate > lastOcurrence) return addMinutes(lastOcurrence, time);
        return addMinutes(targetDate, time);;
    }


    return initialDate;
}

export function getNextDaysOfTheWeek(frequency: UserActionFrequency, initialDate: Date): Date[] {
    const validWeekDays = frequency?.on_week;
    const endDate = addWeeks(initialDate, 1);
    let newDate = initialDate;
    const newDates: Date[] = [];
    while (newDate < endDate) {
        if (validWeekDays?.includes(newDate.getDay())) newDates.push(newDate);
        newDate = addDays(newDate, 1);
    }
    return newDates;
}

export function getNextDayTimes(frequency: UserActionFrequency, initialDate: Date): Date[] {
    const validTimes = frequency?.on_day;
    if (!validTimes) return [initialDate];

    let newDate = startOfDay(initialDate);
    const newDates: Date[] = validTimes?.map(v => {
        return add(newDate, {
            hours: v.getHours(),
            minutes: v.getMinutes(),
        });
    })
    return newDates.filter(f => f >= initialDate);
}