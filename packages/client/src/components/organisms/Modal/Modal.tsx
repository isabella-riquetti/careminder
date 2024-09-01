import "./Modal.scss";

import { Action } from '@careminder/shared/types';
import { CloseOutlined, TrendingFlat } from "@mui/icons-material";
import { Box, Button, Modal } from '@mui/material';
import { isSameDay, isToday } from "date-fns";
import _ from "lodash";
import { Calendar, CalendarDateTemplateEvent } from "primereact/calendar";
import { Dropdown } from 'primereact/dropdown';
import { Nullable } from "primereact/ts-helpers";
import React, { useEffect, useMemo, useState } from 'react';

import { useGetActionsQuery } from '@/api/actions';

import BodyCareIcon from '../../../assets/icons/categories/body-care.svg';
import BodyCarePlainIcon from '../../../assets/icons/categories/body-care-plain.svg';
import HairCareIcon from '../../../assets/icons/categories/hair-care.svg';
import HairCarePlainIcon from '../../../assets/icons/categories/hair-care-plain.svg';
import MindCareIcon from '../../../assets/icons/categories/mind-care.svg';
import MindCarePlainIcon from '../../../assets/icons/categories/mind-care-plain.svg';
import NailCareIcon from '../../../assets/icons/categories/nail-care.svg';
import NailCarePlainIcon from '../../../assets/icons/categories/nail-care-plain.svg';
import SelfCarePlainIcon from '../../../assets/icons/categories/self-care-plain.svg';
import SkinCareIcon from '../../../assets/icons/categories/skin-care.svg';
import SkinCarePlainIcon from '../../../assets/icons/categories/skin-care-plain.svg';
import ActionIcon from '../../../assets/icons/form/action.svg?react';
import DurationIcon from '../../../assets/icons/form/duration.svg?react';
import SelfCareIcon from '../../../assets/icons/sidebar/icon.svg';

interface AddNewReminderModalProps {
    isAddModalOpen: boolean;
    setIsAddModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    startDate?: Date;
    endDate?: Date;
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

export default function AddNewReminderModal({ isAddModalOpen, setIsAddModalOpen, startDate, endDate }: AddNewReminderModalProps) {
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
    const [selectedStartDate, setSelectedStartDate] = useState<Nullable<(Date | null)>>(startDate);
    const [selectedEndDate, setSelectedEndDate] = useState<Nullable<(Date | null)>>(endDate);

    useEffect(() => setSelectedStartDate(startDate), [startDate]);
    useEffect(() => setSelectedEndDate(endDate), [endDate]);

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

    const dateTemplate = (event: CalendarDateTemplateEvent, curr: Nullable<Date | null>) => {
        const date = new Date(event.year, event.month, event.day);
        return (<div className={`w-7 h-7 flex items-center justify-center rounded-full ${isToday(date) ? "border border-pale-200" : curr && isSameDay(date, curr) ? "bg-pale-100" : ""}`}>
            {event.day}
        </div>);
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
                <div className="w-full rounded-t-xl bg-pale-50 flex px-4 py-2">
                    <span className="text-pale-500 font-bold uppercase">New Minder</span>
                    <CloseOutlined onClick={() => setIsAddModalOpen(false)} className="ml-auto cursor-pointer" />
                </div>
                <div className="p-4 grid grid-cols-[25px,calc(100%-25px-0.75rem)] items-center justify-start gap-2">
                    <ActionIcon className="w-6 h-6" />
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
                    <DurationIcon className="w-6 h-6" />
                    <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] items-center md:gap-1 w-full">
                        <Calendar
                            value={selectedStartDate}
                            dateFormat="DD, M dd yy"
                            onChange={(e) => setSelectedStartDate(e.value)}
                            dateTemplate={(e) => dateTemplate(e, selectedStartDate)}
                            showTime />
                        <span className="hidden md:block"><TrendingFlat /></span>
                        <Calendar
                            value={selectedEndDate}
                            dateFormat="DD, M dd yy"
                            onChange={(e) => setSelectedEndDate(e.value)}
                            dateTemplate={(e) => dateTemplate(e, selectedEndDate)}
                            showTime />
                    </div>
                    <div className="h-[150px] flex items-end ml-auto col-span-2">
                        <Button variant="contained" onClick={() => console.log('Save')}>Create</Button>

                    </div>
                </div>
            </Box>
        </Modal>
    )
}