// Timer model schema for MongoDB
const mongoose = require('mongoose');

/**
 * Timer Schema
 * Stores timer history for each user
 * Tracks session duration and timestamps
 */
const timerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  duration: {
    type: Number, // Duration in seconds
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Timer', timerSchema);

