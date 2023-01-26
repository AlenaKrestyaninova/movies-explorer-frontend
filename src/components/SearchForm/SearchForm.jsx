import React from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox.jsx';
// import { useForm } from '../../hooks/useForm';

function SearchForm(props) {
    const { value, onChange, onSearch, isChecked, onCheck } = props;
    // const { values, handleChange, setValues } = useForm;

    const handleChange = e => {
        onChange(e.target.value)
    };

    return (
        <form className="search page__section" onSubmit={onSearch}>
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
                        maxLength="400"
                    />
                    <button className="search__button" type='submit'></button>
                </div>
                
                <FilterCheckbox 
                    isChecked={isChecked}
                    onCheck={onCheck}
                />
            </div>
        </form>
    );
}

export default SearchForm;