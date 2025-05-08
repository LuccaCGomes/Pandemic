import React from 'react';

function GameBoard({ game }) {
  return (
    <div>
      <h2>Cidades</h2>
      <ul>
        {Object.entries(game.cities).map(([name, city]) => (
          <li key={name}>
            <strong>{name}</strong>: Doença {city.disease}
            <br />
            Jogadores:{' '}
            {game.players
              .filter(p => p.location === name)
              .map(p => p.name)
              .join(', ') || 'Nenhum'}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GameBoard;
