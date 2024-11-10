require('dotenv').config();
const express = require('express');
const { Client } = require('pg');
const path = require('path');

const app = express();
const port = process.env.PORT || 3001;

// Set up EJS as the view engine and specify the views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to parse JSON and URL-encoded data (in case of form submissions)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// PostgreSQL connection setup
const db = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT, // Ensure DB_PORT is set in .env
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to PostgreSQL:', err.message);
        return;
    }
    console.log('Connected to PostgreSQL database');
});

// Basic home route
app.get('/', (req, res) => {
    res.send('Welcome to KmKeeper!');
});

// Import modularized routes
const dashboardRoutes = require('./routes/dashboard');
const settingsRoutes = require('./routes/settings');
const tripRoutes = require('./routes/trips');

app.use(express.static('public'));

// Assign base paths to each router
app.use('/dashboard', dashboardRoutes);
app.use('/settings', settingsRoutes);
app.use('/trips', tripRoutes);

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});