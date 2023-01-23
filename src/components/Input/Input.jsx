import './Input.css';

function Input(props) {
    const { id, type, name, label, placeholder, value, onChange, maxLength, errorText } = props
    return (
        <div className="input">
            <label htmlFor={id} className="input__label">{label}</label>
            <input
                id={id}
                type={type}
                className="input__field"
                name={name}
                placeholder={placeholder}
                required
                minLength="2"
                maxLength={maxLength}
                value={value}
                onChange={onChange}
            />
            <p className={`input__error ${errorText && 'input__error_active'}`}>
                {errorText}
            </p>
        </div>
    )
};

export default Input;