import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Board from '../components/Board';
import { fetchGameState, makeMove } from '../utils/api';

const GameScreen = () => {
    const [gameState, setGameState] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadGameState = async () => {
            const state = await fetchGameState();
            setGameState(state);
            setLoading(false);
        };

        loadGameState();
    }, []);

    const handleMove = async (move) => {
        const updatedState = await makeMove(move);
        setGameState(updatedState);
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Loading game...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Pandemic Game</Text>
            <Board gameState={gameState} onMove={handleMove} />
            {/* Additional UI elements for actions can be added here */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});

export default GameScreen;