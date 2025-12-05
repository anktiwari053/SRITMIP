// Database connection configuration using MongoDB
const mongoose = require('mongoose');
require('dotenv').config();

/**
 * Connects to MongoDB database
 * Uses connection string from environment variables
 */
const connectDB = async () => {
  try {
    // MongoDB connection string from environment variables
    const mongoURI = process.env.MONGODB_URI;
    
    if (!mongoURI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }
    
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

