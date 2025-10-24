const express = require('express');
const router = express.Router();
const {
  submitCreditControlApplication,
  getAllCreditControlApplications,
  getCreditControlApplicationById,
  updateCreditControlApplicationStatus,
  deleteCreditControlApplication,
  getCreditControlStatistics,
} = require('../controllers/creditControlApplicationController');
const { protect } = require('../middleware/auth');

// Public routes
router.post('/submit', submitCreditControlApplication);

// Protected routes (Admin only)
router.get('/', protect, getAllCreditControlApplications);
router.get('/statistics', protect, getCreditControlStatistics);
router.get('/:id', protect, getCreditControlApplicationById);
router.put('/:id', protect, updateCreditControlApplicationStatus);
router.delete('/:id', protect, deleteCreditControlApplication);

module.exports = router;
