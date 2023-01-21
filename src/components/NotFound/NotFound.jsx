import React from 'react';
import './NotFound.css';
import { Link } from 'react-router-dom';

function NotFound() {

    return (
        <section className="not-found">
            <div className="not-found__content">
                <div className="not-found__text-content">
                    <h2 className="not-found__error">404</h2>
                    <p className="not-found__text">Страница не найдена</p>
                </div>
                
                <Link exact to="/movies" className="not-found__back">Назад</Link>
            </div>
            
        </section>
    );
}

export default NotFound;