import React, { createContext, useContext, useState, useEffect } from 'react';
import { getClients } from '../api/clientAPI.js';

const ClientContext = createContext();

export const ClientProvider = ({ children }) => {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const data = await getClients();
                setClients(data);
            } catch (error) {
                console.error('Failed to load clients:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchClients();
    }, []);

    return (
        <ClientContext.Provider value={{ clients, loading }}>
            {children}
        </ClientContext.Provider>
    );
};

export const useClients = () => useContext(ClientContext);