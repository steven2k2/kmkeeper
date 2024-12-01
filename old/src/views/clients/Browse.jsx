// views/clients/Browse.js
import React from 'react';
import { Typography, Box, List, ListItem, ListItemText } from '@mui/material';

const Browse = ({ clients }) => {
    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4" gutterBottom>
                Clients
            </Typography>
            <List>
                {clients.map((client) => (
                    <ListItem key={client.id} divider>
                        <ListItemText
                            primary={client.name}
                            secondary={`Email: ${client.email}`}
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default Browse;