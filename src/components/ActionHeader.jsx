// src/components/ActionHeader.jsx

import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Tooltip,
    Box,
    ButtonGroup,
    Button,
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const ActionHeader = ({ title, actions, onInfoClick }) => {
    return (
        <AppBar
            position="static"
            color="default"
            sx={{
                boxShadow: 'none',
                borderBottom: '1px solid #ddd',
                backgroundColor: '#f9f9f9',
                minHeight: 64,
            }}
        >
            <Toolbar sx={{ minHeight: 64 }}> {/* Matches AppBar height */}
                {/* Title Section */}
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    {title}
                </Typography>

                {/* Action Buttons */}
                {actions && (
                    <Box sx={{ display: 'flex', alignItems: 'center', marginRight: 2 }}>
                        <ButtonGroup variant="outlined" size="small" aria-label="view mode toggle">
                            {actions.map((action, index) => (
                                <Button
                                    key={index}
                                    startIcon={action.icon}
                                    onClick={action.onClick}
                                    sx={{
                                        ...(action.isSelected && {
                                            backgroundColor: 'primary.light',
                                            color: '#fff',
                                            '&:hover': {
                                                backgroundColor: 'primary.main',
                                            },
                                        }),
                                    }}
                                >
                                    {action.label}
                                </Button>
                            ))}
                        </ButtonGroup>
                    </Box>
                )}

                {/* Info Icon */}
                <Tooltip title="More information" arrow>
                    <IconButton color="inherit" aria-label="info" onClick={onInfoClick}>
                        <InfoOutlinedIcon />
                    </IconButton>
                </Tooltip>
            </Toolbar>
        </AppBar>
    );
};

export default ActionHeader;