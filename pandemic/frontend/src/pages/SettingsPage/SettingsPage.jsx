import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SettingsPage.css';

function SettingsPage() {
  const navigate = useNavigate();

  return (
    <div className="settings-container">
      <h2 className="settings-title">Configurações</h2>
      <div className="settings-content">
        <p>Aqui você poderá configurar regras do jogo futuramente.</p>
      </div>
      <button className="back-button" onClick={() => navigate('/')}>
        Voltar
      </button>
    </div>

  );
}

export default SettingsPage;
