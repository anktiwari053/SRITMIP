# Admin Panel System

A complete, production-ready Admin Panel system with React.js frontend and Node.js/Express backend.

## Features

### Frontend
- ✅ Login/Signup pages with authentication
- ✅ Sidebar navigation (Dashboard, Users, Settings, Analytics)
- ✅ Dashboard with statistics cards
- ✅ User management (Add, Update, Delete Users)
- ✅ Settings page (profile, password change, system settings)
- ✅ Light/Dark mode support
- ✅ Mobile responsive layout
- ✅ Search and filter functionality
- ✅ Pagination for user list
- ✅ Charts and analytics

### Backend
- ✅ JWT-based Authentication (Login, Signup, Protected routes)
- ✅ CRUD API for users, settings
- ✅ Password hashing with bcrypt
- ✅ Proper error handling and status codes
- ✅ Middleware: auth, validation, admin-check
- ✅ Activity logs tracking
- ✅ Login logs tracking
- ✅ Analytics API with charts data

### Database
- ✅ Admin model (name, email, password, role)
- ✅ Users model (name, email, phone, status)
- ✅ Settings model
- ✅ ActivityLog model
- ✅ LoginLog model
- ✅ Automatic timestamps

## Project Structure

```
.
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── settingsController.js
│   │   └── logController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── validation.js
│   ├── models/
│   │   ├── Admin.js
│   │   ├── User.js
│   │   ├── Settings.js
│   │   ├── ActivityLog.js
│   │   └── LoginLog.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── users.js
│   │   ├── settings.js
│   │   └── logs.js
│   ├── utils/
│   │   ├── generateToken.js
│   │   └── logActivity.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Sidebar.css
│   │   │   ├── Header.jsx
│   │   │   ├── Header.css
│   │   │   └── PrivateRoute.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── ThemeContext.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Auth.css
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Dashboard.css
│   │   │   ├── Users.jsx
│   │   │   ├── Users.css
│   │   │   ├── Settings.jsx
│   │   │   ├── Settings.css
│   │   │   ├── Analytics.jsx
│   │   │   └── Analytics.css
│   │   ├── utils/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

## Installation Steps

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/admin_panel
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
NODE_ENV=development
```

5. Start MongoDB (if running locally):
```bash
# Windows
mongod

# macOS/Linux
sudo systemctl start mongod
# or
brew services start mongodb-community
```

6. Start the backend server:
```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

The backend server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new admin
- `POST /api/auth/login` - Login admin
- `GET /api/auth/me` - Get current admin (Protected)
- `PUT /api/auth/updatepassword` - Update password (Protected)

### Users
- `GET /api/users` - Get all users (Protected, Admin)
- `GET /api/users/:id` - Get single user (Protected, Admin)
- `POST /api/users` - Create user (Protected, Admin)
- `PUT /api/users/:id` - Update user (Protected, Admin)
- `DELETE /api/users/:id` - Delete user (Protected, Admin)
- `GET /api/users/stats/overview` - Get user statistics (Protected, Admin)

### Settings
- `GET /api/settings` - Get settings (Protected, Admin)
- `PUT /api/settings` - Update settings (Protected, Admin)

### Logs
- `GET /api/logs/activity` - Get activity logs (Protected, Admin)
- `GET /api/logs/login` - Get login logs (Protected, Admin)
- `GET /api/logs/analytics` - Get analytics data (Protected, Admin)

## Usage

1. **First Time Setup:**
   - Start both backend and frontend servers
   - Navigate to `http://localhost:3000/signup`
   - Create your first admin account

2. **Login:**
   - Go to `http://localhost:3000/login`
   - Enter your credentials

3. **Dashboard:**
   - View statistics and overview
   - Navigate through different sections using the sidebar

4. **User Management:**
   - Add, edit, or delete users
   - Search and filter users
   - View user statistics

5. **Settings:**
   - Update your password
   - Configure system settings
   - View profile information

6. **Analytics:**
   - View activity logs
   - View login logs
   - See charts and statistics

## Environment Variables

### Backend (.env)
- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens (use a strong random string in production)
- `JWT_EXPIRE` - JWT token expiration (default: 7d)
- `NODE_ENV` - Environment (development/production)

## Technologies Used

### Frontend
- React.js 18
- React Router DOM
- Axios
- Recharts (for charts)
- React Icons
- Vite (build tool)
- CSS3 (with CSS Variables for theming)

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- express-validator
- CORS
- dotenv

## Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- Protected routes with middleware
- Input validation
- Error handling
- CORS configuration

## Production Deployment

1. **Backend:**
   - Set `NODE_ENV=production`
   - Use a strong `JWT_SECRET`
   - Use MongoDB Atlas or a production MongoDB instance
   - Use environment variables for all sensitive data
   - Consider using PM2 or similar for process management

2. **Frontend:**
   - Build the production bundle: `npm run build`
   - Serve the `dist` folder using a web server (nginx, Apache, etc.)
   - Update API base URL in production

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check the connection string in `.env`
- Verify MongoDB port (default: 27017)

### CORS Issues
- Ensure backend CORS is configured correctly
- Check if frontend proxy is set up in `vite.config.js`

### Authentication Issues
- Clear browser localStorage
- Check JWT token expiration
- Verify JWT_SECRET matches

## License

This project is open source and available under the MIT License.

## Support

For issues or questions, please create an issue in the repository.

