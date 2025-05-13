function initGame() {
  const planets = {
    'Coruscant': { threatLevel: 2, connections: ['Naboo', 'Tatooine'] },
    'Naboo': { threatLevel: 1, connections: ['Coruscant', 'Kamino'] },
    'Tatooine': { threatLevel: 0, connections: ['Coruscant', 'Hoth'] },
    'Kamino': { threatLevel: 0, connections: ['Naboo'] },
    'Hoth': { threatLevel: 1, connections: ['Tatooine'] }
  };

  const players = [
    { name: 'Darth Vader', role: 'Executor', location: 'Coruscant', hand: [] },
    { name: 'Grand Moff Tarkin', role: 'Comandante', location: 'Coruscant', hand: [] }
  ];

  const playerDeck = shuffleDeck([
    'Coruscant', 'Naboo', 'Tatooine', 'Kamino', 'Hoth',
    'Iniciativa Secreta', 'Ataque Orbital', 'Interceptação Rápida'
  ]);

  players.forEach(player => {
    player.hand.push(playerDeck.pop(), playerDeck.pop());
  });

  return {
    planets,
    players,
    playerDeck,
    currentPlayer: 0,
    log: ['O Império começa sua ofensiva contra os rebeldes!'],
    turn: 1
  };
}

function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

module.exports = initGame;
