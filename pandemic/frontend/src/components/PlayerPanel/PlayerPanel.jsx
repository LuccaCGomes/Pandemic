import React from 'react';
import OfficerCard from '../Card/OfficerCard/OfficerCard';


function PlayerPanel({ game, action, setAction, sendAction }) {
  const player = game.players[game.currentPlayerIndex];

  const playerCards = player.cards.map((card, index) => (
    <div key={index} className="card">
      <img src={card.image} alt={card.name} />
      <p>{card.name}</p>
    </div>
  ));

  return (
    <div className="player-panel">
      <h3>Agente Imperial: {player.name}</h3>
      <p>Patente: {player.role?.patente || 'Desconhecida'}</p>
      <p>Localização: {player.location}</p>

      {player.role && <OfficerCard officer={player.role} />}

      <p>Cartas:</p>
      <div className='player-cards'>{playerCards}</div>

      <select value={action.type} onChange={(e) => setAction({ ...action, type: e.target.value })}>
        <option value="">Escolha uma ação</option>
        <option value="move">Mover</option>
        <option value="attack">Eliminar Rebeldes</option>
        <option value="useCard">Usar Carta</option>
        <option value="buildBase">Construir Base</option>
        <option value="neutralize">Neutralizar Rebelião</option>
        <option value="exchangeCard">Trocar Carta</option>
        <option value="useAbility">Usar Habilidade</option>
      </select>

      <button onClick={sendAction} disabled={!action.type || !action.targetPlanet}>
        Confirmar Ação
      </button>
    </div>
  );
}

export default PlayerPanel;
