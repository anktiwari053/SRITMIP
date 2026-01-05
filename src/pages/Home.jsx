// Home page component with user name and notes panel
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { getNotes, createNote, updateNote, deleteNote } from '../services/notesService';
import { getCurrentUser } from '../services/authService';
import './Home.css';

/**
 * Home Page Component
 * Displays user name and notes panel with CRUD functionality
 */
const Home = () => {
  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [formData, setFormData] = useState({ title: '', content: '' });

  // Load user and notes on component mount
  useEffect(() => {
    loadData();
  }, []);

  // Load user and notes data
  const loadData = async () => {
    try {
      const userData = await getCurrentUser();
      setUser(userData);
      const notesData = await getNotes();
      setNotes(notesData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim()) {
      alert('Please fill in both title and content');
      return;
    }

    try {
      if (editingNote) {
        // Update existing note
        const updated = await updateNote(editingNote._id, formData.title, formData.content);
        setNotes(notes.map(note => note._id === updated._id ? updated : note));
      } else {
        // Create new note
        const newNote = await createNote(formData.title, formData.content);
        setNotes([newNote, ...notes]);
      }
      
      setFormData({ title: '', content: '' });
      setShowForm(false);
      setEditingNote(null);
    } catch (error) {
      console.error('Error saving note:', error);
      alert('Error saving note. Please try again.');
    }
  };

  // Handle edit note
  const handleEdit = (note) => {
    setEditingNote(note);
    setFormData({ title: note.title, content: note.description });
    setShowForm(true);
  };

  // Handle delete note
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await deleteNote(id);
        setNotes(notes.filter(note => note._id !== id));
      } catch (error) {
        console.error('Error deleting note:', error);
        alert('Error deleting note. Please try again.');
      }
    }
  };

  // Handle cancel form
  const handleCancel = () => {
    setFormData({ title: '', content: '' });
    setShowForm(false);
    setEditingNote(null);
  };

  if (loading) {
    return (
      <div className="home-container">
        <Navbar />
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="home-container">
      <Navbar />
      <div className="home-content">
        <div className="home-header">
          <h1 className="welcome-message">
            Welcome back, {user?.name || 'User'}! 👋
          </h1>
          <p className="subtitle">Manage your notes and stay organized</p>
        </div>

        <div className="notes-section">
          <div className="notes-header">
            <h2>Your Notes</h2>
            <button
              onClick={() => setShowForm(true)}
              className="add-note-btn"
            >
              + Add Note
            </button>
          </div>

          {/* Note Form */}
          {showForm && (
            <div className="note-form-container">
              <form onSubmit={handleSubmit} className="note-form">
                <input
                  type="text"
                  placeholder="Note Title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="note-input"
                  required
                />
                <textarea
                  placeholder="Write your note here..."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="note-textarea"
                  rows="5"
                  required
                />
                <div className="form-actions">
                  <button type="submit" className="save-btn">
                    {editingNote ? 'Update' : 'Save'} Note
                  </button>
                  <button type="button" onClick={handleCancel} className="cancel-btn">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Notes List */}
          <div className="notes-grid">
            {notes.length === 0 ? (
              <div className="empty-state">
                <p>No notes yet. Click "Add Note" to create your first note!</p>
              </div>
            ) : (
              notes.map((note) => (
                <div key={note._id} className="note-card">
                  <div className="note-header">
                    <h3 className="note-title">{note.title}</h3>
                    <div className="note-actions">
                      <button
                        onClick={() => handleEdit(note)}
                        className="edit-btn"
                        title="Edit"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDelete(note._id)}
                        className="delete-btn"
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                  <p className="note-content">{note.description}</p>
                  <div className="note-footer">
                    <span className="note-date">
                      {new Date(note.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

