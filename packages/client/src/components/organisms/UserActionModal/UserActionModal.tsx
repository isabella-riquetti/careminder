import "./UserActionModal.scss";

import { Action, CreateUserAction, UserAction } from '@careminder/shared/types';
import { CloseOutlined } from "@mui/icons-material";
import { Box, Button, Checkbox, FormControlLabel, FormGroup, Modal } from '@mui/material';
import { isSameDay, isToday, isWithinInterval } from "date-fns";
import _ from "lodash";
import { Calendar, CalendarDateTemplateEvent } from "primereact/calendar";
import { Dropdown } from 'primereact/dropdown';
import { Nullable } from "primereact/ts-helpers";
import React, { useEffect, useMemo, useState } from 'react';

import { useGetActionsQuery } from '@/api/actions';
import { useCreateUserActionMutation } from "@/api/userActions";

import { BodyCareIcon, BodyCarePlainIcon, HairCareIcon, HairCarePlainIcon, MindCareIcon, MindCarePlainIcon, NailCareIcon, NailCarePlainIcon, SelfCareIcon, SelfCarePlainIcon, SkinCareIcon, SkinCarePlainIcon } from '../../../assets/icons/categories';
import { ActionIconComponent, DurationIconComponent } from '../../../assets/icons/form';

interface AddNewReminderModalProps {
    isAddModalOpen: boolean;
    setIsAddModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    startDate?: Date;
    endDate?: Date;
    allDay: boolean;
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    height: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    maxWidth: "95%",
    boxShadow: 24,
};

const CATEGORY_ORDER = [
    "Skin Care",
    "Hair Care",
    "Body Care",
    "Nail Care",
    "Mind Care",
]

export default function UserActionModal({ isAddModalOpen, setIsAddModalOpen, startDate, endDate, allDay }: AddNewReminderModalProps) {
    const { data: actions } = useGetActionsQuery();
    const groupedActions = useMemo(() => _(actions)
        .groupBy('category')
        .toPairs()
        .sortBy(([category]) => CATEGORY_ORDER.indexOf(category))
        .map(([category, items]) => ({
            label: category,
            items: items,
        }))
        .value(), [actions]);

    const [selectedAction, setSelectedActions] = useState<Action | undefined>();
    const [selectedAllDay, setSelectedAllDay] = useState<boolean>(allDay);
    const [selectedDates, setSelectedDates] = useState<Nullable<(Date | null)[]>>(null);

    useEffect(() => {
        if (startDate && endDate) setSelectedDates([startDate, endDate])
    }, [startDate, endDate]);
    useEffect(() => setSelectedAllDay(allDay), [allDay]);

    const handleAllDayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.checked)
        setSelectedAllDay(event.target.checked);
    };

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case "Body Care":
                return BodyCareIcon;
            case "Hair Care":
                return HairCareIcon;
            case "Mind Care":
                return MindCareIcon;
            case "Nail Care":
                return NailCareIcon;
            case "Skin Care":
                return SkinCareIcon;
            default:
                return SelfCareIcon;
        }
    }
    const getIcon = (category: string) => {
        switch (category) {
            case "Body Care":
                return BodyCarePlainIcon;
            case "Hair Care":
                return HairCarePlainIcon;
            case "Mind Care":
                return MindCarePlainIcon;
            case "Nail Care":
                return NailCarePlainIcon;
            case "Skin Care":
                return SkinCarePlainIcon;
            default:
                return SelfCarePlainIcon;
        }
    }

    const groupedItemTemplate = (option: { label: string }) => {
        return (
            <div className="flex align-items-center gap-1 py-2 px-1 border-t border-pink-100">
                <img className="max-w-6" alt={option.label} src={getCategoryIcon(option.label)} />
                <div>{option.label}</div>
            </div>
        );
    };

    const itemTemplate = (option: Action) => {
        return (
            <div className="flex align-items-center gap-1 py-2 px-1 border-t border-pink-100">
                <div className="w-6 h-6 flex items-center justify-center"><img className="max-w-4" alt={option.name} src={getIcon(option.category)} /></div>
                <div>{option.name}</div>
            </div>
        );
    };

    const dateTemplate = (event: CalendarDateTemplateEvent) => {
        const classes = ["w-7 h-7 flex items-center justify-center rounded-full"];
        const date = new Date(event.year, event.month, event.day);
        if (isToday(date)) classes.push("border border-pale-200");

        if (selectedDates) {
            const [start, end] = selectedDates;
            if ((start && end && isWithinInterval(date, { start, end })) || (start && isSameDay(date, start))) classes.push("bg-pale-100");
        }
        return (
            <div
                className={classes.join(" ")}>
                {event.day}
            </div>);
    }

    const formatDateTime = (date: Date): string => {
        const userLocale = navigator.language || 'en-US';
        const options: Intl.DateTimeFormatOptions = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };

        const formattedDate = new Intl.DateTimeFormat(userLocale, options).format(date);
        return formattedDate;
    }

    const [createUserActionMutation] = useCreateUserActionMutation();
    const createUserAction = async (req: CreateUserAction): Promise<UserAction> =>
        createUserActionMutation(req).unwrap();

    const callCreateUserAction = async () => {
        console.log(selectedDates)
        if(!selectedDates) return;

        const [start, end] = selectedDates;
        console.log(start, selectedAction)
        if (start && selectedAction?.id) {
            const newAction = await createUserAction({
                start_at: start,
                end_at: end ?? start,
                action_id: selectedAction.id,
                all_day: selectedAllDay
            });

            console.log(newAction);
        }
    }

    return (
        <Modal
            style={{
                zIndex: 1000,
            }}
            open={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} className="rounded-xl bg-white">
                <FormGroup>
                    <div className="w-full rounded-t-xl bg-pale-50 flex px-4 py-2">
                        <span className="text-pale-500 font-bold uppercase">New Minder</span>
                        <CloseOutlined onClick={() => setIsAddModalOpen(false)} className="ml-auto cursor-pointer" />
                    </div>
                    <div className="p-4 grid grid-cols-[25px,calc(100%-25px-0.75rem)] items-center justify-start gap-2">
                        <ActionIconComponent className="w-6 h-6" />
                        <Dropdown
                            value={selectedAction}
                            onChange={(e) => setSelectedActions(e.value)}
                            options={groupedActions}
                            optionLabel="name"
                            optionGroupLabel="label"
                            optionGroupChildren="items"
                            itemTemplate={itemTemplate}
                            optionGroupTemplate={groupedItemTemplate}
                            className="w-full"
                            placeholder="Select Minder" />
                        <DurationIconComponent className="w-6 h-6" />
                        <Calendar
                            value={selectedDates}
                            dateFormat="DD, dd/mm/yy"
                            onChange={(e) => setSelectedDates(e.value)}
                            selectionMode="range"
                            readOnlyInput
                            hideOnRangeSelection
                            showTime={!selectedAllDay}
                            stepMinute={5}
                            dateTemplate={dateTemplate}
                            formatDateTime={formatDateTime}
                        />
                        <div></div>
                        <FormControlLabel
                            className="mt-[-10px]"
                            control={<Checkbox
                                className="ml-2"
                                checked={selectedAllDay}
                                onChange={handleAllDayChange}
                            />}
                            label="All Day" />
                        <div className="h-[150px] flex items-end ml-auto col-span-2">
                            <Button variant="contained" onClick={callCreateUserAction}>Create</Button>
                        </div>
                    </div>
                </FormGroup>
            </Box>
        </Modal>
    )
}