# Quick Installation Guide

## Step-by-Step Setup

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file from example
# Copy the content from .env.example and create .env file manually
# Or on Windows PowerShell:
Copy-Item .env.example .env

# Edit .env file and update:
# - MONGODB_URI (your MongoDB connection string)
# - JWT_SECRET (use a strong random string)

# Make sure MongoDB is running
# For local MongoDB: mongod
# Or use MongoDB Atlas connection string

# Start the server
npm run dev
# Server will run on http://localhost:5000
```

### 2. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
# Frontend will run on http://localhost:3000
```

### 3. First Time Usage

1. Open browser and go to `http://localhost:3000`
2. Click on "Sign up" to create your first admin account
3. After signup, you'll be automatically logged in
4. Start using the admin panel!

## MongoDB Setup Options

### Option 1: Local MongoDB
1. Install MongoDB from https://www.mongodb.com/try/download/community
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/admin_panel`

### Option 2: MongoDB Atlas (Cloud)
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get connection string
4. Update MONGODB_URI in .env file

## Troubleshooting

### Port Already in Use
- Backend: Change PORT in .env file
- Frontend: Update port in vite.config.js

### MongoDB Connection Error
- Check if MongoDB is running
- Verify connection string in .env
- Check firewall settings

### CORS Errors
- Ensure backend is running
- Check proxy settings in vite.config.js
- Verify API base URL

## Production Build

### Backend
```bash
cd backend
npm start
```

### Frontend
```bash
cd frontend
npm run build
# Serve the dist/ folder with a web server
```

