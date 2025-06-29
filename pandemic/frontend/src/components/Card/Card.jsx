import React from 'react';
import './Card.css';

export default function Card({ card }) {
  return (
    <div className={`custom-card card-${card.color || 'default'}`}>
      <div className="card-type">{card.type ? card.type.toUpperCase() : 'FROTA'}</div>
      <div className="card-name">{card.name || card.planeta || 'Sem nome'}</div>
      {card.efeito && <div className="card-effect">{card.efeito}</div>}
      {(card.region || card.regiao) && (
        <div className="card-region">{card.region || card.regiao}</div>
      )}
    </div>
  );
}
