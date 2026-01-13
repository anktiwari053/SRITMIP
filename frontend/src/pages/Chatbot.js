import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import './Chatbot.css';

/**
 * Hardcoded Knowledge Base
 */
const KNOWLEDGE_BASE = {
  "hello": "Namaste! Main aapka AI assistant hoon. Main kaise madad kar sakta hoon?",
  "hi": "Hello! Kaise hain aap?",
  "kaise ho": "Main bilkul badhiya hoon! Aap kaise hain?",
  "naam": "Mera naam  Eco Chat hai .",
  "help": "Main aapke basic sawalon ke jawab de sakta hoon. Try karein: 'naam' ya 'kaise ho'",
  "bye": "Alvida! Apna khayal rakhiyega.",
 "creator": "Is website ko Ank Tiwari ne React ka use karke develop kiya hai.",
};

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  
  // Timer ke liye ref
  const idleTimerRef = useRef(null);

  // Auto message function
  const sendAutoHelpMessage = () => {
    // Check karein agar last message assistant ka hi "help" wala toh baar baar na bheje
    const autoMsg = {
      role: 'assistant',
      content: "Main aap ki kya help kar sakta hoon? Agar aap ka question meri database mein hai toh main aapke liye kuch madad kar doonga.",
      timestamp: new Date()
    };
    setMessages(prev => [...prev, autoMsg]);
  };

  // Timer reset karne ka function
  const resetIdleTimer = () => {
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
    }
    idleTimerRef.current = setTimeout(() => {
      // Agar user ne 5 sec se kuch nahi kiya aur chat khali nahi hai
      sendAutoHelpMessage();
    }, 5000); 
  };

  // Component mount hone par timer start karein
  useEffect(() => {
    resetIdleTimer();
    return () => clearTimeout(idleTimerRef.current);
  }, [messages]); // Jab bhi messages change honge timer reset hoga

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const getBotResponse = (userInput) => {
    const input = userInput.toLowerCase().trim();
    let foundKey = Object.keys(KNOWLEDGE_BASE).find(key => input.includes(key));
    if (foundKey) {
      return KNOWLEDGE_BASE[foundKey];
    } else {
      return "Maaf kijiye, mujhe iska jawab nahi pata. Aap 'help' type karke dekh sakte hain!";
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || loading) return;

    const userText = inputMessage.trim();
    setInputMessage('');
    resetIdleTimer(); // Message bhejne par timer reset

    const userMsgObj = { role: 'user', content: userText, timestamp: new Date() };
    setMessages(prev => [...prev, userMsgObj]);

    setLoading(true);
    setTimeout(() => {
      const botText = getBotResponse(userText);
      const botMsgObj = { role: 'assistant', content: botText, timestamp: new Date() };
      setMessages(prev => [...prev, botMsgObj]);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="chatbot-container">
      <Navbar />
      <div className="chatbot-content">
        <div className="chatbot-header">
          <h1>💬 Smart Assistant</h1>
          <p>Auto-Help Bot</p>
        </div>

        <div className="chat-messages">
          {messages.length === 0 ? (
            <div className="empty-chat">
              <div className="chat-icon">🤖</div>
              <p>Mujhse kuch puchiye!</p>
            </div>
          ) : (
            messages.map((msg, index) => (
              <div key={index} className={`message ${msg.role === 'user' ? 'user-message' : 'bot-message'}`}>
                <div className="message-content">
                  <div className="message-role">{msg.role === 'user' ? '👤 You' : '🤖 Bot'}</div>
                  <div className="message-text">{msg.content}</div>
                  <div className="message-time">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))
          )}
          {loading && <div className="typing-loader">Bot soch raha hai...</div>}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSend} className="chat-input-form">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => {
              setInputMessage(e.target.value);
              resetIdleTimer(); // Type karte waqt bhi timer reset
            }}
            placeholder="Type a message..."
            className="chat-input"
          />
          <button type="submit" className="send-btn" disabled={!inputMessage.trim()}>Send</button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
