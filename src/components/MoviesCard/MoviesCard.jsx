import './MoviesCard.css';
import React from 'react';
// import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import { useLocation } from 'react-router-dom';
// import { BASE_URL_MOVIES } from '../../utils/config';

function MoviesCard(props) {
    const { onAddToUserList, onDelete, savedMovies, card } = props;
    const isLiked = savedMovies.some((item) => Number(item.movieId) === card.movieId);
    const likeButtonClassName = (`card__like ${isLiked ? 'card__like_active' : ''}`);
    const location = useLocation();

    const addCard = (card) => {
        onAddToUserList(card);
    }
    
    function handleDeleteClick(card) {
        onDelete(card);
    }

    return (
        <>
            <div className="card__content">
                <div className="card__text-content">
                    <h4 className="card__name">{card.nameRU}</h4>
                    <p className="card__duration">{
                        card.duration > 60
                        ? `${Math.floor(card.duration / 60)}ч ${card.duration % 60}м`
                        : `${card.duration}м`
                    }</p>
                </div>
                {/* Потом передеаю на ?isLiked */}
                {location.pathname === "/saved-movies" ? (
                    <button
                        className="card__delete"
                        onClick={()=>{handleDeleteClick(card)}}
                    ></button>
                ) : (
                    <button 
                        className={likeButtonClassName}
                        onClick={() => addCard(card)}
                    ></button>
                    
                )}
            </div>
            <a href={card.trailerLink} className="card__trailer" target='_blank' rel="noreferrer">
                <img src={card.image} alt="Постер фильма" className="card__img" />
            </a>
        </>
    )
}

export default MoviesCard;