# Backend Setup - Complete Guide

## 📁 Folder Structure

```
backend/
├── config/
│   └── db.js                 # Database connection configuration
├── controllers/
│   ├── authController.js     # Authentication logic (register, login, getuser)
│   └── notesController.js    # Notes CRUD operations
├── middleware/
│   └── auth.js               # JWT token verification middleware
├── models/
│   ├── User.js               # User model (name, email, password, date)
│   └── Note.js               # Note model (title, description, tag, user)
├── routes/
│   ├── auth.js               # Authentication routes
│   └── notes.js              # Notes routes
├── .env                      # Environment variables
├── index.js                  # Main server file
└── package.json              # Dependencies and scripts
```

## 📋 Complete File Contents

### 1. `config/db.js`
Database connection using MongoDB Atlas.

### 2. `models/User.js`
- Fields: name, email, password, createdAt (date)
- Password hashing with bcryptjs
- Password comparison method

### 3. `models/Note.js`
- Fields: title, description, tag, user, createdAt, updatedAt
- User reference for ownership

### 4. `controllers/authController.js`
- `registerUser()` - POST /api/auth/register
- `loginUser()` - POST /api/auth/login
- `getUser()` - GET /api/auth/getuser

### 5. `controllers/notesController.js`
- `addNote()` - POST /api/notes/add
- `fetchAllNotes()` - GET /api/notes/fetchall
- `updateNote()` - PUT /api/notes/update/:id
- `deleteNote()` - DELETE /api/notes/delete/:id

### 6. `middleware/auth.js`
- `protect` middleware - Verifies JWT token
- Attaches user to request object

### 7. `routes/auth.js`
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/getuser (protected)

### 8. `routes/notes.js`
- POST /api/notes/add (protected)
- GET /api/notes/fetchall (protected)
- PUT /api/notes/update/:id (protected)
- DELETE /api/notes/delete/:id (protected)

### 9. `index.js`
- Express server setup
- CORS enabled
- JSON parsing
- Route registration
- Error handling
- Server startup

### 10. `.env`
```
PORT=5000
MONGODB_URI=mongodb+srv://premtiwar704_db_user:PfxsissdvyDP4cto@cluster0.fk1vjax.mongodb.net/virtual-room?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=your-secret-key-change-this-in-production
NODE_ENV=development
```

## 🚀 Instructions to Run the Backend

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Verify Environment Variables
Make sure your `.env` file exists and contains:
- `PORT=5000`
- `MONGODB_URI` (your MongoDB Atlas connection string)
- `JWT_SECRET` (your secret key)
- `NODE_ENV=development`

### Step 3: Start the Server

**For Development (with auto-reload):**
```bash
npm run dev
```

**For Production:**
```bash
npm start
```

### Step 4: Verify Server is Running
You should see:
```
MongoDB Connected: cluster0-shard-00-00.fk1vjax.mongodb.net
Server running on port 5000
Environment: development
API Base URL: http://localhost:5000/api
```

## 📡 API Endpoints

### Authentication Endpoints

#### Register User
- **POST** `/api/auth/register`
- **Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "User registered successfully",
    "data": {
      "_id": "...",
      "name": "John Doe",
      "email": "john@example.com",
      "token": "jwt_token_here"
    }
  }
  ```

#### Login User
- **POST** `/api/auth/login`
- **Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Login successful",
    "data": {
      "_id": "...",
      "name": "John Doe",
      "email": "john@example.com",
      "token": "jwt_token_here"
    }
  }
  ```

#### Get User (Protected)
- **GET** `/api/auth/getuser`
- **Headers:**
  ```
  Authorization: Bearer <jwt_token>
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "User fetched successfully",
    "data": {
      "_id": "...",
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  }
  ```

### Notes Endpoints (All Protected)

#### Add Note
- **POST** `/api/notes/add`
- **Headers:**
  ```
  Authorization: Bearer <jwt_token>
  ```
- **Body:**
  ```json
  {
    "title": "My Note",
    "description": "This is my note description",
    "tag": "Personal"
  }
  ```

#### Fetch All Notes
- **GET** `/api/notes/fetchall`
- **Headers:**
  ```
  Authorization: Bearer <jwt_token>
  ```

#### Update Note
- **PUT** `/api/notes/update/:id`
- **Headers:**
  ```
  Authorization: Bearer <jwt_token>
  ```
- **Body:**
  ```json
  {
    "title": "Updated Title",
    "description": "Updated description",
    "tag": "Work"
  }
  ```

#### Delete Note
- **DELETE** `/api/notes/delete/:id`
- **Headers:**
  ```
  Authorization: Bearer <jwt_token>
  ```

## 🔒 Authentication

All notes endpoints require JWT authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## 📦 Dependencies

- **express** - Web framework
- **mongoose** - MongoDB ODM
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **dotenv** - Environment variables
- **cors** - Cross-origin resource sharing

## ✅ Testing the API

You can test the API using:
- Postman
- Thunder Client (VS Code extension)
- curl commands
- Any HTTP client

### Example curl commands:

**Register:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

**Add Note (replace TOKEN with actual token):**
```bash
curl -X POST http://localhost:5000/api/notes/add \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"title":"My Note","description":"Note description","tag":"Personal"}'
```

## 🎯 Next Steps

1. Update `JWT_SECRET` in `.env` with a strong random string
2. Test all endpoints
3. Add validation as needed
4. Deploy to production when ready

