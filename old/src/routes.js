import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import HomePage from './pages/Home';
import ClientsPage from './pages/Clients';

const routes = [
    { path: '/', element: <Navigate to="/home" replace /> },
    { path: '/home', element: <HomePage /> },
    { path: '/clients', element: <ClientsPage /> },
];

export default routes;