class GameState {
    constructor() {
        this.players = [];
        this.infectionLevels = {};
        this.cardDecks = {
            playerDeck: [],
            infectionDeck: []
        };
        this.currentTurn = 0;
        this.gameOver = false;
    }

    addPlayer(player) {
        this.players.push(player);
    }

    setInfectionLevel(city, level) {
        this.infectionLevels[city] = level;
    }

    drawPlayerCard() {
        // Logic to draw a player card from the deck
    }

    infectCity(city) {
        // Logic to infect a city based on the infection deck
    }

    nextTurn() {
        this.currentTurn = (this.currentTurn + 1) % this.players.length;
    }

    checkGameOver() {
        // Logic to determine if the game is over
    }

    getGameState() {
        return {
            players: this.players,
            infectionLevels: this.infectionLevels,
            currentTurn: this.currentTurn,
            gameOver: this.gameOver
        };
    }
}

export default GameState;