require('dotenv').config();

// Middleware to verify admin API key from headers
module.exports = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];

  // Deny access if key is missing or incorrect
  if (apiKey !== process.env.ADMIN_API_KEY) {
    return res.status(403).json({ message: 'Invalid admin API key' });
  }

  // Proceed if valid
  next();
};