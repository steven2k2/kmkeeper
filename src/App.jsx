// src/App.jsx

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MasterLayout from './layouts/MasterLayout';
import FullScreenLayout from './layouts/FullScreenLayout';
import HomePage from './pages/HomePage';
import ClientsPage from './pages/ClientsPage';
import UsersPage from './pages/UsersPage';
import SettingsPage from './pages/SettingsPage';
import EditDialog from './pages/EditDialog';

const App = () => {
    return (
        <Routes>
            {/* Master Layout: Sidebar + Child Views */}
            <Route path="/" element={<MasterLayout />}>
                <Route index element={<HomePage />} />
                <Route path="clients" element={<ClientsPage title="Clients" />} />
                <Route path="users" element={<UsersPage title="Users" />} />
            </Route>

            {/* Full-Screen Layout: Modal Views */}
            <Route path="/settings" element={<FullScreenLayout />}>
                <Route index element={<SettingsPage />} />
            </Route>
            <Route path="/edit/:id" element={<FullScreenLayout />}>
                <Route index element={<EditDialog />} />
            </Route>

            {/* Redirect unknown routes */}
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};

export default App;