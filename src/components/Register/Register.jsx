import React from 'react';
import './Register.css';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import { useFormWithValidation } from '../../hooks/useFormWithValidation.js';

function Register(props){
    const { onRegister } = props;
    const { values, handleChange, errors, isValid } = useFormWithValidation();

    function handleSubmit(e) {
        e.preventDefault();
        if (!values.password || !values.email || !values.name) return;
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
                <form className='signup__form' onSubmit={handleSubmit} noValidate>
                    <label htmlFor='name' className='signup__label'>
                        Имя
                        <input
                            required
                            type='text'
                            minLength={2}
                            maxLength={40}
                            className={`signup__input ${errors.name && 'signup__input_red'}`}
                            name='name'
                            id='name'
                            value={values.name ? values.name : ''}
                            onChange={handleChange}
                            placeholder='Имя пользователя'
                        />
                        <p className='signup__input-error'>
                            {errors.name}
                        </p>
                    </label>
                    <label htmlFor='email' className='signup__label'>
                        Email
                        <input
                            required
                            type='email'
                            minLength={2}
                            maxLength={40}
                            className={`signup__input ${errors.email && 'signup__input_red'}`}
                            name='email'
                            id='email'
                            value={values.email ? values.email : ''}
                            onChange={handleChange}
                            placeholder='Email'
                        />
                        <p className='signup__input-error'>
                            {errors.email}
                        </p>
                    </label>
                    <label htmlFor='password' className='signup__label'>
                        Пароль
                        <input
                            required
                            type='password'
                            minLength={2}
                            maxLength={40}
                            className={`signup__input ${errors.password && 'signup__input_red'}`}
                            name='password'
                            id='password'
                            value={values.password ? values.password : ''}
                            onChange={handleChange}
                            placeholder='Пароль'
                        />
                        <p className='signup__input-error'>
                            {errors.password}
                        </p>
                    </label>
                    <button 
                        type="submit"
                        className={`signup__submit ${!isValid && 'signup__submit_disabled'}`}
                        disabled={!isValid}>
                        Зарегистрироваться
                    </button>
                </form>
                <Link exact="true" to="/signin" className="signup__to-login">
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