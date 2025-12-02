# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Install MongoDB
- Download and install MongoDB from https://www.mongodb.com/try/download/community
- Or use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas
- Start MongoDB service on your system

### Step 2: Get OpenAI API Key (Optional for chatbot)
- Sign up at https://platform.openai.com/
- Create an API key
- Note: Chatbot will work without API key but will show placeholder messages

### Step 3: Setup Backend

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create .env file (copy the content below)
```

Create `backend/.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/virtual-room
JWT_SECRET=my-super-secret-jwt-key-12345
OPENAI_API_KEY=sk-your-openai-api-key-here
NODE_ENV=development
```

```bash
# Start backend server
npm start
```

Backend should be running at `http://localhost:5000`

### Step 4: Setup Frontend

Open a new terminal:

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Start frontend server
npm start
```

Frontend should open automatically at `http://localhost:3000`

### Step 5: Create Your Account

1. Click "Sign up here" on the login page
2. Enter your name, email, and password
3. Click "Sign Up"
4. You'll be logged in automatically!

### Step 6: Start Using the App

- **Home**: Create and manage notes
- **Timer**: Use the timer in the navigation bar
- **Chatbot**: Ask questions (requires OpenAI API key)
- **Profile**: View all your data

## 🐛 Troubleshooting

**MongoDB not connecting?**
- Make sure MongoDB is running
- Check if port 27017 is available
- For MongoDB Atlas, copy the connection string to MONGODB_URI

**Backend won't start?**
- Check if port 5000 is available
- Verify all dependencies are installed (`npm install`)
- Check .env file exists and has correct values

**Frontend won't start?**
- Check if port 3000 is available
- Verify all dependencies are installed (`npm install`)
- Make sure backend is running first

**Chatbot not working?**
- Verify OpenAI API key is set in backend/.env
- Check API key is valid and has credits
- Chatbot will show error messages if API fails

## 📚 Next Steps

- Read `README.md` for detailed documentation
- Check `FEATURES_MAP.md` to understand code structure
- Customize the design in CSS files
- Add your own features!

## ✅ Success Checklist

- [ ] MongoDB is running
- [ ] Backend server starts without errors
- [ ] Frontend opens in browser
- [ ] Can create account successfully
- [ ] Can login successfully
- [ ] Can create notes
- [ ] Timer works
- [ ] Can navigate between pages

---

**That's it! You're ready to use the Virtual Room System!** 🎉

