import React, { useRef, useEffect, useState, useMemo } from 'react';
import Card from '../../components/Card/Card';
import Planet from '../../components/Planet/Planet';
import Deck from '../../components/Deck/Deck';
import Settings from '../../components/Settings/Settings';
import { makeAction } from '../../utils/api';
import backgroundImage from '../../assets/background.jpg';
import './GameBoard.css';

function GameBoard({ game, action, setAction, setGame }) {
  const { planets, players, currentPlayerIndex, deck } = game;
  const currentPlayer = players[currentPlayerIndex];
  const [showSettings, setShowSettings] = useState(false);

  const canvasRef = useRef(null);
  const overlayRef = useRef(null);

  function arrangePlanetsByRegion(planets) {
    const centerX = 600;
    const centerY = 350;

    const predefinedPositions = {
      'deep-core': [
        { x: centerX - 90, y: centerY - 75 },
        { x: centerX + 68, y: centerY - 90 },
        { x: centerX - 75, y: centerY + 82 },
        { x: centerX + 83, y: centerY + 68 },
        { x: centerX, y: centerY },
        { x: centerX - 105, y: centerY },
        { x: centerX + 98, y: centerY - 53 }
      ],
      'inner-rim': [
        { x: centerX - 180, y: centerY - 135 },
        { x: centerX + 165, y: centerY - 165 },
        { x: centerX - 165, y: centerY + 165 },
        { x: centerX + 180, y: centerY + 135 },
        { x: centerX, y: centerY - 180 },
        { x: centerX, y: centerY + 180 },
        { x: centerX - 195, y: centerY + 90 },
        { x: centerX + 195, y: centerY - 90 }
      ],
      'mid-rim': [
        { x: centerX - 300, y: centerY - 200 },
        { x: centerX + 278, y: centerY - 225 },
        { x: centerX - 278, y: centerY + 225 },
        { x: centerX + 300, y: centerY + 200 },
        { x: centerX - 150, y: centerY - 278 },
        { x: centerX + 150, y: centerY + 278 },
        { x: centerX - 323, y: centerY + 75 },
        { x: centerX + 323, y: centerY - 75 },
        { x: centerX, y: centerY - 300 }
      ],
      'outer-rim': [
        { x: centerX - 450, y: centerY - 250 },
        { x: centerX + 428, y: centerY - 270 },
        { x: centerX - 428, y: centerY + 270 },
        { x: centerX + 450, y: centerY + 250 },
        { x: centerX - 248, y: centerY - 368 },
        { x: centerX + 248, y: centerY + 368 },
        { x: centerX - 480, y: centerY },
        { x: centerX + 480, y: centerY },
        { x: centerX, y: centerY - 420 },
        { x: centerX, y: centerY + 420 }
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
      const updatedGame = await makeAction({ type: 'draw' });
      setGame(updatedGame);
    } catch (error) {
      console.error('Erro ao comprar carta:', error);
      alert('Erro ao se comunicar com o servidor.');
    }
  }

  const arrangedPlanets = useMemo(() => {
    const rawPlanets = arrangePlanetsByRegion(planets);

    // Ajusta para garantir que todos x/y sejam positivos
    const minX = Math.min(...rawPlanets.map(p => p.x));
    const minY = Math.min(...rawPlanets.map(p => p.y));

    const offsetX = minX < 0 ? -minX + 50 : 0;
    const offsetY = minY < 0 ? -minY + 50 : 0;

    return rawPlanets.map(p => ({
      ...p,
      x: p.x + offsetX,
      y: p.y + offsetY
    }));
  }, [planets]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Ajusta o tamanho do canvas com base no conteúdo dos planetas
    canvas.width = Math.max(...arrangedPlanets.map(p => p.x)) + 50;
    canvas.height = Math.max(...arrangedPlanets.map(p => p.y)) + 50;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.lineWidth = 3;
    ctx.setLineDash([]);

    const normalize = (name) => name.trim().toLowerCase();
    const drawnConnections = new Set();

    arrangedPlanets.forEach((planet) => {
      planet.adjacent?.forEach((neighborName) => {
        const neighbor = arrangedPlanets.find(p => normalize(p.name) === normalize(neighborName));
        if (neighbor) {
          const pairKey = [normalize(planet.name), normalize(neighbor.name)].sort().join('-');
          if (!drawnConnections.has(pairKey)) {
            ctx.beginPath();
            ctx.moveTo(planet.x, planet.y);
            ctx.lineTo(neighbor.x, neighbor.y);
            ctx.stroke();
            drawnConnections.add(pairKey);
          }
        }
      });
    });
  }, [arrangedPlanets]);

  return (
    <div className="board-container" ref={overlayRef}>
      <img src={backgroundImage} alt="Mapa Galáctico" className="board-background" />

      <div className="board-overlay">
        <canvas
          ref={canvasRef}
          className="connections-canvas"
          style={{ position: 'absolute', top: 0, left: 0, zIndex: 0, pointerEvents: 'none' }}
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
