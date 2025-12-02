// Timer routes for timer history management
const express = require('express');
const Timer = require('../models/Timer');
const { protect } = require('../middleware/auth');

const router = express.Router();

/**
 * @route   GET /api/timer
 * @desc    Get timer history for authenticated user
 * @access  Private
 */
router.get('/', protect, async (req, res) => {
  try {
    const timers = await Timer.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(50); // Limit to last 50 sessions
    res.json(timers);
  } catch (error) {
    console.error('Get timer history error:', error);
    res.status(500).json({ message: 'Server error fetching timer history' });
  }
});

/**
 * @route   POST /api/timer
 * @desc    Save a timer session
 * @access  Private
 */
router.post('/', protect, async (req, res) => {
  try {
    const { duration, startTime, endTime } = req.body;

    if (!duration || !startTime || !endTime) {
      return res.status(400).json({ message: 'Please provide duration, startTime, and endTime' });
    }

    const timer = await Timer.create({
      user: req.user._id,
      duration: parseInt(duration),
      startTime: new Date(startTime),
      endTime: new Date(endTime),
    });

    res.status(201).json(timer);
  } catch (error) {
    console.error('Save timer error:', error);
    res.status(500).json({ message: 'Server error saving timer session' });
  }
});

module.exports = router;

