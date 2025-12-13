// Navigation bar component with real-time clock and timer
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../services/authService';
import Timer from './Timer';

import './Navbar.css';
import {allnotsh} from '../pages/Allnotsh';

/**
 * Navbar Component
 * Displays top navigation with real-time clock, timer controls, and navigation links
 */
const Navbar = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format time as HH:MM:SS
  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  // Format date
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Get user from localStorage
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Left section - Logo and Clock */}
        <div className="navbar-left">
          <Link to="/" className="navbar-logo">
            <span className="logo-icon">🏠</span>
            <span className="logo-text">Virtual Room</span>
          </Link>
          <div className="clock-section">
            <div className="current-time">{formatTime(currentTime)}</div>
            <div className="current-date">{formatDate(currentTime)}</div>
          </div>
        </div>

           

        {/* Right section - Navigation and User */}
        <div className="navbar-right">
          <Link to="/" className="nav-link"> 🏠Home</Link>
          <Link to="/chatbot" className="nav-link"> 💬Chatbot</Link>
          <Link to="/profile" className="nav-link"> 👤Profile</Link>
     <Link to="/about" className="nav-link"> 👥 TeamMembers</Link>   
            <Link to="/setTime" className="nav-link"> 👥 SetTime</Link>
          <Link to="/allnotsh" className="nav-link"> � All Notes</Link>
          
          <button onClick={handleLogout} className="logout-btn">
           🚪 Logout
          </button>

          {user.name && (
            <span className="user-name">Hello, {user.name}</span>
          )}

          

          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

