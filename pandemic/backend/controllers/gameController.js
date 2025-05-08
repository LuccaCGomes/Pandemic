const { movePlayer, treatDisease } = require('../utils/gameLogic');

function getGameState(req, res) {
  res.json(req.gameState);
}

function postGameAction(req, res) {
  const { action, city } = req.body;
  const game = req.gameState;

  try {
    if (action === 'move') {
      movePlayer(game, city);
    } else if (action === 'treat') {
      treatDisease(game);
    } else {
      throw new Error('Ação inválida');
    }

    game.currentPlayer = (game.currentPlayer + 1) % game.players.length;
    game.turns++;

    res.json(game);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

module.exports = {
  getGameState,
  postGameAction
};