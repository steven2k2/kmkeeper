const express = require('express');
const router = express.Router();

// Dashboard Route
router.get('/', async (req, res) => {
    // Query to get recent trips (limit to the latest 5 trips)
    const recentTripsQuery = `
        SELECT client_name, start_location, end_location, distance, 
               TO_CHAR(start_time, 'YYYY-MM-DD') AS date
        FROM trips
        ORDER BY start_time DESC
        LIMIT 5
    `;

    // Query to get summary statistics
    const summaryQuery = `
        SELECT COUNT(*) AS total_trips,
               SUM(distance) AS total_distance,
               SUM(cost) AS total_claims
        FROM trips
    `;

    try {
        // Execute recent trips query
        const recentTripsResult = await db.query(recentTripsQuery);
        const recentTrips = recentTripsResult.rows;

        // Execute summary query
        const summaryResult = await db.query(summaryQuery);
        const summaryData = summaryResult.rows[0];

        res.render('dashboard', {
            text: 'dashboard',
            recentTrips: recentTrips,
            totalTrips: summaryData.total_trips || 0,
            totalDistance: summaryData.total_distance || 0,
            totalClaims: summaryData.total_claims || 0,
        });
    } catch (err) {
        console.error('Error retrieving dashboard data:', err.message);
        res.status(500).send('Error retrieving dashboard data');
    }
});

module.exports = router;