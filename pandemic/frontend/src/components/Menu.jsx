import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Menu = ({ navigation }) => {
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
            <Button
                title="Sair"
                onPress={() => {/* Add exit functionality */}}
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

export default Menu;