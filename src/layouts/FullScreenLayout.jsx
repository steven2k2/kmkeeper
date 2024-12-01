// src/layouts/FullScreenLayout.jsx

import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

const FullScreenLayout = () => {
    return (
        <Box
            sx={{
                height: '100vh', // Full height of the viewport
                display: 'flex', // Enable flexbox
                flexDirection: 'column', // Stack children vertically
                overflow: 'hidden', // Prevent unintended scrollbars
            }}
        >
            <Outlet /> {/* Render modal content */}
        </Box>
    );
};

export default FullScreenLayout;