import React from 'react';
import './Register.css';
import logo from '../../images/logo.svg';
import Input from '../Input/Input';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm.js';

function Register(props){
    const {onRegister} = props;
    const {values, handleChange, setValues} = useForm({
        name: '',
        email: '',
        password: ''
    });

    function handleSubmit(e) {
        e.preventDefault();
        if (!values.password || !values.email) return;
        onRegister({ 
            name: values.name, 
            email: values.email,
            password: values.password });
    };

    return (
        <div className="signup">
            <div className="signup__content">
                <img src={logo} alt="лого" className="signup__logo" />
                <h2 className='signup__title'>Добро пожаловать!</h2>
                <form className='signup__form' onSubmit={handleSubmit}>
                    <Input
                        id="name"
                        type="text"
                        name="name"
                        label="Имя"
                        placeholder="Имя пользователя"
                        minLength="2"
                        maxLength="30"
                        errorText="Ваше имя неправильное"
                        onChange={handleChange}
                        value={values.name || ''} 
                    />
                    <Input
                        id="email"
                        type="email"
                        name="email"
                        label="Email"
                        placeholder="Электронная почта"
                        errorText="Формат почты неправильный"
                        onChange={handleChange}
                        value={values.email || ''} 
                    />
                    <Input
                        id="password"
                        type="password"
                        name="password"
                        label="Пароль"
                        placeholder="Пароль"
                        errorText="Пароль содержит недостаточно цифр, букв и еще чего-то там"
                        onChange={handleChange}
                        value={values.password || ''} 
                    />
                    <button type="submit" className='signup__submit'>Зарегистрироваться</button>
                </form>
                <Link exact to="/signin" className="signup__to-login">
                    Уже зарегистрированы?&nbsp;
                    <span className="signup__to-login_blue">
                        Войти
                    </span>
                </Link>
            </div>
        </div>
    );
};

export default Register;