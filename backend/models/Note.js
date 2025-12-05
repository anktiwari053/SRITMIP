// Note model schema for MongoDB
const mongoose = require('mongoose');

/**
 * Note Schema
 * Stores user notes with title and content
 * Each note is associated with a user
 */
const noteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: [true, 'Please provide a note title'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide note description'],
    trim: true,
  },
  tag: {
    type: String,
    default: 'General',
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt field before saving
noteSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Note', noteSchema);

