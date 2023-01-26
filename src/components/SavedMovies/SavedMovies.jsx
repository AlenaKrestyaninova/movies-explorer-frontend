import React from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader.js';

function SavedMovies(props) {
    const { loading } = props;

    return (
        <section className="saved-movies">
            <SearchForm />
            {loading ? (
                <Preloader />
            ) : (
                <MoviesCardList/>
            )}
        </section>
    );
}

export default SavedMovies;