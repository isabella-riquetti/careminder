import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import React, { useState } from 'react';

interface FocusDatePickerProps {
    setValue: React.Dispatch<React.SetStateAction<Date | null | undefined>>;
    value: Date | null | undefined;
}

export default function FocusDatePicker({ value, setValue }: FocusDatePickerProps) {
    const [isPickerOpen, setIsPickerOpen] = useState(false);

    return (
        <DatePicker
            value={value}
            onChange={setValue}
            format='PP'
            className='w-[125px]'
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