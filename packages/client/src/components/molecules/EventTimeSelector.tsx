import { UserActionType } from '@careminder/shared/types';
import { addMinutes, differenceInMinutes, isBefore } from 'date-fns';
import React from 'react';

import FocusDatePicker from "@/components/atoms/FocusDatePicker";
import FocusTimePicker from "@/components/atoms/FocusTimePicker";

interface EventTimeSelectorProps {
    type: UserActionType;
    start: Date;
    setStart: (value: Date) => void;
    end?: Date;
    setEnd: (value: Date) => void;
    allDay: boolean;
}

export default function EventTimeSelector({ type, start, setStart, end, setEnd, allDay }: EventTimeSelectorProps) {
    const hasEnd = type !== UserActionType.REMINDER;
    
    const handleStartChange = (newDate: Date) => {
        if(end) {
            const difference = differenceInMinutes(end, start);
            setEnd(addMinutes(newDate, difference));
        }
        setStart(newDate);
    }
    
    const handleEndChange = (newDate: Date) => {
        if(end && isBefore(newDate, start)) {
            const difference = differenceInMinutes(start, end);
            setStart(addMinutes(newDate, difference));
        }
        setEnd(newDate);
    }

    return (
        <div className="flex gap-2 dates items-center">
            <FocusDatePicker
                value={start}
                setValue={handleStartChange}
            />
            {!allDay && <FocusTimePicker
                value={start}
                setValue={handleStartChange} />}
            {!allDay && hasEnd && end &&
                <> 
                    <span>—</span>
                    <FocusTimePicker
                        value={end}
                        setValue={handleEndChange} />
                </>}
            {hasEnd && <FocusDatePicker
                value={end}
                setValue={handleEndChange}
            />}
        </div>
    )
}