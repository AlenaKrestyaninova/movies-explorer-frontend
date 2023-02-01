import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard.jsx';

function MoviesCardList(props) {
    const { cards, onAddToUserList, onDelete, didUserSearch, savedMovies } = props

    if (didUserSearch && cards.length === 0) {
    return <p className='card-list__message'>Ничего не найдено</p>
    }

    return (
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
            ))}
        </ul>
    )
}

export default MoviesCardList;