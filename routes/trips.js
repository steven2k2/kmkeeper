const express = require('express');
const router = express.Router();
const { Client } = require('pg');

// PostgreSQL connection setup (optional: consider moving to a separate db config file)
const db = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

// Connect to PostgreSQL
db.connect((err) => {
    if (err) {
        console.error('Error connecting to PostgreSQL:', err.message);
    } else {
        console.log('Connected to PostgreSQL database for trips');
    }
});

// Browse Trips Route
router.get('/browse', async (req, res) => {
    const query = 'SELECT * FROM trips';

    try {
        const { rows } = await db.query(query);
        res.render('trips/browse', { text: 'trips', trips: rows });
    } catch (err) {
        console.error('Error retrieving trips data:', err.message);
        res.status(500).send('Error retrieving trips data');
    }
});

module.exports = router;