import React from 'react';
import './Card.css';

export default function Card({ card }) {
  return (
    <div className="custom-card">
      <div className="card-type">{card.type.toUpperCase()}</div>
      <div className="card-name">{card.name}</div>
    </div>
  );
}
