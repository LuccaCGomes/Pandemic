import React from 'react';
import './OfficerCard.css';

const OfficerCard = ({ officer }) => (
  <div className="officer-card">
    <h3>{officer.nome}</h3>
    <p><strong>{officer.patente}</strong> - {officer.habilidade}</p>
    <p>{officer.efeito}</p>
  </div>
);

export default OfficerCard;
