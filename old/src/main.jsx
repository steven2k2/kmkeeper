import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import App from './App.jsx';
import theme from './theme.js';

// Ensure the root element exists
const rootElement = document.getElementById('root');
if (!rootElement) {
    throw new Error("Root element not found");
}

// Render the application
createRoot(rootElement).render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
        </ThemeProvider>
    </StrictMode>
);