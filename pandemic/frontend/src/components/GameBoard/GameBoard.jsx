import React from 'react';
import Card from '../../components/Card/Card';
import './GameBoard.css';

function GameBoard({ game, action, setAction }) {
  const { planets } = game;
  const { players, currentPlayerIndex, deck } = game;
  const currentPlayer = players[currentPlayerIndex];
  const [showSettings, setShowSettings] = React.useState(false);

  const renderConnections = () => {
    return planets.flatMap((planet) =>
      planet.adjacent.map((neighborName) => {
        const neighbor = planets.find((p) => p.name === neighborName);
        if (!neighbor || planet.name > neighbor.name) return null;

        return (
          <line
            key={`${planet.name}-${neighbor.name}`}
            x1={planet.x}
            y1={planet.y}
            x2={neighbor.x}
            y2={neighbor.y}
            stroke="white"
            strokeWidth="2"
          />
        );
      })
    );
  };

  return (
    <div className="board-container">
      <img src="http://lorempixel.com.br/400/400/?1" alt="Mapa Galáctico" className="board-background" />


      <div className="board-overlay">
        <svg className="connections">
          {renderConnections()}
        </svg>


        {planets.map((planet) => (
          <div
            key={planet.name}
            className="planet"
            onClick={() => setAction({ ...action, targetPlanet: planet.name })}
            style={{
              left: `${planet.x}px`,
              top: `${planet.y}px`,
              borderColor: planet.threatLevel > 0 ? 'red' : 'white'
            }}
          >
            {planet.name}
            {planet.threatLevel > 0 && (
              <span className="threat">⚠ {planet.threatLevel}</span>
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-col h-screen bg-gradient-to-b from-zinc-800 to-zinc-900 text-white">
        <div className="flex-grow flex items-center justify-center relative">
          <div className="text-center">
            <button
              onClick={() => onDrawCard(currentPlayerIndex)}
              className="bg-yellow-600 hover:bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-md"
            >
              Comprar Carta
            </button>
            <p className="mt-2 text-sm text-zinc-400">Cartas restantes: {deck.length}</p>
          </div>

          <button
            onClick={() => setShowSettings(true)}
            className="absolute top-4 right-4 bg-zinc-700 hover:bg-zinc-600 p-2 rounded-full shadow-lg"
          >
            <p>Settings</p>
          </button>
        </div>

        <div className="ingame-cards">
          {currentPlayer.cards.map((card, index) => (
            <div key={index} className="card">
              <Card key={index} card={card} />
            </div>
          ))}
        </div>

        {showSettings && <Settings onClose={() => setShowSettings(false)} />}
      </div>

    </div>
  );
}

export default GameBoard;
