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

  if (!type) {
    return res.status(400).json({ error: 'Tipo de ação é necessário.' });
  }

  if (game.status === 'VICTORY' || game.status === 'DEFEAT') {
    return res.status(400).json({ error: 'O jogo já terminou.' });
  }

  if (!game.phase) game.phase = 'ACTIONS';
  if (player.actionsTaken === undefined) player.actionsTaken = 0;

  let message = '';

  if (game.phase === 'ACTIONS') {
    if (player.actionsTaken >= 4) {
      game.phase = 'DRAW_CARDS';
      return res.json({ message: 'Fase de compra iniciada.' });
    }

    switch (type) {
      case 'move': {
        if (player.location === target) {
          return res.status(400).json({ error: 'Você já está nesse planeta.' });
        }
        if (game.planets[player.location].connections.includes(target)) {
          player.location = target;
          player.actionsTaken++;
          message = `${player.name} moveu-se para ${target}.`;
        } else {
          return res.status(400).json({ error: 'Movimento inválido. Conexão não encontrada.' });
        }
        break;
      }

      case 'attack': {
        const threat = game.planets[player.location].threatLevel;
        if (threat > 0) {
          game.planets[player.location].threatLevel -= 1;
          player.actionsTaken++;
          message = `${player.name} reprimiu ameaças rebeldes em ${player.location}.`;
        } else {
          return res.status(400).json({ error: 'Nenhuma ameaça para atacar.' });
        }
        break;
      }

      case 'useCard': {
        const cardIndex = player.hand.findIndex(c => c === target);
        if (cardIndex !== -1) {
          const card = player.hand.splice(cardIndex, 1)[0];
          player.actionsTaken++;
          message = `${player.name} utilizou a carta "${card}".`;
        } else {
          return res.status(400).json({ error: 'Carta não encontrada.' });
        }
        break;
      }

      default:
        return res.status(400).json({ error: 'Tipo de ação desconhecido.' });
    }
  }

  else if (game.phase === 'DRAW_CARDS') {
    const drawnCards = [];
    for (let i = 0; i < 2; i++) {
      if (game.deck.length === 0) {
        game.status = 'DEFEAT';
        return res.json({ message: 'Fim do jogo: sem cartas para comprar.' });
      }
      const card = game.deck.shift();
      if (card === 'Levante Rebelde') {
        game.rebellionProgress = (game.rebellionProgress || 2) + 1;
        game.rebelDiscardPile = shuffle([...game.rebelDiscardPile, ...game.rebelDeck]);
        game.rebelDeck = game.rebelDiscardPile;
        game.rebelDiscardPile = [];
        message += `Carta de Levante Rebelde ativada. `;
      } else {
        player.hand.push(card);
        message += `${player.name} comprou a carta "${card}". `;
      }
    }
    game.phase = 'REVEAL_REBEL';
  }

  else if (game.phase === 'REVEAL_REBEL') {
    const numberToReveal = game.rebellionProgress || 2;
    for (let i = 0; i < numberToReveal; i++) {
      if (game.rebelDeck.length === 0) break;
      const card = game.rebelDeck.shift();
      const planet = game.planets[card];
      if (!planet) continue;

      if (!planet.rebellionCubes) planet.rebellionCubes = 0;

      if (planet.rebellionCubes >= 3) {
        game.revoltMarker = (game.revoltMarker || 0) + 1;
        message += `Revolta em ${card}! Marcador de revolta agora em ${game.revoltMarker}. `;
        if (game.revoltMarker >= 8) {
          game.status = 'DEFEAT';
          return res.json({ message: 'O Império perdeu: revoltas em excesso.' });
        }
      } else {
        planet.rebellionCubes++;
        message += `Cubo rebelde adicionado em ${card}. `;
      }
    }
    game.phase = 'CHECK_END';
  }

  else if (game.phase === 'CHECK_END') {
    // Verifica vitória (4 regiões neutralizadas, por exemplo)
    if (game.victoryConditionsMet) {
      game.status = 'VICTORY';
      return res.json({ message: 'O Império venceu!' });
    }
    game.currentPlayer = (game.currentPlayer + 1) % game.players.length;
    if (game.currentPlayer === 0) game.turn += 1;
    game.players[game.currentPlayer].actionsTaken = 0;
    game.phase = 'ACTIONS';
    message += `Novo turno iniciado: jogador ${game.players[game.currentPlayer].name}`;
  }

  game.log.push(`[Turno ${game.turn}] ${message}`);
  res.json(game);
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

module.exports = {
  getGameState,
  handleAction
};
