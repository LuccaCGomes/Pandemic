
import React from 'react';
import './Planet.css';

const Planet = ({ planet, onClick }) => {

  const planetColors = {
    'Deep Core': 'white',
    'Inner Rim': 'red',
    'Mid Rim': 'blue',
    'Outer Rim': 'yellow',
  };

  return (
    <div
      className="planet"
      style={{
        left: `${planet.x}px`,
        top: `${planet.y}px`,
        borderColor: `${planetColors[planet.region]}`,
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
