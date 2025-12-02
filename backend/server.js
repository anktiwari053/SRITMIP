// Main server file for Virtual Room System Backend
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
require('dotenv').config();

// Initialize Express app
const app = express();

// Connect to MongoDB database
connectDB();

// Middleware
app.use(cors()); // Enable CORS for frontend
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/timer', require('./routes/timer'));
app.use('/api/chatbot', require('./routes/chatbot'));

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ message: 'Virtual Room System API is running', status: 'OK' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ message: 'Server error', error: err.message });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

