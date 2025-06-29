import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import empireLogo from '../../assets/empireLogo.svg';
import starwarsLogo from '../../assets/starwarsLogo.svg';
import imperialOfficers from '../../utils/imperialOfficersCopy'; // corrigir esse import, está apenas mockado para o protótipo
import './MainPage.css';

function MainPage() {
  const [numPlayers, setNumPlayers] = useState(2);
  const [players, setPlayers] = useState([{ name: '' }, { name: '' }]);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const shuffleArray = (array) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const startGame = async () => {
    const shuffledOfficers = shuffleArray(imperialOfficers).slice(0, numPlayers);

    const playersWithRoles = players.map((p, i) => ({
      name: p.name,
      role: shuffledOfficers[i],
    }));

    try {
      const response = await fetch('http://localhost:3001/game/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ players: playersWithRoles }),
      });

      if (!response.ok) throw new Error('Erro ao iniciar o jogo');

      const data = await response.json();
      console.log(data.message);
      navigate('/game');
    } catch (error) {
      console.error('Erro:', error);
      alert('Não foi possível iniciar o jogo. Verifique os dados e tente novamente.');
    }
  };

  return (
    <div className="main-container">
      <img src={starwarsLogo} alt="Star Wars Logo" className="starwars-logo" />
      <h1 className="main-title">Supremacia Imperial</h1>
      <img src={empireLogo} alt="Empire Logo" className="empire-logo" />
      <button className="open-modal-button" onClick={() => setIsModalOpen(true)}>
        Iniciar Jogo
      </button>
      {isModalOpen && (
        <div className="modal-overlay">
          <button className="close-modal-button" onClick={() => setIsModalOpen(false)}>
            X
          </button>
          <div className="modal-content">
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
              </div>
            ))}
            <button onClick={startGame} disabled={players.some(p => !p.name.trim())}>
              Iniciar Jogo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MainPage;