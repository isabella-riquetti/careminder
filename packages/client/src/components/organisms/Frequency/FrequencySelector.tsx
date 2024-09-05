/* eslint-disable @typescript-eslint/no-explicit-any */
import { FrequencyType, OnDayHour, OnWeekDay, UserActionFrequency } from '@careminder/shared/types';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import cn from 'classnames';
import { addDays, format, startOfWeek } from 'date-fns';
import { set as setObj, without } from "lodash";
import pluralize from "pluralize";
import { InputNumber, InputNumberValueChangeEvent } from "primereact/inputnumber";
import React from 'react';

import { DayIcon, DayPlainIcon, NightIcon, NightPlainIcon } from "@/assets/icons/frequency";
import HabitSwitch from '@/components/atoms/HabitSwitch';

interface FrequencySelectorProps {
    isHabit: boolean;
    setIsHabit: React.Dispatch<React.SetStateAction<boolean>>;
    startDate: Date;
    endDate?: Date;
    frequency?: UserActionFrequency;
    setFrequency: React.Dispatch<React.SetStateAction<UserActionFrequency | undefined>>;
}

export default function FrequencySelector({ frequency, setFrequency, isHabit, setIsHabit }: FrequencySelectorProps) {
    const handleFrequencyChange = (path: string, value: any) => {
        setFrequency((prev?: any) => {
            const newItem = { ...prev };
            setObj(newItem ?? {}, path, value);
            return newItem;
        });
    }

    const hasOnFrequency = (value: OnDayHour | OnWeekDay) => {
        return frequency?.on?.includes(value);
    }

    const toggleOnFrequency = (value: OnDayHour | OnWeekDay) => {
        setFrequency((prev?: any) => ({
            ...prev,
            on: prev?.on?.includes(value) ? without(prev?.on ?? [], value) : [...prev?.on ?? [], value]
        }));
    }

    const start = startOfWeek(new Date(), { weekStartsOn: 0 });

    return (
        <>
            <div className="flex gap-3 ">
                <HabitSwitch
                    isHabit={isHabit}
                    setIsHabit={setIsHabit} />
                {isHabit && frequency && <>
                    <div className='flex flex-col gap-4'>
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
                                <MenuItem value={FrequencyType.HOUR}>{pluralize("Hour", frequency?.frequency)}</MenuItem>
                                <MenuItem value={FrequencyType.DAY}>{pluralize("Day", frequency?.frequency)}</MenuItem>
                                <MenuItem value={FrequencyType.WEEK}>{pluralize("Week", frequency?.frequency)}</MenuItem>
                                <MenuItem value={FrequencyType.MONTH}>{pluralize("Month", frequency?.frequency)}</MenuItem>
                                <MenuItem value={FrequencyType.YEAR}>{pluralize("Year", frequency?.frequency)}</MenuItem>
                            </Select>
                        </div>

                        {(frequency?.frequency_type === FrequencyType.HOUR || frequency?.frequency_type === FrequencyType.DAY) &&
                            <div className="flex gap-3 items-center">
                                <span className="text-pale-400">During: </span>
                                <div className="flex gap-2 cursor-pointer">
                                    {hasOnFrequency(OnDayHour.DAY)
                                        ? <DayIcon className="w-6 h-6" onClick={() => toggleOnFrequency(OnDayHour.DAY)} />
                                        : <DayPlainIcon className="w-6 h-6" onClick={() => toggleOnFrequency(OnDayHour.DAY)} />}
                                    {hasOnFrequency(OnDayHour.NIGHT)
                                        ? <NightIcon className="w-6 h-6" onClick={() => toggleOnFrequency(OnDayHour.NIGHT)} />
                                        : <NightPlainIcon className="w-6 h-6" onClick={() => toggleOnFrequency(OnDayHour.NIGHT)} />}
                                </div>
                            </div>}

                        {(frequency?.frequency_type === FrequencyType.WEEK) &&
                            <div className="flex gap-3 items-center">
                                <span className="text-pale-400">On: </span>
                                <div className="flex gap-2 cursor-pointer">
                                    {Object.values(OnWeekDay).map((i) => (
                                        <div
                                            key={i}
                                            className={cn('rounded-full border border-pale-400 w-6 h-6 justify-center items-center flex', {
                                                'bg-pink-500 text-white': hasOnFrequency(i as OnWeekDay)
                                            })}
                                            onClick={() => toggleOnFrequency(i as OnWeekDay)} >
                                            {format(addDays(start, Number(i)), 'EEEEE')}
                                        </div>
                                    ))}
                                </div>
                            </div>}
                    </div>
                </>}
            </div>
        </>
    )
}
