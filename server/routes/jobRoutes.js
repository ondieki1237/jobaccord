const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const { protect } = require('../middleware/auth');

// Public routes (for job seekers)
router.get('/open', jobController.getOpenJobs);
router.get('/:id/public', jobController.getJobById);

// Admin routes (protected)
router.post('/', protect, jobController.createJob);
router.get('/', protect, jobController.getAllJobs);
router.get('/statistics', protect, jobController.getJobStatistics);
router.get('/:id', protect, jobController.getJobById);
router.put('/:id', protect, jobController.updateJob);
router.delete('/:id', protect, jobController.deleteJob);
router.patch('/:id/close', protect, jobController.closeJob);
router.patch('/:id/reopen', protect, jobController.reopenJob);

module.exports = router;
