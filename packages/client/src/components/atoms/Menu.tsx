import { UserButton } from '@clerk/clerk-react';
import { Box } from '@mui/material';

import Icon from "../../assets/icons/sidebar/icon.svg?react";
import MenuItem from './MenuItem/MenuItem';

function Menu() {
    return (
        <Box className="flex py-3 px-3 flex-row w-full max-h-[75px] bg-pink-200 text-pink-800 rounded-xl shadow gap-2">
            <MenuItem text="CareMinder" href="/" icon={Icon} className='text-2xl semi-bold' />
            <MenuItem className='ml-auto'>
                <UserButton />
            </MenuItem>
        </Box>
    )
}

export default Menu
