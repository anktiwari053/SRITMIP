// Main App component with routing
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Chatbot from './pages/Chatbot';
import Profile from './pages/Profile';
import About from './pages/TeamMembers';
import SetTime from './pages/SetTime'

import './App.css';

/**
 * App Component
 * Main application component with routing configuration
 * Sets up all routes for the application
 */
function App() {
  return ( 
    <>
    <Router>
      <div className="App">
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Private routes - require authentication */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/chatbot"
            element={
              <PrivateRoute>
                <Chatbot />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
            <Route
            path="/about"
            element={
              <PrivateRoute>
                <About />
              </PrivateRoute>
            }
          />
            
              <Route
            path="/setTime"
            element={
              <PrivateRoute>
                <SetTime/>
              </PrivateRoute>
            }
          />
         
       
         
          
          {/* Catch all - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>

      
    </Router>

    


    </>  
  );
}

export default App;

