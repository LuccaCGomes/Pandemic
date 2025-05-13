function getGameState(req, res) {
  if (!req.gameState) {
    return res.status(404).json({ error: 'Jogo não encontrado.' });
  }
  res.json(req.gameState);
}

function handleAction(req, res) {
  const { type, target } = req.body;
  const game = req.gameState;
  const player = game.players[game.currentPlayer];

  if (!type || !target) {
    return res.status(400).json({ error: 'Ação inválida. Tipo e alvo são necessários.' });
  }

  let message = '';

  switch (type) {
    case 'move':
      if (player.location === target) {
        return res.status(400).json({ error: 'Você já está nesse planeta.' });
      }
      if (game.planets[player.location].connections.includes(target)) {
        player.location = target;
        message = `${player.name} moveu-se para ${target}.`;
      } else {
        return res.status(400).json({ error: 'Movimento inválido. Conexão não encontrada.' });
      }
      break;

    case 'attack':
      const threat = game.planets[player.location].threatLevel;
      if (threat > 0) {
        game.planets[player.location].threatLevel -= 1;
        message = `${player.name} reprimiu ameaças rebeldes em ${player.location}.`;
      } else {
        return res.status(400).json({ error: 'Nenhuma ameaça para atacar.' });
      }
      break;

    case 'useCard':
      const cardIndex = player.hand.findIndex(c => c === target);
      if (cardIndex !== -1) {
        const card = player.hand.splice(cardIndex, 1)[0];
        message = `${player.name} utilizou a carta "${card}".`;
        // Lógica personalizada para cada tipo de carta pode ser adicionada aqui
      } else {
        return res.status(400).json({ error: 'Carta não encontrada.' });
      }
      break;

    default:
      return res.status(400).json({ error: 'Tipo de ação desconhecido.' });
  }

  game.log.push(`[Turno ${game.turn}] ${message}`);

  game.currentPlayer = (game.currentPlayer + 1) % game.players.length;
  if (game.currentPlayer === 0) game.turn += 1;

  res.json(game);
}

module.exports = {
  getGameState,
  handleAction
};
