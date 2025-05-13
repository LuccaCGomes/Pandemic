// components/GameBoard.jsx
import React from 'react';

function GameBoard({ game, action, setAction }) {
  return (
    <div className="board">
      {game.planets.map((planet) => (
        <div
          key={planet.name}
          className="planet"
          onClick={() => setAction({ ...action, targetPlanet: planet.name })}
          style={{
            left: planet.x,
            top: planet.y,
            backgroundColor: planet.threatLevel > 0 ? 'red' : 'gray'
          }}
        >
          {planet.name}
          {planet.threatLevel > 0 && <span className="threat">⚠ {planet.threatLevel}</span>}
        </div>
      ))}
    </div>
  );
}

export default GameBoard;
