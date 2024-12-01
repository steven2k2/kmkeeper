// App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import Browse from './views/clients/Browse.jsx';

const App = () => {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Debugging: Log the base API URL
        const baseUrl = process?.env?.REACT_APP_API_BASE_URL || 'http://default-api-url.com';
        console.log('Fetching clients from:', `${baseUrl}/api/clients`);

        const fetchClients = async () => {
            try {
                const response = await fetch(`${baseUrl}/api/clients`);
                console.log('API Response Status:', response.status);

                if (!response.ok) {
                    const responseBody = await response.text();
                    console.error('API Error Response Body:', responseBody);
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                console.log('Fetched Clients Data:', data);
                setClients(data);
            } catch (error) {
                console.error('Error fetching clients:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchClients();
    }, []);

    return (
        <Router>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        My Application
                    </Typography>
                    <Box>
                        <Button color="inherit" component={Link} to="/">
                            Home
                        </Button>
                        <Button color="inherit" component={Link} to="/clients">
                            Clients
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>

            <Routes>
                {/* Redirect "/" to "/home" */}
                <Route path="/" element={<Navigate to="/home" replace />} />
                <Route path="/home" element={<div>Welcome to the Home Page</div>} />
                <Route
                    path="/clients"
                    element={loading ? <div>Loading clients...</div> : <Browse clients={clients} />}
                />
            </Routes>
        </Router>
    );
};

export default App;