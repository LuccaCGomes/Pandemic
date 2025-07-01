import React from 'react';
import './Planet.css';

const Planet = ({ planet, onClick, player, action }) => {
  const regionClass = planet.region ? `planet-border-${planet.region.replace(/\s/g, '').toLowerCase()}` : '';
  const isPlayerHere = player.location === planet.name;
  const isSelected = action.params.targetPlanetName === planet.name;

  return (
    <div
      className={`planet ${regionClass}${isPlayerHere ? ' planet-player' : ''}${isSelected ? ' planet-selected' : ''}`}
      style={{
        left: `${planet.x}px`,
        top: `${planet.y}px`,
      }}
      onClick={() => onClick(planet.name)}
    >
      {planet.name}
      {planet.threatLevel > 0 && (
        <span className="threat">⚠ {planet.threatLevel}</span>
      )}
    </div>
  );
};

export default Planet;
