const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Import Routes
const authRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/booking');
const flightRoutes = require('./routes/flight');

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/book', bookingRoutes);
app.use('/api/flight', flightRoutes);

// Server listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
