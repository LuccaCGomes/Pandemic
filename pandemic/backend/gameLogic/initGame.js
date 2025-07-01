// gameLogic/initGame.js

const cardManager = require('./cardManager');
const allPlanets = require('../game/planets');

/**
 * Initializes the game state.
 * @param {Array<object>} playersInfo - Array of objects with player info, e.g., [{ name: 'Player1', role: 'Commander' }].
 * @param {number} rebellionCardsCount - The number of "Levante Rebelde" cards to insert.
 */
function initGame(playersInfo, rebellionCardsCount = 4) {
    const log = ['[SETUP] O Império inicia sua ofensiva contra os rebeldes!'];

    // --- 1. Preparar Planetas ---
    // Esta lógica permanece, pois é sobre configurar o estado inicial do tabuleiro.
    const planets = allPlanets.map(p => ({
        ...p,
        threatLevel: 0,
        hasBase: false,
        connections: p.adjacent,
    }));
    log.push('[SETUP] Tabuleiro galáctico preparado.');

    // Coruscant começa com uma Base Imperial.
    const coruscant = planets.find(p => p.name === 'Coruscant');
    if (coruscant) {
        coruscant.hasBase = true;
        log.push('[SETUP] Base Imperial Central estabelecida em Coruscant.');
    }

    // --- 2. Criar Baralhos (usando o CardManager) ---
    // A lógica de criação foi movida para o cardManager. Agora apenas o chamamos.
    let playerDeck = cardManager.createPlayerDeck();
    let rebelDeck = cardManager.createRebelDeck();
    const rebelDiscardPile = [];
    log.push('[SETUP] Baralhos de Frota e Rebelião criados pelo Card Manager.');

    // --- 3. Posicionar Ameaças Iniciais ---
    // Esta lógica não muda, pois consome o baralho de rebelião já criado.
    let remainingThreats = 0;
    // Coloca 3 cubos em 3 planetas
    for (let i = 0; i < 3; i++) {
        const planetName = rebelDeck.pop().name;
        const planet = planets.find(p => p.name === planetName);
        planet.threatLevel = 3;
        remainingThreats += 3;
        rebelDiscardPile.push({ name: planet.name, type: 'rebel' });
        log.push(`[SETUP] Atividade rebelde Major em ${planet.name} (3 ameaças).`);
    }
    // Coloca 2 cubos em 3 planetas
    for (let i = 0; i < 3; i++) {
        const planetName = rebelDeck.pop().name;
        const planet = planets.find(p => p.name === planetName);
        planet.threatLevel = 2;
        remainingThreats += 2;
        rebelDiscardPile.push({ name: planet.name, type: 'rebel' });
        log.push(`[SETUP] Presença rebelde detectada em ${planet.name} (2 ameaças).`);
    }
    // Coloca 1 cubo em 3 planetas
    for (let i = 0; i < 3; i++) {
        const planetName = rebelDeck.pop().name;
        const planet = planets.find(p => p.name === planetName);
        planet.threatLevel = 1;
        remainingThreats += 1;
        rebelDiscardPile.push({ name: planet.name, type: 'rebel' });
        log.push(`[SETUP] Célula rebelde menor encontrada em ${planet.name} (1 ameaça).`);
    }

    // --- 4. Preparar Baralho de Jogador com Cartas de Levante ---
    // Pede as cartas de Levante para o cardManager
    const uprisingCards = cardManager.createUprisingCards(rebellionCardsCount);

    // A lógica de inserir as cartas no baralho continua aqui, pois é parte do "setup" do jogo.
    const pileSize = Math.floor(playerDeck.length / rebellionCardsCount);
    let finalPlayerDeck = [];
    for (let i = 0; i < rebellionCardsCount; i++) {
        const pile = playerDeck.splice(0, pileSize);
        pile.push(uprisingCards[i]);
        // Re-embaralha cada pilha para garantir aleatoriedade
        for (let k = pile.length - 1; k > 0; k--) {
            const l = Math.floor(Math.random() * (k + 1));
            [pile[k], pile[l]] = [pile[l], pile[k]];
        }
        finalPlayerDeck.push(...pile);
    }
    finalPlayerDeck.push(...playerDeck); // Adiciona as cartas restantes
    playerDeck = finalPlayerDeck;
    log.push(`[SETUP] ${rebellionCardsCount} cartas de Levante Rebelde inseridas no baralho de Frota.`);

    // --- 5. Configurar Jogadores ---
    // Nenhuma mudança aqui.
    const players = playersInfo.map(({ name, role }) => ({
        name,
        role,
        location: 'Coruscant',
        cards: [],
        actionsTaken: 0,
    }));

    // Distribui as cartas iniciais
    players.forEach(player => {
        let cardsToDraw = 2;
        while (cardsToDraw > 0 && playerDeck.length > 0) {
            const card = playerDeck.shift();
            if (card.type === 'rebellion') {
                playerDeck.push(card);
                // Re-embaralha o baralho se uma carta de levante for comprada no setup
                for (let k = playerDeck.length - 1; k > 0; k--) {
                    const l = Math.floor(Math.random() * (k + 1));
                    [playerDeck[k], playerDeck[l]] = [playerDeck[l], playerDeck[k]];
                }
                continue;
            }
            player.cards.push(card);
            cardsToDraw--;
        }
    });
    log.push('[SETUP] Oficiais Imperiais assumiram seus postos e receberam suas diretivas.');

    // --- 6. Estado Final do Jogo ---
    // Nenhuma mudança aqui.
    return {
        status: 'ONGOING',
        phase: 'ACTIONS',
        planets,
        players,
        playerDeck,
        rebelDeck,
        rebelDiscardPile,
        playerDiscardPile: [],
        currentPlayerIndex: 0,
        log,
        turn: 1,
        remainingThreats,
        maxThreats: 96, // Valor total de cubos
        revoltMarker: 0,
        rebellionProgress: 2,
        rebellionsNeutralized: {
            'Inner Rim': false,
            'Mid Rim': false,
            'Outer Rim': false,
            'Deep Core': false,
        },
    };
}

module.exports = initGame;
