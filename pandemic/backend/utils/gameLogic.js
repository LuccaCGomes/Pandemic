// backend/utils/gameLogic.js

function suppressThreat(game) {
  const player = game.players[game.currentPlayerIndex];
  const planetName = player.location;
  const planet = game.planets.find(p => p.name === planetName);
  
  if (planet.threatLevel > 0) {
    planet.threatLevel -= 1;
    game.log.push(`${player.name} reprimiu ameaças rebeldes em ${planetName}`);
  } else {
    throw new Error('Nenhuma ameaça para reprimir neste planeta');
  }
}

function useCard(game, cardName) {
  const player = game.players[game.currentPlayerIndex];
  const cardIndex = player.cards.findIndex(card => card.name === cardName);
  
  if (cardIndex === -1) {
    throw new Error('Carta não encontrada na mão do jogador');
  }
  
  const card = player.cards.splice(cardIndex, 1)[0];
  game.log.push(`${player.name} utilizou a carta "${card.name}"`);
  
  return card;
}

module.exports = {
  suppressThreat,
  useCard
};
  