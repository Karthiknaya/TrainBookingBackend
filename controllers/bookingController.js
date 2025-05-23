const db = require('../models/db');

// Book a seat on a train
exports.bookSeat = async (req, res) => {
  const { train_id } = req.body;
  const user_id = req.user.id;

  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();

    // Lock the row for the selected train to prevent race conditions
    const [[seatRow]] = await conn.query(
      'SELECT * FROM seats WHERE train_id = ? FOR UPDATE',
      [train_id]
    );

    // If no seats are available, rollback and return
    if (seatRow.available_seats <= 0) {
      await conn.rollback();
      return res.status(400).json({ message: 'No seats available' });
    }

    // Deduct one seat and add a booking
    await conn.query(
      'UPDATE seats SET available_seats = available_seats - 1 WHERE train_id = ?',
      [train_id]
    );
    await conn.query(
      'INSERT INTO bookings (user_id, train_id) VALUES (?, ?)',
      [user_id, train_id]
    );

    await conn.commit();
    res.json({ message: 'Seat booked successfully' });
  } catch (err) {
    await conn.rollback(); // Ensure rollback on error
    res.status(500).json({ error: err.message });
  } finally {
    conn.release(); // Release the DB connection back to the pool
  }
};

// Get details of a specific booking for the logged-in user
exports.getBookingDetails = async (req, res) => {
  const booking_id = req.params.id;
  const user_id = req.user.id;

  try {
    // Fetch booking for the given user
    const [[booking]] = await db.query(
      'SELECT * FROM bookings WHERE id = ? AND user_id = ?',
      [booking_id, user_id]
    );

    if (!booking)
      return res.status(404).json({ message: 'Booking not found' });

    res.json({ booking });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};