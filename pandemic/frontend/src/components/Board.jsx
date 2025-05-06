import React from 'react';
import './styles.css';

export default function Board({ gameState, onPlayerMove }) {
  const renderBoard = () => {
    return (
      <div className="board">
        {gameState.cities.map((city) => (
          <div key={city.name} className="city">
            <h3>{city.name}</h3>
            
            {/* Mostrar infecção */}
            <p>Infecção: {city.infectionLevel}</p>

            {/* Mostrar jogadores presentes */}
            {gameState.players
              .filter(player => player.location === city.name)
              .map(player => (
                <span key={player.name} className="player-token">
                  {player.name}
                </span>
              ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="game-board">
      {renderBoard()}
      <button onClick={onPlayerMove}>Realizar Ação</button>
    </div>
  );
}
