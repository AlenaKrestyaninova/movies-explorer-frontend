import React from 'react';
import './Profile.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useForm } from '../../hooks/useForm.js';
import { Link } from 'react-router-dom';

function Profile(props) {
    const { onUpdateUser, onLogout, userName } = props;
    const currentUser = React.useContext(CurrentUserContext);
    const {values, handleChange, setValues} = useForm({
        name: '',
        email: ''
    });

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({ 
            name: values.name, 
            about: values.about });
    };

    React.useEffect(() => {
        setValues({name: currentUser.name, email: currentUser.email}); 
    }, [currentUser]);

    return (
        <div className="profile">
            <div className="profile__content">
                <h2 className='profile__title'>{`Привет, ${userName}!`}</h2>
                <form action="#" className="profile__form" onSubmit={handleSubmit}>
                    <div className="profile__form-item profile__name">
                        <label htmlFor='name-input' className="profile__form-item_label">Имя</label>
                        <input
                            className="profile__form-item_data profile__name-input"
                            id='name-input'
                            type="text"
                            value={values.name || ''}
                            placeholder="Имя" 
                            name="name" 
                            required
                            minLength="2" 
                            maxLength="40"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="profile__form-item profile__email">
                        <label htmlFor='email-input' className="profile__form-item_label">Email</label>
                        <input
                            className="profile__form-item_data profile__email-input"
                            id='email-input'
                            type="email"
                            value={values.email || ''}
                            placeholder="Email" 
                            name="email" 
                            required
                            minLength="2" 
                            maxLength="50"
                            onChange={handleChange}
                        />
                    </div>
                </form>
                <p className="profile__edit">Редактировать</p>
                <Link to="/signin" onClick={onLogout} className="profile__logout">
                    Выйти
                </Link>
            </div>
        </div>
    );
};

export default Profile;