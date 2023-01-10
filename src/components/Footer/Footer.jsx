import React from 'react';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer page__section">
      <p className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__down">
        <p className="footer__year">&copy; {currentYear}</p>
        <div className="footer__buttons">
          <a href="https://practicum.yandex.ru/" className="footer__button footer__button_praktikum" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
          <a href="https://github.com/" className="footer__button footer__button_github" target="_blank" rel="noreferrer">Github</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;