import React from 'react';
import './Login.css';
import logo from '../../images/logo.svg';
import Input from '../Input/Input.jsx';
import { Link } from 'react-router-dom';

const Login = props => {

    return (
        <div className="login">
            <div className="login__content">
                <img src={logo} alt="лого" className="login__logo" />
                <h2 className='login__title'>Рады видеть!</h2>
                <form className='login__form'>
                    <Input
                        id="email"
                        type="email"
                        name="email"
                        label="Email"
                        placeholder="Электронная почта"
                        errorText="Формат почты неправильный"
                    />
                    <Input
                        id="password"
                        type="password"
                        name="password"
                        label="Пароль"
                        placeholder="Пароль"
                        errorText="Пароль содержит недостаточно цифр, букв и еще чего-то там"
                    />
                    <button type="submit" className='login__submit'>Войти</button>
                </form>
                <Link exact to="/signin" className="login__to-register">
                    Ещё не зарегистрированы?&nbsp;
                    <span className="login__to-register_blue">
                        Регистрация
                    </span>
                </Link>
            </div>
        </div>
    );
};

export default Login;