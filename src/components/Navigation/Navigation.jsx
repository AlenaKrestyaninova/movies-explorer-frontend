import React from 'react';
import './Navigation.css';

function Navigation() {

    return (
        <div className="navigation">
            <div className="navigation__links">
                <a href="#" className="navigation__link navigation__link_films">Фильмы</a>
                <a href="#" className="navigation__link navigation__link_saved">Сохранённые фильмы</a>
            </div>
            <a href="#" className="navigation__account">Аккаунт</a>
        </div>
    );
}

export default Navigation;