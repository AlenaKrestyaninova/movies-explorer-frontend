import React from 'react';
import './Login.css';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import { useFormWithValidation } from '../../hooks/useFormWithValidation.js';

function Login (props) {
    const { onLogin } = props;
    const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

    function handleSubmit(e) {
        e.preventDefault();
        if (!values.password || !values.email) return;
        onLogin({ 
            email: values.email,
            password: values.password });
    };

    return (
        <div className="login">
            <div className="login__content">
                <img src={logo} alt="лого" className="login__logo" />
                <h2 className='login__title'>Рады видеть!</h2>
                <form className='login__form' onSubmit={handleSubmit}>
                    <label htmlFor='email' className='login__label'>
                        Email
                        <input
                            required
                            type='email'
                            minLength={2}
                            maxLength={40}
                            className={`login__input ${errors.email && 'login__input_red'}`}
                            name='email'
                            id='email'
                            value={values.email ? values.email : ''}
                            onChange={handleChange}
                            placeholder='Email'
                        />
                        <p className='login__input-error'>
                            {errors.email}
                        </p>
                    </label>
                    <label htmlFor='password' className='login__label'>
                        Пароль
                        <input
                            required
                            type='password'
                            minLength={2}
                            maxLength={40}
                            className={`login__input ${errors.password && 'login__input_red'}`}
                            name='password'
                            id='password'
                            value={values.password ? values.password : ''}
                            onChange={handleChange}
                            placeholder='Пароль'
                        />
                        <p className='login__input-error'>
                            {errors.password}
                        </p>
                    </label>
                    <button
                        type="submit"
                        className={`login__submit ${!isValid && 'login__submit_disabled'}`}
                        disabled={!isValid}>
                        Войти
                    </button>
                </form>
                <Link exact="true" to="/signup" className="login__to-register">
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