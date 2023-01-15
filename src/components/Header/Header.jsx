import React from 'react';
import './Header.css';
import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';
import { useLocation } from 'react-router-dom';

function Header() {
    const location = useLocation();
    const headerClassName = (`header ${location.pathname === "/" ? 'header__promo' : ''}`);

    return (
        <section className={headerClassName}>
            <div className="header__content page__section page__section_size_big">
                <img src={logo} alt="логотип" className="header__logo" />
                <Navigation />
            </div>
        </section>
    );
}

export default Header;