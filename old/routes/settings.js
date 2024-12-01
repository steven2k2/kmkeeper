const express = require('express');
const router = express.Router();

// Settings Route
router.get('/', (req, res) => {
    res.render('settings');
});

module.exports = router;