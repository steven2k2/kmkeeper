// src/components/Sidebar.jsx

import React from 'react';
import {
    Drawer,
    AppBar,
    Toolbar,
    Typography,
    List,
    ListItem,
    ListItemText,
    Box,
} from '@mui/material';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ isDesktop, isDrawerOpen, toggleDrawer, drawerWidth }) => {
    const drawerContent = (
        <Box>
            {/* Sidebar AppBar */}
            <AppBar position="static" color="primary" sx={{ zIndex: 0 }}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Sidebar Title
                    </Typography>
                </Toolbar>
            </AppBar>

            {/* Sidebar Navigation */}
            <List>
                <ListItem
                    button
                    component={NavLink}
                    to="/"
                    onClick={!isDesktop ? toggleDrawer(false) : undefined}
                >
                    <ListItemText primary="Home" />
                </ListItem>
                <ListItem
                    button
                    component={NavLink}
                    to="/clients"
                    onClick={!isDesktop ? toggleDrawer(false) : undefined}
                >
                    <ListItemText primary="Clients" />
                </ListItem>
                <ListItem
                    button
                    component={NavLink}
                    to="/users"
                    onClick={!isDesktop ? toggleDrawer(false) : undefined}
                >
                    <ListItemText primary="Users" />
                </ListItem>
            </List>
        </Box>
    );

    return (
        <Drawer
            variant={isDesktop ? 'permanent' : 'temporary'}
            open={isDesktop || isDrawerOpen}
            onClose={toggleDrawer(false)}
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    boxShadow: 'none', // Removes shadow
                    borderRight: 'none', // Removes border
                },
            }}
        >
            {drawerContent}
        </Drawer>
    );
};

export default Sidebar;