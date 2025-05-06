class GameController {
    constructor(gameState) {
        this.gameState = gameState;
    }

    startGame(req, res) {
        this.gameState.initialize();
        res.status(200).json({ message: 'Game started', state: this.gameState });
    }

    makeMove(req, res) {
        const { playerId, action } = req.body;
        const result = this.gameState.performAction(playerId, action);
        if (result.success) {
            res.status(200).json({ message: 'Move successful', state: this.gameState });
        } else {
            res.status(400).json({ message: result.error });
        }
    }

    getGameState(req, res) {
        res.status(200).json(this.gameState);
    }
}

export default GameController;