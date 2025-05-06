const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const gameRoutes = require('./routes/gameRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/games', gameRoutes());

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});