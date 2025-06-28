import React, { useEffect, useState } from 'react';
import Menu from '../../components/Menu/Menu';
import GameBoard from '../../components/GameBoard/GameBoard';
import PlayerPanel from '../../components/PlayerPanel/PlayerPanel';
import './GamePage.css';

function GamePage() {
  const [game, setGame] = useState(null);
  const [action, setAction] = useState({ type: '', targetPlanet: '' });

  useEffect(() => {
    fetchGameState()
      .then(data => {
        setGame(data);
      })
      .catch(err => console.error("Erro ao buscar o estado do jogo:", err));
  }, []);

  const sendAction = () => {
    if (!action.type || !action.targetPlanet) return;

    makeAction({
      type: action.type,
      target: action.targetPlanet
    })
      .then(data => {
        setGame(data);
        setAction({ type: '', targetPlanet: '' });
      })
      .catch(err => console.error("Erro ao enviar ação:", err));
  };

  if (!game) return (
    <div className="loading-screen">
      <p>Carregando jogo...</p>
    </div>
  );

  return (
    <div className="game-container">
      {/* <Menu game={game} /> */}
      <div className="game-content">
        <GameBoard game={game} setGame={setGame} action={action} setAction={setAction} />
        <PlayerPanel game={game} action={action} setAction={setAction} sendAction={sendAction} />
      </div>
    </div>
  );
}

export default GamePage;
