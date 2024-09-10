import { FrequencyType } from "@careminder/shared/types";
import { addYears, getDate, getDay } from "date-fns";

export function getWeekOfMonth(date: Date) {
    const dayOfMonth = getDate(date);    
    return Math.ceil(dayOfMonth / 7);
}

export function weekDayHasPassed(date: Date, dayOfTheWeek: number) {
    const currentDay = getDay(date);
    
    return currentDay >= dayOfTheWeek;
}

export function calcMaxEndDate(frequencyType: FrequencyType, date: Date) {
    if(frequencyType === FrequencyType.YEAR) return addYears(date, 100);
    if(frequencyType === FrequencyType.MONTH) return addYears(date, 10);
    if(frequencyType === FrequencyType.WEEK) return addYears(date, 2);
    if(frequencyType === FrequencyType.DAY) return addYears(date, 1);
    return date;
}