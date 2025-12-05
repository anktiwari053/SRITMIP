// Notes Routes
const express = require('express');
const router = express.Router();
const { addNote, fetchAllNotes, updateNote, deleteNote } = require('../controllers/notesController');
const { protect } = require('../middleware/auth');

// All notes routes are protected
router.use(protect);

/**
 * @route   POST /api/notes/add
 * @desc    Create a new note
 * @access  Private
 */
router.post('/add', addNote);

/**
 * @route   GET /api/notes/fetchall
 * @desc    Get all notes for logged in user
 * @access  Private
 */
router.get('/fetchall', fetchAllNotes);

/**
 * @route   PUT /api/notes/update/:id
 * @desc    Update a note
 * @access  Private
 */
router.put('/update/:id', updateNote);

/**
 * @route   DELETE /api/notes/delete/:id
 * @desc    Delete a note
 * @access  Private
 */
router.delete('/delete/:id', deleteNote);

module.exports = router;
