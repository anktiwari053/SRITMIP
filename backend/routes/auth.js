// Authentication Routes
const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUser } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post('/register', registerUser);

/**
 * @route   POST /api/auth/login
 * @desc    Login user
 * @access  Public
 */
router.post('/login', loginUser);

/**
 * @route   GET /api/auth/getuser
 * @desc    Get logged in user details
 * @access  Private
 */
router.get('/getuser', protect, getUser);

module.exports = router;
