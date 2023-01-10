import React from 'react';
import './Header.css';
import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';

function Header() {

    return (
        <section className="header page__section">
            <img src={logo} alt="логотип" className="header__logo" />
            <Navigation />
        </section>
    );
}

export default Header;