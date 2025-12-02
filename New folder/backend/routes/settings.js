const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settingsController');
const { protect, isAdmin } = require('../middleware/auth');

// All routes are protected
router.use(protect);
router.use(isAdmin);

// Get settings
router.get('/', settingsController.getSettings);

// Update settings
router.put('/', settingsController.updateSettings);

module.exports = router;

