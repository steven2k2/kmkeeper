/**
 * @fileoverview Routes for managing user operations.
 * Provides endpoints to browse, create, view, update, and delete users.
 *
 * ## Table of Routes
 * | HTTP Method | Endpoint        | Action           | Purpose                       |
 * |-------------|-----------------|------------------|-------------------------------|
 * | GET         | /users          | browse             | Fetch a list of all users.   |
 * | POST        | /users          | create           | Create a new user.           |
 * | GET         | /users/:id      | show             | Fetch details of a user.     |
 * | PUT         | /users/:id      | update           | Update a specific user.      |
 * | DELETE      | /users/:id      | delete           | Delete a specific user.      |
 */

const express = require('express');
const router = express.Router();
const apiRequest = require('../../src/utils/apiRequest.js'); // Centralized helper for API requests
const config = require('../../config.js');

const USERS_API_URL = `${config.apiBaseUrl}/api/users`; // Base API endpoint for users

/**
 * GET /users
 * Fetch and render a list of users.
 */
router.get('/', async (req, res) => {
    try {
        const users = await apiRequest('get', USERS_API_URL);
        res.render('users/browse', {
            title: 'Users',
            menuId: 'users',
            users,
            error: null
        });
    } catch (err) {
        console.error(`Error fetching users: ${err.message}`);
        res.render('users/browse', {
            title: 'User List Error',
            menuId: 'users',
            users: [],
            error: 'Failed to load user data'
        });
    }
});

/**
 * POST /users
 * Create a new user and redirect to the user list.
 */
router.post('/', async (req, res) => {
    try {
        await apiRequest('post', USERS_API_URL, req.body);
        res.redirect('/users');
    } catch (err) {
        console.error(`Error creating user: ${err.message}`);
        res.status(500).render('users/browse', {
            title: 'User List Error',
            menuId: 'users',
            users: [],
            error: 'Failed to create user'
        });
    }
});

/**
 * GET /users/:id
 * Fetch and render details of a specific user.
 */
router.get('/:id', async (req, res) => {
    try {
        const user = await apiRequest('get', `${USERS_API_URL}/${req.params.id}`);
        res.render('users/show', {
            title: `User Details: ${user.display_name}`,
            menuId: 'users',
            user,
            error: null
        });
    } catch (err) {
        console.error(`Error fetching user with ID ${req.params.id}: ${err.message}`);
        res.render('users/show', {
            title: 'User Details Error',
            menuId: 'users',
            user: null,
            error: `Failed to fetch user with ID ${req.params.id}`
        });
    }
});

/**
 * PUT /users/:id
 * Update an existing user and redirect to the user list.
 */
router.put('/:id', async (req, res) => {
    try {
        await apiRequest('put', `${USERS_API_URL}/${req.params.id}`, req.body);
        res.redirect('/users');
    } catch (err) {
        console.error(`Error updating user with ID ${req.params.id}: ${err.message}`);
        res.status(500).render('users/edit', {
            title: 'Edit User Error',
            menuId: 'users',
            user: req.body,
            error: 'Failed to update user'
        });
    }
});

/**
 * DELETE /users/:id
 * Delete a specific user and redirect to the user list.
 */
router.delete('/:id', async (req, res) => {
    try {
        await apiRequest('delete', `${USERS_API_URL}/${req.params.id}`);
        res.redirect('/users');
    } catch (err) {
        console.error(`Error deleting user with ID ${req.params.id}: ${err.message}`);
        res.status(500).render('users/browse', {
            title: 'User List Error',
            menuId: 'users',
            users: [],
            error: 'Failed to delete user'
        });
    }
});

module.exports = router;