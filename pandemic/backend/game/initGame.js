const allPlanetsData = require('../game/planets');

/**
 * Shuffles an array in place.
 * @param {Array} array The array to shuffle.
 * @returns {Array} The shuffled array.
 */
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/**
 * Initializes the game state.
 * @param {Array<object>} playersInfo - Array of objects with player info, e.g., [{ name: 'Player1', role: 'Commander' }].
 * @param {number} rebellionCardsCount - The number of "Levante Rebelde" cards to insert.
 */
function initGame(playersInfo, rebellionCardsCount = 4) {
  const log = ['[SETUP] The Empire begins its offensive against the rebels!'];

  // --- 1. Prepare Planets ---
  // Initialize planets with threat levels and base status.
  const planets = allPlanetsData.map(p => ({
    ...p,
    threatLevel: 0,
    hasBase: false,
    connections: p.adjacent // Standardizing the connections property name
  }));
  log.push('[SETUP] Galactic board prepared.');

  // Coruscant starts with an Imperial Base
  const coruscant = planets.find(p => p.name === 'Coruscant');
  if (coruscant) {
    coruscant.hasBase = true;
    log.push('[SETUP] Central Imperial Base established on Coruscant.');
  }

  // --- 2. Create Decks ---
  // The Rebel Deck contains one card for each planet, used for revealing threats.
  let rebelDeck = planets.map(p => ({ name: p.name, type: 'rebel' }));
  shuffle(rebelDeck);
  const rebelDiscardPile = [];
  log.push('[SETUP] Rebel intel deck created.');

  // The Player Deck contains planet cards (Fleet) and event cards.
  const fleetCards = planets.map(p => ({ name: p.name, type: 'planet', region: p.region }));
  const eventCards = [ // Based on the manual
    { name: 'Order 66', type: 'event' },
    { name: 'Death Star Active', type: 'event' },
    { name: 'Galactic Blockade', type: 'event' },
    { name: 'Sith Interrogation', type: 'event' },
    // Adding a couple more to have variety
    { name: 'Tactical Intervention', type: 'event' },
    { name: 'Rapid Mobilization', type: 'event' }
  ];
  let playerDeck = [...fleetCards, ...eventCards];
  shuffle(playerDeck);
  log.push('[SETUP] Imperial fleet and event deck created.');

  // --- 3. Initial Threat Placement  ---
  let remainingThreats = 0;
  // Draw 3 planets to get 3 cubes
  for (let i = 0; i < 3; i++) {
    const planetName = rebelDeck.pop().name;
    const planet = planets.find(p => p.name === planetName);
    planet.threatLevel = 3;
    remainingThreats += 3;
    rebelDiscardPile.push({ name: planet.name, type: 'rebel' });
    log.push(`[SETUP] Major rebel activity on ${planet.name} (3 threats).`);
  }
  // Draw 3 planets to get 2 cubes
  for (let i = 0; i < 3; i++) {
    const planetName = rebelDeck.pop().name;
    const planet = planets.find(p => p.name === planetName);
    planet.threatLevel = 2;
    remainingThreats += 2;
    rebelDiscardPile.push({ name: planet.name, type: 'rebel' });
    log.push(`[SETUP] Rebel presence detected on ${planet.name} (2 threats).`);
  }
  // Draw 3 planets to get 1 cube
  for (let i = 0; i < 3; i++) {
    const planetName = rebelDeck.pop().name;
    const planet = planets.find(p => p.name === planetName);
    planet.threatLevel = 1;
    remainingThreats += 1;
    rebelDiscardPile.push({ name: planet.name, type: 'rebel' });
    log.push(`[SETUP] Minor rebel cell found on ${planet.name} (1 threat).`);
  }

  // --- 4. Prepare Player Deck with Rebellion Cards  ---
  const rebellionCards = Array.from({ length: rebellionCardsCount }, () => ({ type: 'rebellion', name: 'Rebel Uprising' }));
  const pileSize = Math.floor(playerDeck.length / rebellionCardsCount);
  let finalPlayerDeck = [];
  for (let i = 0; i < rebellionCardsCount; i++) {
    const pile = playerDeck.splice(0, pileSize);
    pile.push(rebellionCards[i]);
    shuffle(pile);
    finalPlayerDeck.push(...pile);
  }
  finalPlayerDeck.push(...playerDeck); // Add any remaining cards
  playerDeck = finalPlayerDeck;
  log.push(`[SETUP] ${rebellionCardsCount} Rebel Uprising cards inserted into the player deck.`);

  // --- 5. Setup Players ---
  const players = playersInfo.map(({ name, role }) => ({
    name,
    role,
    location: 'Coruscant', // All players start at the central base
    cards: [],
    actionsTaken: 0
  }));

  // Deal initial cards to players
  players.forEach(player => {
    let cardsToDraw = 2; // Standard initial hand size
    while (cardsToDraw > 0 && playerDeck.length > 0) {
      const card = playerDeck.shift();
      // Ensure no player starts with a Rebellion card
      if (card.type === 'rebellion') {
        playerDeck.push(card);
        shuffle(playerDeck);
        continue;
      }
      player.cards.push(card);
      cardsToDraw--;
    }
  });
  log.push(`[SETUP] Players have been assigned their roles and initial hands.`);


  // --- 6. Final Game State ---
  return {
    status: 'ONGOING',
    phase: 'ACTIONS',
    planets,
    players,
    playerDeck,
    rebelDeck,
    rebelDiscardPile,
    currentPlayerIndex: 0,
    log,
    turn: 1,
    remainingThreats,
    maxThreats: 24 * 3, // Example max based on cube count
    revoltMarker: 0, // Starts at 0, game ends if it reaches 8
    rebellionProgress: 2, // Initial number of rebel cards to reveal
    rebellionsNeutralized: {
      'Inner Rim': false,
      'Mid Rim': false,
      'Outer Rim': false,
      'Deep Core': false
    }
  };
}

module.exports = initGame;
