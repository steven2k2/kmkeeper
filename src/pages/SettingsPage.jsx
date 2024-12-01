// pages/SettingsPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

const SettingsPage = () => {
    const navigate = useNavigate(); // React Router's navigation hook

    return (
        <Box>
            {/* AppBar with Back Arrow, Apps, and User Icons */}
            <AppBar position="static">
                <Toolbar>
                    {/* Back Arrow Button */}
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="back"
                        onClick={() => navigate(-1)} // Navigate to the previous route
                        sx={{ marginRight: 2 }}
                    >
                        <ArrowBackIcon />
                    </IconButton>

                    {/* Title */}
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Settings
                    </Typography>

                    {/* Apps Icon */}
                    <IconButton color="inherit" aria-label="apps">
                        <AppsOutlinedIcon />
                    </IconButton>

                    {/* User Icon */}
                    <IconButton color="inherit" aria-label="account">
                        <AccountCircleOutlinedIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            {/* Main Content */}
            <Box sx={{ padding: 3 }}>
                <h1>Settings</h1>
            </Box>
        </Box>
    );
};

export default SettingsPage;