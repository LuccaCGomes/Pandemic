import React from 'react';
import './Deck.css';

function Deck({ remainingCards = 0 }) {
  return (
    <div className="deck-container">
      <div className="deck-card-back">
        <p className="deck-label">Deck</p>
      </div>
      <p className="deck-count">{remainingCards} cartas</p>
    </div>
  );
}

export default Deck;
