import React, { useState } from 'react';
import { Box } from '@mui/material';
import PrimaryToolbar from '../components/PrimaryToolbar';
import ActionHeader from '../components/ActionHeader';
import ListIcon from '@mui/icons-material/ViewList';
import GridIcon from '@mui/icons-material/Apps';

const UsersPage = () => {
    const [selectedView, setSelectedView] = useState('list'); // State for view mode

    const handleViewToggle = (view) => {
        setSelectedView(view);
        console.log(`Switched to ${view} view`);
    };

    // Actions for the ActionHeader
    const actions = [
        {
            label: 'List',
            icon: <ListIcon />,
            onClick: () => handleViewToggle('list'),
            isSelected: selectedView === 'list',
        },
        {
            label: 'Grid',
            icon: <GridIcon />,
            onClick: () => handleViewToggle('grid'),
            isSelected: selectedView === 'grid',
        },
    ];

    return (
        <Box>
            {/* Primary Toolbar */}
            <PrimaryToolbar title="Users" />

            {/* Secondary Toolbar */}
            <ActionHeader
                title="Users Management"
                actions={actions}
                onInfoClick={() => alert('More information about users')}
            />

            {/* Main Content */}
            <Box sx={{ padding: 3 }}>
                <p>Here is the list of users.</p>
            </Box>
        </Box>
    );
};

export default UsersPage;