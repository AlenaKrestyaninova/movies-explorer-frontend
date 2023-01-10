import React from 'react';
import './Portfolio.css';

function Portfolio() {

    return (
        <section className="portfolio page__section">
            <h3 className="portfolio__title">Портфолио</h3>
            <a href="https://alenakrestyaninova.github.io/how-to-learn/" className="portfolio__link" target="_blank" rel="noreferrer">
                <p className="portfolio__text">Статичный сайт</p>
                <div className="portfolio__arrow">↗</div>
            </a>
            <a href="https://alenakrestyaninova.github.io/russian-travel/" className="portfolio__link" target="_blank" rel="noreferrer">
                <p className="portfolio__text">Адаптивный сайт</p>
                <div className="portfolio__arrow">↗</div>
            </a>
            <a href="https://alenakrestyaninova.github.io/react-mesto-auth/" className="portfolio__link" target="_blank" rel="noreferrer">
                <p className="portfolio__text">Одностраничное приложение</p>
                <div className="portfolio__arrow">↗</div>
            </a>
        </section>
    );
}

export default Portfolio;