/**
 * @fileoverview Routes for managing client operations.
 * Provides endpoints to browse, create, view, update, and delete clients.
 *
 * ## Table of Routes
 * | HTTP Method | Endpoint        | Action           | Purpose                       |
 * |-------------|-----------------|------------------|-------------------------------|
 * | GET         | /clients        | list             | Fetch a list of all clients. |
 * | POST        | /clients        | create           | Create a new client.         |
 * | GET         | /clients/:id    | show             | Fetch details of a client.   |
 * | PUT         | /clients/:id    | update           | Update a specific client.    |
 * | DELETE      | /clients/:id    | delete           | Delete a specific client.    |
 */

const express = require('express');
const router = express.Router();
const apiRequest = require('../utils/apiRequest'); // Centralized helper for API requests
const config = require('../config');

const CLIENTS_API_URL = `${config.apiBaseUrl}/api/clients`; // Base API endpoint for clients

/**
 * GET /clients
 * Fetch and render a list of all clients.
 */
router.get('/', async (req, res) => {
    try {
        const clients = await apiRequest('get', CLIENTS_API_URL);
        res.render('clients/browse', {
            title: 'Clients',
            menuId: 'clients',
            clients,
            error: null
        });
    } catch (err) {
        console.error(`Error fetching clients: ${err.message}`);
        res.render('clients/browse', {
            title: 'Client List Error',
            menuId: 'clients',
            clients: [],
            error: 'Failed to load client data'
        });
    }
});

/**
 * POST /clients
 * Create a new client and redirect to the browse view.
 */
router.post('/', async (req, res) => {
    try {
        await apiRequest('post', CLIENTS_API_URL, req.body);
        res.redirect('/clients');
    } catch (err) {
        console.error(`Error creating client: ${err.message}`);
        res.status(500).render('clients/browse', {
            title: 'Client List Error',
            menuId: 'clients',
            clients: [],
            error: 'Failed to create client'
        });
    }
});

/**
 * GET /clients/:id
 * Fetch and render details of a specific client.
 */
router.get('/:id', async (req, res) => {
    try {
        const client = await apiRequest('get', `${CLIENTS_API_URL}/${req.params.id}`);
        res.render('clients/show', {
            title: `Client Details: ${client.display_name}`,
            client,
            error: null
        });
    } catch (err) {
        console.error(`Error fetching client with ID ${req.params.id}: ${err.message}`);
        res.render('clients/show', {
            title: 'Client Details Error',
            menuId: 'clients',
            client: null,
            error: `Failed to fetch client with ID ${req.params.id}`
        });
    }
});

/**
 * PUT /clients/:id
 * Update an existing client and redirect to the browse view.
 */
router.put('/:id', async (req, res) => {
    try {
        await apiRequest('put', `${CLIENTS_API_URL}/${req.params.id}`, req.body);
        res.redirect('/clients');
    } catch (err) {
        console.error(`Error updating client with ID ${req.params.id}: ${err.message}`);
        res.status(500).render('clients/edit', {
            title: 'Edit Client Error',
            menuId: 'clients',
            client: req.body,
            error: 'Failed to update client'
        });
    }
});

/**
 * DELETE /clients/:id
 * Delete a specific client and redirect to the browse view.
 */
router.delete('/:id', async (req, res) => {
    try {
        await apiRequest('delete', `${CLIENTS_API_URL}/${req.params.id}`);
        res.redirect('/clients');
    } catch (err) {
        console.error(`Error deleting client with ID ${req.params.id}: ${err.message}`);
        res.status(500).render('clients/browse', {
            title: 'Client List Error',
            menuId: 'clients',
            clients: [],
            error: 'Failed to delete client'
        });
    }
});

module.exports = router;