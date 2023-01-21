import React from 'react';
import './Portfolio.css';

function Portfolio() {

    return (
        <section className="portfolio">
            <div className="portfolio__container page__section page__section_size_big">
                <h3 className="portfolio__title">Портфолио</h3>
                <ul className="portfolio__items">
                    <li className="portfolio__item">
                        <a href="https://alenakrestyaninova.github.io/how-to-learn/" className="portfolio__link" target="_blank" rel="noreferrer">
                            <p className="portfolio__text">Статичный сайт</p>
                            <div className="portfolio__arrow">↗</div>
                        </a>
                    </li>
                    <li className="portfolio__item">
                        <a href="https://alenakrestyaninova.github.io/russian-travel/" className="portfolio__link" target="_blank" rel="noreferrer">
                            <p className="portfolio__text">Адаптивный сайт</p>
                            <div className="portfolio__arrow">↗</div>
                        </a>
                    </li>
                    <li className="portfolio__item">
                        <a href="https://alenakrestyaninova.github.io/react-mesto-auth/" className="portfolio__link" target="_blank" rel="noreferrer">
                            <p className="portfolio__text">Одностраничное приложение</p>
                            <div className="portfolio__arrow">↗</div>
                        </a>
                    </li>
                </ul>
            </div>
        </section>
    );
}

export default Portfolio;