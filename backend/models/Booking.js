const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  flightId: { type: String, ref: 'Flight', required: true },
  userId: { type: String, ref: 'User', required: true },
  passengers: [
    {
      name: { type: String, required: true },
      age: { type: Number, required: true },
    }
  ],
  bookingDate: { type: Date, default: Date.now },
  paymentStatus: { type: String, enum: ['Pending', 'Paid', 'Failed'], default: 'Pending' },
  paymentId: { type: String }, // Store payment processor's transaction ID
  amountPaid: { type: Number },
});

module.exports = mongoose.model('Booking', bookingSchema);
