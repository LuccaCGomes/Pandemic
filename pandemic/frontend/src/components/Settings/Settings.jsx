import React from 'react';
import './Settings.css'; // Criaremos este arquivo CSS

function Settings({ isOpen, onClose }) {
  if (!isOpen) {
    return null;
  }

  const handleModalContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="modal-overlay" onClick={onClose}> {/* Overlay que cobre a tela */}
      <div className="modal-content" onClick={handleModalContentClick}> {/* Conteúdo do modal */}
        <div className="modal-header">
          <h2 className="modal-title">Configurações</h2>
          <button className="modal-close-button" onClick={onClose}>
            &times; {/* Ícone "X" para fechar */}
          </button>
        </div>
        <div className="modal-body">
          <p>Aqui você poderá configurar regras do jogo futuramente.</p>
          {/* Adicione mais opções de configuração aqui conforme necessário */}
        </div>
        <div className="modal-footer">
          <button className="modal-action-button" onClick={onClose}>
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;