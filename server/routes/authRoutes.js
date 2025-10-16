const express = require('express');
const router = express.Router();
const { login, getProfile, createAdmin } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

// Public routes
router.post('/login', login);
router.post('/create-admin', createAdmin); // Should be protected in production

// Protected routes
router.get('/profile', protect, getProfile);

module.exports = router;
