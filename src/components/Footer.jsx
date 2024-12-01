// src/components/Footer.jsx

import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                width: '100%',
                position: 'fixed', // Sticky at the bottom
                bottom: 0,
                bgcolor: 'primary.main', // Theme's primary color
                color: 'primary.contrastText', // Ensure readable text
                padding: 2,
                textAlign: 'center',
            }}
        >
            <Typography variant="body2">
                © 2024 My App
            </Typography>
        </Box>
    );
};

export default Footer;