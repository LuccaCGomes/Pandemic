import React from 'react';

function PlayerPanel({ game, action, setAction, sendAction }) {
  const player = game.players[game.currentPlayer];

  return (
    <div className="player-panel">
      <h3>Agente Imperial: {player.name}</h3>
      <p>Localização: {player.location}</p>
      <p>Cartas: {player.cards.join(', ')}</p>

      <select value={action.type} onChange={(e) => setAction({ ...action, type: e.target.value })}>
        <option value="">Escolha uma ação</option>
        <option value="move">Mover</option>
        <option value="attack">Eliminar Rebeldes</option>
        <option value="useCard">Usar Carta</option>
      </select>

      <button onClick={sendAction} disabled={!action.type || !action.targetPlanet}>
        Confirmar Ação
      </button>
    </div>
  );
}

export default PlayerPanel;