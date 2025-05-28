const planets = require('./planets');

const fleetCards = planets.map(planet => ({
  planeta: planet.name,
  regiao: planet.region,
  cor: getColorByRegion(planet.region)
}));

function getColorByRegion(region) {
  switch (region) {
    case 'Deep Core':
      return 'vermelha';
    case 'Inner Rim':
      return 'azul';
    case 'Mid Rim':
      return 'amarela';
    case 'Outer Rim':
      return 'preta';
    default:
      return 'cinza';
  }
}

module.exports = fleetCards;
