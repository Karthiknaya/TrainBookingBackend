const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware to verify JWT token for authenticated routes
module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.sendStatus(401); // No token provided

  const token = authHeader.split(' ')[1]; // Format: "Bearer <token>"

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Invalid token
    req.user = user; // Attach user info to request
    next();
  });
};