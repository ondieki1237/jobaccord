require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/database');
const { apiLimiter } = require('./middleware/rateLimiter');

// Import routes
const applicationRoutes = require('./routes/applicationRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(express.json({ limit: '10mb' })); // Body parser
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Apply rate limiting to all routes
app.use('/api/', apiLimiter);

// Routes
app.use('/api/applications', applicationRoutes);
app.use('/api/auth', authRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// Root route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Accord Medical Job Application API',
    version: '1.0.0',
    endpoints: {
      applications: '/api/applications',
      auth: '/api/auth',
      health: '/api/health',
    },
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal server error',
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`
  ╔═══════════════════════════════════════════════╗
  ║                                               ║
  ║   🚀 Accord Medical API Server Running       ║
  ║                                               ║
  ║   Environment: ${process.env.NODE_ENV || 'development'}                      ║
  ║   Port: ${PORT}                                   ║
  ║   URL: http://localhost:${PORT}                 ║
  ║                                               ║
  ╚═══════════════════════════════════════════════╝
  `);
});

module.exports = app;
