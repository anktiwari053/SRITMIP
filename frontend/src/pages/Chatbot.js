import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import './Chatbot.css';

/**
 * Hardcoded Knowledge Base
 * Aap yahan apne naye sawaal aur jawab add kar sakte hain
 */
const KNOWLEDGE_BASE = {
  "hello": "Namaste! Main aapka AI assistant hoon. Main kaise madad kar sakta hoon?",
  "hi": "Hello! Kaise hain aap?",
  "kaise ho": "Main bilkul badhiya hoon! Aap kaise hain?",
  "naam": "Mera naam Gemini Chatbot hai, mujhe React se banaya gaya hai.",
  "time": `Abhi ka samay hai: ${new Date().toLocaleTimeString()}`,
  "help": "Main aapke basic sawalon ke jawab de sakta hoon. Try karein: 'naam' ya 'kaise ho'",
  "bye": "Alvida! Apna khayal rakhiyega.",
  "creator": "Mujhe ek talented developer ne React use karke banaya hai!",
};

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to bottom functionality
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  // Logic to find best answer
  const getBotResponse = (userInput) => {
    const input = userInput.toLowerCase().trim();
    
    // Exact ya Keyword match check karein
    let foundKey = Object.keys(KNOWLEDGE_BASE).find(key => input.includes(key));

    if (foundKey) {
      return KNOWLEDGE_BASE[foundKey];
    } else {
      // Agar jawab nahi mila toh default answer
      return "Maaf kijiye, mujhe iska jawab nahi pata. Aap 'help' type karke dekh sakte hain!";
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || loading) return;

    const userText = inputMessage.trim();
    setInputMessage('');
    
    // 1. User ka message screen par dikhayein
    const userMsgObj = {
      role: 'user',
      content: userText,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsgObj]);

    // 2. Bot ki typing start karein
    setLoading(true);

    // Artificial delay (800ms) taaki lage ki bot soch raha hai
    setTimeout(() => {
      const botText = getBotResponse(userText);
      const botMsgObj = {
        role: 'assistant',
        content: botText,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMsgObj]);
      setLoading(false);
    }, 800);
  };

  const handleClear = () => {
    if (window.confirm('Kya aap chat clear karna chahte hain?')) {
      setMessages([]);
    }
  };

  return (
    <div className="chatbot-container">
      <Navbar />
      <div className="chatbot-content">
        <div className="chatbot-header">
          <h1>💬 Smart Assistant</h1>
          <p>Hardcoded AI - No API Key Required</p>
          {messages.length > 0 && (
            <button onClick={handleClear} className="clear-btn">Clear</button>
          )}
        </div>

        <div className="chat-messages">
          {messages.length === 0 ? (
            <div className="empty-chat">
              <div className="chat-icon">🤖</div>
              <p>Mujhse kuch puchiye! (Try: "Hi", "Aapka naam kya hai")</p>
            </div>
          ) : (
            messages.map((msg, index) => (
              <div key={index} className={`message ${msg.role === 'user' ? 'user-message' : 'bot-message'}`}>
                <div className="message-content">
                  <div className="message-role">
                    {msg.role === 'user' ? '👤 You' : '🤖 Bot'}
                  </div>
                  <div className="message-text">{msg.content}</div>
                  <div className="message-time">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))
          )}
          
          {loading && (
            <div className="message bot-message">
              <div className="message-content">
                <div className="message-role">🤖 Bot</div>
                <div className="typing-loader">Bot soch raha hai...</div>
              </div>
            </div>
          )}
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
          <button type="submit" className="send-btn" disabled={!inputMessage.trim()}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
