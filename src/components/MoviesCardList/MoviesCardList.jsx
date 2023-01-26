import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard.jsx';

function MoviesCardList(props) {
    const { cards, onAddToUserList, isMovieAdded, onDelete, didUserSearch } = props

    if (didUserSearch && cards.length === 0) {
    return <p className='card-list__message'>Ничего не найдено</p>
    }

    return (
        <ul className='card-list page__section page__section_size_small'>
            {cards.map((card) => (
                <li className="card-list__item" key={card.id}>
                    <MoviesCard
                        onAddToUserList={onAddToUserList}
                        isMovieAdded={isMovieAdded}
                        onDelete={onDelete}
                        card={card}
                    />
                </li>
            ))}
        </ul>
    )
}

export default MoviesCardList;