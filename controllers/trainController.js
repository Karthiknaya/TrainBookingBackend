const db = require('../models/db');

// Admin: Add a new train along with seat info
exports.addTrain = async (req, res) => {
  const { name, source, destination, total_seats } = req.body;

  try {
    // Insert train details
    const [result] = await db.query(
      'INSERT INTO trains (name, source, destination, total_seats) VALUES (?, ?, ?, ?)',
      [name, source, destination, total_seats]
    );

    // Initialize available seats
    await db.query(
      'INSERT INTO seats (train_id, available_seats) VALUES (?, ?)',
      [result.insertId, total_seats]
    );

    res.json({ message: 'Train added' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// User: Get seat availability for trains between 2 stations
exports.getAvailability = async (req, res) => {
  const { source, destination } = req.query;

  try {
    const [trains] = await db.query(
      `SELECT t.id, t.name, s.available_seats
       FROM trains t
       JOIN seats s ON t.id = s.train_id
       WHERE t.source = ? AND t.destination = ?`,
      [source, destination]
    );

    res.json({ trains });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};