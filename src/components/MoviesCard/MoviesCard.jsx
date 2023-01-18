import './MoviesCard.css';
import React from 'react';
// import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import pic from '../../images/movie_pic.png';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

function MoviesCard(props) {
    const { onCardLike, onCardDelete, card } = props;
    // const currentUser = React.useContext(CurrentUserContext);
    // const isLiked = card.likes.some(i => i === currentUser._id);
    const [isLiked, setIsLiked] = useState(false);
    const likeButtonClassName = (`card__like ${isLiked ? 'card__like_active' : ''}`);
    const location = useLocation();

    function handleLikeClick() {
        setIsLiked(true);
    }

    // function handleLikeClick(card) {
    //     onCardLike(card);
    // }
    
    // function handleDeleteClick(card) {
    //     onCardDelete(card);
    // }

    return (
        <li className="card">
            <div className="card__content">
                <div className="card__text-content">
                    <h4 className="card__name">33 слова о дизайне</h4>
                    <p className="card__duration">1ч 42м</p>
                </div>
                {/* Потом передеаю на ?isLiked */}
                {location.pathname === "/movies" ? (
                    <button 
                        className={likeButtonClassName}
                        onClick={()=>{handleLikeClick(card)}}
                    ></button>
                ) : (
                    <button 
                        className="card__delete"
                        // onClick={()=>{handleDeleteClick(card)}}
                    ></button>
                )}
            </div>
            <a href="#" className="card__trailer">
                <img src={pic} alt="Постер фильма" className="card__img" />
            </a>
        </li>
    )
}

export default MoviesCard;