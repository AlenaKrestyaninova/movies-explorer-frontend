import React from 'react';
import './Promo.css';
import promoLogo from '../../images/promo__logo.svg';

function Promo() {

    return (
        <section className="promo page__section">
            <div className="promo__content">
                <div className="promo__text-content">
                    <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
                    <p className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
                </div>
                <img src={promoLogo} alt="лого" className="promo__logo" />
            </div>
            <a href="#project" className="promo__button">Узнать больше</a>
        </section>
    );
}

export default Promo;