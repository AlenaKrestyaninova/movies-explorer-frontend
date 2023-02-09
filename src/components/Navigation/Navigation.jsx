import React from 'react';
import './Navigation.css';
import { Link } from 'react-router-dom';

function Navigation(props) {
    const { openSideBar } = props;

    return (

        <div className="navigation">
            <div className="navigation__content">
                <div className="navigation__links">
                    <Link exact="true" to="/movies" className="navigation__link navigation__link_films">Фильмы</Link>
                    <Link exact="true" to="/saved-movies" className="navigation__link navigation__link_saved">Сохранённые фильмы</Link>
                </div>
                <Link exact="true" to="/profile" className="navigation__account">Аккаунт</Link>
            </div>
            <button className="navigation__burger" onClick={openSideBar}></button>
        </div>
    );
}

export default Navigation;