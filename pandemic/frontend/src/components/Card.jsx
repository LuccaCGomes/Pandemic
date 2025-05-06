import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';

export default function Card ({ title, description, onClick }) {
    return (
        <div className="card" onClick={onClick}>
            <h3 className="card-title">{title}</h3>
            <p className="card-description">{description}</p>
        </div>
    );
};

Card.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};
