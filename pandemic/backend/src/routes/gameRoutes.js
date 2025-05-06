const express = require('express');
const GameController = require('../controllers/gameController');

const router = express.Router();
const gameController = new GameController();

function setGameRoutes(app) {
    router.post('/start', gameController.startGame.bind(gameController));
    router.post('/move', gameController.makeMove.bind(gameController));
    router.get('/state', gameController.getGameState.bind(gameController));

    app.use('/api/game', router);
}

module.exports = setGameRoutes;