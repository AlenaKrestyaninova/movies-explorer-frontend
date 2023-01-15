import './MoviesCard.css';
import pic from '../../images/movie_pic.png';

function MoviesCard(props) {
    // const { imgURL } = props

    return (
        <li className="card">
            <div className="card__content">
                <div className="card__text-content">
                    <h4 className="card__name">33 слова о дизайне</h4>
                    <p className="card__duration">1ч 42м</p>
                </div>
                <div className="card__like"></div>
            </div>
            <a href="#" className="card__trailer">
                <img src={pic} alt="Постер фильма" className="card__img" />
            </a>
        </li>
    )
}

export default MoviesCard;