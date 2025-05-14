import React, { useEffect, useState } from 'react';
import Menu from '../../components/Menu/Menu';
import GameBoard from '../../components/GameBoard/GameBoard';
import PlayerPanel from '../../components/PlayerPanel/PlayerPanel';
import './GamePage.css';

function GamePage() {
  const [game, setGame] = useState(null);
  const [action, setAction] = useState({ type: '', targetPlanet: '' });

  useEffect(() => {
    fetch('http://localhost:3001/game/state')
      .then(res => res.json())
      .then(data => {
        console.log("Resposta do backend:", data);
        setGame(data);
      })
      .catch(err => console.error("Erro ao buscar o estado do jogo:", err));
  }, []);

  const sendAction = () => {
    if (!action.type || !action.targetPlanet) return;

    fetch('http://localhost:3001/game/action', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: action.type,
        target: action.targetPlanet
      })
    })
      .then(res => res.json())
      .then(data => {
        setGame(data);
        setAction({ type: '', targetPlanet: '' });
      })
      .catch(err => console.error("Erro ao enviar ação:", err));
  };

  if (!game) return <div>Carregando jogo...</div>;

  return (
    <div className="game-container">
      <Menu game={game} />
      <div className="game-content">
        <GameBoard game={game} action={action} setAction={setAction} />
        <PlayerPanel game={game} action={action} setAction={setAction} sendAction={sendAction} />
      </div>
    </div>
  );
}

export default GamePage;
