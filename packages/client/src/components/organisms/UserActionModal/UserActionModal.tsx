import "./UserActionModal.scss";

import { Action, CreateUserAction, FrequencyType, UserAction, UserActionFrequency, UserActionType } from '@careminder/shared/types';
import { CloseOutlined, DeleteOutline } from "@mui/icons-material";
import { Box, Button, Checkbox, FormControlLabel, FormGroup, Modal, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { addDays, addMonths, addYears, differenceInDays, differenceInMonths, differenceInYears, endOfDay, isEqual } from "date-fns";
import React, { useEffect, useMemo, useState } from 'react';

import { useCreateUserActionMutation, useDeleteUserActionMutation, useUpdateUserActionMutation } from "@/api/userActions";
import ActionSelector from "@/components/atoms/ActionSelector";
import EventTimeSelector from "@/components/molecules/EventTimeSelector";

import { DurationIcon, RecurrenceIcon } from '../../../assets/icons/form';
import FrequencySelector from "../Frequency/FrequencySelector";

interface AddNewReminderModalProps {
    setIsAddModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    initialUserAction: Partial<UserAction>;
}

export default function UserActionModal({ setIsAddModalOpen, initialUserAction }: AddNewReminderModalProps) {
    const [action, setAction] = useState<Action>();
    const [type, setType] = useState<UserActionType>(initialUserAction.type ?? UserActionType.REMINDER);
    const [isAllDay, setIsAllDay] = useState<boolean>(!!initialUserAction.all_day);
    const [isHabit, setIsHabit] = useState<boolean>(!!initialUserAction.recurrence);

    const [startDate, setStartDate] = useState<Date>(initialUserAction.start_at ?? new Date());
    const [endDate, setEndDate] = useState<Date | undefined>(initialUserAction.end_at);

    const [frequency, setFrequency] = useState<UserActionFrequency | undefined>(initialUserAction.frequency);

    useEffect(() => console.log(frequency), [frequency])

    useEffect(() => {
        if (action?.suggested_frequency && !isHabit && !frequency) {
            setIsHabit(true);
            setFrequency({
                ...action.suggested_frequency,
                end_date: addYears(startDate, 1)
            });
        }
    }, [action, isHabit, frequency, startDate]);

    const [createUserActionMutation] = useCreateUserActionMutation();
    const createUserAction = async (req: CreateUserAction): Promise<UserAction> =>
        createUserActionMutation(req).unwrap();

    const callCreateUserAction = async () => {
        if (!startDate) return;

        if (startDate && action?.id) {
            await createUserAction({
                type: type,
                start_at: startDate,
                end_at: type === UserActionType.TASK && endDate ? startDate : undefined,
                action_id: action.id,
                all_day: isAllDay,
                frequency: frequency,
                recurrence: isHabit
            });

            setIsAddModalOpen(false);
        }
    }

    const [deleteUserActionMutation] = useDeleteUserActionMutation();
    const deleteUserAction = async (req: number): Promise<void> =>
        deleteUserActionMutation(req).unwrap();

    const callDeleteUserAction = async () => {
        if (initialUserAction.id) {
            await deleteUserAction(initialUserAction.id!);
            setIsAddModalOpen(false);
        }
    };

    const [updateUserActionMutation] = useUpdateUserActionMutation();
    const updateUserAction = async (req: Partial<UserAction>): Promise<UserAction> =>
        updateUserActionMutation(req).unwrap();

    const callUpdateUserAction = async () => {
        if (!startDate) return;

        if (startDate && action?.id && initialUserAction.id) {
            await updateUserAction({
                id: initialUserAction.id,
                start_at: startDate,
                end_at: type === UserActionType.TASK ? endDate : undefined,
                action_id: action.id,
                all_day: isAllDay
            });
            setIsAddModalOpen(false);
        }
    };

    const handleSaveButton = async () => {
        if (initialUserAction?.id) await callUpdateUserAction();
        else await callCreateUserAction();
    }

    const handleAllDayChange = (checked: boolean) => {
        if (!checked && startDate && endDate && isEqual(startDate, endDate)) setEndDate(endOfDay(endDate));
        setIsAllDay(checked);
    }

    const handleRecurrenceChange = (
        _: React.MouseEvent<HTMLElement>,
        recurrence: UserActionType,
    ) => {
        if (recurrence !== null) setType(recurrence);
        if (!frequency) {
            setFrequency({
                frequency: 1,
                frequency_type: FrequencyType.DAY,
                end_date: addYears(startDate, 1)
            })
        }
    };
    const disabledSave = useMemo(() => !startDate || !endDate || !action, [startDate, endDate, action]);
    function handleStartDateChange(value: Date): void {
        if(isHabit && frequency?.end_date) {
            const yearsAppart = differenceInYears(frequency?.end_date, startDate);
            const monthsAppart = differenceInMonths(frequency?.end_date, startDate);
            const daysAppart = differenceInDays(frequency?.end_date, startDate);
            setFrequency(prev => {
                if(!prev) return undefined;
                return {
                    ...prev,
                    end_date: yearsAppart > 0 && yearsAppart % 1 === 0
                        ? addYears(value, yearsAppart)
                        : monthsAppart > 0 && monthsAppart % 1 === 0
                            ? addMonths(value, monthsAppart)
                            : addDays(value, daysAppart),
                }
            })
        }
        setStartDate(value);
    }

    return (
        <Modal
            open={true}
            onClose={() => setIsAddModalOpen(false)}
            className="action-form z-10"
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] max-w-[95%] shadow-2xl rounded-xl bg-white">
                <FormGroup className="h-full">
                    <div className="w-full rounded-t-xl bg-pale-50 flex px-4 py-2">
                        <span className="text-pale-500 font-bold uppercase">New Minder</span>
                        <div className="ml-auto flex gap-2">
                            {!!initialUserAction?.id && <DeleteOutline onClick={callDeleteUserAction} className="ml-auto cursor-pointer hover:text-red-600" />}
                            <CloseOutlined onClick={() => setIsAddModalOpen(false)} className="ml-auto cursor-pointer hover:text-red-200" />
                        </div>
                    </div>
                    <div className="form p-4 content-start grid grid-cols-[25px,calc(100%-25px-0.75rem)] grid-rows-[auto,auto,auto,auto] items-center justify-start gap-x-2 gap-y-4">
                        <ActionSelector
                            action_id={initialUserAction.action_id}
                            action={action}
                            setAction={setAction}
                        />
                        <div className="flex col-start-2 flex-wrap">
                            <ToggleButtonGroup
                                exclusive
                                aria-label="recurrence"
                                value={type}
                                onChange={handleRecurrenceChange}
                                className="grid grid-cols-2"
                            >
                                <ToggleButton value={UserActionType.REMINDER}>Reminder</ToggleButton>
                                <ToggleButton value={UserActionType.TASK}>Task</ToggleButton>
                            </ToggleButtonGroup>
                            <FormControlLabel
                                className="ml-auto max-w-fit text-primary"
                                control={<Checkbox
                                    className="ml-1"
                                    checked={isAllDay}
                                    onChange={(event) => handleAllDayChange(event.target.checked)}
                                />}
                                label="All Day" />
                        </div>

                        <DurationIcon className="w-6 h-6" />
                        <div className="flex gap-2 dates items-center">
                            <EventTimeSelector
                                type={type}
                                start={startDate}
                                setStart={handleStartDateChange}
                                end={endDate}
                                setEnd={setEndDate}
                                allDay={isAllDay}
                            />
                        </div>
                        <RecurrenceIcon className="w-6 h-6 self-baseline" />
                        <FrequencySelector
                            action={action}
                            type={type}
                            isHabit={isHabit}
                            setIsHabit={setIsHabit}
                            startDate={startDate}
                            endDate={endDate}
                            frequency={frequency}
                            isAllDay={isAllDay}
                            setFrequency={setFrequency}
                        />
                    </div>
                    <div className="flex items-end ml-auto col-span-2 mt-auto p-6">
                        <Button disabled={disabledSave} variant="contained" onClick={handleSaveButton}>Save</Button>
                    </div>
                </FormGroup>
            </Box>
        </Modal>
    )
}
