import "./Modal.scss";

import { Action } from '@careminder/shared/types';
import { Box, Modal } from '@mui/material';
import { Dropdown } from 'primereact/dropdown';
import React, { useState } from 'react';

import { useGetActionsQuery } from '@/api/actions';


interface AddNewReminderModalProps {
    isAddModalOpen: boolean;
    setIsAddModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    height: '80%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default function AddNewReminderModal({ isAddModalOpen, setIsAddModalOpen }: AddNewReminderModalProps) {
    const { data: actions } = useGetActionsQuery();

    const [selectedAction, setSelectedActions] = useState<Action | undefined>();

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
            <Box sx={style}>
                <Dropdown
                    value={selectedAction}
                    onChange={(e) => setSelectedActions(e.value)}
                    options={actions}
                    placeholder="Self Care action"
                    optionValue="id"
                    filter={true}
                    filterBy='name'
                    showClear={true}
                    className='w-full'
                    optionLabel="name" />
            </Box>
        </Modal>
    )
}