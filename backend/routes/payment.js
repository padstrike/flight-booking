const express = require('express');
const router = express.Router();
const { createPayment } = require('../controllers/paymentController');
const auth = require('../middleware/auth');

// Route to process payment and create a booking
router.post('/create', auth, createPayment);

module.exports = router;
