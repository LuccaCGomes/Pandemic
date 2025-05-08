import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const MenuScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Pandemic Game</Text>
            <Button
                title="Iniciar Jogo"
                onPress={() => navigation.navigate('GameScreen')}
            />
            <Button
                title="Regras"
                onPress={() => navigation.navigate('RulesScreen')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
});

export default MenuScreen;