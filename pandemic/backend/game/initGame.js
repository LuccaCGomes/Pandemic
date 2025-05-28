const { createImperialDeck } = require('../utils/deck');
function initGame(players) {
  const planetList = [
    {
      name: 'Coruscant',
      x: 600,
      y: 150,
      threatLevel: 2,
      adjacent: ['Naboo', 'Tatooine']
    },
    {
      name: 'Naboo',
      x: 400,
      y: 250,
      threatLevel: 1,
      adjacent: ['Coruscant', 'Kamino']
    },
    {
      name: 'Tatooine',
      x: 650,
      y: 400,
      threatLevel: 0,
      adjacent: ['Coruscant', 'Hoth']
    },
    {
      name: 'Kamino',
      x: 300,
      y: 400,
      threatLevel: 0,
      adjacent: ['Naboo']
    },
    {
      name: 'Hoth',
      x: 800,
      y: 500,
      threatLevel: 1,
      adjacent: ['Tatooine']
    }
  ];

  const deck = createImperialDeck();

  const gamePlayers = players.map(({ name, role }) => ({
    name,
    role,
    location: 'Coruscant',
    cards: []
  }));

  
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
    remainingThreats: planetList.reduce((sum, p) => sum + p.threatLevel, 0)
  };
}

module.exports = initGame;
