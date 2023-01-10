import React from 'react';
import '../../blocks/title/title.css';
import './AboutMe.css';
// import avatar from '../../images/avatar.jpg';

function AboutMe() {

    return (
        <section className="me page__section">
            <h2 className="title">Студент</h2>
            <div className="me__content">
                <div className="me__text-container">
                    <div className="me__text">
                        <h3 className="me__subtitle">Алёна</h3>
                        <p className="me__about">Фронтенд-разработчик, 27 лет</p>
                        <p className="me__description">Я из Петербурга, закончила строительный факультет СПбГУ. Люблю DIY, походы, детективы и свою маленькую кошку. Прохожу курс веб-резработки в Яндекс Практикуме.</p>
                    </div>
                    <a href="https://github.com/AlenaKrestyaninova" className="me__github-link">Github</a>
                </div>
                <div className="me__photo"></div>
            </div>
        </section>
    );
}

export default AboutMe;