const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { analyzeApplications, getApplicationStatistics } = require('../services/aiService');

// @route   POST /api/ai/analyze
// @desc    Analyze applications with AI
// @access  Private (Admin only)
router.post('/analyze', protect, async (req, res) => {
  try {
    const { query } = req.body;

    if (!query || query.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Please provide a query',
      });
    }

    console.log(`🤖 AI Query from ${req.admin.email}: ${query}`);

    const result = await analyzeApplications(query);

    res.status(200).json(result);
  } catch (error) {
    console.error('❌ AI Analysis Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to analyze applications',
    });
  }
});

// @route   GET /api/ai/statistics
// @desc    Get application statistics
// @access  Private (Admin only)
router.get('/statistics', protect, async (req, res) => {
  try {
    const stats = await getApplicationStatistics();

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error('❌ Statistics Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch statistics',
    });
  }
});

module.exports = router;
