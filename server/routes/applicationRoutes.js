const express = require('express');
const router = express.Router();
const {
  submitApplication,
  getAllApplications,
  getApplicationById,
  updateApplicationStatus,
  deleteApplication,
  getStatistics,
} = require('../controllers/applicationController');
const { protect } = require('../middleware/auth');
const { applicationLimiter } = require('../middleware/rateLimiter');

// Public routes
router.post('/submit', applicationLimiter, submitApplication);

// Protected routes (Admin only)
router.get('/', protect, getAllApplications);
router.get('/statistics', protect, getStatistics);
router.get('/:id', protect, getApplicationById);
router.put('/:id', protect, updateApplicationStatus);
router.delete('/:id', protect, deleteApplication);

module.exports = router;
