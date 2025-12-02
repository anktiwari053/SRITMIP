# Virtual Room System - Frontend

React.js frontend application for Virtual Room System.

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm start
   ```

   The app will open at `http://localhost:3000`

## Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Configuration

The frontend is configured to proxy API requests to `http://localhost:5000` by default. To change this, update the `proxy` field in `package.json` or set `REACT_APP_API_URL` environment variable.

