// Timer service for timer history management
import api from '../utils/api';

/**
 * Get timer history for current user
 * @returns {Promise} Array of timer sessions
 */
export const getTimerHistory = async () => {
  const response = await api.get('/timer');
  return response.data;
};

/**
 * Save a timer session
 * @param {number} duration - Duration in seconds
 * @param {Date} startTime - Start time
 * @param {Date} endTime - End time
 * @returns {Promise} Saved timer session
 */
export const saveTimerSession = async (duration, startTime, endTime) => {
  const response = await api.post('/timer', {
    duration,
    startTime: startTime.toISOString(),
    endTime: endTime.toISOString(),
  });
  return response.data;
};

