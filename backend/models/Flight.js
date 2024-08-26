const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  date: { type: String, required: true },
  price: { type: Number, required: true }
});

module.exports = mongoose.model('Flight', flightSchema);
