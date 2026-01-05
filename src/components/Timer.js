// Timer component with start, pause, and reset functionality
import React, { useState, useEffect, useRef } from 'react';
import { saveTimerSession } from '../services/timerService';
import './Timer.css';

/**
 * Timer Component
 * Displays timer with start, pause, and reset controls
 * Automatically saves timer sessions to backend
 */
const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(null);
  const pausedTimeRef = useRef(0);

  // Timer effect
  useEffect(() => {
    if (isActive && !isPaused) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isActive, isPaused]);

  // Format time display
  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle start
  const handleStart = () => {
    if (!isActive) {
      startTimeRef.current = new Date();
      setIsActive(true);
      setIsPaused(false);
    } else if (isPaused) {
      setIsPaused(false);
    }
  };

  // Handle pause
  const handlePause = () => {
    if (isActive && !isPaused) {
      setIsPaused(true);
      pausedTimeRef.current = seconds;
    }
  };

  // Handle reset
  const handleReset = async () => {
    // Save session if timer was running
    if (isActive && startTimeRef.current && seconds > 0) {
      try {
        const endTime = new Date();
        await saveTimerSession(seconds, startTimeRef.current, endTime);
      } catch (error) {
        console.error('Error saving timer session:', error);
      }
    }

    setSeconds(0);
    setIsActive(false);
    setIsPaused(false);
    startTimeRef.current = null;
    pausedTimeRef.current = 0;
  };

  return (
    <div className="timer-container">
      <div className="timer-display">{formatTime(seconds)}</div>
      <div className="timer-controls">
        {!isActive ? (
          <button onClick={handleStart} className="timer-btn start-btn">
            Start
          </button>
        ) : isPaused ? (
          <button onClick={handleStart} className="timer-btn start-btn">
            Resume
          </button>
        ) : (
          <button onClick={handlePause} className="timer-btn pause-btn">
            Pause
          </button>
        )}
        <button
          onClick={handleReset}
          className="timer-btn reset-btn"
          disabled={!isActive && seconds === 0}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;

