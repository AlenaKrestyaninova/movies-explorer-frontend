import React from 'react';
import './Profile.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormWithValidation } from '../../hooks/useFormWithValidation.js';
import { Link } from 'react-router-dom';

function Profile(props) {
    const { onUpdateUserInfo, onLogout, message, loading } = props;
    const currentUser = React.useContext(CurrentUserContext);
    const { values, setValues, handleChange, errors, isValid, setIsValid } = useFormWithValidation({
        name: '',
        email: ''
    });

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUserInfo({ 
            name: values.name, 
            email: values.email });
    };

    React.useEffect(() => {
        setValues({name: currentUser.name, email: currentUser.email}); 
    }, [currentUser]);

    React.useEffect(() => {
        if (values.name === currentUser.name && values.email === currentUser.email){
            setIsValid(false);
        } 
    }, [values]);

    return (
        <div className="profile">
            <div className="profile__content">
                <h2 className='profile__title'>{`Привет, ${currentUser.name}!`}</h2>
                <form action="#" className="profile__form" onSubmit={handleSubmit}>

                    <label htmlFor='name-input' className="profile__form-item">
                        Имя
                        <input
                            required
                            type='text'
                            minLength={2}
                            maxLength={40}
                            className="profile__input profile__name-input"
                            name='name'
                            id='name-input'
                            value={values.name || ''}
                            onChange={handleChange}
                            placeholder='Имя пользователя'
                            disabled={loading}
                        />
                        <p className='profile__input-error'>
                            {errors.name}
                        </p>
                    </label>

                    <label htmlFor='email-input' className="profile__form-item">
                        Email
                        <input
                            required
                            type='email'
                            minLength={2}
                            maxLength={50}
                            className="profile__input profile__email-input"
                            name='email'
                            id='email-input'
                            value={values.email || ''}
                            onChange={handleChange}
                            placeholder='Email'
                            disabled={loading}
                        />
                        <p className='profile__input-error'>
                            {errors.email}
                        </p>
                    </label>
                    <div className="profile__message">{message}</div>
                    <button
                        type="submit"
                        disabled={!isValid || loading}
                        className={`profile__edit ${!isValid && "profile__edit_disabled"}`}>
                        Редактировать
                    </button>
                    <Link 
                        to="/signin" 
                        onClick={onLogout}
                        className="profile__logout">
                        Выйти
                    </Link>

                </form>
            </div>
        </div>
    );
};

export default Profile;