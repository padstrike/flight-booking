const express = require('express');
const router = express.Router();
const { allFlights,searchFlights } = require('../controllers/flightController');

// Search flights
router.get('/', allFlights);
router.post('/search', searchFlights);

module.exports = router;
