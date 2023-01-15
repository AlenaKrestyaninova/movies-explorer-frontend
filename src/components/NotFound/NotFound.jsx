import React from 'react';
import './NotFound.css';
import { Link } from 'react-router-dom';

function NotFound() {

    return (
        <section className="NotFound">
            <h2 className="NotFound__error">404</h2>
            <p className="NotFound__text">Страница не найдена</p>
            <Link exact to="/movies" className="NotFound__back">Назад</Link>
        </section>
    );
}

export default NotFound;