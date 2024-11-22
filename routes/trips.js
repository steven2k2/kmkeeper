/**
 * @fileoverview Routes for managing trips.
 * Provides endpoints to browse and manage trip data.
 *
 * ## Table of Routes
 * | HTTP Method | Endpoint       | Action     | Purpose                         |
 * |-------------|----------------|------------|---------------------------------|
 * | GET         | /trips/browse  | browse     | Fetch and render a list of trips. |
 */

const express = require('express');
const router = express.Router();
const apiRequest = require('../utils/apiRequest'); // Utility for making API requests
const config = require('../config');

const TRIPS_API_URL = `${config.apiBaseUrl}/api/trips`; // Base API endpoint for trips

/**
 * GET /trips/browse
 * Fetch and render a list of trips.
 */
router.get('/browse', async (req, res) => {
    try {
        // Fetch trip data from the API
        const trips = await apiRequest('get', TRIPS_API_URL);

        // Render the browse view
        res.render('trips/browse', {
            title: 'Trips',
            menuId: 'trips',
            trips,
            error: null // No error
        });
    } catch (err) {
        console.error(`Error fetching trips: ${err.message}`);

        // Render the browse view with an error message
        res.render('trips/browse', {
            title: 'Trips - Error',
            menuId: 'trips',
            trips: [],
            error: 'Failed to load trips.'
        });
    }
});

module.exports = router;