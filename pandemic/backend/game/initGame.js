const { createImperialDeck } = require('../utils/deck');

function initGame(players) {
  const planetList = require('../game/planets');
  const deck = createImperialDeck();

  const gamePlayers = players.map(({ name, role }) => ({
    name,
    role,
    location: 'Coruscant',
    cards: [],
    actionsTaken: 0
  }));

  // Distribuir cartas iniciais
  gamePlayers.forEach(player => {
    let count = 0;
    while (count < 2 && deck.length > 0) {
      const card = deck.pop();
      if (card.type !== 'rebellion') {
        player.cards.push(card);
        count++;
      } else {
        deck.unshift(card);
      }
    }
  });

  return {
    planets: planetList,
    players: gamePlayers,
    deck,
    currentPlayerIndex: 0,
    log: ['O Império começa sua ofensiva contra os rebeldes!'],
    turn: 1,
    phase: 'ACTIONS',
    status: 'PLAYING',
    remainingThreats: planetList.reduce((sum, p) => sum + p.threatLevel, 0),
    rebellionProgress: 0,
    revoltMarker: 0,
    rebelDeck: [],
    rebelDiscardPile: []
  };
}

module.exports = initGame;
