import React from 'react';
import './Settings.css';

function Settings({ onClose }) {
  // O modal é exibido sempre que renderizado
  const handleModalContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={handleModalContentClick}>
        <div className="modal-header">
          <h2 className="modal-title">Configurações</h2>
          <button className="modal-close-button" onClick={onClose} aria-label="Fechar">
            &times;
          </button>
        </div>
        <div className="modal-body">
          <p>Aqui você poderá configurar regras do jogo futuramente.</p>
          {/* Adicione mais opções de configuração aqui conforme necessário */}
        </div>
      </div>
    </div>
  );
}

export default Settings;