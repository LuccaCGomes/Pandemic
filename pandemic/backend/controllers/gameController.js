// Import the new player action functions
const playerActions = require('../gameLogic/playerActions');

function getGameState(req, res) {
  // This function remains the same.
  if (!req.app.locals.gameState) {
    return res.status(404).json({ error: 'Game not found.' });
  }
  res.json(req.app.locals.gameState);
}

function handleAction(req, res) {
  const { type, ...params } = req.body;
  const game = req.app.locals.gameState; // Using gameState from app.locals

  if (!game) {
    return res.status(404).json({ error: 'Game not found.' });
  }

  const player = game.players[game.currentPlayerIndex];

  if (!type) {
    return res.status(400).json({ error: 'Action type is required.' });
  }

  if (game.status === 'VICTORY' || game.status === 'DEFEAT') {
    return res.status(400).json({ error: 'The game is over.' });
  }

  // Initialize phase and actions if they don't exist
  if (!game.phase) game.phase = 'ACTIONS';
  if (player.actionsTaken === undefined) player.actionsTaken = 0;

  // --- ACTION PHASE ---
  if (game.phase === 'ACTIONS') {
    if (player.actionsTaken >= 4) {
      game.phase = 'DRAW_CARDS';
      // Automatically proceed to the next phase, no action needed from the user.
      return res.json({ message: 'Action limit reached. Proceeding to Draw Cards phase.' });
    }

    try {
      switch (type) {
        case 'move':
          // The 'target' planet is in params.targetPlanetName
          playerActions.movePlayer(game, player, params.targetPlanetName);
          break;

        case 'eliminateRebels': // Renamed from 'attack' for clarity
          playerActions.eliminateRebels(game, player);
          break;

        case 'buildBase':
          playerActions.buildImperialBase(game, player);
          break;

        case 'shareInfo':
          // Requires targetPlayerName and card object from the request body
          const targetPlayer = game.players.find(p => p.name === params.targetPlayerName);
          if (!targetPlayer) throw new Error('Target player not found.');
          playerActions.shareInformation(game, player, targetPlayer, params.card);
          break;

        case 'neutralizeRebellion':
          // Requires region from the request body
          playerActions.neutralizeRebellion(game, player, params.region);
          break;

        // Note: The 'useCard' action from the original file is not in the manual's main actions.
        // It could be an event card. We can add it back if needed.

        default:
          return res.status(400).json({ error: 'Unknown action type.' });
      }

      player.actionsTaken++; // Increment action counter on success

    } catch (error) {
      // If any action function throws an error, catch it and send a bad request response.
      return res.status(400).json({ error: error.message });
    }
  }

  // --- OTHER PHASES (DRAW_CARDS, REVEAL_REBEL, etc.) ---
  if (game.phase === 'DRAW_CARDS') {
    // Each player draws 2 cards from the player deck
    if (!game.playerDeck || game.playerDeck.length < 2) {
      game.status = 'DEFEAT';
      return res.json({ message: 'No more cards to draw. Game over!', game });
    }
    for (let i = 0; i < 2; i++) {
      const card = game.playerDeck.shift();
      player.cards.push(card);
      game.log.push(`${player.name} drew a card: ${card.name}`);
    }
    game.phase = 'REVEAL_REBEL';
    return res.json({ message: 'Cards drawn. Proceeding to Reveal Rebel phase.', game });
  }

  if (game.phase === 'REVEAL_REBEL') {
    // Reveal rebel cards (simulate drawing 2 rebel cards)
    if (!game.rebelDeck || game.rebelDeck.length < 2) {
      game.status = 'DEFEAT';
      return res.json({ message: 'No more rebel cards to reveal. Game over!', game });
    }
    for (let i = 0; i < 2; i++) {
      const rebelCard = game.rebelDeck.shift();
      // Find the planet and increase threat
      const planet = game.planets.find(p => p.name === rebelCard.name);
      if (planet) {
        planet.threatLevel = (planet.threatLevel || 0) + 1;
        game.remainingThreats = (game.remainingThreats || 0) + 1;
        game.log.push(`Rebel activity increased in ${planet.name}.`);
      }
    }
    game.phase = 'CHECK_END';
    return res.json({ message: 'Rebel cards revealed. Proceeding to Check End phase.', game });
  }

  if (game.phase === 'CHECK_END') {
    // Check for victory or defeat conditions
    // Example: Victory if all rebellions neutralized
    if (game.rebellionsNeutralized && Object.values(game.rebellionsNeutralized).every(v => v)) {
      game.status = 'VICTORY';
      return res.json({ message: 'All rebellions neutralized! Victory!', game });
    }
    // Example: Defeat if threat cubes run out
    if (game.remainingThreats >= game.maxThreats) {
      game.status = 'DEFEAT';
      return res.json({ message: 'Too many threats! Defeat!', game });
    }
    // Otherwise, next player's turn
    game.currentPlayerIndex = (game.currentPlayerIndex + 1) % game.players.length;
    game.players[game.currentPlayerIndex].actionsTaken = 0;
    game.phase = 'ACTIONS';
    return res.json({ message: "Next player's turn.", game });
  }
}

module.exports = {
  getGameState,
  handleAction,
};
