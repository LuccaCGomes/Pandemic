export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

export const fetchGameState = async (gameId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/game/${gameId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch game state');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching game state:', error);
        throw error;
    }
};

export const startGame = async (gameData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/game/start`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(gameData),
        });
        if (!response.ok) {
            throw new Error('Failed to start game');
        }
        return await response.json();
    } catch (error) {
        console.error('Error starting game:', error);
        throw error;
    }
};

export const makeMove = async (gameId, moveData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/game/${gameId}/move`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(moveData),
        });
        if (!response.ok) {
            throw new Error('Failed to make move');
        }
        return await response.json();
    } catch (error) {
        console.error('Error making move:', error);
        throw error;
    }
};