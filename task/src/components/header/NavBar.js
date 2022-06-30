import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

export default function NavBar({ TotalAmount }) {
    return (
        <AppBar position='static' sx={{ background: 'gray', py: 1, px: 3 }}>
            <Toolbar variant='dense'>
                <IconButton
                    edge='start'
                    color='inherit'
                    aria-label='menu'
                    sx={{ mr: 2 }}>
                    <Typography variant='h4' color='inherit' component='div'>
                        Logo
                    </Typography>
                </IconButton>
                <Typography
                    variant='h6'
                    color='inherit'
                    component='div'
                    sx={{ ml: 'auto' }}>
                    Total Amount : {TotalAmount}
                </Typography>
            </Toolbar>
        </AppBar>
    );
}
