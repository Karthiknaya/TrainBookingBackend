const express = require('express');
const { bookSeat, getBookingDetails } = require('../controllers/bookingController');
const auth = require('../middlewares/auth');
const router = express.Router();

router.post('/book', auth, bookSeat);
router.get('/:id', auth, getBookingDetails);

module.exports = router;