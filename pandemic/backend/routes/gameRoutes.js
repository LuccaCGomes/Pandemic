const express = require('express');
const express = require('express');
const router = express.Router();
const { getGameState, handleAction } = require('../controllers/gameController');
const initGame = require('../gameLogic/initGame');

router.get('/state', getGameState);
router.post('/action', handleAction);

router.post('/start', (req, res) => {
    const { players } = req.body;
    // A chamada da função initGame permanece a mesma
    req.app.locals.gameState = initGame(players);
    res.status(200).json({ message: 'Jogo iniciado' });
});

module.exports = router;
