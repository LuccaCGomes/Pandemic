import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Menu.css';

export default function Menu() {
    const navigate = useNavigate();

    return (
        <div className="container">
            <h1 className="title">Pandemic Game</h1>
            <button
                className="menu-button"
                onClick={() => navigate('/game')}
            >
                Iniciar Jogo
            </button>
            <button
                className="menu-button"
                onClick={() => navigate('/rules')}
            >
                Regras
            </button>
            <button
                className="menu-button"
                onClick={() => {/* Add exit functionality */}}
            >
                Sair
            </button>
        </div>
    );
};