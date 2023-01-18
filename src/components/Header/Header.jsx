import React from 'react';
import './Header.css';
import { Link, NavLink } from "react-router-dom";
import logo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';
import SideBar from '../SideBar/SideBar';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

function Header() {
    const location = useLocation();
    const [isSideBarOpen, setIsSideBarOpen] = useState(false);
    const headerClassName = (`header ${location.pathname === "/" ? 'header__promo' : ''}`);

    const handleOpenSideBar = () => {
        setIsSideBarOpen(true)
    };
    const closeSideBar = () => {
        setIsSideBarOpen(false)
    };

    return (
        <section className={headerClassName}>
            <div className="header__content page__section page__section_size_big">
                <Link to="/">
                    <img src={logo} alt="логотип" className="header__logo" />
                </Link>
                {/* Потом передедаю на ?loggedIn */}
                {location.pathname === "/" ? (
                    <div className="header__buttons">
                        <NavLink className="header__button header__button_signup" to="/signup">Регистрация</NavLink>
                        <NavLink className="header__button header__button_signin" to="/signin">Войти</NavLink>
                    </div>
                ) : (
                    <>
                        <Navigation openSideBar={handleOpenSideBar} />
                        <SideBar isOpen={isSideBarOpen} onClose={closeSideBar} />
                    </>
                )}
            </div>
        </section>
    );
}

export default Header;