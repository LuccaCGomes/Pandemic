// GamePage.jsx
import React, { useEffect, useState } from 'react';
import Menu from '../../components/Menu/Menu';
import GameBoard from '../../components/GameBoard/GameBoard';
import PlayerPanel from '../../components/PlayerPanel/PlayerPanel';

function GamePage() {
  const [game, setGame] = useState(null);
  const [action, setAction] = useState({ type: '', targetPlanet: '' });

  useEffect(() => {
    const fetchGame = fetch('http://localhost:3001/game/state')
      .then(res => res.json())
    setGame(fetchGame);
  }, []);

  const sendAction = async () => {
    const res = await fetch('http://localhost:3001/game/action', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(action),
    });

    const data = await res.json();
    setGame(data);
    setAction({ type: '', targetPlanet: '' });
  };

  if (!game) return <div>Carregando a Galáxia...</div>;

  return (
    <div className="game-container">
      <Menu game={game} />
      <GameBoard game={game} action={action} setAction={setAction} />
      <PlayerPanel game={game} action={action} setAction={setAction} sendAction={sendAction} />
    </div>
  );
}

export default GamePage;
