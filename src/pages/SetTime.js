import React, { useState, useEffect, useRef } from "react";
import './SetTime.css';
import Navbar from '../components/Navbar';

function SetTime() {
  // ----- View State -----
  const [isClockView, setIsClockView] = useState(true);

  // ----- Clock State -----
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  // ----- Timer State -----
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const timerRef = useRef(null);

  // ----- Background -----
  const backgrounds = [
    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
  ];
  const [bgIndex, setBgIndex] = useState(0);

  // ----- Clock Update -----
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, "0");
      const m = String(now.getMinutes()).padStart(2, "0");
      const s = String(now.getSeconds()).padStart(2, "0");
      setTime(`${h}:${m}:${s}`);

      const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const day = days[now.getDay()];
      const month = months[now.getMonth()];
      const dateNum = now.getDate();
      const year = now.getFullYear();
      setDate(`${day}, ${month} ${dateNum}, ${year}`);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // ----- Timer Formatting -----
  const formatTime = (totalSec) => {
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(
      s
    ).padStart(2, "0")}`;
  };

  // ----- Timer Logic -----
  const startTimer = () => {
    if (!isRunning && !isPaused) {
      const total =
        (parseInt(hours) || 0) * 3600 +
        (parseInt(minutes) || 0) * 60 +
        (parseInt(seconds) || 0);
      if (total === 0) {
        alert("Please set a timer value!");
        return;
      }
      setRemainingSeconds(total);
    }
    setIsRunning(true);
    setIsPaused(false);

    timerRef.current = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setIsRunning(false);
          setIsPaused(false);
          alert("Timer Completed! ⏰");
          setIsClockView(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const pauseTimer = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setIsPaused(true);
  };

  const resetTimer = () => {
    clearInterval(timerRef.current);
    setRemainingSeconds(0);
    setIsRunning(false);
    setIsPaused(false);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
  };

  // ----- Background Change -----
  const changeBackground = () => {
    setBgIndex((prev) => (prev + 1) % backgrounds.length);
  };

  return (
  
    
    <div
      className="container"
      style={{ background: backgrounds[bgIndex] }}
    >
       <Navbar />
        
      {/* Clock View */}
      {isClockView && (
        <div className="clock-view">
          <div className="time-display">{time}</div>
          <div className="date-display">{date}</div>
        </div>
      )}

      {/* Timer View */}
      {!isClockView && (
        <div className="timer-view">
          <div className="timer-input-section">
            <h2>Set Timer</h2>
            <div className="input-group">
              <input
                type="number"
                min="0"
                max="99"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
              />
              <span className="separator">:</span>
              <input
                type="number"
                min="0"
                max="59"
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
              />
              <span className="separator">:</span>
              <input
                type="number"
                min="0"
                max="59"
                value={seconds}
                onChange={(e) => setSeconds(e.target.value)}
              />
            </div>
            <div
              className={`timer-display ${
                remainingSeconds <= 60 && remainingSeconds > 0
                  ? "warning"
                  : ""
              }`}
            >
              {formatTime(remainingSeconds)}
            </div>
          </div>
          <div className="timer-controls">
            <button
              className="btn btn-start"
              onClick={startTimer}
              disabled={isRunning}
            >
              Start
            </button>
            <button
              className="btn btn-pause"
              onClick={pauseTimer}
              disabled={!isRunning}
            >
              Pause
            </button>
            <button
              className="btn btn-reset"
              onClick={resetTimer}
              disabled={remainingSeconds === 0}
            >
              Reset
            </button>
          </div>
          <div className="timer-footer">
            <button
              className="btn btn-clock"
              onClick={() => setIsClockView(true)}
            >
              🕐 Real Time Clock
            </button>
          </div>
        </div>
      )}

      {/* Control Buttons */}
      <div className="control-buttons">
        <button className="btn btn-toggle" onClick={() => setIsClockView(!isClockView)}>
          {isClockView ? "Switch to Timer" : "Switch to Clock"}
        </button>
        <button className="btn btn-bg" onClick={changeBackground}>
          Change Background
        </button>
      </div>
    </div>
    
  );
}

export default SetTime;
