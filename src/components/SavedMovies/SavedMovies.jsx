import React from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader.js';

function SavedMovies(props) {
    const { value, onChange, onSearch, isChecked, onCheck, onDelete, cards, loading, savedMovies } = props;

    return (
        <section className="saved-movies">
            <SearchForm
                value={value}
                onChange={onChange}
                onSearch={onSearch}
                isChecked={isChecked}
                onCheck={onCheck} />
            {loading ? (
                <Preloader />
            ) : (
                <MoviesCardList
                    onDelete={onDelete}
                    cards={cards}
                    savedMovies={savedMovies}/>
            )}
        </section>
    );
}

export default SavedMovies;