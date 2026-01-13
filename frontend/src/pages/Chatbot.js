import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import './Chatbot.css';

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
  const idleTimerRef = useRef(null);

  // Auto message function jo check karega ki session mein pehle bheja gaya hai ya nahi
  const sendAutoHelpMessage = () => {
    const hasSentInSession = sessionStorage.getItem('autoMsgSent');

    if (!hasSentInSession) {
      const autoMsg = {
        role: 'assistant',
        content: "Main aap ki kya help kar sakta hoon? Agar aap ka question meri database mein hai toh main aapke liye kuch madad kar doonga.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, autoMsg]);
      
      // Session mein mark kar do ki is baar ka message ho gaya
      sessionStorage.setItem('autoMsgSent', 'true');
    }
  };

  // Timer setup: Sirf tab chalega jab tak message nahi bheja gaya
  useEffect(() => {
    const hasSentInSession = sessionStorage.getItem('autoMsgSent');
    
    if (!hasSentInSession) {
      idleTimerRef.current = setTimeout(() => {
        sendAutoHelpMessage();
      }, 5000);
    }

    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, []); // Empty dependency taaki sirf mount par chale

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || loading) return;

    // Agar user khud message bhej de, toh auto message ko cancel kar do
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    sessionStorage.setItem('autoMsgSent', 'true'); 

    const userText = inputMessage.trim();
    setInputMessage('');
    
    setMessages(prev => [...prev, { role: 'user', content: userText, timestamp: new Date() }]);

    setLoading(true);
    setTimeout(() => {
      const input = userText.toLowerCase();
      let foundKey = Object.keys(KNOWLEDGE_BASE).find(key => input.includes(key));
      const botText = foundKey ? KNOWLEDGE_BASE[foundKey] : "Maaf kijiye, mujhe iska jawab nahi pata.";
      
      setMessages(prev => [...prev, { role: 'assistant', content: botText, timestamp: new Date() }]);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="chatbot-container">
      <Navbar />
      <div className="chatbot-content">
        <div className="chatbot-header">
          <h1>💬 Smart Assistant</h1>
        </div>

        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.role === 'user' ? 'user-message' : 'bot-message'}`}>
              <div className="message-content">
                <div className="message-text">{msg.content}</div>
                <div className="message-time">{msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
              </div>
            </div>
          ))}
          {loading && <div className="typing-loader">Bot soch raha hai...</div>}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSend} className="chat-input-form">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type a message..."
            className="chat-input"
          />
          <button type="submit" className="send-btn">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
