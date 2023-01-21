import React from 'react';
import Promo from '../Promo/Promo.jsx';
import AboutProject from '../AboutProject/AboutProject.jsx';
import Techs from '../Techs/Techs.jsx';
import AboutMe from '../AboutMe/AboutMe.jsx';
import Portfolio from '../Portfolio/Portfolio.jsx';

// import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';

function Main(props) {
  // const {onEditAvatar, onEditProfile, onAddCard, onCardClick, onCardLike, onCardDelete, cards} = props;
  // const currentUser = React.useContext(CurrentUserContext);

  return (
    <>
      <Promo/>
      <AboutProject/>
      <Techs/>
      <AboutMe/>
      <Portfolio/>
    </>
  );
}

export default Main;