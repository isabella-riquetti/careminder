import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { useGetActionsQuery } from "@/api/actions";
import { rangeCurrency } from "@/utils/currency";
import { readableFrequency } from "@/utils/frequency";

function DashboardOld() {
    const { data: actions = [] } = useGetActionsQuery();

    return (
        <TableContainer className="rounded-xl shadow shadow-pink-200 h-full">
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        <TableCell className="bg-pink-200 text-pink-950 font-bold">Category</TableCell>
                        <TableCell className="bg-pink-200 text-pink-950 font-bold">Name</TableCell>
                        <TableCell className="bg-pink-200 text-pink-950 font-bold">Dificultity</TableCell>
                        <TableCell className="bg-pink-200 text-pink-950 font-bold">Suggested Frequency</TableCell>
                        <TableCell className="bg-pink-200 text-pink-950 font-bold">Estimated Cost</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {actions
                        .map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                    <TableCell className="border-pink-200 text-pink-950">{row.category}</TableCell>
                                    <TableCell className="border-pink-200 text-pink-950">{row.name}</TableCell>
                                    <TableCell className="border-pink-200 text-pink-950">{row.dificultity}</TableCell>
                                    <TableCell className="border-pink-200 text-pink-950">{!row.suggested_frequency ? "As needed" : readableFrequency(row.suggested_frequency)}</TableCell>
                                    <TableCell className="border-pink-200 text-pink-950">{rangeCurrency(row.estimated_starting_cost, row.estimated_ending_cost)}</TableCell>
                                </TableRow>
                            );
                        })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default DashboardOld;
