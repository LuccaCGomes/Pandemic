import React from 'react';
import OfficerCard from '../Card/OfficerCard/OfficerCard';
import Card from '../Card/Card';
import './PlayerPanel.css';

function PlayerPanel({ game, action, setAction, sendAction }) {
  const player = game.players[game.currentPlayerIndex];

  return (
    <div className="playerpanel-root">
      <div className="playerpanel-info">
        <span className="playerpanel-name">Agente: <b>{player.name}</b></span>
        <span className="playerpanel-role">Patente: <b>{player.role?.patente || player.role?.name || 'Desconhecida'}</b></span>
        <span className="playerpanel-location">Localização: <b>{player.location}</b></span>
        {player.role && <OfficerCard officer={player.role} />}
      </div>
      <div className="playerpanel-cards">
        {player.cards.map((card, idx) => (
          <Card key={idx} card={card} />
        ))}
      </div>
      <div className="playerpanel-actions">
        <div className="playerpanel-action-buttons-multiline">
          {[
            [
              { value: 'move', label: 'Mover' },
              { value: 'eliminateRebels', label: 'Eliminar Rebeldes' }
            ],
            [
              { value: 'buildBase', label: 'Construir Base' },
              { value: 'neutralizeRebellion', label: 'Neutralizar Rebelião' }
            ],
            [
              { value: 'shareInfo', label: 'Trocar Informação' }
            ]
          ].map((row, rowIdx) => (
            <div className="playerpanel-action-btn-row" key={rowIdx}>
              {row.map(opt => (
                <button
                  key={opt.value}
                  className={`playerpanel-action-btn${action.type === opt.value ? ' selected' : ''}`}
                  onClick={() => setAction({ type: opt.value, params: {} })}
                  type="button"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          ))}
        </div>
        <div className="playerpanel-conditional-inputs">
          {action.type === 'move' && (
            <select
              value={action.params.targetPlanetName || ''}
              onChange={e => setAction({ ...action, params: { ...action.params, targetPlanetName: e.target.value } })}
            >
              <option value="">Selecione o planeta de destino</option>
              {game.planets.map((planet) => (
                <option key={planet.name} value={planet.name}>{planet.name}</option>
              ))}
            </select>
          )}
          {action.type === 'neutralizeRebellion' && (
            <input
              type="text"
              placeholder="Região"
              value={action.params.region || ''}
              onChange={e => setAction({ ...action, params: { ...action.params, region: e.target.value } })}
            />
          )}
          {action.type === 'shareInfo' && (
            <>
              <input
                type="text"
                placeholder="Nome do jogador alvo"
                value={action.params.targetPlayerName || ''}
                onChange={e => setAction({ ...action, params: { ...action.params, targetPlayerName: e.target.value } })}
              />
              <input
                type="text"
                placeholder="Nome da carta"
                value={action.params.card?.name || ''}
                onChange={e => setAction({ ...action, params: { ...action.params, card: { ...action.params.card, name: e.target.value } } })}
              />
              <input
                type="text"
                placeholder="Tipo da carta"
                value={action.params.card?.type || ''}
                onChange={e => setAction({ ...action, params: { ...action.params, card: { ...action.params.card, type: e.target.value } } })}
              />
            </>
          )}
        </div>
        <button
          onClick={sendAction}
          className="playerpanel-action-btn confirm"
          disabled={
            !action.type ||
            (action.type === 'move' && !action.params.targetPlanetName) ||
            (action.type === 'neutralizeRebellion' && !action.params.region) ||
            (action.type === 'shareInfo' && (!action.params.targetPlayerName || !action.params.card?.name || !action.params.card?.type))
          }
        >
          Confirmar
        </button>
      </div>
    </div>
  );
}

export default PlayerPanel;
