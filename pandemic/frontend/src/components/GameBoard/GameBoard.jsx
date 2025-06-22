import React, { useRef, useEffect, useState } from 'react';
import Card from '../../components/Card/Card';
import Planet from '../../components/Planet/Planet';
import Deck from '../../components/Deck/Deck';
import Settings from '../../components/Settings/Settings';
import backgroundImage from '../../assets/background.jpg';
import './GameBoard.css';

function GameBoard({ game, action, setAction, setGame }) {
  const { planets } = game;
  const { players, currentPlayerIndex, deck } = game;
  const currentPlayer = players[currentPlayerIndex];
  const [showSettings, setShowSettings] = useState(false);

  const canvasRef = useRef(null);
  const overlayRef = useRef(null);

  function arrangePlanetsByRegion(planets) {
    const centerX = 800;
    const centerY = 400;

    const predefinedPositions = {
      'deep-core': [
        { x: centerX - 120, y: centerY - 100 },
        { x: centerX + 90, y: centerY - 120 },
        { x: centerX - 100, y: centerY + 110 },
        { x: centerX + 110, y: centerY + 90 },
        { x: centerX, y: centerY },
        { x: centerX - 140, y: centerY },
        { x: centerX + 130, y: centerY - 70 }
      ],
      'inner-rim': [
        { x: centerX - 240, y: centerY - 180 },
        { x: centerX + 220, y: centerY - 220 },
        { x: centerX - 220, y: centerY + 220 },
        { x: centerX + 240, y: centerY + 180 },
        { x: centerX, y: centerY - 240 },
        { x: centerX, y: centerY + 240 },
        { x: centerX - 260, y: centerY + 120 },
        { x: centerX + 260, y: centerY - 120 }
      ],
      'mid-rim': [
        { x: centerX - 400, y: centerY - 270 },
        { x: centerX + 370, y: centerY - 300 },
        { x: centerX - 370, y: centerY + 300 },
        { x: centerX + 400, y: centerY + 270 },
        { x: centerX - 200, y: centerY - 370 },
        { x: centerX + 200, y: centerY + 370 },
        { x: centerX - 430, y: centerY + 100 },
        { x: centerX + 430, y: centerY - 100 },
        { x: centerX, y: centerY - 400 }
      ],
      'outer-rim': [
        { x: centerX - 600, y: centerY - 330 },
        { x: centerX + 570, y: centerY - 360 },
        { x: centerX - 570, y: centerY + 360 },
        { x: centerX + 600, y: centerY + 330 },
        { x: centerX - 330, y: centerY - 490 },
        { x: centerX + 330, y: centerY + 490 },
        { x: centerX - 640, y: centerY },
        { x: centerX + 640, y: centerY },
        { x: centerX, y: centerY - 560 },
        { x: centerX, y: centerY + 560 }
      ]
    };

    const regions = {
      'deep-core': [],
      'inner-rim': [],
      'mid-rim': [],
      'outer-rim': []
    };

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

  async function handleDrawAction() {
    try {
      const response = await fetch('http://localhost:3001/game/action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'draw' })
      });

      if (!response.ok) {
        const error = await response.json();
        alert(error.error || 'Erro ao comprar carta.');
        return;
      }

      const updatedGame = await response.json();
      setGame(updatedGame);
    } catch (error) {
      console.error('Erro ao comprar carta:', error);
      alert('Erro ao se comunicar com o servidor.');
    }
  }

  const arrangedPlanets = arrangePlanetsByRegion(planets);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.lineWidth = 3;
    ctx.setLineDash([]);

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
    <div className="board-container" ref={overlayRef}>
      <img src={backgroundImage} alt="Mapa Galáctico" className="board-background" />

      <div className="board-overlay" ref={overlayRef}>
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

      <div className="action-panel">
        <div className="draw-section">
          <div className="deck">
            <Deck remainingCards={deck.length} />
          </div>
          <button onClick={handleDrawAction} className="draw-button">
            Comprar Carta
          </button>
          <p className="deck-counter">Cartas restantes: {deck.length}</p>
        </div>

        <button className="settings-button" onClick={() => setShowSettings(true)} aria-label="Abrir Configurações">
          Configurações
        </button>

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


