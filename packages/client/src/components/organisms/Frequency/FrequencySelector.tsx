/* eslint-disable @typescript-eslint/no-explicit-any */
import { FrequencyType, OnDayHour, OnWeekDay, UserActionFrequency, UserActionType } from '@careminder/shared/types';
import { Button, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import cn from 'classnames';
import { addDays, addMinutes, endOfDay, format, isBefore, startOfWeek } from 'date-fns';
import { set as setObj, without } from "lodash";
import pluralize from "pluralize";
import { InputNumber, InputNumberValueChangeEvent } from "primereact/inputnumber";
import React, { useCallback, useEffect, useState } from 'react';

import HabitSwitch from '@/components/atoms/HabitSwitch';

interface FrequencySelectorProps {
    type: UserActionType;
    isHabit: boolean;
    setIsHabit: React.Dispatch<React.SetStateAction<boolean>>;
    startDate: Date;
    endDate?: Date;
    frequency?: UserActionFrequency;
    setFrequency: React.Dispatch<React.SetStateAction<UserActionFrequency | undefined>>;
}

export default function FrequencySelector({ type, frequency, setFrequency, isHabit, setIsHabit, startDate, endDate }: FrequencySelectorProps) {
    const [timeIntervals, setTimeIntervals] = useState<Date[]>([]);

    const handleFrequencyChange = useCallback((path: string, value: any) => {
        setFrequency((prev?: any) => {
            const newItem = { ...prev };
            setObj(newItem ?? {}, path, value);
            return newItem;
        });
    }, [setFrequency]);

    const hasOnFrequency = (value: OnDayHour | OnWeekDay | Date) => {
        return frequency?.on?.includes(value);
    }

    const toggleOnFrequency = (value: OnDayHour | OnWeekDay | Date) => {
        setFrequency((prev?: any) => ({
            ...prev,
            on: prev?.on?.includes(value) ? without(prev?.on ?? [], value) : [...prev?.on ?? [], value]
        }));
    }

    const start = startOfWeek(new Date(), { weekStartsOn: 0 });

    useEffect(() => {
        if (frequency?.frequency_type === FrequencyType.DAY) {
            const dates: Date[] = [];
            const end = endDate && type === UserActionType.TASK ? endDate : endOfDay(startDate);
            let current = startDate;
            while (isBefore(current, end) || current.getTime() === end.getTime()) {
                dates.push(current);
                current = addMinutes(current, 60);
            }

            setTimeIntervals(dates);
        }
    }, [endDate, frequency?.frequency_type, handleFrequencyChange, startDate, type])

    useEffect(() => {
        handleFrequencyChange('on', [
            ...(frequency?.frequency_type === FrequencyType.DAY ? [startDate] : [])
        ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [frequency?.frequency_type, handleFrequencyChange])

    return (
        <div className="flex gap-3 ">
            <HabitSwitch
                isHabit={isHabit}
                setIsHabit={setIsHabit} />
            {isHabit && frequency && <div className='flex flex-col gap-4'>
                <div className="flex gap-2 items-center">
                    <span className=" text-pale-400">Every: </span>
                    <InputNumber
                        value={frequency?.frequency}
                        onValueChange={(e: InputNumberValueChangeEvent) => handleFrequencyChange('frequency', Number(e.value))}
                        mode="decimal"
                        showButtons
                        min={1}
                        max={999}
                    />
                    <Select
                        value={frequency?.frequency_type}
                        onChange={(event: SelectChangeEvent<FrequencyType>) => handleFrequencyChange('frequency_type', event.target.value as FrequencyType)}
                    >
                        <MenuItem value={FrequencyType.DAY}>{pluralize("Day", frequency?.frequency)}</MenuItem>
                        <MenuItem value={FrequencyType.WEEK}>{pluralize("Week", frequency?.frequency)}</MenuItem>
                        <MenuItem value={FrequencyType.MONTH}>{pluralize("Month", frequency?.frequency)}</MenuItem>
                        <MenuItem value={FrequencyType.YEAR}>{pluralize("Year", frequency?.frequency)}</MenuItem>
                    </Select>
                </div>

                {frequency?.frequency_type === FrequencyType.DAY &&
                    <>
                        <div className="flex gap-3 items-center">
                            <span className="text-pale-400">Times a day: </span>
                            <div className="flex gap-2 cursor-pointer">
                                <InputNumber
                                    value={frequency?.on_times}
                                    onValueChange={(e: InputNumberValueChangeEvent) => handleFrequencyChange('on_times', Number(e.value))}
                                    mode="decimal"
                                    showButtons
                                    defaultValue={1}
                                    min={1}
                                    max={24}
                                />
                            </div>
                        </div>
                        <div className="flex gap-3 items-center">
                            <span className="text-pale-400">At: </span>
                            <div className="flex gap-2 cursor-pointer flex-wrap">
                                {timeIntervals.map((t) => (
                                    <Button
                                        disabled={t === startDate}
                                        className="cursor-default disabled:bg-pink-400 disabled:text-white"
                                        key={t.toString()}
                                        variant={hasOnFrequency(t) ? 'contained' : 'outlined'}
                                        onClick={() => toggleOnFrequency(t)}
                                    >
                                        {format(t, 'hh:mm')}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </>
                }

                {(frequency?.frequency_type === FrequencyType.WEEK) &&
                    <div className="flex gap-3 items-center">
                        <span className="text-pale-400">On: </span>
                        <div className="flex gap-2 cursor-pointer">
                            {Array.from({ length: 7 }).map((_, i) => (
                                <Button
                                    sx={{
                                        '&:hover': {
                                            background: 'primary.main'
                                        },
                                        borderWidth: '1px',
                                        borderStyle: 'solid',
                                        borderColor: 'primary.main',
                                        minWidth: "0px",
                                        padding: '0px',
                                    }}
                                    key={i.toString()}
                                    className={cn('rounded-full border border-pale-400 min-w-0 w-6 h-6 justify-center items-center flex', {
                                        'bg-pink-500 text-white': hasOnFrequency(i as OnWeekDay)
                                    })}

                                    onClick={() => toggleOnFrequency(i as OnWeekDay)} >
                                    <span>{format(addDays(start, Number(i)), 'EEEEE')}</span>
                                </Button>
                            ))}
                        </div>
                    </div>}
            </div>}
        </div>
    )
}
