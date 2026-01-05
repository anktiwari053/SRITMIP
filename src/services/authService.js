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
  const response = await api.post('/auth/register', { name, email, password });
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
 * @returns {Promise} Response with token
 */
export const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  // Backend returns { success: true, token: "jwt-token-value" }
  if (response.data.success && response.data.token) {
    localStorage.setItem('token', response.data.token);
    return response.data;
  }
  throw new Error('Login failed: No token received');
};

/**
 * Get current user
 * @returns {Promise} Current user data
 */
export const getCurrentUser = async () => {
  const response = await api.get('/auth/getuser');
  // Backend returns { success: true, data: { _id, name, email, createdAt } }
  return response.data.data;
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

