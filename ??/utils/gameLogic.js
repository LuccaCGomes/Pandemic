// backend/utils/gameLogic.js

function movePlayer(game, city) {
    const player = game.players[game.currentPlayer];
    const currentCity = game.cities[player.location];
  
    if (!currentCity.connections.includes(city)) {
      throw new Error('Movimento inválido');
    }
  
    player.location = city;
    game.log.push(`${player.name} moveu para ${city}`);
  }
  
  function treatDisease(game) {
    const player = game.players[game.currentPlayer];
    const cityName = player.location;
    const diseaseLevel = game.cities[cityName].disease;
  
    if (diseaseLevel > 0) {
      game.cities[cityName].disease -= 1;
      game.log.push(`${player.name} tratou a doença em ${cityName}`);
    } else {
      throw new Error('Nenhuma doença para tratar aqui');
    }
  }
  
  module.exports = {
    movePlayer,
    treatDisease
  };
  