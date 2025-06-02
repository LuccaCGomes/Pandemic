const express = require('express');
const router = express.Router();
const { getGameState, handleAction } = require('../controllers/gameController');
const initGame = require('../game/initGame');

router.get('/state', getGameState);
router.post('/action', handleAction);

router.post('/start', (req, res) => {
  const { players } = req.body;
  req.app.locals.gameState = initGame(players);
  res.status(200).json({ message: 'Jogo iniciado' });
});

module.exports = router;
