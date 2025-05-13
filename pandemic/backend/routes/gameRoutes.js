const express = require('express');
const router = express.Router();
const { getGameState, handleAction } = require('../controllers/gameController');

router.get('/state', getGameState);
router.post('/action', handleAction);

module.exports = router;
