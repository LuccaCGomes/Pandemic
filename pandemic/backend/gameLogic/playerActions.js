/**
 * Moves a player to a target planet, checking for all valid move types:
 * 1. Adjacent move
 * 2. Direct Flight (by discarding the destination's card)
 * 3. Shuttle Flight (between two Imperial Bases)
 * [cite_start]This corresponds to the "Viajar para outro planeta (adjacente, por carta ou via base)" action. [cite: 1]
 * @param {object} gameState - The current state of the game.
 * @param {object} player - The player performing the action.
 * @param {string} targetPlanetName - The name of the planet to move to.
 * @throws {Error} If the move is invalid under all possible conditions.
 */
function movePlayer(gameState, player, targetPlanetName) {
    const currentPlanet = gameState.planets.find(p => p.name === player.location);
    const targetPlanet = gameState.planets.find(p => p.name === targetPlanetName);

    if (!currentPlanet || !targetPlanet) {
        throw new Error('Invalid planet name provided.');
    }

    if (player.location === targetPlanetName) {
        throw new Error('Player is already at the target location.');
    }

    // Condition 1: Adjacent Move
    if (currentPlanet.connections.includes(targetPlanetName)) {
        player.location = targetPlanetName;
        gameState.log.push(`${player.name} moved to adjacent planet ${targetPlanetName}.`);
        return; // Move successful
    }

    // Condition 2: Direct Flight (by discarding destination card)
    const cardIndex = player.cards.findIndex(card => card.type === 'planet' && card.name === targetPlanetName);
    if (cardIndex !== -1) {
        player.location = targetPlanetName;
        const discardedCard = player.cards.splice(cardIndex, 1)[0];

        // Add the discarded card to a discard pile
        if (!gameState.playerDiscardPile) {
            gameState.playerDiscardPile = [];
        }
        gameState.playerDiscardPile.push(discardedCard);

        gameState.log.push(`${player.name} discarded the ${targetPlanetName} card to perform a Direct Flight.`);
        return; // Move successful
    }

    // Condition 3: Shuttle Flight (between two bases)
    if (currentPlanet.hasBase && targetPlanet.hasBase) {
        player.location = targetPlanetName;
        gameState.log.push(`${player.name} traveled between Imperial Bases from ${currentPlanet.name} to ${targetPlanetName}.`);
        return; // Move successful
    }

    // If no conditions are met, the move is invalid.
    throw new Error('Invalid move. Target is not adjacent, player does not have the card, or there is no valid base connection.');
}

/**
 * [cite_start]Eliminates one rebellion cube from the player's current location. [cite: 1]
 * [cite_start]This corresponds to the "Eliminar rebeldes" action. [cite: 1]
 * [cite_start]@param {object} gameState - The current state of the game. [cite: 1]
 * [cite_start]@param {object} player - The player performing the action. [cite: 1]
 * [cite_start]@throws {Error} If there are no threats to eliminate. [cite: 1]
 */
function eliminateRebels(gameState, player) {
    const currentPlanet = gameState.planets.find(p => p.name === player.location);

    if (!currentPlanet || currentPlanet.threatLevel === 0) {
        throw new Error('No threats to eliminate at the current location.');
    }

    currentPlanet.threatLevel -= 1;
    gameState.remainingThreats -= 1;
    gameState.log.push(`${player.name} eliminated 1 threat in ${player.location}.`);
}

/**
 * [cite_start]Builds an Imperial Base on the player's current location. [cite: 1]
 * [cite_start]This corresponds to the "Construir base imperial" action. [cite: 1]
 * [cite_start]To do this, the player must discard the card corresponding to their location. [cite: 1]
 * [cite_start]@param {object} gameState - The current state of the game. [cite: 1]
 * [cite_start]@param {object} player - The player performing the action. [cite: 1]
 * [cite_start]@throws {Error} If the player does not have the required planet card. [cite: 1]
 */
