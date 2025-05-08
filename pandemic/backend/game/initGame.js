function initGame() {
    return {
      players: [
        { name: 'Jogador 1', role: 'Médico', location: 'Atlanta' },
        { name: 'Jogador 2', role: 'Cientista', location: 'Atlanta' }
      ],
      currentPlayer: 0,
      cities: {
        'Atlanta': { disease: 1, connections: ['Chicago', 'Miami'] },
        'Chicago': { disease: 0, connections: ['Atlanta', 'San Francisco'] },
        'Miami': { disease: 0, connections: ['Atlanta'] },
        'San Francisco': { disease: 1, connections: ['Chicago'] }
      },
      log: ['Jogo iniciado.'],
      turns: 0
    };
  }
  
  module.exports = initGame;
  