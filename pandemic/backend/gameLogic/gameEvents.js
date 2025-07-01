// gameLogic/gameEvents.js

/**
 * Handles a Planetary Revolt (outbreak).
 * This function is called when a planet with 3 threats receives a fourth.
 * It advances the revolt marker and propagates one threat to all connected planets.
 * @param {object} gameState The current game state.
 * @param {object} planet The planet object that is revolting.
 * @param {Set<string>} revoltedInThisTurn A set to track planets that have already revolted in this chain reaction to prevent infinite loops.
 */
function handleRevolt(gameState, planet, revoltedInThisTurn) {
    // If the game is already over, do nothing.
    if (gameState.status === 'DEFEAT' || gameState.status === 'VICTORY') return;

    // Add this planet to the set of revolted planets for this turn's chain reaction.
    revoltedInThisTurn.add(planet.name);

    // Advance the revolt marker.
    gameState.revoltMarker++;
    gameState.log.push(`🚨 Revolta Planetária em ${planet.name}! Marcador de revolta agora em ${gameState.revoltMarker}.`);

    [cite_start]// Check for the defeat condition from too many revolts. [cite: 14]
    if (gameState.revoltMarker >= 8) {
        gameState.status = 'DEFEAT';
        gameState.log.push('DERROTA: O Império perdeu o controle devido ao excesso de revoltas.');
        return; // Stop propagation if the game has ended.
    }

    [cite_start]// Propagate one threat to each connected planet. [cite: 13]
    for (const connectedPlanetName of planet.connections) {
        // Recursively call addThreat for neighboring planets.
        // The 'revoltedInThisTurn' set is passed along to track the chain.
        addThreat(gameState, connectedPlanetName, 1, revoltedInThisTurn);
    }
}

/**
 * The main, centralized function for adding threats to a planet.
 * It handles the logic for checking and triggering revolts.
 * @param {object} gameState The current game state.
 * @param {string} planetName The name of the planet to add threats to.
 * @param {number} [amount=1] The number of threat cubes to add.
 * @param {Set<string>} [revoltedInThisTurn=new Set()] (Internal parameter) Used to control chain reactions.
 */
function addThreat(gameState, planetName, amount = 1, revoltedInThisTurn = new Set()) {
    if (gameState.status === 'DEFEAT' || gameState.status === 'VICTORY') return;

    const planet = gameState.planets.find(p => p.name === planetName);
    if (!planet) {
        console.error(`ERROR: Planet ${planetName} not found while trying to add threat.`);
        return;
    }

    // Add the specified amount of threats one by one.
    for (let i = 0; i < amount; i++) {
        // A planet that has already revolted in this chain cannot receive more cubes from other revolts in the same chain.
        if (revoltedInThisTurn.has(planetName)) {
            continue;
        }

        if (planet.threatLevel < 3) {
            planet.threatLevel++;
            gameState.remainingThreats++;
            gameState.log.push(`Atividade rebelde aumentada em ${planet.name}.`);
        } else {
            [cite_start]// The planet already has 3 threats and would get a 4th, so a revolt is triggered. [cite: 13]
            handleRevolt(gameState, planet, revoltedInThisTurn);
            // After a revolt, adding more cubes to this specific planet stops, as the revolt handles the propagation.
            break;
        }
    }
}

module.exports = {
    addThreat,
};
