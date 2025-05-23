const express = require('express');
const { addTrain, getAvailability } = require('../controllers/trainController');
const adminAuth = require('../middlewares/adminAuth');
const router = express.Router();

router.post('/add', adminAuth, addTrain);
router.get('/availability', getAvailability);

module.exports = router;