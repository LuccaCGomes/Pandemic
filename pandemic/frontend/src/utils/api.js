export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

export const fetchGameState = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/game/state`);
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

export const makeAction = async (actionData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/game/action`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(actionData),
        });
        if (!response.ok) {
            throw new Error('Failed to make action');
        }
        return await response.json();
    } catch (error) {
        console.error('Error making action:', error);
        throw error;
    }
};