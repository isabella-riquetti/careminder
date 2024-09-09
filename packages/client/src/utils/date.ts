import { getDate, getDay } from "date-fns";

export function getWeekOfMonth(date: Date) {
    const dayOfMonth = getDate(date);    
    return Math.ceil(dayOfMonth / 7);
}

export function weekDayHasPassed(date: Date, dayOfTheWeek: number) {
    const currentDay = getDay(date);
    
    return currentDay >= dayOfTheWeek;
}