function buildImperialBase(gameState, player) {
    const playerLocation = player.location;
    const cardIndex = player.cards.findIndex(card => card.type === 'planet' && card.name === playerLocation);

    if (cardIndex === -1) {
        throw new Error(`Player must have the ${playerLocation} card to build a base.`);
    }

    // Find the planet in the main planet list and mark it as having a base
    const planet = gameState.planets.find(p => p.name === playerLocation);
    if (planet) {
        planet.hasBase = true;
    }

    // Discard the card
    player.cards.splice(cardIndex, 1);

    gameState.log.push(`${player.name} built an Imperial Base in ${playerLocation}.`);
}


/**
 * [cite_start]Shares information (cards) with another player. [cite: 1]
 * [cite_start]Corresponds to the "Trocar informações" action. [cite: 1]
 * [cite_start]@param {object} gameState - The current state of the game. [cite: 1]
 * [cite_start]@param {object} player - The player giving the card. [cite: 1]
 * [cite_start]@param {object} targetPlayer - The player receiving the card. [cite: 1]
 * [cite_start]@param {object} cardToShare - The card being shared. [cite: 1]
 */
function shareInformation(gameState, player, targetPlayer, cardToShare) {
    [cite_start]// 1. Check if both players are in the same location. [cite: 1]
    if (player.location !== targetPlayer.location) {
        throw new Error('Both players must be in the same location to share information.');
    }
    [cite_start]// 2. Check if the card being shared is in the player's hand. [cite: 1]
    const cardIndex = player.cards.findIndex(
        card => card.name === cardToShare.name && card.type === cardToShare.type
    );
    if (cardIndex === -1) {
        throw new Error('The player does not have the specified card to share.');
    }
    [cite_start]// 3. Transfer the card. [cite: 1]
    player.cards.splice(cardIndex, 1);
    targetPlayer.cards.push(cardToShare);
    gameState.log.push(
        `${player.name} shared the card ${cardToShare.name} with ${targetPlayer.name} in ${player.location}.`
    );
}

/**
 * [cite_start]Neutralizes a rebellion in a region. [cite: 1]
 * [cite_start]Corresponds to the "Neutralizar rebelião" action. [cite: 1]
 * [cite_start]The player must be at an Imperial Base and discard 5 cards of the same region. [cite: 1]
 * [cite_start]@param {object} gameState - The current state of the game. [cite: 1]
 * [cite_start]@param {object} player - The player performing the action. [cite: 1]
 * [cite_start]@param {string} region - The region of the rebellion to neutralize. [cite: 1]
 */
function neutralizeRebellion(gameState, player, region) {
    [cite_start]// 1. Check if player is at a location with a base. [cite: 1]
    const currentPlanet = gameState.planets.find(p => p.name === player.location);
    if (!currentPlanet || !currentPlanet.hasBase) {
        throw new Error('Player must be at a location with an Imperial Base to neutralize a rebellion.');
    }
    [cite_start]// 2. Check if player has 5 cards of the specified region. [cite: 1]
    const regionCards = player.cards.filter(card => card.region === region);
    if (regionCards.length < 5) {
        throw new Error('Player must have at least 5 cards of the specified region to neutralize a rebellion.');
    }
    [cite_start]// 3. Discard the 5 cards. [cite: 1]
    let discarded = 0;
    for (let i = player.cards.length - 1; i >= 0 && discarded < 5; i--) {
        if (player.cards[i].region === region) {
            player.cards.splice(i, 1);
            discarded++;
        }
    }
    [cite_start]// 4. Mark the rebellion as neutralized. [cite: 1]
    if (!gameState.rebellionsNeutralized) {
        gameState.rebellionsNeutralized = {};
    }
    gameState.rebellionsNeutralized[region] = true;
    gameState.log.push(
        `${player.name} neutralized the rebellion in region ${region} at ${player.location}.`
    );
}


module.exports = {
    movePlayer,
    eliminateRebels,
    buildImperialBase,
    shareInformation,
    neutralizeRebellion,
};
