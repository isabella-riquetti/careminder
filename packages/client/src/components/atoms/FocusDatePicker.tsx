import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import React, { useState } from 'react';

interface FocusDatePickerProps {
    setValue: (date: Date) => void;
    value?: Date;
}

export default function FocusDatePicker({ value, setValue }: FocusDatePickerProps) {
    const [isPickerOpen, setIsPickerOpen] = useState(false);

    return (
        <DatePicker
            value={value}
            onChange={(value) => {
                if (value) setValue(value)
            }}
            format='PP'
            className='w-[125px] self-baseline'
            open={isPickerOpen}
            onOpen={() => setIsPickerOpen(true)}
            onClose={() => setIsPickerOpen(false)}
            slotProps={{
                inputAdornment: {
                    position: undefined
                },
                textField: {
                    onClick: () => setIsPickerOpen(true),
                }
            }}
        />
    )
}