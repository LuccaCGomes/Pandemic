// backend/routes/gameRoutes.js

const express = require('express');
const router = express.Router();
const { getGameState, postGameAction } = require('../controllers/gameController');

router.get('/state', getGameState);
router.post('/action', postGameAction);

module.exports = router;
