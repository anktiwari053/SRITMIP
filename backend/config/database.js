// Database connection configuration using MongoDB
const mongoose = require('mongoose');
require('dotenv').config();

/**
 * Connects to MongoDB database
 * Uses connection string from environment variables
 */
const connectDB = async () => {
  try {
    // MongoDB connection string - defaults to local if not provided
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/virtual-room';
    
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;

