import React, { useState, useEffect } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import ShowTable from './ShowTable';
import { Box } from '@mui/material';
import SearchItem from './SearchItem';
import axios from 'axios';
import NavBar from '../header/NavBar';

export default function Displaydata() {
    const [TotalAmount, setTotalAmout] = useState(0);
    const [search, setSearch] = useState('');

    const [totalpage, setTotalPage] = useState(0);
    const [page, setPage] = useState(0);
    const [rows, setRows] = useState(null);
    const [status, setStatus] = useState(false);

    useEffect(() => {
        axios
            .get(`http://localhost:9000/api/billing-list?page=${page}`)
            .then((res) => {
                const data = res.data;
                setRows(data.result);
                setTotalPage(Math.ceil(data.count / 10));
                setTotalAmout(data.total);
            });
    }, [page, status]);

    const handleDelete = (id) => {
        axios
            .delete(`http://localhost:9000/api/delete-billing/${id}`)
            .then((res) => {
                if (res.status === 200) {
                    setStatus(!status);
                }
            });
    };

    return (
        <Stack spacing={2} direction='column'>
            <NavBar TotalAmount={TotalAmount} />
            <Box sx={{ px: 5, my: 3 }}>
                <SearchItem
                    rows={rows}
                    setRows={setRows}
                    setStatus={setStatus}
                    status={status}
                    setSearch={setSearch}
                />
                {rows !== null && (
                    <ShowTable
                        rows={rows}
                        handleDelete={handleDelete}
                        status={status}
                        setStatus={setStatus}
                    />
                )}
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                    <Pagination
                        count={totalpage}
                        variant='outlined'
                        shape='rounded'
                        onChange={(e, value) => setPage(value)}
                    />
                </Box>
            </Box>
        </Stack>
    );
}
