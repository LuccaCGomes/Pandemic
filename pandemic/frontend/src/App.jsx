import React, { useEffect, useState } from 'react';
import GameBoard from './components/GameBoard';
import PlayerPanel from './components/PlayerPanel.jsx';

function App() {
  const [game, setGame] = useState(null);
  const [action, setAction] = useState({ type: '', city: '' });

  const fetchGame = async () => {
    const res = await fetch('http://localhost:3001/game/state');
    const data = await res.json();
    setGame(data);
  };

  useEffect(() => {
    fetchGame();
  }, []);

  const sendAction = async () => {
    const res = await fetch('http://localhost:3001/game/action', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(action),
    });

    const data = await res.json();
    setGame(data);
    setAction({ type: '', city: '' });
  };

  if (!game) return <div>Carregando...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Pandemic Web</h1>
      <PlayerPanel game={game} action={action} setAction={setAction} />
      <GameBoard game={game} />
      <button onClick={sendAction} disabled={!action.type}>
        Executar Ação
      </button>
      <h3>Log:</h3>
      <ul>
        {game.log.map((msg, idx) => (
          <li key={idx}>{msg}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
