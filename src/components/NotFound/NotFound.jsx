import React from 'react';
import './NotFound.css';
import { useNavigate } from "react-router-dom";

function NotFound() {
    const navigate = useNavigate();

    return (
        <section className="not-found">
            <div className="not-found__content">
                <div className="not-found__text-content">
                    <h2 className="not-found__error">404</h2>
                    <p className="not-found__text">Страница не найдена</p>
                </div>
                <button className="not-found__back" onClick={() => navigate(-1)}>Назад</button>
            </div>
            
        </section>
    );
}

export default NotFound;