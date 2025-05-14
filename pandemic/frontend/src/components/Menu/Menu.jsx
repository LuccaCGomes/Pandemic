import React from 'react';

function Menu({ game }) {
  return (
    <div className="menu">
      <h2>Império Galáctico - Missão de Contenção</h2>
      <p>Turno atual: {game.currentPlayer.name}</p>
      <p>Ameaças restantes: {game.remainingThreats}</p>
      <p>Cartas restantes no baralho: {game.deck.length}</p>
    </div>
  );
}

export default Menu;
