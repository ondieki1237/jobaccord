const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

exports.protect = async (req, res, next) => {
  try {
    let token;

    // Check for token in headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Not authorized to access this route',
      });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get admin from token
      req.admin = await Admin.findById(decoded.id);

      if (!req.admin) {
        return res.status(401).json({
          success: false,
          error: 'Admin not found',
        });
      }

      if (!req.admin.isActive) {
        return res.status(401).json({
          success: false,
          error: 'Account is deactivated',
        });
      }

      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        error: 'Invalid token',
      });
    }
  } catch (error) {
    console.error('❌ Auth middleware error:', error);
    res.status(500).json({
      success: false,
      error: 'Authentication failed',
    });
  }
};
