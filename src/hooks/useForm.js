import React from 'react';

export function useForm(inputValues) {
    const [values, setValues] = React.useState(inputValues);

    const handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        setValues({...values, [name]: value});
    };

    return {values, handleChange, setValues};
}