import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard.jsx';
import { useLocation } from 'react-router-dom';

function MoviesCardList(props) {
    const { cards, onAddToUserList, onDelete, didUserSearch, savedMovies, width, showMoreMovies, renderedMovies } = props
    const location = useLocation();

    if (didUserSearch && cards.length === 0) {
    return <p className='card-list__message'>Ничего не найдено</p>
    }

    return (
        <>
            <ul className='card-list page__section page__section_size_small'>
                {cards.map((card) => (
                    <li className="card-list__item" key={card.movieId}>
                        <MoviesCard
                            onAddToUserList={onAddToUserList}
                            onDelete={onDelete}
                            savedMovies={savedMovies}
                            card={card}
                        />
                    </li>
                ))
                .slice(0, renderedMovies)}
            </ul>
            {location.pathname === "/movies" && cards.length > renderedMovies && (
                <button onClick={showMoreMovies} className='card-list__else'>
                    Ещё
                </button>
            )}
            
        </>
        
    )
}

export default MoviesCardList;