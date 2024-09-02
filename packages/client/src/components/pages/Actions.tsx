import { Action } from '@careminder/shared/types';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {
    Box, Collapse, IconButton, Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useMediaQuery
} from '@mui/material';
import React, { useState } from 'react';

import { useGetActionsQuery } from "@/api/actions";
import { rangeCurrency } from "@/utils/currency";
import { readableFrequency } from "@/utils/frequency";

const Actions = () => {
    const { data: actions, isFetching } = useGetActionsQuery();
    const [openRow, setOpenRow] = useState<number | undefined>();
    const isMobile = useMediaQuery('(max-width:720px)');

    const handleToggle = (rowId: number) => {
        setOpenRow(prev => (prev === rowId ? undefined : rowId));
    };

    const renderSkeletonRow = (isMobile: boolean) => (
        <TableRow>
            <TableCell><Skeleton width="100px" /></TableCell>
            <TableCell><Skeleton width="200px" /></TableCell>
            {isMobile ? (
                <TableCell align="center"><Skeleton width="50px" /></TableCell>
            ) : (
                <>
                    <TableCell><Skeleton width="100px" /></TableCell>
                    <TableCell><Skeleton width="100px" /></TableCell>
                    <TableCell><Skeleton width="80px" /></TableCell>
                </>
            )}
        </TableRow>
    );

    const renderTableRow = (row: Action) => (
        <React.Fragment key={row.id}>
            <TableRow hover role="checkbox" tabIndex={-1}>
                <TableCell>{row.category}</TableCell>
                <TableCell>{row.name}</TableCell>
                {!isMobile ? (
                    <>
                        <TableCell>{row.dificultity}</TableCell>
                        <TableCell>
                            {row.suggested_frequency ? readableFrequency(row.suggested_frequency) : "As needed"}
                        </TableCell>
                        <TableCell>
                            {rangeCurrency(row.estimated_starting_cost, row.estimated_ending_cost)}
                        </TableCell>
                    </>
                ) : (
                    <TableCell align="center">
                        <IconButton onClick={() => handleToggle(row.id)} className='text-pink-800'>
                            {openRow === row.id ? <RemoveIcon /> : <AddIcon />}
                        </IconButton>
                    </TableCell>
                )}
            </TableRow>
            {isMobile && renderMobileCollapse(row)}
        </React.Fragment>
    );

    const renderMobileCollapse = (row: Action) => (
        <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
                <Collapse in={openRow === row.id} timeout="auto" unmountOnExit>
                    <Box margin={1}>
                        <Typography variant="body2">
                            <strong>Difficulty:</strong> {row.dificultity}
                        </Typography>
                        <Typography variant="body2">
                            <strong>Suggested Frequency:</strong> {row.suggested_frequency ? readableFrequency(row.suggested_frequency) : "As needed"}
                        </Typography>
                        <Typography variant="body2">
                            <strong>Estimated Cost:</strong> {rangeCurrency(row.estimated_starting_cost, row.estimated_ending_cost)}
                        </Typography>
                    </Box>
                </Collapse>
            </TableCell>
        </TableRow>
    );

    return (
        <TableContainer className="rounded-xl shadow shadow-pink-200 h-full">
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        <TableCell>Category</TableCell>
                        <TableCell>Name</TableCell>
                        {!isMobile && (
                            <>
                                <TableCell>Difficulty</TableCell>
                                <TableCell>Suggested Frequency</TableCell>
                                <TableCell>Estimated Cost</TableCell>
                            </>
                        )}
                        {isMobile && (
                            <TableCell align="center">More</TableCell>
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {isFetching
                        ? Array.from({ length: 50 }).map(() => renderSkeletonRow(isMobile))
                        : actions?.map(renderTableRow)}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default Actions;
