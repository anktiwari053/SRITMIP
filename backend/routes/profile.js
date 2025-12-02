// Profile routes for user profile management
const express = require('express');
const User = require('../models/User');
const Note = require('../models/Note');
const Chat = require('../models/Chat');
const Timer = require('../models/Timer');
const { protect } = require('../middleware/auth');

const router = express.Router();

/**
 * @route   GET /api/profile
 * @desc    Get complete user profile with all data
 * @access  Private
 */
router.get('/', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    // Get all user-related data
    const notes = await Note.find({ user: req.user._id }).sort({ updatedAt: -1 });
    const chats = await Chat.find({ user: req.user._id }).sort({ updatedAt: -1 });
    const timers = await Timer.find({ user: req.user._id }).sort({ createdAt: -1 }).limit(10);

    res.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
      notes,
      chats,
      timers,
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error fetching profile' });
  }
});

/**
 * @route   PUT /api/profile
 * @desc    Update user profile
 * @access  Private
 */
router.put('/', protect, async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update fields if provided
    if (name) user.name = name;
    if (email) {
      // Check if email is already taken by another user
      const emailExists = await User.findOne({ email, _id: { $ne: req.user._id } });
      if (emailExists) {
        return res.status(400).json({ message: 'Email already in use' });
      }
      user.email = email;
    }

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error updating profile' });
  }
});

module.exports = router;

