import React from 'react';

function PlayerPanel({ game, action, setAction }) {
  const currentPlayer = game.players[game.currentPlayer];
  const currentCity = game.cities[currentPlayer.location];

  return (
    <div>
      <h2>Turno de {currentPlayer.name}</h2>
      <p>Local: {currentPlayer.location}</p>
      <p>Conexões:</p>
      <ul>
        {currentCity.connections.map(city => (
          <li key={city}>
            <button onClick={() => setAction({ type: 'move', city })}>
              Mover para {city}
            </button>
          </li>
        ))}
      </ul>
      <button onClick={() => setAction({ type: 'treat' })}>
        Tratar Doença
      </button>
    </div>
  );
}

export default PlayerPanel;
