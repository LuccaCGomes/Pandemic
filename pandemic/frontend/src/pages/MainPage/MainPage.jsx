import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MainPage.css';

function MainPage() {
  const [numPlayers, setNumPlayers] = useState(2);
  const [players, setPlayers] = useState([{ name: '', role: '' }, { name: '', role: '' }]);
  const navigate = useNavigate();

  const availableRoles = ['Comandante', 'Estratégico', 'Tático', 'Espião'];

  const handleNumPlayersChange = (value) => {
    setNumPlayers(value);
    setPlayers(Array.from({ length: value }, () => ({ name: '', role: '' })));
  };

  const handleChange = (index, field, value) => {
    const updated = [...players];
    updated[index][field] = value;
    setPlayers(updated);
  };

  const startGame = async () => {
    const response = await fetch('http://localhost:3001/game/start', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ players }),
    });
    if (response.ok) navigate('/game');
  };

  return (
    <div className="main-container">
      <h1 className="main-title">Star Wars Pandemic</h1>
      <div className="main-buttons">
        <label>Quantidade de jogadores:</label>
        <div className="player-count-buttons">
          {[2, 3, 4].map((value) => (
            <button
              key={value}
              className={`player-count-button ${numPlayers === value ? 'active' : ''}`}
              onClick={() => handleNumPlayersChange(value)}
            >
              {value}
            </button>
          ))}
        </div>
        {players.map((p, i) => (
          <div key={i} className="player-input-container">
            <input
              className="player-name-input"
              placeholder={`Nome do Jogador ${i + 1}`}
              value={p.name}
              onChange={(e) => handleChange(i, 'name', e.target.value)}
            />
            <select
              className="player-role-select"
              value={p.role}
              onChange={(e) => handleChange(i, 'role', e.target.value)}
            >
              <option value="">Escolha uma função</option>
              {availableRoles.map((role, index) => (
                <option key={index} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
        ))}
        <button onClick={startGame}>Iniciar Jogo</button>
      </div>
    </div>
  );
}

export default MainPage;