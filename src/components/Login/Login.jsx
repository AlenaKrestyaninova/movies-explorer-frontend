import React from 'react';
import './Login.css';
import logo from '../../images/logo.svg';
import Input from '../Input/Input.jsx';
import { Link } from 'react-router-dom';

const Login = props => {

    return (
        <div className="Login">
            <img src={logo} alt="лого" className="Login__logo" />
            <h2 className='Login__title'>Рады видеть!</h2>
            <form className='Login__form'>
                <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Электронная почта"
                    errorText="Формат почты неправильный"
                />
                <Input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Пароль"
                    errorText="Пароль содержит недостаточно цифр, букв и еще чего-то там"
                />
                <button type="submit" className='Login__submit'>Войти</button>
            </form>
            <Link exact to="/signin" className="Login__to-register">
                Ещё не зарегистрированы?
                <span className="Login__to-login_blue">
                    Регистрация
                </span>
            </Link>
        </div>
    );
};

export default Login;