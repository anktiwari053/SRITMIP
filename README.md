# Virtual Room System

A complete web-based Virtual Room System built with React.js frontend and Node.js/Express.js backend, featuring user authentication, notes management, chatbot integration, timer functionality, and comprehensive user profiles.

## 🚀 Features

### Frontend (React.js)
- **Home Page**: User welcome message with notes panel for CRUD operations
- **Navigation Bar**: Real-time clock display and timer controls (start, pause, reset)
- **Chatbot Section**: Interactive AI-powered chatbot using OpenAI API
- **Profile Section**: Complete user profile with name, email, notes, chat history, and timer data
- **Authentication**: Secure login and signup pages
- **Responsive Design**: Modern, colorful UI that works on all devices

### Backend (Node.js + Express.js)
- **JWT Authentication**: Secure login/signup with JSON Web Tokens
- **CRUD APIs**: Complete operations for notes and profile data
- **Timer History**: Save and retrieve timer sessions
- **Chatbot Integration**: OpenAI API integration for intelligent responses
- **Secure Endpoints**: Protected routes with authentication middleware

### Database (MongoDB)
- **User Management**: Secure user storage with password hashing
- **Notes Storage**: User-specific notes with timestamps
- **Chat History**: Persistent conversation history
- **Timer Data**: Session tracking and history

## 📁 Project Structure

```
SRITMIN/
├── backend/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── models/
│   │   ├── User.js              # User schema
│   │   ├── Note.js              # Note schema
│   │   ├── Chat.js              # Chat history schema
│   │   └── Timer.js             # Timer session schema
│   ├── routes/
│   │   ├── auth.js              # Authentication routes
│   │   ├── notes.js             # Notes CRUD routes
│   │   ├── profile.js           # Profile routes
│   │   ├── timer.js             # Timer routes
│   │   └── chatbot.js           # Chatbot routes
│   ├── middleware/
│   │   └── auth.js              # JWT authentication middleware
│   ├── server.js                # Express server
│   └── package.json             # Backend dependencies
│
├── frontend/
│   ├── public/
│   │   └── index.html           # HTML template
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js        # Navigation bar with clock & timer
│   │   │   ├── Timer.js         # Timer component
│   │   │   └── PrivateRoute.js  # Protected route wrapper
│   │   ├── pages/
│   │   │   ├── Home.js          # Home page with notes
│   │   │   ├── Chatbot.js       # Chatbot page
│   │   │   ├── Profile.js       # Profile page
│   │   │   ├── Login.js         # Login page
│   │   │   └── Signup.js        # Signup page
│   │   ├── services/
│   │   │   ├── authService.js   # Authentication API calls
│   │   │   ├── notesService.js  # Notes API calls
│   │   │   ├── profileService.js # Profile API calls
│   │   │   ├── timerService.js  # Timer API calls
│   │   │   └── chatbotService.js # Chatbot API calls
│   │   ├── utils/
│   │   │   └── api.js           # Axios configuration
│   │   ├── App.js               # Main app component
│   │   └── index.js             # Entry point
│   └── package.json             # Frontend dependencies
│
└── README.md                    # This file
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- OpenAI API key (for chatbot functionality)

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   Create a `.env` file in the `backend` directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/virtual-room
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   OPENAI_API_KEY=your-openai-api-key-here
   NODE_ENV=development
   ```

4. **Start MongoDB:**
   Make sure MongoDB is running on your system. If using MongoDB Atlas, update the `MONGODB_URI` in `.env`.

5. **Start the backend server:**
   ```bash
   npm start
   ```
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

   The backend server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

   The frontend will run on `http://localhost:3000` and automatically open in your browser.

## 📝 Usage

### Getting Started

1. **Start MongoDB** (if using local installation)
2. **Start Backend Server** (port 5000)
3. **Start Frontend Server** (port 3000)
4. **Open Browser** to `http://localhost:3000`

### Creating an Account

1. Click "Sign up here" on the login page
2. Enter your name, email, and password
3. Submit to create your account
4. You'll be automatically logged in

### Using Features

- **Home Page**: View and manage your notes (create, edit, delete)
- **Timer**: Use the timer in the navigation bar (start, pause, reset)
- **Chatbot**: Navigate to Chatbot section to interact with AI assistant
- **Profile**: View all your data including notes, chats, and timer history

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Notes
- `GET /api/notes` - Get all notes
- `GET /api/notes/:id` - Get single note
- `POST /api/notes` - Create note
- `PUT /api/notes/:id` - Update note
- `DELETE /api/notes/:id` - Delete note

### Profile
- `GET /api/profile` - Get complete profile
- `PUT /api/profile` - Update profile

### Timer
- `GET /api/timer` - Get timer history
- `POST /api/timer` - Save timer session

### Chatbot
- `GET /api/chatbot/history` - Get chat history
- `POST /api/chatbot/message` - Send message
- `DELETE /api/chatbot/history` - Clear chat history

## 🎨 Feature Implementation Summary

### Home Page (`Home.js`)
- Displays welcome message with user name
- Notes panel with full CRUD functionality
- Create, edit, delete notes
- Real-time updates

### Navigation Bar (`Navbar.js`)
- Real-time clock display (updates every second)
- Date display
- Timer component integration
- Navigation links (Home, Chatbot, Profile)
- User name display
- Logout functionality

### Timer (`Timer.js`)
- Start/Pause/Resume controls
- Reset functionality
- Automatic session saving to backend
- Time display in HH:MM:SS format

### Chatbot (`Chatbot.js`)
- OpenAI API integration
- Message history persistence
- Real-time responses
- Clear chat functionality
- Loading states

### Profile (`Profile.js`)
- User information display and editing
- Statistics cards (notes count, chat sessions, timer sessions)
- Recent notes summary
- Timer history
- Chat history summary

### Authentication
- JWT token-based authentication
- Secure password hashing (bcrypt)
- Protected routes
- Session persistence

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected API endpoints
- Secure password validation
- CORS configuration
- Input validation

## 🌐 Environment Variables

### Backend `.env`:
- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `OPENAI_API_KEY` - OpenAI API key for chatbot
- `NODE_ENV` - Environment (development/production)

## 📦 Dependencies

### Backend
- express - Web framework
- mongoose - MongoDB ODM
- bcryptjs - Password hashing
- jsonwebtoken - JWT authentication
- cors - Cross-origin resource sharing
- dotenv - Environment variables
- openai - OpenAI API client

### Frontend
- react - UI library
- react-router-dom - Routing
- axios - HTTP client
- react-scripts - Build tools

## 🐛 Troubleshooting

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check MONGODB_URI in .env file
   - Verify MongoDB port (default: 27017)

2. **OpenAI API Error**
   - Verify OPENAI_API_KEY is set correctly
   - Check API key is valid and has credits
   - API errors will show fallback messages

3. **Port Already in Use**
   - Change PORT in backend .env file
   - Update frontend proxy in package.json if needed

4. **CORS Issues**
   - Ensure backend CORS is enabled
   - Check frontend is making requests to correct backend URL

## 📄 License

This project is created for educational purposes.

## 👨‍💻 Development Notes

- All code includes detailed comments explaining functionality
- Components are modular and reusable
- API services are separated for easy maintenance
- Responsive design works on mobile, tablet, and desktop
- Error handling implemented throughout

## 🎯 Future Enhancements

- Real-time collaboration features
- Note sharing capabilities
- Advanced timer analytics
- Multiple chatbot personalities
- Dark mode theme
- Export data functionality

---

**Note**: Remember to replace placeholder API keys and secrets with your own values before deploying to production!

