import { TimePicker } from '@mui/x-date-pickers';
import { set } from 'date-fns';
import React, { useState } from 'react';

interface FocusDatePickerProps {
    setValue: (newDate: Date) => void;
    value: Date;
}

export default function FocusTimePicker({ value, setValue }: FocusDatePickerProps) {
    const [isPickerOpen, setIsPickerOpen] = useState(false);

    const getNewDate = (date: Date | null, newTime: Date | null) => {
        if (!newTime) return value;

        if (!date) return newTime;

        const resultDate = set(date, {
            hours: newTime.getHours(),
            minutes: newTime.getMinutes(),
            seconds: newTime.getSeconds(),
        });
        return resultDate;
    }

    return (
        <TimePicker
            value={value}
            className="w-[95px]"
            open={isPickerOpen}
            onOpen={() => setIsPickerOpen(true)}
            onClose={() => setIsPickerOpen(false)}
            slotProps={{
                inputAdornment: {
                    position: undefined
                },
                textField: {
                    onClick: () => setIsPickerOpen(true),
                },
            }}
            onChange={(newValue) => {
                const newDate = getNewDate(value, newValue);
                setValue(newDate);
            }} />
    )
}