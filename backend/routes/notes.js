// Notes routes for CRUD operations
const express = require('express');
const Note = require('../models/Note');
const { protect } = require('../middleware/auth');

const router = express.Router();

/**
 * @route   GET /api/notes
 * @desc    Get all notes for authenticated user
 * @access  Private
 */
router.get('/', protect, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user._id }).sort({ updatedAt: -1 });
    res.json(notes);
  } catch (error) {
    console.error('Get notes error:', error);
    res.status(500).json({ message: 'Server error fetching notes' });
  }
});

/**
 * @route   GET /api/notes/:id
 * @desc    Get a single note by ID
 * @access  Private
 */
router.get('/:id', protect, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    // Check if note belongs to user
    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to access this note' });
    }

    res.json(note);
  } catch (error) {
    console.error('Get note error:', error);
    res.status(500).json({ message: 'Server error fetching note' });
  }
});

/**
 * @route   POST /api/notes
 * @desc    Create a new note
 * @access  Private
 */
router.post('/', protect, async (req, res) => {
  try {
    const { title, content  } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: 'Please provide title and content' });
    }

    const note = await Note.create({
      user: req.user._id,
      title,
      content,
    });

    res.status(201).json(note);
  } catch (error) {
    console.error('Create note error:', error);
    res.status(500).json({ message: 'Server error creating note' });
  }
});

/**
 * @route   PUT /api/notes/:id
 * @desc    Update a note
 * @access  Private
 */
router.put('/:id', protect, async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    // Check if note belongs to user
    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this note' });
    }

    note.title = title || note.title;
    note.content = content || note.content;
    note.updatedAt = Date.now();

    const updatedNote = await note.save();
    res.json(updatedNote);
  } catch (error) {
    console.error('Update note error:', error);
    res.status(500).json({ message: 'Server error updating note' });
  }
});

/**
 * @route   DELETE /api/notes/:id
 * @desc    Delete a note
 * @access  Private
 */
router.delete('/:id', protect, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    // Check if note belongs to user
    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this note' });
    }

    await note.deleteOne();
    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error('Delete note error:', error);
    res.status(500).json({ message: 'Server error deleting note' });
  }
});

module.exports = router;

