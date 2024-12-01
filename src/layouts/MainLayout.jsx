import React from 'react';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';

const MainLayout = ({ children }) => (
    <>
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6">My App</Typography>
            </Toolbar>
        </AppBar>
        <Container>
            {children}
        </Container>
    </>
);

export default MainLayout;