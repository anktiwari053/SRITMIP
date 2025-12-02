// Authentication service for login and signup
import api from '../utils/api';

/**
 * Register a new user
 * @param {string} name - User's name
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Promise} User data with token
 */
export const signup = async (name, email, password) => {
  const response = await api.post('/auth/signup', { name, email, password });
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

/**
 * Login user
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Promise} User data with token
 */
export const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

/**
 * Get current user
 * @returns {Promise} Current user data
 */
export const getCurrentUser = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};

/**
 * Logout user
 */
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

/**
 * Check if user is authenticated
 * @returns {boolean} True if user is logged in
 */
export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

