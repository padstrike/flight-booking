const Booking = require('../models/Booking');
const { findFlightById } = require('../controllers/flightController');
const crypto = require('crypto')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
// Use environment variables or hardcoded values for the key and IV
const encryptionKey = process.env.ENCRYPTION_KEY || crypto.randomBytes(32); // 32 bytes key for AES-256
const iv = process.env.IV || crypto.randomBytes(16); // 16 bytes IV for AES-CBC

// Encrypt Function
function encrypt(text) {
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(encryptionKey), iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

// Decrypt Function
function decrypt(text) {
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(encryptionKey), iv);
    let decrypted = decipher.update(text, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

exports.createBookingWithPayment = async (req, res) => {
    const { flightId, passengers, token } = req.body;
  
    try {
      // Find the flight
      const flight = await findFlightById(flightId);
      if (!flight) {
        return res.status(404).json({ error: 'Flight not found' });
      }
  
      // Calculate total amount (e.g., based on the number of passengers and flight price)
      const totalAmount = flight.price * passengers.length;
  
      // Create Stripe charge
      const charge = await stripe.charges.create({
        amount: totalAmount * 100, // Stripe accepts amounts in cents
        currency: 'usd',
        source: token, // Payment token from frontend
        description: `Booking for flight from ${flight.origin} to ${flight.destination}`,
      });
  
      // Encrypt passenger details
      const encryptedPassengers = passengers.map(passenger => ({
        name: encrypt(passenger.name),
        age: passenger.age,
      }));
  
      // Create booking only if the payment is successful
      const booking = new Booking({
        flightId,
        userId: req.user, // From the auth middleware
        passengers: encryptedPassengers,
        bookingDate: new Date(),
        paymentStatus: 'Paid',
        paymentId: charge.id, // Store the Stripe charge ID
        amountPaid: totalAmount,
      });
  
      // Save booking in the database
      await booking.save();
  
      // Return the booking details
      res.status(201).json({ message: 'Booking successful', booking });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Payment or booking failed' });
    }
  };


exports.getBookingDetails = async (req, res) => {
    try {
        const bookingId = req.params.id; // Extract the booking ID from the URL parameter
        const booking = await Booking.findById(bookingId).populate('flightId').populate('userId');

        if (!booking) {
            return res.status(404).json({ msg: 'Booking not found' });
        }

        // Decrypt the passenger names before returning the booking details
        const decryptedPassengers = booking.passengers.map(passenger => ({
            name: decrypt(passenger.name),
            age: passenger.age
        }));

        // Replace the encrypted passengers with decrypted passengers in the response
        const bookingWithDecryptedPassengers = {
            ...booking.toObject(),
            passengers: decryptedPassengers
        };

        // Return the booking details with decrypted passengers
        res.json(bookingWithDecryptedPassengers);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to retrieve booking details' });
    }
};
