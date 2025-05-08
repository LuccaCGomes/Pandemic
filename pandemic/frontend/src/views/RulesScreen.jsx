import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const RulesScreen = () => {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Regras do Jogo Pandemic</Text>
            <Text style={styles.rule}>
                1. O objetivo do jogo é erradicar quatro doenças antes que o tempo acabe ou que as doenças se espalhem demais.
            </Text>
            <Text style={styles.rule}>
                2. Cada jogador assume o papel de um personagem com habilidades especiais.
            </Text>
            <Text style={styles.rule}>
                3. Os jogadores se revezam realizando ações, como mover-se, tratar doenças e compartilhar conhecimento.
            </Text>
            <Text style={styles.rule}>
                4. A cada turno, novas cartas de infecção são reveladas, aumentando a dificuldade do jogo.
            </Text>
            <Text style={styles.rule}>
                5. Os jogadores podem ganhar o jogo ao curar todas as doenças ou perder se o número de surtos exceder o limite.
            </Text>
            {/* Adicione mais regras conforme necessário */}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    rule: {
        fontSize: 18,
        marginBottom: 10,
    },
});

export default RulesScreen;