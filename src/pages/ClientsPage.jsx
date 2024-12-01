import React, { useState } from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import PrimaryToolbar from '../components/PrimaryToolbar';
import ActionHeader from '../components/ActionHeader';
import DetailsPanel from '../components/DetailsPanel';
import ListIcon from '@mui/icons-material/ViewList';
import GridIcon from '@mui/icons-material/Apps';

const ClientsPage = ({ title = 'Clients' }) => {
    const [selectedView, setSelectedView] = useState('list'); // State for view mode
    const [isDetailsOpen, setDetailsOpen] = useState(false); // State for collapsible details panel

    const handleViewToggle = (view) => setSelectedView(view); // Handle toggling between views
    const toggleDetails = () => setDetailsOpen((prev) => !prev); // Toggle the details panel

    const actions = [
        {
            label: 'List View',
            icon: <ListIcon />,
            onClick: () => handleViewToggle('list'),
            isSelected: selectedView === 'list',
        },
        {
            label: 'Grid View',
            icon: <GridIcon />,
            onClick: () => handleViewToggle('grid'),
            isSelected: selectedView === 'grid',
        },
    ];

    // Dummy data for clients
    const clients = [
        { id: 1, name: 'Acme Corp', email: 'contact@acme.com', phone: '555-1234' },
        { id: 2, name: 'Globex Inc', email: 'info@globex.com', phone: '555-5678' },
        { id: 3, name: 'Soylent Corp', email: 'support@soylent.com', phone: '555-8765' },
        { id: 4, name: 'Initech', email: 'sales@initech.com', phone: '555-4321' },
    ];

    // DataGrid columns definition for "List View"
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', flex: 1 },
        { field: 'email', headerName: 'Email', flex: 1 },
        { field: 'phone', headerName: 'Phone', flex: 1 },
    ];

    return (
        <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            {/* Primary Toolbar */}
            <PrimaryToolbar />

            {/* Main Content with ActionHeader and DetailsPanel */}
            <Box sx={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
                {/* Main Content */}
                <Box sx={{ flexGrow: 1 }}>
                    <ActionHeader
                        title={title}
                        actions={actions}
                        onInfoClick={toggleDetails}
                    />
                    <Box sx={{ padding: 3, height: 'calc(100% - 64px)' }}>
                        {selectedView === 'list' ? (
                            // DataGrid for List View
                            <DataGrid
                                rows={clients}
                                columns={columns}
                                pageSize={5}
                                rowsPerPageOptions={[5]}
                                checkboxSelection
                            />
                        ) : (
                            // Grid for Grid View
                            <Grid container spacing={2}>
                                {clients.map((client) => (
                                    <Grid item xs={12} sm={6} md={4} lg={3} key={client.id}>
                                        <Paper sx={{ padding: 2 }}>
                                            <Typography variant="h6">{client.name}</Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {client.email}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {client.phone}
                                            </Typography>
                                        </Paper>
                                    </Grid>
                                ))}
                            </Grid>
                        )}
                    </Box>
                </Box>

                {/* Reusable Details Panel */}
                <DetailsPanel
                    isOpen={isDetailsOpen}
                    onClose={toggleDetails}
                    title="Details"
                >
                    <Typography variant="body1">
                        Here is some detailed information about the clients page.
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ marginTop: 2 }}>
                        Additional information can go here, such as metadata, options, or related details.
                    </Typography>
                </DetailsPanel>
            </Box>
        </Box>
    );
};

export default ClientsPage;