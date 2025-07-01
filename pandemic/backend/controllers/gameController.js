const playerActions = require('../gameLogic/playerActions');
// 1. Importa o novo módulo de eventos do jogo
const gameEvents = require('../gameLogic/gameEvents');

function getGameState(req, res) {
    if (!req.app.locals.gameState) {
        return res.status(404).json({ error: 'Game not found.' });
    }
    res.json(req.app.locals.gameState);
}

function handleAction(req, res) {
    const { type, ...params } = req.body;
    const game = req.app.locals.gameState;

    if (!game) {
        return res.status(404).json({ error: 'Game not found.' });
    }

    // O resto da função antes da fase REVEAL_REBEL permanece o mesmo...
    const player = game.players[game.currentPlayerIndex];

    if (!type) {
        return res.status(400).json({ error: 'Action type is required.' });
    }

    if (game.status === 'VICTORY' || game.status === 'DEFEAT') {
        return res.status(400).json({ error: 'The game is over.' });
    }

    if (!game.phase) game.phase = 'ACTIONS';
    if (player.actionsTaken === undefined) player.actionsTaken = 0;

    if (game.phase === 'ACTIONS') {
        if (player.actionsTaken >= 4) {
            game.phase = 'DRAW_CARDS';
            return res.json({ message: 'Action limit reached. Proceeding to Draw Cards phase.' });
        }

        try {
            switch (type) {
                case 'move':
                    playerActions.movePlayer(game, player, params.targetPlanetName);
                    break;
                case 'eliminateRebels':
                    playerActions.eliminateRebels(game, player);
                    break;
                case 'buildBase':
                    playerActions.buildImperialBase(game, player);
                    break;
                case 'shareInfo':
                    const targetPlayer = game.players.find(p => p.name === params.targetPlayerName);
                    if (!targetPlayer) throw new Error('Target player not found.');
                    playerActions.shareInformation(game, player, targetPlayer, params.card);
                    break;
                case 'neutralizeRebellion':
                    playerActions.neutralizeRebellion(game, player, params.region);
                    break;
                default:
                    return res.status(400).json({ error: 'Unknown action type.' });
            }
            player.actionsTaken++;
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    if (game.phase === 'DRAW_CARDS') {
        if (!game.playerDeck || game.playerDeck.length < 2) {
            game.status = 'DEFEAT';
            return res.json({ message: 'No more cards to draw. Game over!', game });
        }
        for (let i = 0; i < 2; i++) {
            const card = game.playerDeck.shift();
            // AQUI DEVE SER IMPLEMENTADA A LÓGICA DE "LEVANTE REBELDE" (EPIDEMIA)
            // Se a 'card.type' for 'rebellion', uma sequência especial deve acontecer.
            player.cards.push(card);
            game.log.push(`${player.name} comprou uma carta: ${card.name}`);
        }
        game.phase = 'REVEAL_REBEL';
        return res.json({ message: 'Cartas compradas. Prosseguindo para a fase de Revelar Ameaças.', game });
    }

    // --- 2. Alteração na Fase REVEAL_REBEL ---
    if (game.phase === 'REVEAL_REBEL') {
        const cardsToReveal = game.rebellionProgress;

        for (let i = 0; i < cardsToReveal; i++) {
            if (!game.rebelDeck || game.rebelDeck.length === 0) {
                break;
            }

            const rebelCard = game.rebelDeck.shift();
            game.rebelDiscardPile.push(rebelCard);

            gameEvents.addThreat(game, rebelCard.name);
        }
        game.phase = 'CHECK_END';
        return res.json({ message: 'Ameaças rebeldes reveladas. Prosseguindo para a checagem de fim de turno.', game });
    }

    if (game.phase === 'CHECK_END') {
        if (game.status === 'DEFEAT') {
            return res.json({ message: 'O Império foi derrotado!', game });
        }
        if (game.rebellionsNeutralized && Object.values(game.rebellionsNeutralized).every(v => v)) {
            game.status = 'VICTORY';
            return res.json({ message: 'Todas as rebeliões foram neutralizadas! Vitória do Império!', game });
        }

        // Passa para o próximo jogador
        game.currentPlayerIndex = (game.currentPlayerIndex + 1) % game.players.length;
        game.players[game.currentPlayerIndex].actionsTaken = 0; // Reseta as ações
        game.phase = 'ACTIONS';
        game.log.push(`É a vez de ${game.players[game.currentPlayerIndex].name}.`);
        return res.json({ message: "Próximo turno.", game });
    }

    // Retorno padrão caso nenhuma fase corresponda (embora não deva acontecer)
    res.json(game);
}

module.exports = {
    getGameState,
    handleAction,
};
