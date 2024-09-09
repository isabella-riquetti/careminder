import styled from "@emotion/styled";
import { Switch, switchClasses } from '@mui/material';
import React from 'react';
import resolveConfig from "tailwindcss/resolveConfig";

import tailwindConfig from "../../../tailwind.config";

const twConfig = resolveConfig(tailwindConfig);
const colors = twConfig.theme.colors;
export const SwitchTextTrack = styled(Switch)({
    width: 70,
    height: 28,
    padding: "0 4px",
    [`& .${switchClasses.switchBase}`]: {
        color: "#ff6a00",
    },
    [`& .${switchClasses.thumb}`]: {
        width: 15,
        height: 22,
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
            width: "65%",
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
            transform: "translateX(47px)",
            "&:hover": {
                backgroundColor: "rgba(24,90,257,0.08)",
            },
        },
        [`& .${switchClasses.thumb}`]: {
            backgroundColor: "#fff",
        },
        [`& + .${switchClasses.track}`]: {
            background: colors.pink[500],
            "&:before": {
                opacity: 1,
            },
            "&:after": {
                opacity: 0,
            },
        },
    },
});

interface HabitSwitchProps {
    isHabit: boolean;
    setIsHabit: (value: boolean) => void;
}

export default function HabitSwitch({ setIsHabit, isHabit }: HabitSwitchProps) {
    return (
        <SwitchTextTrack
            checked={isHabit}
            onChange={(event) => setIsHabit(event.target.checked)} />
    )
}
