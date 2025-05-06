import React from 'react';

const Rules = () => {
    return (
        <div className="rules-container">
            <h1>Regras do Jogo Pandemic</h1>
            <h2>Objetivo do Jogo</h2>
            <p>Os jogadores trabalham juntos como uma equipe para erradicar quatro doenças que estão se espalhando pelo mundo.</p>
            
            <h2>Componentes do Jogo</h2>
            <ul>
                <li>Tabuleiro</li>
                <li>Cartas de jogador</li>
                <li>Cartas de infecção</li>
                <li>Peças de jogador</li>
                <li>Peças de doença</li>
            </ul>

            <h2>Como Jogar</h2>
            <p>Os jogadores se revezam realizando ações, como mover-se entre cidades, tratar doenças, compartilhar conhecimento e descobrir curas.</p>

            <h2>Turnos</h2>
            <p>Cada jogador realiza até quatro ações por turno, seguido pela infecção de cidades.</p>

            <h2>Vencer e Perder</h2>
            <p>O jogo é vencido se os jogadores conseguirem curar todas as doenças. O jogo é perdido se as doenças se espalharem demais ou se os jogadores ficarem sem cartas de jogador.</p>
        </div>
    );
};

export default Rules;