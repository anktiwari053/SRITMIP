// Chatbot routes for OpenAI integration
const express = require('express');
const Chat = require('../models/Chat');
const { protect } = require('../middleware/auth');
const OpenAI = require('openai');
require('dotenv').config();

const router = express.Router();

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'your-openai-api-key-here',
});

/**
 * @route   GET /api/chatbot/history
 * @desc    Get chat history for authenticated user
 * @access  Private
 */
router.get('/history', protect, async (req, res) => {
  try {
    // Get the most recent chat session or create a new one
    let chat = await Chat.findOne({ user: req.user._id }).sort({ updatedAt: -1 });

    if (!chat) {
      return res.json({ messages: [] });
    }

    res.json({ messages: chat.messages });
  } catch (error) {
    console.error('Get chat history error:', error);
    res.status(500).json({ message: 'Server error fetching chat history' });
  }
});

/**
 * @route   POST /api/chatbot/message
 * @desc    Send a message to chatbot and get response
 * @access  Private
 */
router.post('/message', protect, async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || message.trim() === '') {
      return res.status(400).json({ message: 'Please provide a message' });
    }

    // Get or create chat session
    let chat = await Chat.findOne({ user: req.user._id }).sort({ updatedAt: -1 });

    if (!chat) {
      chat = await Chat.create({
        user: req.user._id,
        messages: [],
      });
    }

    // Add user message to chat
    chat.messages.push({
      role: 'user',
      content: message.trim(),
    });

    // Prepare messages for OpenAI (include conversation history)
    const messagesForAI = chat.messages.map(msg => ({
      role: msg.role,
      content: msg.content,
    }));

    // Add system message if this is the first message
    if (messagesForAI.length === 1) {
      messagesForAI.unshift({
        role: 'system',
        content: 'You are a helpful and friendly assistant in a virtual room system. Be concise and helpful.',
      });
    }

    // Call OpenAI API
    let assistantResponse = 'I apologize, but I cannot process your request at the moment. Please check your OpenAI API key configuration.';
    
    try {
      if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'your-openai-api-key-here') {
        const completion = await openai.chat.completions.create({
          model: 'gpt-3.5-turbo',
          messages: messagesForAI,
          max_tokens: 500,
          temperature: 0.7,
        });

        assistantResponse = completion.choices[0].message.content;
      }
    } catch (openaiError) {
      console.error('OpenAI API error:', openaiError);
      assistantResponse = 'I apologize, but I encountered an error processing your request. Please try again later.';
    }

    // Add assistant response to chat
    chat.messages.push({
      role: 'assistant',
      content: assistantResponse,
    });

    // Save updated chat
    await chat.save();

    res.json({
      message: assistantResponse,
      chatHistory: chat.messages,
    });
  } catch (error) {
    console.error('Chatbot message error:', error);
    res.status(500).json({ message: 'Server error processing message' });
  }
});

/**
 * @route   DELETE /api/chatbot/history
 * @desc    Clear chat history for authenticated user
 * @access  Private
 */
router.delete('/history', protect, async (req, res) => {
  try {
    await Chat.deleteMany({ user: req.user._id });
    res.json({ message: 'Chat history cleared successfully' });
  } catch (error) {
    console.error('Clear chat history error:', error);
    res.status(500).json({ message: 'Server error clearing chat history' });
  }
});

module.exports = router;

