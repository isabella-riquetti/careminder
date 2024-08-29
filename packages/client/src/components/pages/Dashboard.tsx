import { useGetActionsQuery } from "@/api/actions";
import { formatToCurrency } from "@/utils/currency";
import { readableFrequency } from "@/utils/frequency";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function Dashboard() {
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
                        <TableCell className="bg-pink-200 text-pink-950 font-bold">Estimated Starting Price</TableCell>
                        <TableCell className="bg-pink-200 text-pink-950 font-bold">Estimated Ending Price</TableCell>
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
                                    <TableCell className="border-pink-200 text-pink-950">{row.estimated_starting_cost !== null && formatToCurrency(row.estimated_starting_cost, "pt-BR", "BRL")}</TableCell>
                                    <TableCell className="border-pink-200 text-pink-950">{row.estimated_ending_cost && formatToCurrency(row.estimated_ending_cost, "pt-BR", "BRL")}</TableCell>
                                </TableRow>
                            );
                        })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default Dashboard;
