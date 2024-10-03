import { UserButton } from '@clerk/clerk-react';
import { Box } from '@mui/material';

import Icon from "../../assets/icons/sidebar/icon.svg?react";
import MenuItem from './MenuItem/MenuItem';

function Header({
    background = false,
}: {
    background?: boolean;
}) {
    return (
        <Box className={`flex py-3 px-3 flex-row w-full max-h-[75px] ${background ? "bg-pink-200 shadow" : ""} rounded-xl gap-2`}>
            <MenuItem text="CareMinder" href="/" icon={Icon} className='text-2xl semi-bold text-pink-600' />
            <MenuItem className='ml-auto'>
                <UserButton />
            </MenuItem>
        </Box>
    )
}

export default Header
