// gameLogic/cardManager.js

const allPlanets = require('../game/planets');
const allEventCards = require('../game/eventCards');
const allOfficers = require('../game/officers');

/**
 * Embaralha um array em memória.
 * @param {Array} array O array a ser embaralhado.
 * @returns {Array} O array embaralhado.
 */
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

/**
 * Cria o baralho de jogador, contendo cartas de planeta e cartas de evento.
 * @returns {Array} O baralho de jogador, embaralhado.
 */
function createPlayerDeck() {
    // Mapeia os planetas do arquivo de dados para o formato de carta de frota
    const fleetCards = allPlanets.map(planet => ({
        name: planet.name,
        type: 'planet',
        region: planet.region,
    }));

    // Usa as cartas de evento do arquivo de dados
    const imperialEventCards = allEventCards.eventoImperial.map(event => ({
        name: event.nome,
        type: 'event',
        description: event.efeito,
    }));

    const deck = [...fleetCards, ...imperialEventCards];
    return shuffle(deck);
}

/**
 * Cria o baralho de rebelião (infecção), contendo uma carta para cada planeta.
 * @returns {Array} O baralho de rebelião, embaralhado.
 */
function createRebelDeck() {
    const rebelDeck = allPlanets.map(planet => ({
        name: planet.name,
        type: 'rebel',
    }));
    return shuffle(rebelDeck);
}

/**
 * Retorna a lista de oficiais imperiais, embaralhada.
 * Os jogadores podem escolher seus papéis a partir desta lista.
 * @returns {Array} Uma lista embaralhada de oficiais.
 */
function getShuffledOfficers() {
    // Retorna uma cópia embaralhada para não modificar o array original
    return shuffle([...allOfficers]);
}

/**
 * Cria as cartas de "Levante Rebelde" (Epidemia).
 * @param {number} count - O número de cartas de Levante a serem criadas.
 * @returns {Array<object>}
 */
function createUprisingCards(count) {
    // No momento, as cartas de Levante são genéricas. Podemos usar os dados de eventCards.js se quisermos efeitos únicos.
    return Array.from({ length: count }, () => ({ type: 'rebellion', name: 'Rebel Uprising' }));
}


module.exports = {
    createPlayerDeck,
    createRebelDeck,
    getShuffledOfficers,
    createUprisingCards,
};
