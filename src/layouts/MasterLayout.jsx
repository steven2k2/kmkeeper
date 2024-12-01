import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { NavLink } from 'react-router-dom';

const drawerWidth = 240;

const MasterLayout = () => {
    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            {/* Sidebar */}
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
            >
                <List>
                    <ListItem button component={NavLink} to="/">
                        <ListItemText primary="Home" />
                    </ListItem>
                    <ListItem button component={NavLink} to="/clients">
                        <ListItemText primary="Clients" />
                    </ListItem>
                    <ListItem button component={NavLink} to="/users">
                        <ListItemText primary="Users" />
                    </ListItem>
                </List>
            </Drawer>

            {/* Main Content */}
            <Box component="main" sx={{ flexGrow: 1 }}>
                <Outlet /> {/* Render child views */}
            </Box>
        </Box>
    );
};

export default MasterLayout;