function rollDice(faces = 6) {
    if (faces < 1) {
        throw new Error('O dado deve ter pelo menos 1 face.');
    }
    return Math.floor(Math.random() * faces) + 1;
}

function rollMultipleDice(count = 1, faces = 6) {
    if (count < 1) {
        throw new Error('Deve rolar pelo menos 1 dado.');
    }
    return Array.from({ length: count }, () => rollDice(faces));
}

module.exports = { rollDice, rollMultipleDice };
