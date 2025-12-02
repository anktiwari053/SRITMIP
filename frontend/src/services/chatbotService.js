// Chatbot service for chatbot interactions
import api from '../utils/api';

/**
 * Get chat history
 * @returns {Promise} Chat history with messages
 */
export const getChatHistory = async () => {
  const response = await api.get('/chatbot/history');
  return response.data;
};

/**
 * Send a message to chatbot
 * @param {string} message - User message
 * @returns {Promise} Assistant response and chat history
 */
export const sendMessage = async (message) => {
  const response = await api.post('/chatbot/message', { message });
  return response.data;
};

/**
 * Clear chat history
 * @returns {Promise} Success message
 */
export const clearChatHistory = async () => {
  const response = await api.delete('/chatbot/history');
  return response.data;
};

