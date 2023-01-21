import './SideBar.css';
import { NavLink } from "react-router-dom";

function SideBar(props) {
    const { isOpen, onClose } = props;
    return (
        <div className={`sidebar ${isOpen ? "sidebar_open" : ''}`}>
            <nav className="sidebar__content">
                <button className="sidebar__close-button" onClick={onClose}></button>
                <div className="sidebar__links">
                    <NavLink className="sidebar__link" to="/" onClick={onClose}>Главная</NavLink>
                    <NavLink className="sidebar__link" to="/movies" onClick={onClose}>Фильмы</NavLink>
                    <NavLink className="sidebar__link" to="/saved-movies" onClick={onClose}>Сохранённые фильмы</NavLink>
                </div>
                <NavLink to="/profile" className="sidebar__buttton" onClick={onClose}>Аккаунт</NavLink>
            </nav>
        </div>
    );
};

export default SideBar;