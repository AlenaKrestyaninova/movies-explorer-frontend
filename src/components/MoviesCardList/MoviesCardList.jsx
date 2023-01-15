import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard.jsx';

function MoviesCardList(props) {
    // const { cards } = props
    //   const { cards, didUserSearch } = props

    //   if (didUserSearch && cards.length === 0) {
    //     return <p className='card-list__message'>Ничего не найдено</p>
    //   }

    return (
        <ul className='card-list page__section page__section_size_small'>
            <MoviesCard />
        {/* {cards?.map((e) => (
            <MoviesCard
            card={e}
            key={e.id ? e.id : e._id}
            mode={props.mode}
            onAdd={props.onAdd}
            onRemove={props.onRemove}
            />
        ))} */}
        </ul>
    )
}

export default MoviesCardList;