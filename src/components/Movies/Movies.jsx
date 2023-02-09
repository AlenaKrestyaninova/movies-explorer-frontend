import React from 'react';
import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader.js';

function Movies(props) {
    const {
        cards,
        value,
        onChange,
        onSearch,
        onAddToUserList,
        onDelete,
        loading,
        didUserSearch,
        isChecked,
        onCheck,
        savedMovies,
        showMoreMovies,
        renderedMovies
    } = props;

    return (
        <section className="movies">
            <SearchForm
                value={value}
                onChange={onChange}
                onSearch={onSearch}
                isChecked={isChecked}
                onCheck={onCheck}
            />
            {loading ? (
                <Preloader />
            ) : (
                <MoviesCardList
                    onAddToUserList={onAddToUserList}
                    onDelete={onDelete}
                    cards={cards}
                    didUserSearch={didUserSearch}
                    savedMovies={savedMovies}
                    showMoreMovies={showMoreMovies}
                    renderedMovies={renderedMovies}
                />
            )}
        </section>
    );
}

export default Movies;