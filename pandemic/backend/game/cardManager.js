const fleetCards = require('../game/fleetCards');
const eventCards = require('../game/eventCards');
const officers = require('../game/officers');
const { shuffleDeck } = require('./deck');

function createFleetDeck() {
  return shuffleDeck([...fleetCards]);
}

function createRebellionDeck() {
  return shuffleDeck([...eventCards.levanteRebelde]);
}

function createImperialEventDeck() {
  return shuffleDeck([...eventCards.eventoImperial]);
}

function createOfficerDeck() {
  return shuffleDeck([...officers]);
}

module.exports = {
  createFleetDeck,
  createRebellionDeck,
  createImperialEventDeck,
  createOfficerDeck,
};
