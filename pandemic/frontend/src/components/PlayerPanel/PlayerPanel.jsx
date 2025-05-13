// components/PlayerPanel.jsx
import React from 'react';

function PlayerPanel({ game, action, setAction, sendAction }) {
  const player = game.currentPlayer;

  return (
    <div className="player-panel">
      <h3>Agente Imperial: {player.name}</h3>
      <p>Localização: {player.location}</p>
      <p>Cartas: {player.cards.join(', ')}</p>

      <select onChange={(e) => setAction({ ...action, type: e.target.value })}>
        <option value="">Escolha uma ação</option>
        <option value="move">Mover</option>
        <option value="eliminate">Eliminar Rebeldes</option>
        <option value="deploy">Construir Posto Avançado</option>
        <option value="use_card">Usar Carta</option>
      </select>

      <button onClick={sendAction} disabled={!action.type || !action.targetPlanet}>
        Confirmar Ação
      </button>
    </div>
  );
}

export default PlayerPanel;
