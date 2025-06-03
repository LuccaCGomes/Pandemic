import React, { useRef, useEffect } from 'react';
import Card from '../../components/Card/Card';
import Planet from '../../components/Planet/Planet';
import backgroundImage from '../../assets/background.jpg';
import './GameBoard.css';

function GameBoard({ game, action, setAction }) {
  const { planets } = game;
  console.log('GameBoard planets:', planets);
  const { players, currentPlayerIndex, deck } = game;
  const currentPlayer = players[currentPlayerIndex];
  const [showSettings, setShowSettings] = React.useState(false);

  // Ref for the canvas element
  const canvasRef = useRef(null);

  function arrangePlanetsByRegion(planets) {
    const centerX = 800;
    const centerY = 400;

    // Posições pré-definidas baseadas no layout do Figma
    const predefinedPositions = {
      // Deep Core (centro - vermelho)
      'deep-core': [
        { x: centerX - 50, y: centerY - 30 },
        { x: centerX + 20, y: centerY - 50 },
        { x: centerX - 30, y: centerY + 40 },
        { x: centerX + 40, y: centerY + 20 },
        { x: centerX, y: centerY },
        { x: centerX - 70, y: centerY },
        { x: centerX + 60, y: centerY - 20 }
      ],

      // Inner Rim (próximo ao centro - branco)
      'inner-rim': [
        { x: centerX - 120, y: centerY - 80 },
        { x: centerX + 100, y: centerY - 100 },
        { x: centerX - 100, y: centerY + 100 },
        { x: centerX + 120, y: centerY + 80 },
        { x: centerX, y: centerY - 120 },
        { x: centerX, y: centerY + 120 },
        { x: centerX - 140, y: centerY + 40 },
        { x: centerX + 140, y: centerY - 40 }
      ],

      // Mid Rim (meio - azul)
      'mid-rim': [
        { x: centerX - 200, y: centerY - 120 },
        { x: centerX + 180, y: centerY - 140 },
        { x: centerX - 180, y: centerY + 140 },
        { x: centerX + 200, y: centerY + 120 },
        { x: centerX - 80, y: centerY - 180 },
        { x: centerX + 80, y: centerY + 180 },
        { x: centerX - 220, y: centerY + 20 },
        { x: centerX + 220, y: centerY - 20 },
        { x: centerX, y: centerY - 200 }
      ],

      // Outer Rim (externo - amarelo)
      'outer-rim': [
        { x: centerX - 300, y: centerY - 160 },
        { x: centerX + 280, y: centerY - 180 },
        { x: centerX - 280, y: centerY + 180 },
        { x: centerX + 300, y: centerY + 160 },
        { x: centerX - 150, y: centerY - 250 },
        { x: centerX + 150, y: centerY + 250 },
        { x: centerX - 320, y: centerY },
        { x: centerX + 320, y: centerY },
        { x: centerX, y: centerY - 280 },
        { x: centerX, y: centerY + 280 }
      ]
    };

    const regions = {
      'deep-core': [],
      'inner-rim': [],
      'mid-rim': [],
      'outer-rim': []
    };

    // Agrupa planetas por região
    planets.forEach(p => {
      const regionKey = p.region?.toLowerCase().replace(/\s+/g, '-');
      if (regions[regionKey]) {
        regions[regionKey].push(p);
      } else {
        console.warn(`Região desconhecida: "${p.region}"`);
      }
    });

    const arranged = [];

    Object.entries(regions).forEach(([region, regionPlanets]) => {
      const positions = predefinedPositions[region] || [];

      regionPlanets.forEach((planet, i) => {
        let position;

        if (i < positions.length) {
          position = positions[i];
        } else {
          const baseRadius = {
            'deep-core': 80,
            'inner-rim': 150,
            'mid-rim': 220,
            'outer-rim': 320
          }[region] || 200;

          const angle = (2 * Math.PI * i) / regionPlanets.length;
          const radiusVariation = Math.random() * 50 - 25;
          const radius = baseRadius + radiusVariation;

          position = {
            x: centerX + radius * Math.cos(angle),
            y: centerY + radius * Math.sin(angle)
          };
        }

        arranged.push({
          ...planet,
          x: position.x,
          y: position.y
        });
      });
    });

    return arranged;
  }

  const arrangedPlanets = arrangePlanetsByRegion(planets);
  console.log('Arranged Planets:', arrangedPlanets);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 3]);

    arrangedPlanets.forEach((planet) => {
      planet.adjacent.forEach((neighborName) => {
        const neighbor = arrangedPlanets.find((p) => p.name === neighborName);
        if (neighbor && planet.name < neighbor.name) {
          ctx.beginPath();
          ctx.moveTo(planet.x, planet.y);
          ctx.lineTo(neighbor.x, neighbor.y);
          ctx.stroke();
        }
      });
    });
  }, [arrangedPlanets]);

  return (
    <div className="board-container">
      <img src={backgroundImage} alt="Mapa Galáctico" className="board-background" />

      <div className="board-overlay">
        <canvas
          ref={canvasRef}
          className="connections-canvas"
          style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }}
        ></canvas>

        {arrangedPlanets.map((planet) => (
          <Planet
            key={planet.name}
            planet={planet}
            onClick={(name) => setAction({ ...action, targetPlanet: name })}
          />
        ))}
      </div>

      <div className="flex flex-col h-screen bg-gradient-to-b from-zinc-800 to-zinc-900 text-white">
        <div className="flex-grow flex items-center justify-center relative">
          <div className="text-center">
            <button
              // Assuming onDrawCard function exists elsewhere or is passed via props
              onClick={() => { /* onDrawCard(currentPlayerIndex) */ }}
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

        {/* <div className="ingame-cards">
          {currentPlayer.cards.map((card, index) => (
            <div key={index} className="card">
              <Card key={index} card={card} />
            </div>
          ))}
        </div> */}

        {showSettings && <Settings onClose={() => setShowSettings(false)} />}
      </div>
    </div>
  );
}

export default GameBoard;