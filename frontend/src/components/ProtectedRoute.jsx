// Protected Route Component
import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * ProtectedRoute Component
 * Checks if user has a valid token in localStorage
 * - If token exists → renders the protected component
 * - If token is missing → redirects to /login
 * 
 * @param {React.Component} children - The component to protect
 * @returns {React.Component} Protected component or redirect to login
 */
const ProtectedRoute = ({ children }) => {
  // Check if token exists in localStorage
  const token = localStorage.getItem('token');
  
  // If no token, redirect to login page
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  // If token exists, render the protected component
  return children;
};

export default ProtectedRoute;

