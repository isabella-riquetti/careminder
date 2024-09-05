/* eslint-disable react-hooks/exhaustive-deps */
import { Action, Category } from '@careminder/shared/types';
import { Rating } from '@mui/material';
import cn from "classnames";
import _ from "lodash";
import { Dropdown } from 'primereact/dropdown';
import React, { useEffect, useMemo } from 'react';

import { useGetActionsQuery } from '@/api/actions';
import { getColoredIcon, getEventColor, getPlainIcon } from "@/utils/category";

interface ActionSelectorProps {
    action_id?: number;
    selectedAction: Action | undefined;
    setSelectedAction: React.Dispatch<React.SetStateAction<Action | undefined>>;
}

const CATEGORY_ORDER = [
    "Skin Care",
    "Hair Care",
    "Body Care",
    "Nail Care",
    "Mind Care",
]

export default function ActionSelector({ action_id, selectedAction, setSelectedAction }: ActionSelectorProps) {
    const { data: actions, isLoading } = useGetActionsQuery();
    const groupedActions = useMemo(() => _(actions)
        .groupBy('category')
        .toPairs()
        .sortBy(([category]) => CATEGORY_ORDER.indexOf(category))
        .map(([category, items]) => ({
            label: category,
            items: items,
        }))
        .value(), [actions]);

    useEffect(() => { 
        if(action_id && actions?.length) {
            const currentAction = actions.find(g => g.id === action_id);
            if(currentAction) setSelectedAction(currentAction);
        }
    }, [action_id, actions]);

    const groupedItemTemplate = (option: { label: Category }) => {
        const Icon = getColoredIcon(option.label);
        return (
            <div className="flex align-items-center gap-2 py-2 px-1 border-b border-pink-100 text-pale-400">
                <Icon className="max-w-7 max-h-7" />
                <div>{option.label}</div>
            </div>
        );
    };

    const itemTemplate = (option: Action) => {
        const Icon = getPlainIcon(option.category);
        return (
            <div className="flex items-center gap-2 py-2 px-1 border-b border-pink-100 text-pale-400">
                <div className="w-7 h-7 flex items-center justify-center">
                    <Icon className="max-w-full max-h-full" style={{ color: getEventColor(option.category) }} />
                </div>
                <div>{option.name}</div>
                <Rating className="ml-auto text-pink-400" name="size-small" value={option.dificultity ?? 1} readOnly size="small" />
            </div>
        );
    };

    const SelectedActionIcon = useMemo(() => {
        if (!selectedAction?.category) return <></>;

        const Icon = getColoredIcon(selectedAction.category);
        return (<Icon className="w-6 h-6 form-icon" />);
    }, [selectedAction]);

    return (
        <>
            {SelectedActionIcon}
            <Dropdown
                value={selectedAction}
                onChange={(e) => setSelectedAction(e.value)}
                options={groupedActions}
                optionLabel="name"
                optionGroupLabel="label"
                optionGroupChildren="items"
                filterBy="name"
                filter
                loading={isLoading}
                filterInputAutoFocus
                itemTemplate={itemTemplate}
                optionGroupTemplate={groupedItemTemplate}
                className={cn("w-full", { 'col-start-2': !selectedAction })}
                placeholder="Select Minder" />
        </>
    )
}
