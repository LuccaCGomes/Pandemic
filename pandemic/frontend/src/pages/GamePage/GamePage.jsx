import React, { useEffect, useState } from 'react';
import Menu from '../../components/Menu/Menu';
import GameBoard from '../../components/GameBoard/GameBoard';
import PlayerPanel from '../../components/PlayerPanel/PlayerPanel';
import { fetchGameState, makeAction } from '../../utils/api';
import './GamePage.css';

function GamePage() {
  const [game, setGame] = useState(null);
  const [action, setAction] = useState({ type: '', params: {} });

  useEffect(() => {
    fetchGameState()
      .then(data => {
        setGame(data);
      })
      .catch(err => console.error("Erro ao buscar o estado do jogo:", err));
  }, []);

  const sendAction = () => {
    if (!action.type) return;

    let actionPayload = { type: action.type };
    // Monta os parâmetros conforme o tipo de ação
    switch (action.type) {
      case 'move':
        if (!action.params.targetPlanetName) return;
        actionPayload.targetPlanetName = action.params.targetPlanetName;
        break;
      case 'eliminateRebels':
        // Nenhum parâmetro extra
        break;
      case 'buildBase':
        // Nenhum parâmetro extra
        break;
      case 'shareInfo':
        if (!action.params.targetPlayerName || !action.params.card) return;
        actionPayload.targetPlayerName = action.params.targetPlayerName;
        actionPayload.card = action.params.card;
        break;
      case 'neutralizeRebellion':
        if (!action.params.region) return;
        actionPayload.region = action.params.region;
        break;
      default:
        return;
    }

    makeAction(actionPayload)
      .then(data => {
        setGame(data.game || data); // data pode ser { game, message } ou só o game
        setAction({ type: '', params: {} });
      })
      .catch(err => console.error("Erro ao enviar ação:", err));
  };

  if (!game) return (
    <div className="loading-screen">
      <p>Carregando jogo...</p>
    </div>
  );

  return (
    <div className="gamepage-root">
      <header className="gamepage-header">
        <Menu game={game} />
      </header>
      <main className="gamepage-main">
        <GameBoard game={game} setGame={setGame} action={action} setAction={setAction} />
      </main>
      <footer className="gamepage-footer">
        <PlayerPanel game={game} action={action} setAction={setAction} sendAction={sendAction} />
      </footer>
    </div>
  );
}

export default GamePage; 