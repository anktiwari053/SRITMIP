// Profile service for user profile management
import api from '../utils/api';

/**
 * Get complete user profile with all data
 * @returns {Promise} Profile object with user, notes, chats, and timers
 */
export const getProfile = async () => {
  const response = await api.get('/profile');
  return response.data;
};

/**
 * Update user profile
 * @param {string} name - Updated name
 * @param {string} email - Updated email
 * @returns {Promise} Updated user data
 */
export const updateProfile = async (name, email) => {
  const response = await api.put('/profile', { name, email });
  return response.data;
};

