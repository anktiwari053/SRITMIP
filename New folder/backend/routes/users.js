const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect, isAdmin } = require('../middleware/auth');
const { validate } = require('../middleware/validation');

// All routes are protected
router.use(protect);
router.use(isAdmin);

// Get all users
router.get('/', userController.getUsers);

// Get user stats
router.get('/stats/overview', userController.getUserStats);

// Get single user
router.get('/:id', userController.getUser);

// Create user
router.post('/',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('phone').optional().trim(),
    body('status').optional().isIn(['active', 'inactive', 'suspended']).withMessage('Invalid status')
  ],
  validate,
  userController.createUser
);

// Update user
router.put('/:id',
  [
    body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
    body('email').optional().isEmail().withMessage('Please provide a valid email'),
    body('status').optional().isIn(['active', 'inactive', 'suspended']).withMessage('Invalid status')
  ],
  validate,
  userController.updateUser
);

// Delete user
router.delete('/:id', userController.deleteUser);

module.exports = router;

