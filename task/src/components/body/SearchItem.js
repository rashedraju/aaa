import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TextField from '@mui/material/TextField';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AddModals from '../features/AddModals';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.action.hover,
        color: 'black',
    },
}));

export default function SearchItem({
    rows,
    setRows,
    status,
    setStatus,
    setSearch,
}) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label='customized table'>
                <TableHead>
                    <TableRow sx={{ height: '20px' }}>
                        <StyledTableCell>Billings</StyledTableCell>
                        <StyledTableCell>
                            <TextField
                                id='outlined-basic'
                                label='Search..'
                                variant='outlined'
                                size='small'
                                onChange={(e) =>
                                    setSearch({ search: e.target.value })
                                }
                            />
                        </StyledTableCell>

                        <StyledTableCell align='right'>
                            <AddModals
                                rows={rows}
                                setRows={setRows}
                                status={status}
                                setStatus={setStatus}
                            />
                        </StyledTableCell>
                    </TableRow>
                </TableHead>
            </Table>
        </TableContainer>
    );
}
