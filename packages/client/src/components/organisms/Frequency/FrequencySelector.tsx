/* eslint-disable @typescript-eslint/no-explicit-any */
import { FrequencyType, OnDayHour, UserActionFrequency } from '@careminder/shared/types';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { set as setObj, without } from "lodash";
import pluralize from "pluralize";
import { InputNumber, InputNumberValueChangeEvent } from "primereact/inputnumber";
import React from 'react';

import { DayIcon, DayPlainIcon, NightIcon, NightPlainIcon } from "@/assets/icons/frequency";

import { SwitchTextTrack } from '../UserActionModal/UserActionModal';

interface FrequencySelectorProps {
    isHabit: boolean;
    setIsHabit: React.Dispatch<React.SetStateAction<boolean>>;
    selectedStartDate: Date;
    selectedEndDate?: Date;
    selectedFrequency?: UserActionFrequency;
    setSelectedFrequency: React.Dispatch<React.SetStateAction<UserActionFrequency | undefined>>;
}

export default function FrequencySelector({ selectedFrequency, setSelectedFrequency, isHabit, setIsHabit }: FrequencySelectorProps) {
    const handleFrequencyChange = (path: string, value: any) => {
        setSelectedFrequency((prev?: any) => {
            const newItem = { ...prev };
            setObj(newItem ?? {}, path, value);
            return newItem;
        });
    }

    const hasOnFrequency = (value: OnDayHour) => {
        return selectedFrequency?.on?.includes(value);
    }

    const toggleOnFrequency = (value: OnDayHour) => {
        setSelectedFrequency((prev?: any) => ({
            ...prev,
            on: prev?.on?.includes(value) ? without(prev?.on ?? [], value) : [...prev?.on ?? [], value]
        }));
    }

    return (
        <>
            <div className="flex gap-3 ">
                <SwitchTextTrack
                    checked={isHabit}
                    onChange={(event) => setIsHabit(event.target.checked)} />
                {isHabit && <>
                    <div className='flex flex-col gap-4'>
                        <div className="flex gap-2 items-center">
                            <span className=" text-pale-400">Every: </span>
                            <InputNumber
                                value={selectedFrequency?.frequency}
                                onValueChange={(e: InputNumberValueChangeEvent) => handleFrequencyChange('frequency', Number(e.value))}
                                mode="decimal"
                                showButtons
                                min={1}
                                max={999}
                            />
                            <Select
                                value={selectedFrequency?.frequency_type}
                                onChange={(event: SelectChangeEvent<FrequencyType>) => handleFrequencyChange('frequency_type', event.target.value as FrequencyType)}
                            >
                                <MenuItem value={FrequencyType.DAY}>{pluralize("Day", selectedFrequency?.frequency)}</MenuItem>
                                <MenuItem value={FrequencyType.WEEK}>{pluralize("Week", selectedFrequency?.frequency)}</MenuItem>
                                <MenuItem value={FrequencyType.MONTH}>{pluralize("Month", selectedFrequency?.frequency)}</MenuItem>
                                <MenuItem value={FrequencyType.YEAR}>{pluralize("Year", selectedFrequency?.frequency)}</MenuItem>
                            </Select>
                        </div>

                        {(selectedFrequency?.frequency_type === FrequencyType.DAY) &&
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
                    </div>
                </>}
            </div>
        </>
    )
}
