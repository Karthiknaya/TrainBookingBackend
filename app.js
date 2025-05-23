const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/trains', require('./routes/trainRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));