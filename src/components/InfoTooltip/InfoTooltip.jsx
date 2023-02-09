import React from 'react';
import './InfoTooltip.css';
import okSignUp from '../../images/Ok.svg';
import neOkSignUp from '../../images/NeOk.svg';

function InfoTooltip(props) {
  const {isOpen, onClose, isAuthOk} = props;

  return (
    <div className={`info ${isOpen ? "info_opened" : ''}`}>
      <div className="info__container">
        <button className="info__close"
          onClick={onClose}>
        </button>
        <div className='info__content'>
          <img className="info__register-image"
            src={isAuthOk ? okSignUp : neOkSignUp} 
            alt={isAuthOk ? 'Вы успешно авторизовались!' : 'Упс'}
          />
          <h2 className="info__message">{isAuthOk ? 'Вы успешно авторизовались!' : 'Что-то пошло не так! Попробуйте еще раз.'}</h2>
        </div>
        
        
      </div>
    </div>
  );
}

export default InfoTooltip;