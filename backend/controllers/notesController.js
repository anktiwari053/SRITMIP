// Notes Controller
const Note = require('../models/Note');

/**
 * @route   POST /api/notes/add
 * @desc    Create a new note
 * @access  Private
 */
const addNote = async (req, res) => {
  try {
    const { title, description, tag } = req.body;

    // Validation
    if (!title || !description) {
      return res.status(400).json({ 
        success: false,
        message: 'Please provide title and description' 
      });
    }

    // Create note
    const note = await Note.create({
      user: req.user._id,
      title,
      description,
      tag: tag || 'General',
    });

    res.status(201).json({
      success: true,
      message: 'Note created successfully',
      data: note,
    });
  } catch (error) {
    console.error('Add note error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error', 
      error: error.message 
    });
  }
};

/**
 * @route   GET /api/notes/fetchall
 * @desc    Get all notes for logged in user
 * @access  Private
 */
const fetchAllNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user._id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: 'Notes fetched successfully',
      count: notes.length,
      data: notes,
    });
  } catch (error) {
    console.error('Fetch notes error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error', 
      error: error.message 
    });
  }
};

/**
 * @route   PUT /api/notes/update/:id
 * @desc    Update a note
 * @access  Private
 */
const updateNote = async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    const { id } = req.params;

    // Find note
    let note = await Note.findById(id);

    if (!note) {
      return res.status(404).json({ 
        success: false,
        message: 'Note not found' 
      });
    }

    // Check if note belongs to user
    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ 
        success: false,
        message: 'Not authorized to update this note' 
      });
    }

    // Update note
    note = await Note.findByIdAndUpdate(
      id,
      {
        title: title || note.title,
        description: description || note.description,
        tag: tag || note.tag,
        updatedAt: Date.now(),
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: 'Note updated successfully',
      data: note,
    });
  } catch (error) {
    console.error('Update note error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error', 
      error: error.message 
    });
  }
};

/**
 * @route   DELETE /api/notes/delete/:id
 * @desc    Delete a note
 * @access  Private
 */
const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    // Find note
    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).json({ 
        success: false,
        message: 'Note not found' 
      });
    }

    // Check if note belongs to user
    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ 
        success: false,
        message: 'Not authorized to delete this note' 
      });
    }

    // Delete note
    await Note.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: 'Note deleted successfully',
    });
  } catch (error) {
    console.error('Delete note error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error', 
      error: error.message 
    });
  }
};

module.exports = {
  addNote,
  fetchAllNotes,
  updateNote,
  deleteNote,
};

