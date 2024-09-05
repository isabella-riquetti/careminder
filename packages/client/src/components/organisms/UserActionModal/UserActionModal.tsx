import "./UserActionModal.scss";

import { Action, CreateUserAction, FrequencyType, UserAction, UserActionFrequency, UserActionType } from '@careminder/shared/types';
import styled from "@emotion/styled";
import { CloseOutlined, DeleteOutline } from "@mui/icons-material";
import { Box, Button, Checkbox, FormControlLabel, FormGroup, Modal, Switch, switchClasses, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { endOfDay, isEqual } from "date-fns";
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


import resolveConfig from "tailwindcss/resolveConfig";

import tailwindConfig from "../../../../tailwind.config";

const twConfig = resolveConfig(tailwindConfig);
const colors = twConfig.theme.colors;
export const SwitchTextTrack = styled(Switch)({
    width: 100,
    height: 32,
    padding: "0 4px",
    [`& .${switchClasses.switchBase}`]: {
        color: "#ff6a00",
    },
    [`& .${switchClasses.thumb}`]: {
        width: 25,
        height: 25,
        borderRadius: 4,
        backgroundColor: "#fff",
    },
    [`& .${switchClasses.track}`]: {
        background: colors.pale[300],
        opacity: "1 !important",
        borderRadius: 5,
        position: "relative",
        "&:before, &:after": {
            display: "inline-block",
            position: "absolute",
            top: "50%",
            width: "50%",
            transform: "translateY(-50%)",
            color: "#fff",
            textAlign: "center",
            fontSize: "0.75rem",
            fontWeight: 500,
        },
        "&:before": {
            content: '"HABIT"',
            left: 4,
            opacity: 0,
        },
        "&:after": {
            content: '"1 TIME"',
            right: 4,
        },
    },
    [`& .${switchClasses.checked}`]: {
        [`&.${switchClasses.switchBase}`]: {
            color: "#185a9d",
            transform: "translateX(59px)",
            "&:hover": {
                backgroundColor: "rgba(24,90,257,0.08)",
            },
        },
        [`& .${switchClasses.thumb}`]: {
            backgroundColor: "#fff",
        },
        [`& + .${switchClasses.track}`]: {
            background: colors.pink[400],
            "&:before": {
                opacity: 1,
            },
            "&:after": {
                opacity: 0,
            },
        },
    },
});

export default function UserActionModal({ setIsAddModalOpen, initialUserAction }: AddNewReminderModalProps) {
    const [selectedAction, setSelectedAction] = useState<Action | undefined>();
    const [selectedType, setSelectedType] = useState<UserActionType>(initialUserAction.type ?? UserActionType.REMINDER);
    const [selectedAllDay, setSelectedAllDay] = useState<boolean>(!!initialUserAction.all_day);
    const [isHabit, setIsHabit] = useState<boolean>(!!initialUserAction.recurrence);

    const [selectedStartDate, setSelectedStartDate] = useState<Date>(initialUserAction.start_at ?? new Date());
    const [selectedEndDate, setSelectedEndDate] = useState<Date | undefined>(initialUserAction.end_at);

    const [selectedFrequency, setSelectedFrequency] = useState<UserActionFrequency>();

    useEffect(() => {
        if (selectedAction && selectedAction.suggested_frequency) {
            setSelectedType(UserActionType.REMINDER);
            setIsHabit(true);
            setSelectedFrequency(selectedAction.suggested_frequency);
        }
    }, [selectedAction]);

    useEffect(() => {
        if (isHabit) {

            if (selectedAction && selectedAction.suggested_frequency && isHabit) {
                setSelectedType(UserActionType.REMINDER);
                setIsHabit(true);
                setSelectedFrequency(selectedAction.suggested_frequency);
            } else {
                setSelectedFrequency({
                    frequency: 1,
                    frequency_type: FrequencyType.DAY,
                });
            }
        }
    }, [isHabit]);

    const [createUserActionMutation] = useCreateUserActionMutation();
    const createUserAction = async (req: CreateUserAction): Promise<UserAction> =>
        createUserActionMutation(req).unwrap();

    const callCreateUserAction = async () => {
        if (!selectedStartDate) return;

        if (selectedStartDate && selectedAction?.id) {
            await createUserAction({
                type: selectedType,
                start_at: selectedStartDate,
                end_at: selectedType === UserActionType.TASK && selectedEndDate ? selectedStartDate : undefined,
                action_id: selectedAction.id,
                all_day: selectedAllDay,
                frequency: selectedFrequency,
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
        if (!selectedStartDate) return;

        if (selectedStartDate && selectedAction?.id && initialUserAction.id) {
            await updateUserAction({
                id: initialUserAction.id,
                start_at: selectedStartDate,
                end_at: selectedType === UserActionType.TASK && selectedEndDate ? selectedStartDate : undefined,
                action_id: selectedAction.id,
                all_day: selectedAllDay
            });
            setIsAddModalOpen(false);
        }
    };

    const handleSaveButton = async () => {
        if (initialUserAction?.id) await callUpdateUserAction();
        else await callCreateUserAction();
    }

    const handleAllDayChange = (checked: boolean) => {
        if (!checked && selectedStartDate && selectedEndDate && isEqual(selectedStartDate, selectedEndDate)) setSelectedEndDate(endOfDay(selectedEndDate));
        setSelectedAllDay(checked);
    }

    const handleRecurrenceChange = (
        _: React.MouseEvent<HTMLElement>,
        recurrence: UserActionType,
    ) => {
        if (recurrence !== null) setSelectedType(recurrence);
        if (!selectedFrequency) {
            setSelectedFrequency({
                frequency: 1,
                frequency_type: FrequencyType.DAY,
            })
        }
    };
    const disabledSave = useMemo(() => !selectedStartDate || !selectedEndDate || !selectedAction, [selectedStartDate, selectedEndDate, selectedAction]);
    return (
        <Modal
            style={{
                zIndex: 1000,
            }}
            open={true}
            onClose={() => setIsAddModalOpen(false)}
            className="action-form"
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 550,
                height: 500,
                maxWidth: "95%",
                boxShadow: 24,
            }} className="rounded-xl bg-white">
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
                            selectedAction={selectedAction}
                            setSelectedAction={setSelectedAction}
                        />
                        <div className="flex col-start-2 flex-wrap">
                            <ToggleButtonGroup
                                exclusive
                                aria-label="recurrence"
                                value={selectedType}
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
                                    checked={selectedAllDay}
                                    onChange={(event) => handleAllDayChange(event.target.checked)}
                                />}
                                label="All Day" />
                        </div>

                        <DurationIcon className="w-6 h-6 self-baseline" />
                        <div className="flex gap-2 dates items-center">
                            <EventTimeSelector
                                type={selectedType}
                                start={selectedStartDate}
                                setStart={setSelectedStartDate}
                                end={selectedEndDate}
                                setEnd={setSelectedEndDate}
                                allDay={selectedAllDay}
                            />
                        </div>
                        <RecurrenceIcon className="w-6 h-6 self-baseline" />
                        <FrequencySelector
                            isHabit={isHabit}
                            setIsHabit={setIsHabit}
                            selectedStartDate={selectedStartDate}
                            selectedEndDate={selectedEndDate}
                            selectedFrequency={selectedFrequency}
                            setSelectedFrequency={setSelectedFrequency}
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
