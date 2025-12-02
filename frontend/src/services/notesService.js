// Notes service for CRUD operations on notes
import api from '../utils/api';

/**
 * Get all notes for current user
 * @returns {Promise} Array of notes
 */
export const getNotes = async () => {
  const response = await api.get('/notes');
  return response.data;
};

/**
 * Get a single note by ID
 * @param {string} id - Note ID
 * @returns {Promise} Note object
 */
export const getNote = async (id) => {
  const response = await api.get(`/notes/${id}`);
  return response.data;
};

/**
 * Create a new note
 * @param {string} title - Note title
 * @param {string} content - Note content
 * @returns {Promise} Created note
 */
export const createNote = async (title, content) => {
  const response = await api.post('/notes', { title, content });
  return response.data;
};

/**
 * Update a note
 * @param {string} id - Note ID
 * @param {string} title - Updated title
 * @param {string} content - Updated content
 * @returns {Promise} Updated note
 */
export const updateNote = async (id, title, content) => {
  const response = await api.put(`/notes/${id}`, { title, content });
  return response.data;
};

/**
 * Delete a note
 * @param {string} id - Note ID
 * @returns {Promise} Success message
 */
export const deleteNote = async (id) => {
  const response = await api.delete(`/notes/${id}`);
  return response.data;
};

