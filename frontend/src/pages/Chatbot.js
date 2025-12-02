// Chatbot page component with OpenAI integration
import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import { getChatHistory, sendMessage, clearChatHistory } from '../services/chatbotService';
import './Chatbot.css';

/**
 * Chatbot Page Component
 * Interactive chatbot interface with message history
 */
const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Load chat history on component mount
  useEffect(() => {
    loadChatHistory();
  }, []);

  // Scroll to bottom when messages update
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load chat history
  const loadChatHistory = async () => {
    try {
      const data = await getChatHistory();
      setMessages(data.messages || []);
    } catch (error) {
      console.error('Error loading chat history:', error);
    }
  };

  // Scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Handle send message
  const handleSend = async (e) => {
    e.preventDefault();

    if (!inputMessage.trim() || loading) {
      return;
    }

    const userMessage = inputMessage.trim();
    setInputMessage('');
    setLoading(true);

    // Add user message to UI immediately
    const newUserMessage = {
      role: 'user',
      content: userMessage,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newUserMessage]);

    try {
      // Send message to backend
      const response = await sendMessage(userMessage);
      
      // Update messages with assistant response
      setMessages(response.chatHistory || []);
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Add error message
      const errorMessage = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again later.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  // Handle clear chat
  const handleClear = async () => {
    if (window.confirm('Are you sure you want to clear all chat history?')) {
      try {
        await clearChatHistory();
        setMessages([]);
      } catch (error) {
        console.error('Error clearing chat:', error);
        alert('Error clearing chat. Please try again.');
      }
    }
  };

  return (
    <div className="chatbot-container">
      <Navbar />
      <div className="chatbot-content">
        <div className="chatbot-header">
          <h1>💬 Chatbot Assistant</h1>
          <p>Ask me anything! I'm here to help.</p>
          {messages.length > 0 && (
            <button onClick={handleClear} className="clear-btn">
              Clear Chat
            </button>
          )}
        </div>

        <div className="chat-messages">
          {messages.length === 0 ? (
            <div className="empty-chat">
              <div className="chat-icon">🤖</div>
              <p>Start a conversation by typing a message below!</p>
            </div>
          ) : (
            messages.map((message, index) => (
              <div
                key={index}
                className={`message ${message.role === 'user' ? 'user-message' : 'bot-message'}`}
              >
                <div className="message-content">
                  <div className="message-role">
                    {message.role === 'user' ? '👤 You' : '🤖 Assistant'}
                  </div>
                  <div className="message-text">{message.content}</div>
                  {message.timestamp && (
                    <div className="message-time">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
          
          {loading && (
            <div className="message bot-message">
              <div className="message-content">
                <div className="message-role">🤖 Assistant</div>
                <div className="message-text loading-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
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
            placeholder="Type your message here..."
            className="chat-input"
            disabled={loading}
          />
          <button
            type="submit"
            className="send-btn"
            disabled={loading || !inputMessage.trim()}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;

