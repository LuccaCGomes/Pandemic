// src/game/deck.js

function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
  }
  
  function createImperialDeck() {
    const planetCards = [
      'Coruscant', 'Tatooine', 'Naboo', 'Kamino', 'Hoth',
      'Mustafar', 'Bespin', 'Dagobah', 'Endor', 'Geonosis',
      'Alderaan', 'Dantooine', 'Yavin IV', 'Jakku', 'Lothal',
      'Scarif', 'Corellia', 'Mon Cala', 'Ilum', 'Mandalore',
      'Felucia', 'Jedha', 'Kessel', 'Ryloth'
    ].map(name => ({ type: 'planet', name }));
  
    const eventCards = [
      'Ataque Orbital',
      'Intervenção Tática',
      'Monitoramento de Setores',
      'Espionagem Infiltrada',
      'Mobilização Rápida',
      'Comando Centralizado',
      'Patrulha de Caça TIE'
    ].map(name => ({ type: 'event', name }));
  
    const rebellionCards = [
      'Insurreição Rebelde',
      'Explosão de Rebeldes',
      'Levantamento Planetário',
      'Motim da Aliança',
      'Chamada de Resistência'
    ].map(name => ({ type: 'rebellion', name }));
  
    return shuffleDeck([...planetCards, ...eventCards, ...rebellionCards]);
  }
  
  module.exports = { createImperialDeck };
  