import React from 'react';
import './FilterCheckbox.css';

function FilterCheckbox(props) {
    const { value, onChange } = props;

    return (
        <>
            <label htmlFor="checkbox" className="checkbox">
                <span className="checkbox__label">Короткометражки</span>
                <input
                    className="checkbox__input_invisible"
                    type="checkbox"
                    id="checkbox"
                />
                <div className="checkbox__input_visible"></div>
            </label>
        </>
    );
}

export default FilterCheckbox;