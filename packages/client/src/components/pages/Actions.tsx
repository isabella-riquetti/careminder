import { Action } from '@careminder/shared/types';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {
    Box, Collapse, IconButton, Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useMediaQuery
} from '@mui/material';
import React, { useEffect, useState } from 'react';

import { useGetActionsQuery } from "@/api/actions";
import { rangeCurrency } from "@/utils/currency";
import { readableFrequency } from "@/utils/frequency";

const Actions = () => {
    const { data: actions, isFetching } = useGetActionsQuery();
    const [openRow, setOpenRow] = useState<number | undefined>();
    const isMobile = useMediaQuery('(max-width:720px)');

    useEffect(() => console.log(actions), [actions]);

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
                <TableCell className="border-pink-200 text-pink-950">{row.category}</TableCell>
                <TableCell className="border-pink-200 text-pink-950">{row.name}</TableCell>
                {!isMobile ? (
                    <>
                        <TableCell className="border-pink-200 text-pink-950">{row.dificultity}</TableCell>
                        <TableCell className="border-pink-200 text-pink-950">
                            {row.suggested_frequency ? readableFrequency(row.suggested_frequency) : "As needed"}
                        </TableCell>
                        <TableCell className="border-pink-200 text-pink-950">
                            {rangeCurrency(row.estimated_starting_cost, row.estimated_ending_cost)}
                        </TableCell>
                    </>
                ) : (
                    <TableCell align="center">
                        <IconButton onClick={() => handleToggle(row.id)}>
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
                        <Typography variant="body2" className="text-pink-950">
                            <strong>Difficulty:</strong> {row.dificultity}
                        </Typography>
                        <Typography variant="body2" className="text-pink-950">
                            <strong>Suggested Frequency:</strong> {row.suggested_frequency ? readableFrequency(row.suggested_frequency) : "As needed"}
                        </Typography>
                        <Typography variant="body2" className="text-pink-950">
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
                        <TableCell className="bg-pink-200 text-pink-950 font-bold">Category</TableCell>
                        <TableCell className="bg-pink-200 text-pink-950 font-bold">Name</TableCell>
                        {!isMobile && (
                            <>
                                <TableCell className="bg-pink-200 text-pink-950 font-bold">Difficulty</TableCell>
                                <TableCell className="bg-pink-200 text-pink-950 font-bold">Suggested Frequency</TableCell>
                                <TableCell className="bg-pink-200 text-pink-950 font-bold">Estimated Cost</TableCell>
                            </>
                        )}
                        {isMobile && (
                            <TableCell className="bg-pink-200 text-pink-950 font-bold" align="center">More</TableCell>
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
