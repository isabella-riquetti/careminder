import { useGetActionsQuery } from "@/api/actions";
import { formatToCurrency } from "@/utils/currency";
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
                        <TableCell className="bg-pink-200 text-pink-950 font-bold">Id</TableCell>
                        <TableCell className="bg-pink-200 text-pink-950 font-bold">Name</TableCell>
                        <TableCell className="bg-pink-200 text-pink-950 font-bold">Suggested Frequency</TableCell>
                        <TableCell className="bg-pink-200 text-pink-950 font-bold">Estimated Price</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {actions
                        .map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                    <TableCell className="border-pink-200 text-pink-950">{row.id}</TableCell>
                                    <TableCell className="border-pink-200 text-pink-950">{row.name}</TableCell>
                                    <TableCell className="border-pink-200 text-pink-950">{row.frequency}</TableCell>
                                    <TableCell className="border-pink-200 text-pink-950">{row.estimated_cost && formatToCurrency(row.estimated_cost, "pt-BR", "BRL")}</TableCell>
                                </TableRow>
                            );
                        })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default Dashboard;
