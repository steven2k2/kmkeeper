// routes/clients.js
const express = require('express');
const router = express.Router();
const db = require('../db'); // Import shared db connection

// Route to display all clients in a table
router.get('/browse', async (req, res) => { // Updated route path to '/browse'
    const query = 'SELECT * FROM clients';

    try {
        const { rows: clients } = await db.query(query);
        res.render('clients/browse', { clients,
        text: 'clients',});
    } catch (err) {
        console.error('Error retrieving clients:', err.message);
        res.status(500).send('Error retrieving clients');
    }
});

module.exports = router;