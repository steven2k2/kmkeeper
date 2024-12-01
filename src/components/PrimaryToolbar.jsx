import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Tooltip } from '@mui/material';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

const PrimaryToolbar = ({ title }) => {
    return (
        <AppBar position="static" sx={{ boxShadow: 'none' }}> {/* Removed Shadow */}
            <Toolbar>
                {/* App Title */}
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    {title}
                </Typography>

                {/* Action Icons with Tooltips */}
                <Box>
                    {/* Utility Icons */}
                    <Tooltip title="Help" arrow>
                        <IconButton color="inherit" aria-label="help" sx={{ mx: 0.5 }}>
                            <HelpOutlineIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Settings" arrow>
                        <IconButton color="inherit" aria-label="settings" sx={{ mx: 0.5 }}>
                            <SettingsOutlinedIcon />
                        </IconButton>
                    </Tooltip>

                    {/* Navigational Icons */}
                    <Tooltip title="Apps" arrow>
                        <IconButton color="inherit" aria-label="apps" sx={{ mx: 0.5 }}>
                            <AppsOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Account" arrow>
                        <IconButton color="inherit" aria-label="account" sx={{ mx: 0.5 }}>
                            <AccountCircleOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default PrimaryToolbar;