import { UserButton, useUser } from '@clerk/clerk-react';
import { Box } from '@mui/material';

import AddIcon from "../../assets/icons/sidebar/add.svg?react";
import Icon from "../../assets/icons/sidebar/icon.svg?react";
import SelectOptionIcon from "../../assets/icons/sidebar/selectOption.svg?react";
import MenuItem from './MenuItem';

function Menu() {
    const { user } = useUser();

    return (
        <Box className="flex py-3 flex-col w-fit max-w-[75px] lg:min-w-[230px] bg-pink-200 text-pink-800 rounded-xl shadow gap-2">
            <MenuItem text={user?.firstName ?? "User"}>
                <UserButton />
            </MenuItem>
            <div className='w-full px-5 mb-3'>
                <hr className='border-pink-400' />
            </div>
            <MenuItem text="My Minders" mobileText="Minders" href="/" icon={Icon} />
            <MenuItem text="Add Minder" mobileText="Add" href="/actions" icon={AddIcon} />
            <MenuItem text="Actions" href="/actions" icon={SelectOptionIcon} />
        </Box>
    )
}

export default Menu
