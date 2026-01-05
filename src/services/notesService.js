// Notes service for CRUD operations on notes
import api from '../utils/api';

/**
 * Get all notes for current user
 * @returns {Promise} Array of notes
 */
export const getNotes = async () => {
  const response = await api.get('/notes/fetchall');
  // Backend returns { success: true, data: notes }
  return response.data.data || [];
};

/**
 * Get a single note by ID
 * @param {string} id - Note ID
 * @returns {Promise} Note object
 */
export const getNote = async (id) => {
  const response = await api.get(`/notes/${id}`);
  return response.data.data;
};

/**
 * Create a new note
 * @param {string} title - Note title
 * @param {string} content - Note content (mapped to description in backend)
 * @returns {Promise} Created note
 */
export const createNote = async (title, content) => {
  // Backend expects 'description' but we use 'content' in frontend
  const response = await api.post('/notes/add', { 
    title, 
    description: content 
  });
  // Backend returns { success: true, data: note }
  return response.data.data;
};

/**
 * Update a note
 * @param {string} id - Note ID
 * @param {string} title - Updated title
 * @param {string} content - Updated content (mapped to description in backend)
 * @returns {Promise} Updated note
 */
export const updateNote = async (id, title, content) => {
  // Backend expects 'description' but we use 'content' in frontend
  const response = await api.put(`/notes/update/${id}`, { 
    title, 
    description: content 
  });
  // Backend returns { success: true, data: note }
  return response.data.data;
};

/**
 * Delete a note
 * @param {string} id - Note ID
 * @returns {Promise} Success message
 */
export const deleteNote = async (id) => {
  const response = await api.delete(`/notes/delete/${id}`);
  return response.data;
};

