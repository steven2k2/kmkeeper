const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        message: 'Test route with data!',
        items: ['Item 1', 'Item 2', 'Item 3'],
    });
});

module.exports = router;