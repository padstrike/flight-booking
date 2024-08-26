const express = require('express');
const router = express.Router();
const { createBookingWithPayment , getBookingDetails} = require('../controllers/bookingController');
const auth = require('../middleware/auth');

// Protected route: Create a booking
router.post('/book-and-pay', auth, createBookingWithPayment);
router.get('/:id', auth, getBookingDetails);

module.exports = router;  // Corrected export statement
