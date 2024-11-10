require('dotenv').config();
const express = require('express');
const { Client } = require('pg');
const path = require('path');

const app = express();
const port = process.env.PORT || 3001;

// PostgreSQL connection setup
const db = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to PostgreSQL:', err.message);
    } else {
        console.log('Connected to PostgreSQL database');
    }
});

// Set up view engine and middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from node_modules and public
app.use('/static', express.static(path.join(__dirname, 'node_modules')));
app.use(express.static('public'));

// Basic home route
app.get('/', (req, res) => {
    res.send('Welcome to KmKeeper!');
});

// Modularized routes
const dashboardRoutes = require('./routes/dashboard');
const settingsRoutes = require('./routes/settings');
const tripRoutes = require('./routes/trips');
const clientsRoutes = require('./routes/clients');

// Assign base paths to each router
app.use('/dashboard', dashboardRoutes);
app.use('/settings', settingsRoutes);
app.use('/trips', tripRoutes);
app.use('/clients', clientsRoutes)
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));

app.use("/public", express.static(path.join(__dirname, 'public')));

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});