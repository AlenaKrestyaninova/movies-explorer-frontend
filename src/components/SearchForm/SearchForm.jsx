import React from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox.jsx'

function SearchForm(props) {
    const { value, onChange } = props;

    const handleChange = e => {
        onChange(e.target.value);
    };

    return (
        <form className="search page__section">
            <div className="search__container page__section page__section_size_small">
                <div className="search__input-container">
                    <input
                        className="search__input"
                        type="text"
                        placeholder="Фильмы"
                        value={value}
                        onChange={handleChange}
                        required
                        minLength="2"
                    />
                    <button className="search__button" type='submit'></button>
                </div>
                
                <FilterCheckbox />
            </div>
        </form>
    );
}

export default SearchForm;