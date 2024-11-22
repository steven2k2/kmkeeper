require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3001;

// Set up view engine and middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// // Serve static files from node_modules and public
// app.use('/static', express.static(path.join(__dirname, 'node_modules')));
// app.use(express.static('public'));

// Serve static files
app.use('/static', express.static(path.join(__dirname, 'node_modules')));
app.use('/public', express.static(path.join(__dirname, 'public')));

// Basic home route
app.get('/', (req, res) => {
    res.send('Welcome to KmKeeper!');
});

// Modularized routes
const usersRoutes = require('./routes/users');
app.use('/users', usersRoutes);

const clientsRoutes = require('./routes/clients');
app.use('/clients', clientsRoutes);

const tripsRoutes = require('./routes/trips');
app.use('/trips', tripsRoutes);

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});