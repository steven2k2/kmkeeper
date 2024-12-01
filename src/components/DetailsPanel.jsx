import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Collapse,
    Box,
    Paper,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const DetailsPanel = ({ isOpen, onClose, title, children }) => (
    <Collapse
        in={isOpen}
        orientation="horizontal"
        sx={{
            flexShrink: 0,
            width: isOpen ? 400 : 0,
            transition: (theme) =>
                theme.transitions.create('width', {
                    duration: theme.transitions.duration.standard,
                }),
            overflow: 'hidden',
            backgroundColor: '#f9f9f9',
            border: 'none', // Removes all borders
        }}
    >
        <Paper
            elevation={0}
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                border: 'none', // Removes any borders from Paper
            }}
        >
            <AppBar
                position="static"
                color="default"
                sx={{
                    boxShadow: 'none', // Removes shadow
                    borderBottom: 'none', // Removes bottom border
                    backgroundColor: '#f9f9f9',
                    minHeight: 64, // Ensures consistent height
                }}
            >
                <Toolbar sx={{ minHeight: 64 }}>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        {title}
                    </Typography>
                    <IconButton onClick={onClose} aria-label="Close details">
                        <CloseIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Box sx={{ padding: 2, flexGrow: 1, overflow: 'auto' }}>
                {children}
            </Box>
        </Paper>
    </Collapse>
);

export default DetailsPanel;