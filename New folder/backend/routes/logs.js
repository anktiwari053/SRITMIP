const express = require('express');
const router = express.Router();
const logController = require('../controllers/logController');
const { protect, isAdmin } = require('../middleware/auth');

// All routes are protected
router.use(protect);
router.use(isAdmin);

// Get activity logs
router.get('/activity', logController.getActivityLogs);

// Get login logs
router.get('/login', logController.getLoginLogs);

// Get analytics
router.get('/analytics', logController.getAnalytics);

module.exports = router;

