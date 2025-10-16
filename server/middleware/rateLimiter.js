const rateLimit = require('express-rate-limit');

// Rate limiter for application submissions
exports.applicationLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW || 15) * 60 * 1000, // 15 minutes
  max: 3, // limit each IP to 3 requests per windowMs
  message: {
    success: false,
    error: 'Too many application submissions from this IP, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// General API rate limiter
exports.apiLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW || 15) * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX || 100),
  message: {
    success: false,
    error: 'Too many requests from this IP, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});
