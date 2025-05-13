import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MainPage.css'; 

function MainPage() {
  const navigate = useNavigate();

  return (
    <div className="main-container">
      <h1 className="main-title">Pandemic Web</h1>
      <div className="main-buttons">
        <button onClick={() => navigate('/game')}>Começar Jogo</button>
        <button onClick={() => navigate('/settings')}>Configurações</button>
      </div>
    </div>
  );
}

export default MainPage;