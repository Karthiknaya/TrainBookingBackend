const db = require('../models/db');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');

// Register a new user
exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    // Hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into the database
    const [user] = await db.query(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, role || 'user']
    );

    res.json({ message: 'User registered successfully' });
  } catch (err) {
    // Catch and return database or hashing errors
    res.status(500).json({ error: err.message });
  }
};

// User login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Fetch user by email
    const [[user]] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

    // If no user or password mismatch, reject
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(401).json({ message: 'Invalid credentials' });

    // Generate JWT token and return to client
    const token = generateToken(user);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};