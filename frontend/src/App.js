// Main App component with routing
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup';
import Home from './pages/Home.jsx';
import Chatbot from './pages/Chatbot';
import Profile from './pages/Profile';
import About from './pages/TeamMembers';
import SetTime from './pages/SetTime';

import './App.css';

/**
 * App Component
 * Main application component with routing configuration
 * Sets up all routes for the application with proper authentication
 * - Public routes: /login, /signup
 * - Protected routes: /home, /, /chatbot, /profile, /about, /setTime
 * - ProtectedRoute component checks for token and redirects to /login if missing
 */
function App() {
  return ( 
    <Router>
      <div className="App">
        <Routes>
          {/* Public routes - accessible without authentication */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Protected routes - require authentication via ProtectedRoute */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chatbot"
            element={
              <ProtectedRoute>
                <Chatbot />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/about"
            element={
              <ProtectedRoute>
                <About />
              </ProtectedRoute>
            }
          />
          <Route
            path="/setTime"
            element={
              <ProtectedRoute>
                <SetTime />
              </ProtectedRoute>
            }
          />
          
          {/* Catch all - redirect to home */}
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

