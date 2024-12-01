import React from 'react';
import { useClients } from '../src/store/ClientContext.js';

const ClientsPage = () => {
    const { clients, loading } = useClients();

    if (loading) return <p>Loading...</p>;
    return (
        <ul>
            {clients.map(client => (
                <li key={client.id}>{client.name}</li>
            ))}
        </ul>
    );
};